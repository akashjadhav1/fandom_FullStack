import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          throw new Error('No token found in cookies');
        }

        const response = await axios.get(
          'https://fandom-mern.onrender.com/api/user/favorites',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFavorites(response.data.favorites || []);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async (movieId, navigate) => {
    if (isToggling) return;

    const token = Cookies.get('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    setIsToggling(true);

    const movieIdStr = movieId.toString();
    const isFavorite = favorites.includes(movieIdStr);
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== movieIdStr)
      : [...favorites, movieIdStr];

    setFavorites(updatedFavorites);

    try {
      const url = isFavorite
        ? 'https://fandom-mern.onrender.com/api/user/favorites/remove'
        : 'https://fandom-mern.onrender.com/api/user/favorites';

      const response = await axios.post(
        url,
        { movieId: movieIdStr },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        setFavorites(
          isFavorite
            ? [...favorites, movieIdStr]
            : favorites.filter((id) => id !== movieIdStr)
        );
        console.error(
          `Failed to ${isFavorite ? 'remove' : 'add'} movie from favorites:`,
          response.data.message
        );
      }
    } catch (error) {
      setFavorites(
        isFavorite
          ? [...favorites, movieIdStr]
          : favorites.filter((id) => id !== movieIdStr)
      );
      console.error(
        `Error toggling favorite status:`,
        error.response?.data || error.message
      );
    } finally {
      setIsToggling(false);
    }
  };

  return { favorites, toggleFavorite, isToggling };
};

export default useFavorites;

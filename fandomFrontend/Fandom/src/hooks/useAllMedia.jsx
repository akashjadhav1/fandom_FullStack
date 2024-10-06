import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the API URL
const apiURL = "https://fandom-mern.onrender.com/api/all/data";

// Custom hook to fetch media data
function useAllMediaData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // To cancel requests if needed
    const source = axios.CancelToken.source();
    
    // Function to fetch data
    const fetchTrendingData = async () => {
      setLoading(true);  // Start loading before the request
      try {
        // Fetch data with 30 seconds timeout
        const response = await axios.get(apiURL, { 
          cancelToken: source.token,
          timeout: 15000,  // Reduce timeout to 15 seconds for faster feedback
        });
        
        // Update data and clear error if request is successful
        setData(response.data || []);
        setError(null);
      } catch (err) {
        // Handle cancellation of request
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else if (err.code === 'ECONNABORTED') {
          console.error("Request timeout:", err.message);
          setError("Request timeout, please try again.");
        } else {
          console.error("Failed to fetch media data:", err);
          setError(err.message || "An error occurred.");
        }
      } finally {
        // Stop loading after the request is done
        setLoading(false);
      }
    };
    
    fetchTrendingData();  // Call the function to fetch data

    // Cleanup function to cancel any pending requests when the component unmounts
    return () => {
      source.cancel("Component unmounted or new request made.");
    };
  }, []);  // Empty dependency array ensures this only runs once when the component mounts

  // Return the state variables
  return { data, loading, error };
}

export default useAllMediaData;

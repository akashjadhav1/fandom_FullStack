const User = require('../models/user.model'); // Import the User model

// Add a movie to the user's list of favorite movies
const addFavorites = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available on the request object
    const { movieId } = req.body; // Extract movieId from the request body

    try {
        // Find the user by their ID
        const user = await User.findById(userId);

        // If the user is not found, send a 404 response
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const movieIdStr = String(movieId); // Ensure movieId is a string

        // If the movie is not already in the user's favorites, add it
        if (!user.favorites.includes(movieIdStr)) {
            user.favorites.push(movieIdStr);
            await user.save(); // Save the updated user document
            res.status(200).send({ success: true, message: 'Movie added to favorites' });
        } else {
            // If the movie is already in the user's favorites, send a message indicating so
            res.status(200).send({ success: true, message: 'Movie already in favorites' });
        }
    } catch (error) {
        // Send a 500 response if an error occurs
        res.status(500).send({ success: false, message: 'Error adding movie to favorites', error: error.message });
    }
};

// Get the user's list of favorite movies
const getFavorites = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available on the request object

    try {
        // Find the user by their ID and exclude the password field from the returned document
        const user = await User.findById(userId).select('-password');

        // If the user is not found, send a 404 response
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const favorites = user.favorites || []; // Get the user's favorites or an empty array if undefined
        res.status(200).send({ success: true, favorites }); // Send the user's favorites in the response
    } catch (error) {
        // Send a 500 response if an error occurs
        res.status(500).send({ success: false, message: 'Error fetching favorites', error: error.message });
    }
};

// Remove a movie from the user's list of favorite movies
const removeFavorites = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available on the request object
    const { movieId } = req.body; // Extract movieId from the request body

    try {
        // Find the user by their ID
        const user = await User.findById(userId);

        // If the user is not found, send a 404 response
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const movieIdStr = String(movieId); // Ensure movieId is a string

        // Filter out the movieId from the user's favorites
        user.favorites = user.favorites.filter(fav => fav !== movieIdStr);

        // Save the updated user document
        await user.save();
        res.status(200).send({ success: true, message: 'Movie removed from favorites' });
    } catch (error) {
        // Send a 500 response if an error occurs
        res.status(500).send({ success: false, message: 'Error while removing movie from favorites', error: error.message });
    }
};

// Export the functions for use in other parts of the application
module.exports = { addFavorites, getFavorites, removeFavorites };

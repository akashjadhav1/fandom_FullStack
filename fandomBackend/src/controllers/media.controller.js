const TrendingData = require("../models/moviesData.model"); // Import the TrendingData model

// Add a new trending movie or TV show
const AddTrendingMoviesAndTv = async (req, res) => {
    try {
        // Extract movie/TV show details from the request body
        const {
            adult,
            backdrop_path,
            genre_ids,
            id,
            original_language,
            original_title,
            media_type,
            overview,
            popularity,
            poster_path,
            release_date,
            title,
            video,
            vote_average,
            vote_count,
        } = req.body;

        // Create the movie or TV show entry object
        const movieData = {
            adult,
            backdrop_path,
            genre_ids,
            id,
            original_language,
            original_title,
            media_type, 
            overview,
            popularity,
            poster_path,
            release_date,
            title,
            video,
            vote_average,
            vote_count,
        };

        // Save the new entry to the database
        const newEntry = await TrendingData.create(movieData);

        // Send a success response with the newly added entry
        return res.status(201).send({ message: "Movie or TV show added successfully", data: newEntry });
    } catch (error) {
        // Send an error response if adding the entry fails
        return res.status(500).send({ message: "Error adding movies and TV shows", error: error.message });
    }
};

// Delete a trending movie or TV show by ID.
const deleteData = async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const { id } = req.params;

        // Find the entry by ID and delete it
        const data = await TrendingData.findByIdAndDelete(id);

        // If the entry is not found, send a not found response
        if (!data) {
            return res.status(404).send({ message: "Data not found" });
        }

        // Send a success response if the entry is deleted successfully
        return res.status(200).send({ message: "Data deleted successfully" });
    } catch (error) {
        // Send an error response if deletion fails
        return res.status(404).send({ message: "Error while deleting data", error: error.message });
    }
};

// Retrieve all trending movies and TV shows
const getTrendingData = async (req, res) => {
    try {
        // Get page and limit query parameters from the request (defaults: page 1, limit 10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Find all entries with pagination
        const allEntries = await TrendingData.find().skip(skip).limit(limit);

        // Get total count of entries
        const totalEntries = await TrendingData.countDocuments();

        // Send a success response with paginated data
        return res.status(200).send({ data: allEntries, totalEntries, page, limit });
    } catch (error) {
        return res.status(500).send({ message: "Error retrieving movies and TV shows", error: error.message });
    }
};


// Export the functions for use in other parts of the application
module.exports = { AddTrendingMoviesAndTv, deleteData, getTrendingData };

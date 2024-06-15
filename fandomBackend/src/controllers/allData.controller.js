const AllData = require("../models/allData.model");

// Function to add all media data
const addAllMediaData = async (req, res) => {
  try {
    const {
      adult,
      backdrop_path,
      genre_ids,
      id,
      poster_path,
      original_title,
      overview,
      media_type,
      original_language,
      title,
      popularity,
      release_date,
      vote_average,
      vote_count,
      origin_country,
      video,
    } = req.body;

    // Create the movie or TV show entry
    const allMovieAndTvData = {
      adult,
      backdrop_path,
      genre_ids,
      id,
      poster_path,
      original_title,
      overview,
      media_type,
      original_language,
      title,
      popularity,
      release_date,
      vote_average,
      vote_count,
      origin_country,
      video,
    };

    const newEntry = await AllData.create(allMovieAndTvData);
    return res
      .status(201)
      .send({ message: "Movie or TV show added successfully", data: newEntry });
  } catch (error) {
    return res
      .status(500)
      .send({
        message: "Error adding movies and TV shows",
        error: error.message,
      });
  }
};

// Function to get all media data
const getAllMediaData = async (req, res) => {
  try {
    const allEntries = await AllData.find();
    return res.status(200).send({ data: allEntries });
  } catch (error) {
    return res.status(500).send({
      message: "Error retrieving movies and TV shows",
      error: error.message,
    });
  }
};

// Function to delete media data by ID
const deleteMediaById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEntry = await AllData.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Media data not found" });
    }
    return res.status(200).json({ message: "Media data deleted successfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Error deleting media data",
      error: error.message,
    });
  }
};

// Function to update media data by ID
const updateMediaById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEntry = await AllData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEntry) {
      return res.status(404).json({ message: "Media data not found" });
    }
    return res.status(200).json({
      message: "Media data updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error updating media data",
      error: error.message,
    });
  }
};

module.exports = { addAllMediaData, getAllMediaData, deleteMediaById, updateMediaById };

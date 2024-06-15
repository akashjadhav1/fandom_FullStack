const express = require('express');
const {
  AddTrendingMoviesAndTv,
  deleteData,
  getTrendingData
} = require('../controllers/media.controller');

const mediaRouter = express.Router();

/**
 * @swagger
 * /trending/data:
 *   post:
 *     summary: Add trending movies and TV shows
 *     tags: [Trending]
 *     responses:
 *       201:
 *         description: Successfully added trending data
 *       500:
 *         description: Server error
 */
mediaRouter.post('/data', AddTrendingMoviesAndTv);

/**
 * @swagger
 * /trending/{id}:
 *   delete:
 *     summary: Delete data by ID
 *     tags: [Trending]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Data ID
 *     responses:
 *       200:
 *         description: Successfully deleted data
 *       404:
 *         description: Data not found
 *       500:
 *         description: Server error
 */
mediaRouter.delete('/:id', deleteData);

/**
 * @swagger
 * /trending/data:
 *   get:
 *     summary: Get trending data
 *     tags: [Trending]
 *     responses:
 *       200:
 *         description: Successfully retrieved trending data
 *       500:
 *         description: Server error
 */
mediaRouter.get('/data', getTrendingData);

module.exports = mediaRouter;

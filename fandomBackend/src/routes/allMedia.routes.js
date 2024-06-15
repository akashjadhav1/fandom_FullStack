const express = require('express');
const {
  addAllMediaData,
  getAllMediaData,
  deleteMediaById,
  updateMediaById
} = require('../controllers/allData.controller');

const allDataRouter = express.Router();

/**
 * @swagger
 * /all/data:
 *   post:
 *     summary: Add all media data
 *     tags: [AllMedia]
 *     responses:
 *       201:
 *         description: Successfully added all media data
 *       500:
 *         description: Server error
 */
allDataRouter.post('/data', addAllMediaData);

/**
 * @swagger
 * /all/data:
 *   get:
 *     summary: Get all media data
 *     tags: [AllMedia]
 *     responses:
 *       200:
 *         description: Successfully retrieved all media data
 *       500:
 *         description: Server error
 */
allDataRouter.get('/data', getAllMediaData);

/**
 * @swagger
 * /all/data/{id}:
 *   delete:
 *     summary: Delete media data by ID
 *     tags: [AllMedia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Media data ID
 *     responses:
 *       200:
 *         description: Successfully deleted media data
 *       404:
 *         description: Media data not found
 *       500:
 *         description: Server error
 */
allDataRouter.delete('/data/:id', deleteMediaById);

/**
 * @swagger
 * /all/data/{id}:
 *   put:
 *     summary: Update media data by ID
 *     tags: [AllMedia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Media data ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated media data
 *       404:
 *         description: Media data not found
 *       500:
 *         description: Server error
 */
allDataRouter.put('/data/:id', updateMediaById);

module.exports = allDataRouter;

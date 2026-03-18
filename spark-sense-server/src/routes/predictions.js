const express = require('express');
const router = express.Router();
const { getPredictionData } = require('../controllers/predictionsController');

// GET /api/predictions
router.get('/', getPredictionData);

module.exports = router;

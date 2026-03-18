const { getPredictions } = require('../services/predictionService');

/**
 * GET /api/predictions
 *
 * Returns prediction data. Currently sourced from static JSON via predictionService.
 * To integrate ML API: update ONLY predictionService.js — this controller stays unchanged.
 */
const getPredictionData = async (req, res, next) => {
    try {
        const data = await getPredictions();
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

module.exports = { getPredictionData };

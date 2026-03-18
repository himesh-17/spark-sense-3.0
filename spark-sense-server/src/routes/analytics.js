const express = require('express');
const router = express.Router();
const { getLive, getHourly, getDaily } = require('../controllers/analyticsController');

// GET /api/analytics/live
router.get('/live', getLive);
// GET /api/analytics/hourly?deviceId&from&to
router.get('/hourly', getHourly);
// GET /api/analytics/daily?deviceId&from&to
router.get('/daily', getDaily);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createReading } = require('../controllers/readingsController');
const { readingValidationRules } = require('../middleware/validators');
const validate = require('../middleware/validate');

// POST /api/readings  — ingest ESP32 sensor payload
router.post('/', readingValidationRules, validate, createReading);

module.exports = router;

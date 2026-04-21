const { body } = require('express-validator');

/**
 * Validation rules for POST /api/readings
 * All sensor fields are optional so the ESP32 can send any
 * subset of fields without being rejected. The controller
 * handles defaults for missing values.
 */
const readingValidationRules = [
    body('deviceId').optional().isString().trim(),
    body('voltage').optional().isFloat().withMessage('Voltage must be a number'),
    body('current').optional().isFloat().withMessage('Current must be a number'),
    body('power').optional().isFloat().withMessage('Power must be a number'),
    // Accept both 'energy' (ESP32 working code) and 'energy_kwh'
    body('energy').optional().isFloat().withMessage('Energy must be a number'),
    body('energy_kwh').optional().isFloat().withMessage('Energy (kWh) must be a number'),
    body('powerFactor').optional().isFloat().withMessage('Power factor must be a number'),
];

module.exports = { readingValidationRules };

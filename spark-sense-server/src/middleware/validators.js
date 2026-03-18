const { body } = require('express-validator');

const readingValidationRules = [
    body('voltage').isFloat({ min: 0, max: 500 }).withMessage('Voltage must be 0–500V'),
    body('current').isFloat({ min: 0, max: 100 }).withMessage('Current must be 0–100A'),
    body('power').isFloat({ min: 0 }).withMessage('Power must be non-negative'),
    body('energy_kwh').isFloat({ min: 0 }).withMessage('Energy must be non-negative'),
    body('deviceId').optional().isString().trim(),
];

module.exports = { readingValidationRules };

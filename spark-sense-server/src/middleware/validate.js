const { validationResult } = require('express-validator');

/**
 * validate - Runs express-validator chain results and returns 400 on failure.
 * Usage: route.post('/', [...validationRules], validate, controller)
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array(),
        });
    }
    next();
};

module.exports = validate;

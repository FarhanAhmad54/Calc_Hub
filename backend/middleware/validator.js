/**
 * CalcHub Backend - Input Validator Middleware
 * Validates and sanitizes all incoming requests
 */

const { body, query, validationResult } = require('express-validator');
const config = require('../config/security');
const logger = require('../utils/logger');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation failed', {
            errors: errors.array(),
            ip: req.ip,
            path: req.path
        });
        return res.status(400).json({
            success: false,
            error: 'Invalid input data',
            details: errors.array().map(e => ({
                field: e.path,
                message: e.msg
            }))
        });
    }
    next();
};

// Sanitize string inputs
const sanitizeString = (value) => {
    if (typeof value !== 'string') return value;
    return value
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .substring(0, config.validation.maxInputLength);
};

// Calculator input validation rules
const calculateValidation = [
    body('calculatorId')
        .isString()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Calculator ID is required and must be valid'),
    body('inputs')
        .isObject()
        .withMessage('Inputs must be an object'),
    body('inputs.*')
        .optional()
        .customSanitizer(sanitizeString),
    handleValidationErrors
];

// Analytics tracking validation
const analyticsValidation = [
    body('event')
        .isString()
        .trim()
        .isIn(['calculator_open', 'calculator_use', 'category_view', 'search'])
        .withMessage('Invalid event type'),
    body('calculatorId')
        .optional()
        .isString()
        .trim()
        .isLength({ max: 100 }),
    body('category')
        .optional()
        .isString()
        .trim()
        .isLength({ max: 50 }),
    body('timestamp')
        .optional()
        .isISO8601()
        .withMessage('Invalid timestamp format'),
    handleValidationErrors
];

// Generic request sanitizer middleware
const sanitizeRequest = (req, res, next) => {
    // Sanitize query parameters
    if (req.query) {
        Object.keys(req.query).forEach(key => {
            if (typeof req.query[key] === 'string') {
                req.query[key] = sanitizeString(req.query[key]);
            }
        });
    }

    // Sanitize body
    if (req.body && typeof req.body === 'object') {
        const sanitizeObject = (obj) => {
            Object.keys(obj).forEach(key => {
                if (typeof obj[key] === 'string') {
                    obj[key] = sanitizeString(obj[key]);
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    sanitizeObject(obj[key]);
                }
            });
        };
        sanitizeObject(req.body);
    }

    next();
};

// Block suspicious requests
const blockSuspiciousRequests = (req, res, next) => {
    const suspiciousPatterns = [
        /(<script|javascript:|on\w+=)/i,
        /(union\s+select|insert\s+into|drop\s+table)/i,
        /(\.\.\/|\.\.\\)/,
        /(\$\{|<%|%>)/
    ];

    const checkValue = (value) => {
        if (typeof value !== 'string') return false;
        return suspiciousPatterns.some(pattern => pattern.test(value));
    };

    const checkObject = (obj) => {
        if (!obj || typeof obj !== 'object') return false;
        return Object.values(obj).some(value => {
            if (typeof value === 'string') return checkValue(value);
            if (typeof value === 'object') return checkObject(value);
            return false;
        });
    };

    if (checkObject(req.body) || checkObject(req.query)) {
        logger.warn('Suspicious request blocked', {
            ip: req.ip,
            path: req.path,
            body: JSON.stringify(req.body).substring(0, 200)
        });
        return res.status(400).json({
            success: false,
            error: 'Invalid request'
        });
    }

    next();
};

module.exports = {
    calculateValidation,
    analyticsValidation,
    sanitizeRequest,
    blockSuspiciousRequests,
    handleValidationErrors
};

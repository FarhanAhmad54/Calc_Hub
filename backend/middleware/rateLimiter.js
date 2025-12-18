/**
 * CalcHub Backend - Rate Limiter Middleware
 * Prevents API abuse with configurable limits
 */

const rateLimit = require('express-rate-limit');
const config = require('../config/security');
const logger = require('../utils/logger');

// General API rate limiter
const apiLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: config.rateLimit.message,
    standardHeaders: config.rateLimit.standardHeaders,
    legacyHeaders: config.rateLimit.legacyHeaders,
    handler: (req, res) => {
        logger.warn('Rate limit exceeded', { ip: req.ip, path: req.path });
        res.status(429).json(config.rateLimit.message);
    },
    keyGenerator: (req) => {
        // Use IP + User-Agent for better fingerprinting
        return `${req.ip}-${req.get('User-Agent')?.substring(0, 50) || 'unknown'}`;
    }
});

// Stricter limiter for sensitive endpoints
const strictLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 requests per minute
    message: {
        success: false,
        error: 'Too many requests to this endpoint. Please wait.',
    },
    handler: (req, res) => {
        logger.warn('Strict rate limit exceeded', { ip: req.ip, path: req.path });
        res.status(429).json({
            success: false,
            error: 'Too many requests to this endpoint. Please wait.',
        });
    }
});

// Analytics endpoint limiter (more lenient)
const analyticsLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // 60 requests per minute (1 per second)
    message: {
        success: false,
        error: 'Analytics rate limit exceeded',
    }
});

module.exports = {
    apiLimiter,
    strictLimiter,
    analyticsLimiter
};

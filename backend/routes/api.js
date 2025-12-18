/**
 * CalcHub Backend - API Routes
 * Main API endpoints for calculator functionality
 */

const express = require('express');
const router = express.Router();
const { analyticsValidation, calculateValidation } = require('../middleware/validator');
const { analyticsLimiter, strictLimiter } = require('../middleware/rateLimiter');
const logger = require('../utils/logger');

// In-memory analytics storage (use database in production)
const analytics = {
    calculatorUsage: {},
    categoryViews: {},
    searches: [],
    totalRequests: 0
};

// Popular calculators (updated based on usage)
const popularCalculators = [
    { id: 'percentage', name: 'Percentage Calculator', icon: '📊', uses: 15000 },
    { id: 'bmi', name: 'BMI Calculator', icon: '⚖️', uses: 12000 },
    { id: 'loan-emi', name: 'Loan EMI Calculator', icon: '🏦', uses: 10000 },
    { id: 'age', name: 'Age Calculator', icon: '🎂', uses: 9500 },
    { id: 'gpa', name: 'GPA Calculator', icon: '📚', uses: 8000 },
    { id: 'tip', name: 'Tip Calculator', icon: '💵', uses: 7500 },
    { id: 'compound-interest', name: 'Compound Interest', icon: '📈', uses: 7000 },
    { id: 'calories', name: 'Calorie Calculator', icon: '🍎', uses: 6500 },
    { id: 'discount', name: 'Discount Calculator', icon: '🏷️', uses: 6000 },
    { id: 'temperature', name: 'Temperature Converter', icon: '🌡️', uses: 5500 }
];

/**
 * GET /api/popular
 * Get list of popular calculators
 */
router.get('/popular', (req, res) => {
    res.json({
        success: true,
        data: popularCalculators.map(calc => ({
            ...calc,
            uses: undefined // Don't expose exact numbers
        })),
        timestamp: new Date().toISOString()
    });
});

/**
 * GET /api/stats
 * Get public statistics
 */
router.get('/stats', (req, res) => {
    res.json({
        success: true,
        data: {
            totalCalculators: 840,
            totalCategories: 28,
            popularCount: popularCalculators.length
        },
        timestamp: new Date().toISOString()
    });
});

/**
 * POST /api/analytics/track
 * Track calculator usage (anonymous)
 */
router.post('/analytics/track', analyticsLimiter, analyticsValidation, (req, res) => {
    const { event, calculatorId, category } = req.body;

    try {
        analytics.totalRequests++;

        switch (event) {
            case 'calculator_use':
                if (calculatorId) {
                    analytics.calculatorUsage[calculatorId] =
                        (analytics.calculatorUsage[calculatorId] || 0) + 1;
                }
                break;
            case 'category_view':
                if (category) {
                    analytics.categoryViews[category] =
                        (analytics.categoryViews[category] || 0) + 1;
                }
                break;
            case 'search':
                analytics.searches.push({
                    timestamp: new Date().toISOString(),
                    fingerprint: req.fingerprint
                });
                // Keep only last 1000 searches
                if (analytics.searches.length > 1000) {
                    analytics.searches = analytics.searches.slice(-1000);
                }
                break;
        }

        logger.debug('Analytics tracked', { event, calculatorId, category });

        res.json({
            success: true,
            message: 'Event tracked'
        });
    } catch (error) {
        logger.error('Analytics tracking failed', { error: error.message });
        res.status(500).json({
            success: false,
            error: 'Failed to track event'
        });
    }
});

/**
 * POST /api/calculate
 * Server-side calculation (optional feature)
 */
router.post('/calculate', strictLimiter, calculateValidation, (req, res) => {
    const { calculatorId, inputs } = req.body;

    try {
        // For now, return a message that calculations are client-side
        // This endpoint is for future server-side calculation needs
        res.json({
            success: true,
            message: 'Calculations are performed client-side for optimal performance',
            calculatorId,
            suggestion: 'Use the frontend calculator for instant results'
        });
    } catch (error) {
        logger.error('Calculation error', { error: error.message, calculatorId });
        res.status(500).json({
            success: false,
            error: 'Calculation failed'
        });
    }
});

/**
 * GET /api/info
 * Get API information
 */
router.get('/info', (req, res) => {
    res.json({
        success: true,
        api: {
            name: 'CalcHub API',
            version: '1.0.0',
            description: 'Secure backend for CalcHub Calculator Website',
            endpoints: [
                { method: 'GET', path: '/api/health', description: 'Health check' },
                { method: 'GET', path: '/api/popular', description: 'Get popular calculators' },
                { method: 'GET', path: '/api/stats', description: 'Get public statistics' },
                { method: 'POST', path: '/api/analytics/track', description: 'Track usage (anonymous)' },
                { method: 'GET', path: '/api/info', description: 'API information' }
            ]
        },
        timestamp: new Date().toISOString()
    });
});

// 404 handler for API routes
router.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.originalUrl
    });
});

module.exports = router;

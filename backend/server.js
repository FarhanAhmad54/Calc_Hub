/**
 * CalcHub Backend - Main Server
 * Secure Express server with comprehensive security measures
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Configuration
const config = require('./config/security');
const logger = require('./utils/logger');

// Middleware
const { helmetConfig, additionalSecurityHeaders, requestFingerprint, blockAttackPaths } = require('./middleware/security');
const { apiLimiter } = require('./middleware/rateLimiter');
const { sanitizeRequest, blockSuspiciousRequests } = require('./middleware/validator');

// Routes
const healthRoutes = require('./routes/health');
const apiRoutes = require('./routes/api');

// Initialize Express app
const app = express();

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// ============================================
// SECURITY MIDDLEWARE (Order matters!)
// ============================================

// 1. Helmet security headers
app.use(helmetConfig);
app.use(additionalSecurityHeaders);

// 2. Block common attack paths
app.use(blockAttackPaths);

// 3. CORS configuration
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);

        // Check if origin is allowed
        const allowedOrigins = config.cors.allowedOrigins;
        if (allowedOrigins.length === 0 || allowedOrigins.includes(origin) || origin.startsWith('file://')) {
            callback(null, true);
        } else {
            logger.warn('CORS blocked', { origin });
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: config.cors.methods,
    allowedHeaders: config.cors.allowedHeaders,
    credentials: config.cors.credentials,
    maxAge: config.cors.maxAge
}));

// 4. Request parsing with size limits
app.use(express.json({
    limit: '10kb',
    strict: true
}));
app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}));

// 5. Request fingerprinting
app.use(requestFingerprint);

// 6. Input sanitization
app.use(sanitizeRequest);
app.use(blockSuspiciousRequests);

// 7. HTTP request logging
app.use(morgan(config.logging.format, {
    skip: (req) => req.path === '/api/health' // Skip health check logs
}));

// 8. Global rate limiting
app.use(apiLimiter);

// ============================================
// ROUTES
// ============================================

// Health check routes (no rate limiting for monitoring)
app.use('/api/health', healthRoutes);

// Main API routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'CalcHub API Server',
        version: '1.0.0',
        documentation: '/api/info',
        health: '/api/health'
    });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not found',
        path: req.originalUrl
    });
});

// Global error handler
app.use((err, req, res, next) => {
    logger.error('Unhandled error', {
        error: err.message,
        stack: config.server.env === 'development' ? err.stack : undefined,
        path: req.path
    });

    // Don't leak error details in production
    const message = config.server.env === 'production'
        ? 'Internal server error'
        : err.message;

    res.status(err.status || 500).json({
        success: false,
        error: message
    });
});

// ============================================
// SERVER STARTUP
// ============================================

const PORT = config.server.port;

const server = app.listen(PORT, () => {
    logger.info(`🚀 CalcHub Backend Server started`, {
        port: PORT,
        environment: config.server.env,
        nodeVersion: process.version
    });

    console.log(`
╔══════════════════════════════════════════════════╗
║                                                  ║
║   🧮 CalcHub Backend Server                      ║
║                                                  ║
║   ✅ Server running on port ${PORT}               ║
║   ✅ Environment: ${config.server.env.padEnd(20)}║
║   ✅ Rate limiting: ${config.rateLimit.maxRequests} req/${config.rateLimit.windowMs / 60000}min        ║
║   ✅ CORS: Configured                            ║
║   ✅ Security headers: Enabled                   ║
║                                                  ║
║   📍 API: http://localhost:${PORT}/api            ║
║   💚 Health: http://localhost:${PORT}/api/health  ║
║                                                  ║
╚══════════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    logger.info('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', { error: err.message, stack: err.stack });
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection', { reason });
});

module.exports = app;

/**
 * CalcHub Backend - Security Configuration
 * Centralized security settings and configurations
 */

require('dotenv').config();

module.exports = {
    // Server settings
    server: {
        port: process.env.PORT || 3001,
        env: process.env.NODE_ENV || 'development'
    },

    // CORS Configuration
    cors: {
        allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean),
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-API-Key'],
        credentials: true,
        maxAge: 86400 // 24 hours
    },

    // Rate Limiting Configuration
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
        message: {
            success: false,
            error: 'Too many requests. Please try again later.',
            retryAfter: 'Check Retry-After header for wait time'
        },
        standardHeaders: true,
        legacyHeaders: false
    },

    // Helmet Security Headers Configuration
    helmet: {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'", "http://localhost:*"],
                frameSrc: ["'none'"],
                objectSrc: ["'none'"]
            }
        },
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" }
    },

    // Input Validation Rules
    validation: {
        maxInputLength: 10000,
        maxArrayLength: 1000,
        allowedCalculatorTypes: [
            'math', 'finance', 'health', 'converter', 'science',
            'engineering', 'statistics', 'cooking', 'gaming'
        ]
    },

    // API Key (for future integrations)
    apiKey: {
        secret: process.env.API_KEY_SECRET || 'default-secret-change-me',
        headerName: 'X-API-Key'
    },

    // Logging
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
    }
};

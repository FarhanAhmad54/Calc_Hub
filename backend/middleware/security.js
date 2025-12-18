/**
 * CalcHub Backend - Security Middleware
 * Helmet configuration and additional security measures
 */

const helmet = require('helmet');
const config = require('../config/security');
const logger = require('../utils/logger');

// Configure Helmet with custom settings
const helmetConfig = helmet({
    contentSecurityPolicy: config.server.env === 'production'
        ? config.helmet.contentSecurityPolicy
        : false, // Disable CSP in development
    crossOriginEmbedderPolicy: config.helmet.crossOriginEmbedderPolicy,
    crossOriginResourcePolicy: config.helmet.crossOriginResourcePolicy,
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
    },
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true
});

// Additional security headers
const additionalSecurityHeaders = (req, res, next) => {
    // Prevent caching of sensitive data
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Additional security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');

    next();
};

// Request fingerprint middleware (for tracking without login)
const requestFingerprint = (req, res, next) => {
    const fingerprint = {
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        acceptLanguage: req.get('Accept-Language'),
        acceptEncoding: req.get('Accept-Encoding')
    };

    // Create a simple hash for tracking
    const hash = Buffer.from(JSON.stringify(fingerprint)).toString('base64').substring(0, 32);
    req.fingerprint = hash;

    next();
};

// Block common attack paths
const blockAttackPaths = (req, res, next) => {
    const blockedPaths = [
        '/wp-admin',
        '/wp-login',
        '/phpmyadmin',
        '/.env',
        '/.git',
        '/config',
        '/admin',
        '/backup',
        '/shell',
        '/cmd',
        '/.htaccess',
        '/web.config'
    ];

    const path = req.path.toLowerCase();

    if (blockedPaths.some(blocked => path.includes(blocked))) {
        logger.warn('Blocked attack path accessed', { ip: req.ip, path: req.path });
        return res.status(404).json({ error: 'Not found' });
    }

    next();
};

// API Key validation (optional, for future use)
const validateApiKey = (req, res, next) => {
    const apiKey = req.get(config.apiKey.headerName);

    // Skip validation if no API key is configured or in development
    if (config.server.env === 'development' || !config.apiKey.secret) {
        return next();
    }

    if (apiKey !== config.apiKey.secret) {
        logger.warn('Invalid API key', { ip: req.ip, path: req.path });
        return res.status(401).json({
            success: false,
            error: 'Unauthorized'
        });
    }

    next();
};

module.exports = {
    helmetConfig,
    additionalSecurityHeaders,
    requestFingerprint,
    blockAttackPaths,
    validateApiKey
};

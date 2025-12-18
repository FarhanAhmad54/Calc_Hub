/**
 * CalcHub Backend - Health Check Routes
 * Server status and health monitoring endpoints
 */

const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

// Start time for uptime calculation
const startTime = Date.now();

// Basic health check
router.get('/', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Detailed health check
router.get('/detailed', (req, res) => {
    const uptime = Date.now() - startTime;
    const memoryUsage = process.memoryUsage();

    res.json({
        success: true,
        status: 'healthy',
        server: {
            uptime: {
                ms: uptime,
                formatted: formatUptime(uptime)
            },
            memory: {
                heapUsed: formatBytes(memoryUsage.heapUsed),
                heapTotal: formatBytes(memoryUsage.heapTotal),
                rss: formatBytes(memoryUsage.rss)
            },
            nodeVersion: process.version,
            platform: process.platform
        },
        timestamp: new Date().toISOString()
    });
});

// Ready check (for load balancers)
router.get('/ready', (req, res) => {
    res.status(200).json({ ready: true });
});

// Live check (for kubernetes/docker)
router.get('/live', (req, res) => {
    res.status(200).json({ live: true });
});

// Helper functions
function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

function formatBytes(bytes) {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
}

module.exports = router;

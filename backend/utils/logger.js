/**
 * CalcHub Backend - Logger Utility
 * Simple logging utility with levels and timestamps
 */

const LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
};

class Logger {
    constructor(level = 'info') {
        this.level = LOG_LEVELS[level] || LOG_LEVELS.info;
    }

    formatMessage(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const dataStr = data ? ` | ${JSON.stringify(data)}` : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message}${dataStr}`;
    }

    error(message, data = null) {
        if (this.level >= LOG_LEVELS.error) {
            console.error(this.formatMessage('error', message, data));
        }
    }

    warn(message, data = null) {
        if (this.level >= LOG_LEVELS.warn) {
            console.warn(this.formatMessage('warn', message, data));
        }
    }

    info(message, data = null) {
        if (this.level >= LOG_LEVELS.info) {
            console.log(this.formatMessage('info', message, data));
        }
    }

    debug(message, data = null) {
        if (this.level >= LOG_LEVELS.debug) {
            console.log(this.formatMessage('debug', message, data));
        }
    }

    request(req) {
        const data = {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent')?.substring(0, 100)
        };
        this.info('Request received', data);
    }
}

module.exports = new Logger(process.env.LOG_LEVEL || 'info');

# CalcHub Backend

Secure Node.js/Express backend for CalcHub Calculator Website.

## Features

- 🔒 **Helmet.js** - Security headers (XSS, CSRF protection)
- 🌐 **CORS** - Configured origin validation
- ⏱️ **Rate Limiting** - Prevents API abuse (100 requests/15min)
- 🛡️ **Input Validation** - Sanitizes all inputs
- 🚫 **Attack Blocking** - Blocks common attack paths
- 📊 **Analytics** - Anonymous usage tracking
- 💚 **Health Checks** - Server monitoring endpoints

## Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start
```

Server runs on `http://localhost:3001`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/info` | API information |
| GET | `/api/popular` | Popular calculators |
| GET | `/api/stats` | Public statistics |
| POST | `/api/analytics/track` | Track usage |

## Security Features

- XSS Protection headers
- Content Security Policy
- Rate limiting (IP-based)
- Request size limits (10KB)
- SQL/XSS injection blocking
- Suspicious pattern detection
- Graceful shutdown handling

## Environment Variables

See `.env.example` for configuration options.

## License

MIT

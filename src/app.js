// Construction Backend API
// Main application entry point

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Import utilities and middleware
const logger = require('./utils/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { generalRateLimiter } = require('./middleware/rateLimit');

// Import routes
const contactRoute = require('./routes/contact');

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  referrerPolicy: { policy: 'same-origin' },
}));

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// General rate limiting
app.use('/api/', generalRateLimiter);

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log request
  if (process.env.NODE_ENV === 'development') {
    logger.logRequest(req);
  }
  
  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      logger.logResponse(req, res, duration);
    }
  });
  
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Construction Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Construction Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      contact: '/api/contact'
    }
  });
});

// API Routes
app.use('/api/contact', contactRoute);

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`API URL: http://localhost:${PORT}`);
  logger.info(`Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`\n🚀 Construction Backend API is ready!\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection', { error: err.message, stack: err.stack });
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', { error: err.message, stack: err.stack });
  // Close server & exit process
  process.exit(1);
});

module.exports = app;

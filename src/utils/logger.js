// Logger utility for request and error logging

const logLevels = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

/**
 * Format log message with timestamp
 */
const formatLog = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  
  if (data) {
    return `${logMessage} | Data: ${JSON.stringify(data)}`;
  }
  
  return logMessage;
};

/**
 * Log error messages
 */
const error = (message, data = null) => {
  console.error(formatLog(logLevels.ERROR, message, data));
};

/**
 * Log warning messages
 */
const warn = (message, data = null) => {
  console.warn(formatLog(logLevels.WARN, message, data));
};

/**
 * Log info messages
 */
const info = (message, data = null) => {
  console.log(formatLog(logLevels.INFO, message, data));
};

/**
 * Log debug messages (only in development)
 */
const debug = (message, data = null) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(formatLog(logLevels.DEBUG, message, data));
  }
};

/**
 * Log API requests
 */
const logRequest = (req) => {
  const logData = {
    method: req.method,
    path: req.path,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('user-agent')
  };
  
  info(`API Request: ${req.method} ${req.path}`, logData);
};

/**
 * Log API responses
 */
const logResponse = (req, res, duration) => {
  const logData = {
    method: req.method,
    path: req.path,
    status: res.statusCode,
    duration: `${duration}ms`
  };
  
  if (res.statusCode >= 400) {
    error(`API Response: ${req.method} ${req.path}`, logData);
  } else {
    info(`API Response: ${req.method} ${req.path}`, logData);
  }
};

module.exports = {
  error,
  warn,
  info,
  debug,
  logRequest,
  logResponse
};

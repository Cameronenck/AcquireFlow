import winston from 'winston';
import { config } from '../config/env';
import path from 'path';
import fs from 'fs';

// Ensure logs directory exists
const logsDir = path.dirname(config.logging.filePath);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Define which level to log based on environment
const level = () => {
  const env = config.nodeEnv || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define different log formats
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info: any) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const fileLogFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// Define transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: logFormat,
  }),
  
  // File transport for all logs
  new winston.transports.File({
    filename: config.logging.filePath,
    format: fileLogFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
  
  // Separate file for error logs
  new winston.transports.File({
    filename: path.join(logsDir, 'error.log'),
    level: 'error',
    format: fileLogFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
];

// Create the logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format: fileLogFormat,
  transports,
  exitOnError: false,
});

// Create a stream object for Morgan HTTP logging
export const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Add request logging middleware
export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.user?.id,
    };
    
    if (res.statusCode >= 400) {
      logger.warn('HTTP Request', logData);
    } else {
      logger.info('HTTP Request', logData);
    }
  });
  
  next();
};

// Add error logging middleware
export const errorLogger = (err: any, req: any, _res: any, next: any) => {
  const logData = {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userId: req.user?.id,
    body: req.body,
    query: req.query,
    params: req.params,
  };
  
  logger.error('Unhandled Error', logData);
  next(err);
};

// Add database query logging
export const dbLogger = {
  info: (message: string, meta?: any) => {
    logger.info(`[DB] ${message}`, meta);
  },
  error: (message: string, meta?: any) => {
    logger.error(`[DB] ${message}`, meta);
  },
  warn: (message: string, meta?: any) => {
    logger.warn(`[DB] ${message}`, meta);
  },
  debug: (message: string, meta?: any) => {
    logger.debug(`[DB] ${message}`, meta);
  },
};

// Add service logging
export const serviceLogger = {
  info: (service: string, message: string, meta?: any) => {
    logger.info(`[${service.toUpperCase()}] ${message}`, meta);
  },
  error: (service: string, message: string, meta?: any) => {
    logger.error(`[${service.toUpperCase()}] ${message}`, meta);
  },
  warn: (service: string, message: string, meta?: any) => {
    logger.warn(`[${service.toUpperCase()}] ${message}`, meta);
  },
  debug: (service: string, message: string, meta?: any) => {
    logger.debug(`[${service.toUpperCase()}] ${message}`, meta);
  },
};

// Add authentication logging
export const authLogger = {
  info: (action: string, meta?: any) => {
    logger.info(`[AUTH] ${action}`, meta);
  },
  error: (action: string, meta?: any) => {
    logger.error(`[AUTH] ${action}`, meta);
  },
  warn: (action: string, meta?: any) => {
    logger.warn(`[AUTH] ${action}`, meta);
  },
  debug: (action: string, meta?: any) => {
    logger.debug(`[AUTH] ${action}`, meta);
  },
};

// Add campaign logging
export const campaignLogger = {
  info: (action: string, meta?: any) => {
    logger.info(`[CAMPAIGN] ${action}`, meta);
  },
  error: (action: string, meta?: any) => {
    logger.error(`[CAMPAIGN] ${action}`, meta);
  },
  warn: (action: string, meta?: any) => {
    logger.warn(`[CAMPAIGN] ${action}`, meta);
  },
  debug: (action: string, meta?: any) => {
    logger.debug(`[CAMPAIGN] ${action}`, meta);
  },
};

// Add SMS logging
export const smsLogger = {
  info: (action: string, meta?: any) => {
    logger.info(`[SMS] ${action}`, meta);
  },
  error: (action: string, meta?: any) => {
    logger.error(`[SMS] ${action}`, meta);
  },
  warn: (action: string, meta?: any) => {
    logger.warn(`[SMS] ${action}`, meta);
  },
  debug: (action: string, meta?: any) => {
    logger.debug(`[SMS] ${action}`, meta);
  },
};

// Add email logging
export const emailLogger = {
  info: (action: string, meta?: any) => {
    logger.info(`[EMAIL] ${action}`, meta);
  },
  error: (action: string, meta?: any) => {
    logger.error(`[EMAIL] ${action}`, meta);
  },
  warn: (action: string, meta?: any) => {
    logger.warn(`[EMAIL] ${action}`, meta);
  },
  debug: (action: string, meta?: any) => {
    logger.debug(`[EMAIL] ${action}`, meta);
  },
};

// Export the main logger
export { logger };

// Export default logger for backward compatibility
export default logger;

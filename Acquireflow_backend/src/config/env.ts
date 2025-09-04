import dotenv from 'dotenv';
import Joi from 'joi';

// Load environment variables
dotenv.config();

// Environment variables schema
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  
  PORT: Joi.number()
    .default(3000),
  
  API_VERSION: Joi.string()
    .default('v1'),
  
  // Database
  MONGODB_URI: Joi.string()
    .required()
    .description('MongoDB connection string'),
  
  // JWT
  JWT_SECRET: Joi.string()
    .required()
    .min(32)
    .description('JWT secret key'),
  
  JWT_EXPIRES_IN: Joi.string()
    .default('7d'),
  
  JWT_REFRESH_EXPIRES_IN: Joi.string()
    .default('30d'),
  
  // Twilio
  TWILIO_ACCOUNT_SID: Joi.string()
    .required(),
  
  TWILIO_AUTH_TOKEN: Joi.string()
    .required(),
  
  TWILIO_PHONE_NUMBER: Joi.string()
    .required(),
  
  // SMTP Configuration
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().required(),
  SMTP_SECURE: Joi.boolean().required(),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().min(1).required(),
  SMTP_FROM_EMAIL: Joi.string().email().required(),
  SMTP_FROM_NAME: Joi.string().required(),

  // App Configuration
  FRONTEND_URL: Joi.string().uri().default('http://localhost:5173'),

  // Firebase (optional in development)
  FIREBASE_PROJECT_ID: Joi.string()
    .optional(),
  
  FIREBASE_PRIVATE_KEY_ID: Joi.string()
    .optional(),
  
  FIREBASE_PRIVATE_KEY: Joi.string()
    .optional(),
  
  FIREBASE_CLIENT_EMAIL: Joi.string()
    .email()
    .optional(),
  
  FIREBASE_CLIENT_ID: Joi.string()
    .optional(),
  
  // MLS API
  MLS_API_KEY: Joi.string()
    .optional(),
  
  MLS_API_URL: Joi.string()
    .uri()
    .optional(),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: Joi.number()
    .default(900000),
  
  RATE_LIMIT_MAX_REQUESTS: Joi.number()
    .default(100),
  
  // Logging
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug')
    .default('info'),
  
  LOG_FILE_PATH: Joi.string()
    .default('logs/app.log'),
  
  // CORS
  ALLOWED_ORIGINS: Joi.string()
    .default('http://localhost:3000'),
  
  // Security
  BCRYPT_ROUNDS: Joi.number()
    .default(12),
  
  SESSION_SECRET: Joi.string()
    .required()
    .min(32),
}).unknown();

// Validate environment variables
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

// Export validated environment variables
export const config = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  apiVersion: envVars.API_VERSION,
  
  // Database
  mongodb: {
    uri: envVars.MONGODB_URI,
  },
  
  // JWT
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
    refreshExpiresIn: envVars.JWT_REFRESH_EXPIRES_IN,
  },
  
  // Twilio
  twilio: {
    accountSid: envVars.TWILIO_ACCOUNT_SID,
    authToken: envVars.TWILIO_AUTH_TOKEN,
    phoneNumber: envVars.TWILIO_PHONE_NUMBER,
  },
  
  // SMTP Configuration (for Nodemailer)
  smtp: {
    host: envVars.SMTP_HOST,
    port: envVars.SMTP_PORT,
    secure: envVars.SMTP_SECURE,
    user: envVars.SMTP_USER,
    pass: envVars.SMTP_PASS,
    fromEmail: envVars.SMTP_FROM_EMAIL,
    fromName: envVars.SMTP_FROM_NAME,
  },

  // App Configuration
  app: {
    frontendUrl: envVars.FRONTEND_URL,
  },
  
  // Firebase
  firebase: {
    projectId: envVars.FIREBASE_PROJECT_ID,
    privateKeyId: envVars.FIREBASE_PRIVATE_KEY_ID,
    privateKey: envVars.FIREBASE_PRIVATE_KEY,
    clientEmail: envVars.FIREBASE_CLIENT_EMAIL,
    clientId: envVars.FIREBASE_CLIENT_ID,
  },
  
  // MLS API
  mls: {
    apiKey: envVars.MLS_API_KEY,
    apiUrl: envVars.MLS_API_URL,
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: envVars.RATE_LIMIT_WINDOW_MS,
    maxRequests: envVars.RATE_LIMIT_MAX_REQUESTS,
  },
  
  // Logging
  logging: {
    level: envVars.LOG_LEVEL,
    filePath: envVars.LOG_FILE_PATH,
  },
  
  // CORS
  cors: {
    allowedOrigins: envVars.ALLOWED_ORIGINS.split(',').map((origin: string) => origin.trim()),
  },
  
  // Security
  security: {
    bcryptRounds: envVars.BCRYPT_ROUNDS,
    sessionSecret: envVars.SESSION_SECRET,
  },
} as const;

export default config;

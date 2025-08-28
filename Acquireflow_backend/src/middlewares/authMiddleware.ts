import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { logger } from '../utils/logger';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    [key: string]: any;
  };
}

/**
 * Authentication middleware
 * Verifies JWT token and adds user information to request
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: 'Access token required',
      });
      return;
    }

    // Check if header starts with 'Bearer '
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Invalid token format. Use Bearer <token>',
      });
      return;
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access token required',
      });
      return;
    }

    // Verify token
    const user = await AuthService.verifyToken(token);

          // Add user to request
      req.user = {
        id: ((user as any)._id || '').toString(),
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
      };

    next();
      } catch (error) {
      logger.error('Authentication failed', { 
        error: (error as any).message,
        path: req.path,
        ip: req.ip 
      });

    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

/**
 * Role-based access control middleware
 * Checks if user has required role(s)
 */
export const requireRole = (roles: string | string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      const userRole = req.user.role;
      const requiredRoles = Array.isArray(roles) ? roles : [roles];

      if (!requiredRoles.includes(userRole)) {
        logger.warn('Access denied - insufficient role', {
          userId: req.user.id,
          userRole,
          requiredRoles,
          path: req.path,
        });

        res.status(403).json({
          success: false,
          message: 'Insufficient permissions',
        });
        return;
      }

      next();
    } catch (error) {
      logger.error('Role verification failed', { error: (error as any).message });
      
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
};

/**
 * Admin role middleware
 * Checks if user has admin role
 */
export const requireAdmin = requireRole('admin');

/**
 * Agent or higher role middleware
 * Checks if user has agent role or higher
 */
export const requireAgentOrHigher = requireRole(['admin', 'manager', 'agent']);

/**
 * Manager or higher role middleware
 * Checks if user has manager role or higher
 */
export const requireManagerOrHigher = requireRole(['admin', 'manager']);

/**
 * Optional authentication middleware
 * Adds user information if token is provided, but doesn't require it
 */
export const optionalAuth = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue without authentication
      next();
      return;
    }

    const token = authHeader.substring(7);

    if (!token) {
      // No token provided, continue without authentication
      next();
      return;
    }

    // Try to verify token
    try {
      const user = await AuthService.verifyToken(token);
      
      req.user = {
        id: ((user as any)._id || '').toString(),
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
      };
    } catch (error) {
      // Token is invalid, but we don't want to fail the request
      logger.warn('Optional authentication failed', { error: (error as any).message });
    }

    next();
      } catch (error) {
      logger.error('Optional authentication middleware error', { error: (error as any).message });
      next();
    }
};

/**
 * Rate limiting middleware for authentication endpoints
 * Prevents brute force attacks
 */
export const authRateLimit = (req: Request, res: Response, next: NextFunction): void => {
  // This is a simplified rate limiting implementation
  // In production, you should use a proper rate limiting library like express-rate-limit
  
  const clientIP = req.ip;
  const endpoint = req.path;
  
  // Store rate limit data in memory (in production, use Redis or similar)
  if (!(global as any).authRateLimit) {
    (global as any).authRateLimit = new Map();
  }
  
  const rateLimitKey = `${clientIP}:${endpoint}`;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;
  
  const attempts = (global as any).authRateLimit.get(rateLimitKey) || [];
  
  // Remove old attempts outside the window
  const recentAttempts = attempts.filter((timestamp: number) => now - timestamp < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    logger.warn('Rate limit exceeded for authentication endpoint', {
      ip: clientIP,
      endpoint,
      attempts: recentAttempts.length,
    });
    
    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts. Please try again later.',
    });
    return;
  }
  
  // Add current attempt
  recentAttempts.push(now);
  (global as any).authRateLimit.set(rateLimitKey, recentAttempts);
  
  next();
};

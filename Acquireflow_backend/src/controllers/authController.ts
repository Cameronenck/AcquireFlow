import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { CreateUserDto, UserLoginDto } from '../types/user';
import { logger } from '../utils/logger';
import { EmailService } from '../services/emailService';
import { TwoFactorAuthService } from '../services/twoFactorAuthService';

export class AuthController {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;

      // Validate required fields
      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: email, password, firstName, lastName',
        });
        return;
      }

      // Validate card details if provided
      if (userData.cardDetails) {
        const { cardDetails } = userData;
        if (!cardDetails.cardNumber || !cardDetails.nameOnCard || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.billingZipCode) {
          res.status(400).json({
            success: false,
            message: 'Missing required card details: cardNumber, nameOnCard, expiryDate, cvv, billingZipCode',
          });
          return;
        }

        // Basic card validation
        if (cardDetails.cardNumber.length < 13 || cardDetails.cardNumber.length > 19) {
          res.status(400).json({
            success: false,
            message: 'Invalid card number length',
          });
          return;
        }

        if (cardDetails.cvv.length < 3 || cardDetails.cvv.length > 4) {
          res.status(400).json({
            success: false,
            message: 'Invalid CVV length',
          });
          return;
        }

        if (cardDetails.billingZipCode.length < 3) {
          res.status(400).json({
            success: false,
            message: 'Invalid billing ZIP code',
          });
          return;
        }
      }

      // Register user
      const authResponse = await AuthService.register(userData);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: authResponse,
      });
    } catch (error) {
      logger.error('Registration failed', { error: (error as any).message, body: req.body });
      
      if ((error as any).message.includes('already exists')) {
        res.status(409).json({
          success: false,
          message: 'User with this email already exists',
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Register with Firebase (Admin SDK)
   * POST /api/auth/register/firebase
   */
  static async registerWithFirebase(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password || !firstName || !lastName) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: email, password, firstName, lastName',
        });
        return;
      }

      const authResponse = await AuthService.registerWithFirebase({ email, password, firstName, lastName });

      res.status(201).json({
        success: true,
        message: 'User registered successfully via Firebase',
        data: authResponse,
      });
    } catch (error) {
      logger.error('Firebase registration failed', { error: (error as any).message, body: req.body });
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  /**
   * Login user with email and password
   * POST /api/auth/login
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: UserLoginDto = req.body;

      // Validate required fields
      if (!loginData.email || !loginData.password) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: email, password',
        });
        return;
      }

      // Get user agent and IP address for login activity tracking
      const userAgent = req.get('User-Agent') || 'Unknown';
      const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'Unknown';

      // Login user
      const authResponse = await AuthService.login(loginData, userAgent, ipAddress);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: authResponse,
      });
    } catch (error) {
      logger.error('Login failed', { error: (error as any).message, email: req.body.email });
      
      if ((error as any).message.includes('Invalid email or password') || (error as any).message.includes('Account is deactivated')) {
        res.status(401).json({
          success: false,
          message: (error as any).message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Login with Firebase ID token
   * POST /api/auth/login/firebase
   */
  static async loginWithFirebase(req: Request, res: Response): Promise<void> {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        res.status(400).json({
          success: false,
          message: 'Missing required field: idToken',
        });
        return;
      }

      // Login with Firebase
      const authResponse = await AuthService.loginWithFirebase(idToken);

      res.status(200).json({
        success: true,
        message: 'Firebase login successful',
        data: authResponse,
      });
    } catch (error) {
      logger.error('Firebase login failed', { error: (error as any).message });
      
      if ((error as any).message.includes('Invalid token') || (error as any).message.includes('Account is deactivated')) {
        res.status(401).json({
          success: false,
          message: (error as any).message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Get recent login activity for authenticated user
   * GET /api/auth/login-activity
   */
  static async getLoginActivity(req: Request, res: Response): Promise<void> {
    try {
      // Get user ID from authenticated request (assuming middleware sets req.user)
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      // Get limit from query params (default to 10)
      const limit = parseInt(req.query['limit'] as string) || 10;

      // Get login activity
      const activities = await AuthService.getRecentLoginActivity(userId, limit);

      res.status(200).json({
        success: true,
        message: 'Login activity retrieved successfully',
        data: activities,
      });
    } catch (error) {
      logger.error('Failed to get login activity', { error: (error as any).message, userId: (req as any).user?.userId });
      
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Refresh access token
   * POST /api/auth/refresh
   */
  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          message: 'Missing required field: refreshToken',
        });
        return;
      }

      // Refresh token
      const tokenResponse = await AuthService.refreshToken(refreshToken);

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: tokenResponse,
      });
    } catch (error) {
      logger.error('Token refresh failed', { error: (error as any).message });
      
      res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }
  }

  /**
   * Logout user
   * POST /api/auth/logout
   */
  static async logout(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      // Logout user
      await AuthService.logout(userId);

      res.status(200).json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      logger.error('Logout failed', { error: (error as any).message, userId: (req as any).user?.id });
      
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Change user password
   * POST /api/auth/change-password
   */
  static async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const { currentPassword, newPassword } = req.body;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      if (!currentPassword || !newPassword) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: currentPassword, newPassword',
        });
        return;
      }

      if (newPassword.length < 8) {
        res.status(400).json({
          success: false,
          message: 'New password must be at least 8 characters long',
        });
        return;
      }

      // Change password
      await AuthService.changePassword(userId, currentPassword, newPassword);

      res.status(200).json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      logger.error('Password change failed', { error: (error as any).message, userId: (req as any).user?.id });
      
      if ((error as any).message.includes('Current password is incorrect')) {
        res.status(400).json({
          success: false,
          message: (error as any).message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Request password reset
   * POST /api/auth/forgot-password
   */
  static async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({
          success: false,
          message: 'Missing required field: email',
        });
        return;
      }

      // Request password reset
      await AuthService.requestPasswordReset(email);

      res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent',
      });
    } catch (error) {
      logger.error('Password reset request failed', { error: (error as any).message, email: req.body.email });
      
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Test email connection
   * GET /api/auth/test-email
   */
  static async testEmailConnection(req: Request, res: Response): Promise<void> {
    try {
      const isConnected = await EmailService.testConnection();
      
      if (isConnected) {
        res.status(200).json({
          success: true,
          message: 'SMTP connection successful',
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'SMTP connection failed',
        });
      }
    } catch (error) {
      logger.error('Email connection test failed', { error: (error as any).message });
      
      res.status(500).json({
        success: false,
        message: 'SMTP connection test failed',
      });
    }
  }

  /**
   * Verify reset token
   * POST /api/auth/verify-reset-token
   */
  static async verifyResetToken(req: Request, res: Response): Promise<void> {
    try {
      const { resetToken } = req.body;

      if (!resetToken) {
        res.status(400).json({
          success: false,
          message: 'Missing required field: resetToken',
        });
        return;
      }

      // Verify reset token and get user info
      const userInfo = await AuthService.verifyResetToken(resetToken);

      res.status(200).json({
        success: true,
        message: 'Reset token is valid',
        data: {
          email: userInfo.email,
          userName: userInfo.userName,
        },
      });
    } catch (error) {
      logger.error('Reset token verification failed', { error: (error as any).message });
      
      res.status(400).json({
        success: false,
        message: (error as any).message,
      });
    }
  }

  /**
   * Reset password with token
   * POST /api/auth/reset-password
   */
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { resetToken, newPassword } = req.body;

      if (!resetToken || !newPassword) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: resetToken, newPassword',
        });
        return;
      }

      if (newPassword.length < 8) {
        res.status(400).json({
          success: false,
          message: 'New password must be at least 8 characters long',
        });
        return;
      }

      // Reset password
      await AuthService.resetPassword(resetToken, newPassword);

      res.status(200).json({
        success: true,
        message: 'Password reset successfully',
      });
    } catch (error) {
      logger.error('Password reset failed', { error: (error as any).message });
      
      if ((error as any).message.includes('Invalid reset token')) {
        res.status(400).json({
          success: false,
          message: (error as any).message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Update user password with old, new, and confirm password
   * POST /api/auth/update-password
   */
  static async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      // Validate required fields
      if (!oldPassword || !newPassword || !confirmPassword) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: oldPassword, newPassword, confirmPassword',
        });
        return;
      }

      // Validate password confirmation
      if (newPassword !== confirmPassword) {
        res.status(400).json({
          success: false,
          message: 'New password and confirm password do not match',
        });
        return;
      }

      // Validate new password length
      if (newPassword.length < 8) {
        res.status(400).json({
          success: false,
          message: 'New password must be at least 8 characters long',
        });
        return;
      }

      // Validate that new password is different from old password
      if (oldPassword === newPassword) {
        res.status(400).json({
          success: false,
          message: 'New password must be different from the old password',
        });
        return;
      }

      // Validate password strength (optional but recommended)
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
      if (!passwordRegex.test(newPassword)) {
        res.status(400).json({
          success: false,
          message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        });
        return;
      }

      // Update password
      await AuthService.changePassword(userId, oldPassword, newPassword);

      res.status(200).json({
        success: true,
        message: 'Password updated successfully',
        data: {
          updatedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      logger.error('Password update failed', { error: (error as any).message, userId: (req as any).user?.id });
      
      if ((error as any).message.includes('Current password is incorrect') || (error as any).message.includes('Old password is incorrect')) {
        res.status(400).json({
          success: false,
          message: 'Old password is incorrect',
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Get current user profile
   * GET /api/auth/me
   */
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.firstName,
          phoneNumber: user.phoneNumber,
          company: user.company,
          role: user.role,
          isActive: user.isActive,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
          lastLoginAt: user.lastLoginAt,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          preferences: user.preferences,
          subscription: user.subscription,
        },
      });
    } catch (error) {
      logger.error('Get profile failed', { error: (error as any).message, userId: (req as any).user?.id });
      
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Setup 2FA for user
   * POST /api/auth/2fa/setup
   */
  static async setup2FA(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const user = (req as any).user;
      const result = await TwoFactorAuthService.setup2FA(userId, user.email);

      res.status(200).json({
        success: true,
        message: '2FA setup initiated. Check your email for verification code.',
        data: result,
      });
    } catch (error) {
      logger.error('2FA setup failed', { error: (error as any).message, userId: (req as any).user?.id });
      
      res.status(400).json({
        success: false,
        message: (error as any).message,
      });
    }
  }

  /**
   * Verify 2FA setup OTP
   * POST /api/auth/2fa/verify-setup
   */
  static async verify2FASetup(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const { otpCode } = req.body;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      if (!otpCode) {
        res.status(400).json({
          success: false,
          message: 'OTP code is required',
        });
        return;
      }

      const result = await TwoFactorAuthService.verifySetupOTP(userId, otpCode);

      res.status(200).json({
        success: true,
        message: '2FA enabled successfully',
        data: { isEnabled: result },
      });
    } catch (error) {
      logger.error('2FA setup verification failed', { error: (error as any).message, userId: (req as any).user?.id });
      
      res.status(400).json({
        success: false,
        message: (error as any).message,
      });
    }
  }

  /**
   * Verify 2FA OTP for login
   * POST /api/auth/2fa/verify-login
   */
  static async verify2FALogin(req: Request, res: Response): Promise<void> {
    try {
      const { userId, otpCode } = req.body;

      if (!userId || !otpCode) {
        res.status(400).json({
          success: false,
          message: 'User ID and OTP code are required',
        });
        return;
      }

      const authResponse = await AuthService.verify2FAAndLogin(userId, otpCode);

      res.status(200).json({
        success: true,
        message: '2FA verification successful',
        data: authResponse,
      });
    } catch (error) {
      logger.error('2FA login verification failed', { error: (error as any).message, userId: req.body.userId });
      
      res.status(400).json({
        success: false,
        message: (error as any).message,
      });
    }
  }

  /**
   * Get 2FA status
   * GET /api/auth/2fa/status
   */
  static async get2FAStatus(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const status = await TwoFactorAuthService.get2FAStatus(userId);

      res.status(200).json({
        success: true,
        data: status,
      });
    } catch (error) {
      logger.error('Get 2FA status failed', { error: (error as any).message, userId: (req as any).user?.id });
      
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Disable 2FA
   * POST /api/auth/2fa/disable
   */
  static async disable2FA(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const { otpCode } = req.body;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      if (!otpCode) {
        res.status(400).json({
          success: false,
          message: 'OTP code is required',
        });
        return;
      }

      const result = await TwoFactorAuthService.disable2FA(userId, otpCode);

      res.status(200).json({
        success: true,
        message: '2FA disabled successfully',
        data: { isEnabled: !result },
      });
    } catch (error) {
      logger.error('2FA disable failed', { error: (error as any).message, userId: (req as any).user?.id });
      
      res.status(400).json({
        success: false,
        message: (error as any).message,
      });
    }
  }

  /**
   * Send disable 2FA OTP
   * POST /api/auth/2fa/send-disable-otp
   */
  static async sendDisable2FAOTP(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const user = (req as any).user;
      await TwoFactorAuthService.sendDisableOTP(userId, user.email);

      res.status(200).json({
        success: true,
        message: 'Disable 2FA OTP sent to your email',
      });
    } catch (error) {
      logger.error('Send disable 2FA OTP failed', { error: (error as any).message, userId: (req as any).user?.id });
      
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }


}

export default AuthController;

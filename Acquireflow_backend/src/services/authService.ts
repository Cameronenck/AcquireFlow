import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { User, IUserDocument } from '../models/User';
import { LoginActivity } from '../models/LoginActivity';
import { config } from '../config/env';
import { CreateUserDto, UserLoginDto, AuthResponse, UserResponse } from '../types/user';
import { verifyIdToken, getAuth } from '../config/firebase';
import { EmailService } from './emailService';
import { logger } from '../utils/logger';
import { detectDeviceInfo } from '../utils/deviceDetector';
import { TwoFactorAuthService } from './twoFactorAuthService';

export class AuthService {
  /**
   * Register a new user
   */
  static async register(userData: CreateUserDto): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const user = new User({
        ...userData,
        email: userData.email.toLowerCase(),
        // Set subscription to PROFESSIONAL if card details are provided (indicating paid plan)
        subscription: userData.cardDetails ? {
          plan: 'professional' as any,
          status: 'inactive' as any,
          startDate: new Date(),
          features: ['7-day-free-trial']
        } : undefined
      });

      // Save user (this will trigger the pre-save middleware to hash password and card details)
      await user.save();

      // Send welcome email
      try {
        const userName = user.firstName || user.email.split('@')[0] || 'User';
        await EmailService.sendWelcomeEmail(userData.email, userName);
      } catch (emailError) {
        // Don't fail registration if welcome email fails
        logger.warn('Failed to send welcome email', { error: (emailError as any).message, email: userData.email });
      }

      // Generate tokens
      const { accessToken, refreshToken, expiresIn } = await this.generateTokens((user as any)._id.toString());

      // Update last login
      await user['updateLastLogin']();

      return {
        user: this.formatUserResponse(user),
        accessToken,
        refreshToken,
        expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user with email and password
   */
  static async login(loginData: UserLoginDto, userAgent?: string, ipAddress?: string): Promise<AuthResponse> {
    try {
      // Find user by email
      const user = await User.findOne({ email: loginData.email.toLowerCase() });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      // Verify password
      const isPasswordValid = await user['comparePassword'](loginData.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Check if 2FA is enabled for this user
      const is2FAEnabled = await TwoFactorAuthService.is2FAEnabled((user as any)._id.toString());
      
      if (is2FAEnabled) {
        // Send OTP for 2FA verification
        await TwoFactorAuthService.sendLoginOTP((user as any)._id.toString(), user.email);
        
        // Return response indicating 2FA is required
        return {
          user: this.formatUserResponse(user),
          requires2FA: true,
          message: '2FA verification required. Please check your email for OTP code.',
        } as any;
      }

      // Generate tokens (only if 2FA is not enabled or already verified)
      const { accessToken, refreshToken, expiresIn } = await this.generateTokens((user as any)._id.toString());

      // Update last login
      await user['updateLastLogin']();

      // Track login activity if userAgent and ipAddress are provided
      if (userAgent && ipAddress) {
        try {
          const deviceInfo = detectDeviceInfo(userAgent);
          const sessionId = uuidv4();
          
          await LoginActivity.create({
            userId: user._id,
            deviceInfo,
            ipAddress,
            sessionId,
            loginAt: new Date(),
            isActive: true,
          });
        } catch (activityError) {
          // Don't fail login if activity tracking fails
          logger.warn('Failed to track login activity', { 
            error: (activityError as any).message, 
            userId: user._id 
          });
        }
      }

      return {
        user: this.formatUserResponse(user),
        accessToken,
        refreshToken,
        expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login with Firebase ID token
   */
  static async loginWithFirebase(idToken: string): Promise<AuthResponse> {
    try {
      // Verify Firebase ID token
      const decodedToken = await verifyIdToken(idToken);
      
      // Find or create user
      let user = await User.findOne({ firebaseUid: decodedToken.uid });
      
      if (!user) {
        // Create new user from Firebase data
        user = new User({
          email: decodedToken.email,
          firstName: (decodedToken as any).name?.split(' ')[0] || 'User',
          lastName: (decodedToken as any).name?.split(' ').slice(1).join(' ') || '',
          firebaseUid: decodedToken.uid,
          isEmailVerified: (decodedToken as any).email_verified || false,
          password: await this.generateRandomPassword(),
        });

        await user.save();
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      // Generate tokens
      const { accessToken, refreshToken, expiresIn } = await this.generateTokens((user as any)._id.toString());

      // Update last login
      await user['updateLastLogin']();

      return {
        user: this.formatUserResponse(user),
        accessToken,
        refreshToken,
        expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register a new user using Firebase (Admin SDK creates the Firebase user)
   */
  static async registerWithFirebase(params: { email: string; password: string; firstName: string; lastName: string }): Promise<AuthResponse> {
    const { email, password, firstName, lastName } = params;
    try {
      // Create Firebase user via Admin SDK
      const auth = getAuth();
      const fbUser = await auth.createUser({
        email: email.toLowerCase(),
        password,
        displayName: `${firstName} ${lastName}`.trim(),
        emailVerified: false,
      });

      // Ensure not duplicating existing MongoDB user
      let user = await User.findOne({ firebaseUid: fbUser.uid });
      if (!user) {
        const newUser = new User({
          email: email.toLowerCase(),
          firstName,
          lastName,
          firebaseUid: fbUser.uid,
          isEmailVerified: false,
          password: await this.generateRandomPassword(),
        });
        await newUser['hashPassword']();
        await newUser.save();
        user = newUser;
      }

      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      const { accessToken, refreshToken, expiresIn } = await this.generateTokens((user as any)._id.toString());
      await user['updateLastLogin']();

      return {
        user: this.formatUserResponse(user),
        accessToken,
        refreshToken,
        expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(refreshToken: string): Promise<{ accessToken: string; expiresIn: number }> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, config.jwt.secret) as { userId: string };
      
      // Check if user exists and is active
      const user = await User.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw new Error('Invalid refresh token');
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { userId: (user as any)._id.toString() },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      return {
        accessToken,
        expiresIn: this.getTokenExpirationTime(config.jwt.expiresIn),
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  /**
   * Verify access token
   */
  static async verifyToken(token: string): Promise<IUserDocument> {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as { userId: string };
      
      const user = await User.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw new Error('Invalid token');
      }

      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Logout user (invalidate refresh token)
   */
  static async logout(userId: string): Promise<void> {
    // In a real application, you might want to add the refresh token to a blacklist
    // For now, we'll just return success
    console.log(`User ${userId} logged out`);
  }

  /**
   * Change user password
   */
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isCurrentPasswordValid = await user['comparePassword'](currentPassword);
      if (!isCurrentPasswordValid) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      user['password'] = newPassword;
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<void> {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        // Don't reveal if user exists or not
        return;
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { userId: (user as any)._id.toString(), type: 'password_reset' },
        config.jwt.secret,
        { expiresIn: '1h' }
      );

      // Send password reset email
      const userName = user.firstName || user.email.split('@')[0] || 'User';
      await EmailService.sendPasswordResetEmail(email, resetToken, userName);
      
      logger.info('Password reset email sent successfully', { email, userId: (user as any)._id });
    } catch (error) {
      logger.error('Failed to send password reset email', { error: (error as any).message, email });
      throw new Error('Failed to send password reset email. Please try again later.');
    }
  }

  /**
   * Verify reset token and get user info
   */
  static async verifyResetToken(resetToken: string): Promise<{ userId: string; email: string; userName: string }> {
    try {
      // Verify reset token
      const decoded = jwt.verify(resetToken, config.jwt.secret) as { userId: string; type: string };
      
      if (decoded.type !== 'password_reset') {
        throw new Error('Invalid reset token');
      }

      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }

      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      return {
        userId: (user as any)._id.toString(),
        email: user.email,
        userName: user.firstName || user.email.split('@')[0] || 'User'
      };
    } catch (error) {
      if ((error as any).name === 'TokenExpiredError') {
        throw new Error('Reset token has expired. Please request a new one.');
      }
      throw new Error('Invalid reset token');
    }
  }

  /**
   * Reset password with token
   */
  static async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    try {
      // Verify reset token
      const decoded = jwt.verify(resetToken, config.jwt.secret) as { userId: string; type: string };
      
      if (decoded.type !== 'password_reset') {
        throw new Error('Invalid reset token');
      }

      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Update password
      user['password'] = newPassword;
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generate JWT tokens
   */
  private static async generateTokens(userId: string): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    const accessToken = jwt.sign(
      { userId },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    const refreshToken = jwt.sign(
      { userId },
      config.jwt.secret,
      { expiresIn: config.jwt.refreshExpiresIn }
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: this.getTokenExpirationTime(config.jwt.expiresIn),
    };
  }

  /**
   * Get token expiration time in seconds
   */
  private static getTokenExpirationTime(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) {
      return 3600; // Default to 1 hour
    }

    const value = parseInt(match[1] || '0');
    const unit = match[2];

    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 3600;
      case 'd': return value * 86400;
      default: return 3600;
    }
  }

  /**
   * Generate random password for Firebase users
   */
  private static async generateRandomPassword(): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  /**
   * Format user response
   */
  private static formatUserResponse(user: IUserDocument): UserResponse {
    return {
      _id: (user._id || '').toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber || undefined,
      company: user.company || undefined,
      role: user.role,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      lastLoginAt: user.lastLoginAt || undefined,
      createdAt: user.createdAt || undefined,
      updatedAt: user.updatedAt || undefined,
      preferences: user.preferences || undefined,
      subscription: user.subscription || undefined,
      cardDetails: user.cardDetails ? {
        cardNumber: '****' + (user.cardDetails.cardNumber || '').slice(-4), // Only show last 4 digits
        nameOnCard: user.cardDetails.nameOnCard || '',
        expiryDate: user.cardDetails.expiryDate || '',
        cvv: '***', // Never show CVV
        billingZipCode: '*****' // Never show full ZIP
      } : undefined,
    };
  }

  /**
   * Verify 2FA OTP and complete login
   */
  static async verify2FAAndLogin(userId: string, otpCode: string): Promise<AuthResponse> {
    try {
      // Verify the OTP code
      const isOTPValid = await TwoFactorAuthService.verifyLoginOTP(userId, otpCode);
      
      if (!isOTPValid) {
        throw new Error('Invalid or expired OTP code');
      }

      // Find user
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      // Generate tokens
      const { accessToken, refreshToken, expiresIn } = await this.generateTokens(userId);

      // Update last login
      await user['updateLastLogin']();

      return {
        user: this.formatUserResponse(user),
        accessToken,
        refreshToken,
        expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get recent login activity for a user
   */
  static async getRecentLoginActivity(userId: string, limit: number = 10): Promise<any[]> {
    try {
      const activities = await LoginActivity.find({ userId })
        .sort({ loginAt: -1 })
        .limit(limit)
        .select('-__v -userAgent');
      
      return activities.map((activity: any) => ({
        id: activity._id,
        deviceInfo: {
          browser: activity.deviceInfo.browser,
          os: activity.deviceInfo.os,
          device: activity.deviceInfo.device,
        },
        ipAddress: activity.ipAddress,
        loginAt: activity.loginAt,
        isActive: activity.isActive,
        sessionId: activity.sessionId,
      }));
    } catch (error) {
      logger.error('Failed to get recent login activity', { error: (error as any).message, userId });
      throw error;
    }
  }
}

export default AuthService;

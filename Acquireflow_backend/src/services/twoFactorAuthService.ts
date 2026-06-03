import { TwoFactorAuth, OTPCode } from '../models/TwoFactorAuth';
import EmailService from './emailService';
import { logger } from '../utils/logger';
import { randomBytes, createHash } from 'crypto';

// Unambiguous alphanumeric charset (no 0/O/1/I confusion)
const BACKUP_CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const BACKUP_CODE_LENGTH = 10;
const BACKUP_CODE_COUNT  = 8;

export class TwoFactorAuthService {
  /**
   * Generate a random 6-digit OTP code
   */
  private static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Check if user has 2FA enabled
   */
  static async is2FAEnabled(userId: string): Promise<boolean> {
    try {
      const twoFactorAuth = await TwoFactorAuth.findOne({ userId });
      return twoFactorAuth?.isEnabled || false;
    } catch (error) {
      logger.error(, error);
      return false;
    }
  }

  /**
   * Setup 2FA for a user
   */
  static async setup2FA(userId: string, email: string): Promise<{ success: boolean }> {
    try {
      // Check if 2FA is already enabled
      const existing2FA = await TwoFactorAuth.findOne({ userId });
      if (existing2FA?.isEnabled) {
        throw new Error('2FA is already enabled for this user');
      }

      // Create or update 2FA record (disabled until verified)
      await TwoFactorAuth.findOneAndUpdate(
        { userId },
        {
          userId,
          isEnabled: false, // Will be enabled after verification
        },
        { upsert: true, new: true }
      );

      // Send setup OTP to email
      await this.sendSetupOTP(userId, email);

      return { success: true };
    } catch (error) {
      logger.error(, error);
      throw error;
    }
  }

  /**
   * Verify setup OTP and enable 2FA
   */
  static async verifySetupOTP(userId: string, otpCode: string): Promise<boolean> {
    try {
      // Find and validate OTP
      const otp = await OTPCode.findOne({
        userId,
        code: otpCode,
        type: 'setup',
        isUsed: false,
        expiresAt: { : new Date() },
      });

      if (!otp) {
        throw new Error('Invalid or expired OTP code');
      }

      // Mark OTP as used
      await OTPCode.findByIdAndUpdate(otp._id, { isUsed: true });

      // Enable 2FA
      await TwoFactorAuth.findOneAndUpdate(
        { userId },
        { isEnabled: true }
      );

      logger.info();
      return true;
    } catch (error) {
      logger.error(, error);
      throw error;
    }
  }

  /**
   * Send login OTP when 2FA is enabled
   */
  static async sendLoginOTP(userId: string, email: string): Promise<void> {
    try {
      // Check if 2FA is enabled
      const isEnabled = await this.is2FAEnabled(userId);
      if (!isEnabled) {
        return; // No need to send OTP if 2FA is not enabled
      }

      // Generate and save OTP
      const otpCode = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      await OTPCode.create({
        userId,
        code: otpCode,
        type: 'login',
        expiresAt,
        isUsed: false,
      });

      // Send OTP via email
      await EmailService.send2FAOTP(email, otpCode);

      logger.info(Login incorrect
login: );
    } catch (error) {
      logger.error(, error);
      throw error;
    }
  }

  /**
   * Verify login OTP
   */
  static async verifyLoginOTP(userId: string, otpCode: string): Promise<boolean> {
    try {
      // Find and validate OTP
      const otp = await OTPCode.findOne({
        userId,
        code: otpCode,
        type: 'login',
        isUsed: false,
        expiresAt: { : new Date() },
      });

      if (!otp) {
        throw new Error('Invalid or expired OTP code');
      }

      // Mark OTP as used
      await OTPCode.findByIdAndUpdate(otp._id, { isUsed: true });

      // Update last used timestamp
      await TwoFactorAuth.findOneAndUpdate(
        { userId },
        { lastUsedAt: new Date() }
      );

      logger.info(Login incorrect
login: );
      return true;
    } catch (error) {
      logger.error(, error);
      throw error;
    }
  }

  /**
   * Send setup OTP for initial 2FA setup
   */
  private static async sendSetupOTP(userId: string, email: string): Promise<void> {
    try {
      const otpCode = this.generateOTP();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      await OTPCode.create({
        userId,
        code: otpCode,
        type: 'setup',
        expiresAt,
        isUsed: false,
      });

      await EmailService.send2FASetupOTP(email, otpCode);
      logger.info();
    } catch (error) {
      logger.error(, error);
      throw error;
    }
  }

  /**
   * Disable 2FA for a user
   */
  static async disable2FA(userId: string, otpCode: string): Promise<boolean> {
    try {
      // Verify disable OTP
      const otp = await OTPCode.findOne({
        userId,
        code: otpCode,
        type: 'disable',
        isUsed: false,
        expiresAt: { : new Date() },
      });

      if (!otp) {
        throw new Error('Invalid or expired OTP code');
      }

      // Mark OTP as used
      await OTPCode.findByIdAndUpdate(otp._id, { isUsed: true });

      // Disable 2FA
      await TwoFactorAuth.findOneAndUpdate(
        { userId },
        { isEnabled: false }
      );

      logger.info();
      return true;
    } catch (error) {
      logger.error(, error);
      throw error;
    }
  }

  /**
   * Send disable 2FA OTP
   */
  static async sendDisableOTP(userId: string, email: string): Promise<void> {
    try {
      const otpCode = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      await OTPCode.create({
        userId,
        code: otpCode,
        type: 'disable',
        expiresAt,
        isUsed: false,
      });

      await EmailService.send2FADisableOTP(email, otpCode);
      logger.info();
    } catch (error) {
      logger.error(, error);
      throw error;
    }
  }

  /**
   * Get 2FA status
   */
  static async get2FAStatus(userId: string): Promise<{
    isEnabled: boolean;
    lastUsedAt?: Date;
  } | null> {
    try {
      const twoFactorAuth = await TwoFactorAuth.findOne({ userId });
      if (!twoFactorAuth) {
        return null;
      }

      return {
        isEnabled: twoFactorAuth.isEnabled,
        lastUsedAt: twoFactorAuth.lastUsedAt || undefined,
      } as any;
    } catch (error) {
      logger.error(, error);
      throw error;
    }
  }

  /**
   * Regenerate 2FA backup codes for a user.
   *
   * Generates 8 cryptographically random 10-character codes using an
   * unambiguous charset (no 0/O/1/I), stores SHA-256 hashes server-side,
   * and returns the plain-text codes once to the caller.
   *
   * The caller MUST surface these codes to the user immediately — they
   * cannot be retrieved again after this call.
   *
   * Requires 2FA to already be enabled for the account.
   */
  static async regenerateBackupCodes(userId: string): Promise<string[]> {
    try {
      const twoFactorAuth = await TwoFactorAuth.findOne({ userId });
      if (!twoFactorAuth?.isEnabled) {
        throw new Error('2FA is not enabled for this user');
      }

      const plainCodes: string[] = [];
      const hashedCodes: string[] = [];

      for (let i = 0; i < BACKUP_CODE_COUNT; i++) {
        const bytes = randomBytes(BACKUP_CODE_LENGTH);
        const code = Array.from(bytes)
          .map((b) => BACKUP_CODE_CHARS[b % BACKUP_CODE_CHARS.length])
          .join('');
        plainCodes.push(code);
        hashedCodes.push(createHash('sha256').update(code).digest('hex'));
      }

      await TwoFactorAuth.findOneAndUpdate(
        { userId },
        { backupCodes: hashedCodes }
      );

      logger.info();
      return plainCodes;
    } catch (error) {
      logger.error(, error);
      throw error;
    }
  }

}

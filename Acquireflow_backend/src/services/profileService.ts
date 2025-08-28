import { Profile } from '../models/Profile';
import { User } from '../models/User';
import { LoginActivity } from '../models/LoginActivity';
import { CreateProfileDto, UpdateProfileDto, ProfileResponse, CompleteProfileResponse } from '../types/profile';
import { logger } from '../utils/logger';

export class ProfileService {
  /**
   * Create a new profile for a user
   */
  static async createProfile(userId: string, profileData: CreateProfileDto): Promise<ProfileResponse> {
    try {
      // Check if profile already exists
      const existingProfile = await Profile.findOne({ userId });
      if (existingProfile) {
        throw new Error('Profile already exists for this user');
      }

      // Create new profile
      const profile = new Profile({
        userId,
        ...profileData,
      });

      await profile.save();
      logger.info(`Profile created for user: ${userId}`);

      return this.formatProfileResponse(profile);
    } catch (error) {
      logger.error(`Error creating profile for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get profile by user ID
   */
  static async getProfileByUserId(userId: string): Promise<ProfileResponse | null> {
    try {
      const profile = await Profile.findOne({ userId });
      return profile ? this.formatProfileResponse(profile) : null;
    } catch (error) {
      logger.error(`Error getting profile for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get complete profile with user information and recent login activity
   */
  static async getCompleteProfile(userId: string): Promise<CompleteProfileResponse | null> {
    try {
      const [user, profile, loginActivities] = await Promise.all([
        User.findById(userId).select('-password -cardDetails'),
        Profile.findOne({ userId }),
        LoginActivity.find({ userId })
          .sort({ loginAt: -1 })
          .limit(10)
          .select('-__v -userAgent'),
      ]);

      if (!user) {
        throw new Error('User not found');
      }

      // Format login activities
      const formattedLoginActivities = loginActivities.map(activity => ({
        id: activity._id.toString(),
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

      if (!profile) {
        return {
          user: {
            _id: user._id.toString(),
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
          },
          profile: null as any,
          recentLoginActivity: formattedLoginActivities,
        };
      }

      return {
        user: {
          _id: user._id.toString(),
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
        },
        profile: this.formatProfileResponse(profile),
        recentLoginActivity: formattedLoginActivities,
      };
    } catch (error) {
      logger.error(`Error getting complete profile for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Update profile by user ID
   */
  static async updateProfile(userId: string, profileData: UpdateProfileDto): Promise<ProfileResponse> {
    try {
      const profile = await Profile.findOne({ userId });
      if (!profile) {
        throw new Error('Profile not found');
      }

      // Update profile fields
      Object.assign(profile, profileData);
      await profile.save();

      logger.info(`Profile updated for user: ${userId}`);
      return this.formatProfileResponse(profile);
    } catch (error) {
      logger.error(`Error updating profile for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Update or create profile (upsert)
   */
  static async upsertProfile(userId: string, profileData: CreateProfileDto): Promise<ProfileResponse> {
    try {
      const profile = await Profile.findOneAndUpdate(
        { userId },
        { ...profileData },
        { new: true, upsert: true, runValidators: true }
      );

      logger.info(`Profile upserted for user: ${userId}`);
      return this.formatProfileResponse(profile);
    } catch (error) {
      logger.error(`Error upserting profile for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Delete profile by user ID
   */
  static async deleteProfile(userId: string): Promise<void> {
    try {
      const result = await Profile.deleteOne({ userId });
      if (result.deletedCount === 0) {
        throw new Error('Profile not found');
      }

      logger.info(`Profile deleted for user: ${userId}`);
    } catch (error) {
      logger.error(`Error deleting profile for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get all profiles with company information
   */
  static async getProfilesWithCompanyInfo(): Promise<ProfileResponse[]> {
    try {
      const profiles = await Profile.find({ 'companyInfo.companyName': { $exists: true } });
      return profiles.map(profile => this.formatProfileResponse(profile));
    } catch (error) {
      logger.error('Error getting profiles with company info:', error);
      throw error;
    }
  }

  /**
   * Search profiles by company name
   */
  static async searchProfilesByCompany(companyName: string): Promise<ProfileResponse[]> {
    try {
      const profiles = await Profile.find({
        'companyInfo.companyName': { $regex: companyName, $options: 'i' }
      });
      return profiles.map(profile => this.formatProfileResponse(profile));
    } catch (error) {
      logger.error(`Error searching profiles by company name ${companyName}:`, error);
      throw error;
    }
  }

  /**
   * Format profile response
   */
  private static formatProfileResponse(profile: any): ProfileResponse {
    return {
      _id: profile._id.toString(),
      userId: profile.userId.toString(),
      profileImage: profile.profileImage,
      jobTitle: profile.jobTitle,
      preferredLanguage: profile.preferredLanguage,
      companyInfo: profile.companyInfo,
      localization: profile.localization,
      contactPreferences: profile.contactPreferences,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
} 
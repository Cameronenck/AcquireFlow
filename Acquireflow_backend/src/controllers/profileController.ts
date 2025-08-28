import { Request, Response } from 'express';
import { ProfileService } from '../services/profileService';
import { logger } from '../utils/logger';
import { CreateProfileDto, UpdateProfileDto } from '../types/profile';

export class ProfileController {
  /**
   * Create a new profile
   */
  static async createProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const profileData: CreateProfileDto = req.body;
      const profile = await ProfileService.createProfile(userId, profileData);

      res.status(201).json({
        success: true,
        message: 'Profile created successfully',
        data: profile,
      });
    } catch (error: any) {
      logger.error('Error creating profile:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to create profile',
      });
    }
  }

  /**
   * Get profile by user ID
   */
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const profile = await ProfileService.getProfileByUserId(userId);
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      logger.error('Error getting profile:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get profile',
      });
    }
  }

  /**
   * Get complete profile with user information
   */
  static async getCompleteProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const completeProfile = await ProfileService.getCompleteProfile(userId);
      if (!completeProfile) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: completeProfile,
      });
    } catch (error: any) {
      logger.error('Error getting complete profile:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get complete profile',
      });
    }
  }

  /**
   * Update profile
   */
  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const profileData: UpdateProfileDto = req.body;
      const profile = await ProfileService.updateProfile(userId, profileData);

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: profile,
      });
    } catch (error: any) {
      logger.error('Error updating profile:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update profile',
      });
    }
  }

  /**
   * Upsert profile (create if doesn't exist, update if it does)
   */
  static async upsertProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const profileData: CreateProfileDto = req.body;
      const profile = await ProfileService.upsertProfile(userId, profileData);

      res.status(200).json({
        success: true,
        message: 'Profile saved successfully',
        data: profile,
      });
    } catch (error: any) {
      logger.error('Error upserting profile:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to save profile',
      });
    }
  }

  /**
   * Delete profile
   */
  static async deleteProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      await ProfileService.deleteProfile(userId);

      res.status(200).json({
        success: true,
        message: 'Profile deleted successfully',
      });
    } catch (error: any) {
      logger.error('Error deleting profile:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to delete profile',
      });
    }
  }

  /**
   * Get all profiles with company information (admin only)
   */
  static async getProfilesWithCompanyInfo(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      // TODO: Add role-based access control for admin functions
      const profiles = await ProfileService.getProfilesWithCompanyInfo();

      res.status(200).json({
        success: true,
        data: profiles,
      });
    } catch (error: any) {
      logger.error('Error getting profiles with company info:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get profiles',
      });
    }
  }

  /**
   * Search profiles by company name
   */
  static async searchProfilesByCompany(req: Request, res: Response): Promise<void> {
    try {
      const { companyName } = req.query;
      if (!companyName || typeof companyName !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Company name is required',
        });
        return;
      }

      const profiles = await ProfileService.searchProfilesByCompany(companyName);

      res.status(200).json({
        success: true,
        data: profiles,
      });
    } catch (error: any) {
      logger.error('Error searching profiles by company:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search profiles',
      });
    }
  }
} 
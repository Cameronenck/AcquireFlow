import { Request, Response } from 'express';
import { User } from '../models/User';
import logger from '../utils/logger';

export class AdminController {
  /**
   * Get all users including Stripe billing fields
   * GET /api/v1/admin/users
   *
   * Added for ACQFLOW-204: stripeSubscriptionId and trialEndDate were missing
   * from the admin user list, preventing the frontend from rendering the
   * "Extend Stripe billing" button conditionally.
   */
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page  = Math.max(1, parseInt(req.query['page']  as string) || 1);
      const limit = Math.min(200, Math.max(1, parseInt(req.query['limit'] as string) || 50));
      const skip  = (page - 1) * limit;

      const [users, total] = await Promise.all([
        User.find({})
          .select('-password -cardDetails -__v')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        User.countDocuments({}),
      ]);

      const formatted = users.map((u: any) => ({
        _id:                  u._id,
        email:                u.email,
        firstName:            u.firstName,
        lastName:             u.lastName,
        phoneNumber:          u.phoneNumber   ?? null,
        company:              u.company        ?? null,
        role:                 u.role,
        isActive:             u.isActive,
        isEmailVerified:      u.isEmailVerified,
        isPhoneVerified:      u.isPhoneVerified,
        lastLoginAt:          u.lastLoginAt   ?? null,
        createdAt:            u.createdAt,
        updatedAt:            u.updatedAt,
        subscription:         u.subscription  ?? null,
        // ACQFLOW-204: include Stripe billing fields so the frontend can render
        // the "Extend Stripe billing" button only for users that have them.
        stripeSubscriptionId: u.stripeSubscriptionId ?? null,
        trialEndDate:         u.trialEndDate          ?? null,
      }));

      res.status(200).json({
        success: true,
        data: {
          users: formatted,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      logger.error('Admin getAllUsers failed', { error: (error as any).message });
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

export default AdminController;

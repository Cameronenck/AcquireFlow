import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { authMiddleware, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @route   GET /api/v1/admin/users
 * @desc    List all users — includes stripeSubscriptionId + trialEndDate (ACQFLOW-204)
 * @access  Private (admin)
 */
router.get('/users', authMiddleware, requireAdmin, AdminController.getAllUsers);

export default router;

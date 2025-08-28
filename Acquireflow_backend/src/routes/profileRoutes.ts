import { Router } from 'express';
import { ProfileController } from '../controllers/profileController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Apply authentication middleware to all profile routes
router.use(authMiddleware);

// Profile CRUD operations
router.post('/', ProfileController.createProfile);
router.get('/', ProfileController.getProfile);
router.get('/complete', ProfileController.getCompleteProfile);
router.put('/', ProfileController.updateProfile);
router.post('/upsert', ProfileController.upsertProfile);
router.delete('/', ProfileController.deleteProfile);

// Company-related profile operations
router.get('/company-info', ProfileController.getProfilesWithCompanyInfo);
router.get('/search/company', ProfileController.searchProfilesByCompany);

export default router; 
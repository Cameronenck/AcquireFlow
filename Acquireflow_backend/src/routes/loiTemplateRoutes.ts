import express from 'express';
import { LOITemplateController } from '../controllers/loiTemplateController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @route   POST /api/v1/loi-templates
 * @desc    Create a new LOI template
 * @access  Private
 */
router.post('/', LOITemplateController.createTemplate);

/**
 * @route   GET /api/v1/loi-templates
 * @desc    Get all templates for the authenticated user
 * @access  Private
 */
router.get('/', LOITemplateController.getUserTemplates);

/**
 * @route   GET /api/v1/loi-templates/search
 * @desc    Search templates by name, description, or tags
 * @access  Private
 */
router.get('/search', LOITemplateController.searchTemplates);

/**
 * @route   POST /api/v1/loi-templates/seed-defaults
 * @desc    Seed default templates for the user
 * @access  Private
 */
router.post('/seed-defaults', LOITemplateController.seedDefaultTemplates);

/**
 * @route   GET /api/v1/loi-templates/:id
 * @desc    Get a specific template by ID
 * @access  Private
 */
router.get('/:id', LOITemplateController.getTemplateById);

/**
 * @route   PUT /api/v1/loi-templates/:id
 * @desc    Update an existing template
 * @access  Private
 */
router.put('/:id', LOITemplateController.updateTemplate);

/**
 * @route   DELETE /api/v1/loi-templates/:id
 * @desc    Delete a template
 * @access  Private
 */
router.delete('/:id', LOITemplateController.deleteTemplate);

/**
 * @route   POST /api/v1/loi-templates/:id/duplicate
 * @desc    Duplicate a template
 * @access  Private
 */
router.post('/:id/duplicate', LOITemplateController.duplicateTemplate);

export default router;

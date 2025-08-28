import { Request, Response } from 'express';
import { LOITemplateService } from '../services/loiTemplateService';
import { logger } from '../utils/logger';

export class LOITemplateController {
  /**
   * Create a new LOI template
   * POST /api/v1/loi-templates
   */
  static async createTemplate(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const { name, description, content, icon, category, tags } = req.body;

      // Validate required fields
      if (!name || !description || !content) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: name, description, and content are required',
        });
        return;
      }

      const template = await LOITemplateService.createTemplate({
        userId,
        name,
        description,
        content,
        icon,
        category,
        tags
      });

      res.status(201).json({
        success: true,
        message: 'LOI template created successfully',
        data: template,
      });
    } catch (error) {
      logger.error('Create LOI template failed', { 
        error: (error as any).message, 
        userId: (req as any).user?.id 
      });

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Get all templates for the authenticated user
   * GET /api/v1/loi-templates
   */
  static async getUserTemplates(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const templates = await LOITemplateService.getUserTemplates(userId);

      res.status(200).json({
        success: true,
        message: 'Templates retrieved successfully',
        data: templates,
      });
    } catch (error) {
      logger.error('Get user templates failed', { 
        error: (error as any).message, 
        userId: (req as any).user?.id 
      });

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Get a specific template by ID
   * GET /api/v1/loi-templates/:id
   */
  static async getTemplateById(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const { id } = req.params;
      const template = await LOITemplateService.getTemplateById(id, userId);

      if (!template) {
        res.status(404).json({
          success: false,
          message: 'Template not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Template retrieved successfully',
        data: template,
      });
    } catch (error) {
      logger.error('Get template by ID failed', { 
        error: (error as any).message, 
        userId: (req as any).user?.id,
        templateId: req.params.id
      });

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Update an existing template
   * PUT /api/v1/loi-templates/:id
   */
  static async updateTemplate(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const { id } = req.params;
      const { name, description, content, icon, category, tags } = req.body;

      // Validate required fields
      if (!name || !description || !content) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: name, description, and content are required',
        });
        return;
      }

      const updatedTemplate = await LOITemplateService.updateTemplate(id, userId, {
        name,
        description,
        content,
        icon,
        category,
        tags
      });

      if (!updatedTemplate) {
        res.status(404).json({
          success: false,
          message: 'Template not found or not editable',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Template updated successfully',
        data: updatedTemplate,
      });
    } catch (error) {
      logger.error('Update template failed', { 
        error: (error as any).message, 
        userId: (req as any).user?.id,
        templateId: req.params.id
      });

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Delete a template
   * DELETE /api/v1/loi-templates/:id
   */
  static async deleteTemplate(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const { id } = req.params;
      const deleted = await LOITemplateService.deleteTemplate(id, userId);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Template not found or not deletable',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Template deleted successfully',
      });
    } catch (error) {
      logger.error('Delete template failed', { 
        error: (error as any).message, 
        userId: (req as any).user?.id,
        templateId: req.params.id
      });

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Duplicate a template
   * POST /api/v1/loi-templates/:id/duplicate
   */
  static async duplicateTemplate(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const { id } = req.params;
      const duplicatedTemplate = await LOITemplateService.duplicateTemplate(id, userId);

      if (!duplicatedTemplate) {
        res.status(404).json({
          success: false,
          message: 'Template not found',
        });
        return;
      }

      res.status(201).json({
        success: true,
        message: 'Template duplicated successfully',
        data: duplicatedTemplate,
      });
    } catch (error) {
      logger.error('Duplicate template failed', { 
        error: (error as any).message, 
        userId: (req as any).user?.id,
        templateId: req.params.id
      });

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Search templates
   * GET /api/v1/loi-templates/search?q=searchTerm
   */
  static async searchTemplates(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Search query parameter is required',
        });
        return;
      }

      const templates = await LOITemplateService.searchTemplates(userId, q);

      res.status(200).json({
        success: true,
        message: 'Search completed successfully',
        data: templates,
      });
    } catch (error) {
      logger.error('Search templates failed', { 
        error: (error as any).message, 
        userId: (req as any).user?.id,
        searchQuery: req.query.q
      });

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Seed default templates for the user
   * POST /api/v1/loi-templates/seed-defaults
   */
  static async seedDefaultTemplates(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      await LOITemplateService.seedDefaultTemplates(userId);

      res.status(200).json({
        success: true,
        message: 'Default templates seeded successfully',
      });
    } catch (error) {
      logger.error('Seed default templates failed', { 
        error: (error as any).message, 
        userId: (req as any).user?.id
      });

      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

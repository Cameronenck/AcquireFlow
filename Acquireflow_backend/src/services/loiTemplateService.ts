import { LOITemplate, ILOITemplate } from '../models/LOITemplate';
import { logger } from '../utils/logger';

export class LOITemplateService {
  /**
   * Create a new LOI template
   */
  static async createTemplate(templateData: {
    userId: string;
    name: string;
    description: string;
    content: string;
    icon?: string;
    category?: string;
    tags?: string[];
  }): Promise<ILOITemplate> {
    try {
      const template = new LOITemplate({
        ...templateData,
        isCustom: true,
        isDefault: false
      });

      const savedTemplate = await template.save();
      logger.info(`LOI template created for user ${templateData.userId}: ${templateData.name}`);
      
      return savedTemplate;
    } catch (error) {
      logger.error(`Error creating LOI template for user ${templateData.userId}:`, error);
      throw error;
    }
  }

  /**
   * Get all templates for a user (custom + default)
   */
  static async getUserTemplates(userId: string): Promise<ILOITemplate[]> {
    try {
      const templates = await LOITemplate.find({
        $or: [
          { userId },
          { isDefault: true }
        ]
      }).sort({ isDefault: 1, createdAt: -1 });

      logger.info(`Retrieved ${templates.length} templates for user ${userId}`);
      return templates;
    } catch (error) {
      logger.error(`Error retrieving templates for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get a specific template by ID
   */
  static async getTemplateById(templateId: string, userId: string): Promise<ILOITemplate | null> {
    try {
      const template = await LOITemplate.findOne({
        _id: templateId,
        $or: [
          { userId },
          { isDefault: true }
        ]
      });

      if (template) {
        logger.info(`Retrieved template ${templateId} for user ${userId}`);
      } else {
        logger.warn(`Template ${templateId} not found or not accessible for user ${userId}`);
      }

      return template;
    } catch (error) {
      logger.error(`Error retrieving template ${templateId} for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Update an existing template
   */
  static async updateTemplate(
    templateId: string, 
    userId: string, 
    updateData: Partial<{
      name: string;
      description: string;
      content: string;
      icon: string;
      category: string;
      tags: string[];
    }>
  ): Promise<ILOITemplate | null> {
    try {
      // Ensure user can only update their own custom templates
      const template = await LOITemplate.findOne({
        _id: templateId,
        userId,
        isCustom: true
      });

      if (!template) {
        logger.warn(`Template ${templateId} not found or not editable for user ${userId}`);
        return null;
      }

      const updatedTemplate = await LOITemplate.findByIdAndUpdate(
        templateId,
        { 
          ...updateData,
          updatedAt: new Date()
        },
        { new: true }
      );

      logger.info(`Template ${templateId} updated for user ${userId}`);
      return updatedTemplate;
    } catch (error) {
      logger.error(`Error updating template ${templateId} for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Delete a template
   */
  static async deleteTemplate(templateId: string, userId: string): Promise<boolean> {
    try {
      // Ensure user can only delete their own custom templates
      const result = await LOITemplate.deleteOne({
        _id: templateId,
        userId,
        isCustom: true
      });

      if (result.deletedCount > 0) {
        logger.info(`Template ${templateId} deleted for user ${userId}`);
        return true;
      } else {
        logger.warn(`Template ${templateId} not found or not deletable for user ${userId}`);
        return false;
      }
    } catch (error) {
      logger.error(`Error deleting template ${templateId} for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Seed default templates for a user
   */
  static async seedDefaultTemplates(userId: string): Promise<void> {
    try {
      const defaultTemplates = [
        {
          name: 'Standard Cash Offer',
          description: 'Quick closing with cash offer',
          icon: 'DollarSign',
          category: 'cash-offer',
          content: `Dear [AGENT_NAME],

I am writing to express my interest in purchasing the property located at [PROPERTY_ADDRESS]. After careful consideration of the property's location, condition, and potential, I would like to submit the following Letter of Intent:

**Purchase Price:** [OFFER_AMOUNT]
**Earnest Money Deposit:** [EARNEST_MONEY]
**Closing Timeline:** [CLOSING_TIMELINE] days from acceptance
**Inspection Period:** [INSPECTION_PERIOD] days

**Financing:** Cash offer with no financing contingency
**Proof of Funds:** Available upon request
**Contingencies:** Inspection

I am prepared to move forward quickly with this cash offer and can provide proof of funds immediately upon request. With no financing contingency, we can close in as little as [CLOSING_TIMELINE] days, providing you with certainty and a clean, efficient transaction.

My team and I have extensive experience in real estate acquisitions in this area and are committed to a smooth transaction process.

Please consider this a formal expression of my interest in the property. I look forward to your response and am available to discuss any aspects of this offer at your convenience.

Sincerely,
[YOUR_NAME]
[YOUR_COMPANY]
[YOUR_CONTACT_INFO]`,
          tags: ['cash', 'quick-close', 'no-financing']
        },
        {
          name: 'Subject To Acquisition',
          description: 'Take over existing financing',
          icon: 'Home',
          category: 'subject-to',
          content: `Dear [AGENT_NAME],

I am writing to express my interest in purchasing the property located at [PROPERTY_ADDRESS]. After careful consideration of the property's location, condition, and potential, I would like to submit the following Letter of Intent:

**Purchase Price:** [OFFER_AMOUNT]
**Earnest Money Deposit:** [EARNEST_MONEY]
**Closing Timeline:** [CLOSING_TIMELINE] days from acceptance
**Inspection Period:** [INSPECTION_PERIOD] days

**Contingencies:** Inspection, Appraisal

**Subject To Existing Financing:** This offer is made subject to the existing financing on the property. Buyer intends to take over the existing mortgage payments while keeping the loan in the Seller's name, with appropriate legal safeguards for both parties.

This "Subject-To" offer allows you to sell your property without paying off your existing mortgage. I will take over the responsibility of making the mortgage payments while you receive the difference between your mortgage balance and the purchase price in cash at closing.

My team and I have extensive experience in real estate acquisitions in this area and are committed to a smooth transaction process.

Please consider this a formal expression of my interest in the property. I look forward to your response and am available to discuss any aspects of this offer at your convenience.

Sincerely,
[YOUR_NAME]
[YOUR_COMPANY]
[YOUR_CONTACT_INFO]`,
          tags: ['subject-to', 'existing-financing', 'mortgage-assumption']
        },
        {
          name: 'Seller Financing Offer',
          description: 'Owner financing terms',
          icon: 'Calendar',
          category: 'seller-financing',
          content: `Dear [AGENT_NAME],

I am writing to express my interest in purchasing the property located at [PROPERTY_ADDRESS]. After careful consideration of the property's location, condition, and potential, I would like to submit the following Letter of Intent:

**Purchase Price:** [OFFER_AMOUNT]
**Earnest Money Deposit:** [EARNEST_MONEY]
**Closing Timeline:** [CLOSING_TIMELINE] days from acceptance
**Inspection Period:** [INSPECTION_PERIOD] days

**Contingencies:** Inspection, Appraisal

**Seller Financing Terms:**
- Down Payment: [DOWN_PAYMENT_AMOUNT]
- Financed Amount: [FINANCED_AMOUNT]
- Interest Rate: [INTEREST_RATE]%
- Loan Term: [LOAN_TERM] years
- Monthly Payment: [MONTHLY_PAYMENT]

The seller financing structure outlined above provides you with an immediate down payment plus ongoing monthly income at an attractive interest rate. This arrangement can offer tax advantages by spreading your capital gains over time while providing a competitive return on your equity.

My team and I have extensive experience in real estate acquisitions in this area and are committed to a smooth transaction process.

Please consider this a formal expression of my interest in the property. I look forward to your response and am available to discuss any aspects of this offer at your convenience.

Sincerely,
[YOUR_NAME]
[YOUR_COMPANY]
[YOUR_CONTACT_INFO]`,
          tags: ['seller-financing', 'owner-financing', 'monthly-income']
        },
        {
          name: 'Hybrid Offer- Subject To + Seller Finance',
          description: 'Combined financing approach',
          icon: 'AlertTriangle',
          category: 'hybrid',
          content: `Dear [AGENT_NAME],

I am writing to express my interest in purchasing the property located at [PROPERTY_ADDRESS]. After careful consideration of the property's location, condition, and potential, I would like to submit the following Letter of Intent:

**Purchase Price:** [OFFER_AMOUNT]
**Earnest Money Deposit:** [EARNEST_MONEY]
**Closing Timeline:** [CLOSING_TIMELINE] days from acceptance
**Inspection Period:** [INSPECTION_PERIOD] days

**Contingencies:** Inspection, Appraisal

**Hybrid Financing Structure:**
- Assumption of Existing Mortgage: [ASSUMED_LOAN_BALANCE]
- Seller Financing: [SELLER_FINANCE_AMOUNT]
  - Interest Rate: [INTEREST_RATE]%
  - Term: [LOAN_TERM] years
- Cash Down Payment: [CASH_DOWN_PAYMENT]

This hybrid structure combines the benefits of a Subject-To transaction with seller financing. You'll receive an immediate cash payment while also creating ongoing monthly income from the seller-financed portion. This creative approach maximizes flexibility for both parties while allowing for a faster closing than traditional financing would permit.

My team and I have extensive experience in real estate acquisitions in this area and are committed to a smooth transaction process.

Please consider this a formal expression of my interest in the property. I look forward to your response and am available to discuss any aspects of this offer at your convenience.

Sincerely,
[YOUR_NAME]
[YOUR_COMPANY]
[YOUR_CONTACT_INFO]`,
          tags: ['hybrid', 'subject-to', 'seller-financing', 'creative-financing']
        }
      ];

      // Check if user already has default templates
      const existingDefaults = await LOITemplate.find({
        userId,
        isDefault: true
      });

      if (existingDefaults.length === 0) {
        // Create default templates for the user
        const templatesToCreate = defaultTemplates.map(template => ({
          ...template,
          userId,
          isDefault: true,
          isCustom: false
        }));

        await LOITemplate.insertMany(templatesToCreate);
        logger.info(`Default templates seeded for user ${userId}`);
      }
    } catch (error) {
      logger.error(`Error seeding default templates for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Duplicate a template
   */
  static async duplicateTemplate(templateId: string, userId: string): Promise<ILOITemplate | null> {
    try {
      const originalTemplate = await this.getTemplateById(templateId, userId);
      
      if (!originalTemplate) {
        return null;
      }

      const duplicatedTemplate = new LOITemplate({
        userId,
        name: `${originalTemplate.name} (Copy)`,
        description: originalTemplate.description,
        content: originalTemplate.content,
        icon: originalTemplate.icon,
        category: originalTemplate.category,
        tags: originalTemplate.tags,
        isCustom: true,
        isDefault: false
      });

      const savedTemplate = await duplicatedTemplate.save();
      logger.info(`Template ${templateId} duplicated for user ${userId}`);
      
      return savedTemplate;
    } catch (error) {
      logger.error(`Error duplicating template ${templateId} for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Search templates by name, description, or tags
   */
  static async searchTemplates(userId: string, searchTerm: string): Promise<ILOITemplate[]> {
    try {
      const searchRegex = new RegExp(searchTerm, 'i');
      
      const templates = await LOITemplate.find({
        $or: [
          { userId },
          { isDefault: true }
        ],
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { tags: searchRegex }
        ]
      }).sort({ isDefault: 1, createdAt: -1 });

      logger.info(`Search completed for user ${userId} with term: ${searchTerm}`);
      return templates;
    } catch (error) {
      logger.error(`Error searching templates for user ${userId}:`, error);
      throw error;
    }
  }
}

import { sendSMS, sendBulkSMS, verifyPhoneNumber, getPhoneNumberInfo } from '../config/twilio';
import { Campaign } from '../models/Campaign';
import { CampaignType, CampaignStatus } from '../types/campaign';
import { logger } from '../utils/logger';

export interface SMSMessage {
  to: string;
  body: string;
  from?: string;
  campaignId?: string;
}

export interface SMSDeliveryStatus {
  messageId: string;
  to: string;
  status: 'delivered' | 'failed' | 'pending' | 'undelivered';
  errorCode?: string;
  errorMessage?: string;
  deliveredAt?: Date;
  failedAt?: Date;
}

export interface BulkSMSRequest {
  recipients: string[];
  message: string;
  from?: string;
  campaignId?: string;
  scheduleTime?: Date;
}

export class SMSService {
  /**
   * Send a single SMS message
   */
  static async sendSingleSMS(message: SMSMessage): Promise<SMSDeliveryStatus> {
    try {
      logger.info(`Sending SMS to ${message.to}`, { campaignId: message.campaignId });

      // Verify phone number format
      const isValidPhone = await verifyPhoneNumber(message.to);
      if (!isValidPhone) {
        throw new Error(`Invalid phone number format: ${message.to}`);
      }

      // Send SMS via Twilio
      const twilioMessage = await sendSMS(
        message.to,
        message.body,
        message.from
      );

      const deliveryStatus: SMSDeliveryStatus = {
        messageId: (twilioMessage as any).sid,
        to: message.to,
        status: 'pending',
      };

      // Update campaign stats if campaignId is provided
      if (message.campaignId) {
        await this.updateCampaignStats(message.campaignId, 'sent');
      }

      logger.info(`SMS sent successfully to ${message.to}`, { 
        messageId: (twilioMessage as any).sid,
        campaignId: message.campaignId 
      });

      return deliveryStatus;
    } catch (error) {
      logger.error(`Failed to send SMS to ${message.to}`, { 
        error: (error as any).message,
        campaignId: message.campaignId 
      });

      // Update campaign stats if campaignId is provided
      if (message.campaignId) {
        await this.updateCampaignStats(message.campaignId, 'failed');
      }

      throw error;
    }
  }

  /**
   * Send bulk SMS messages
   */
  static async sendBulkSMS(request: BulkSMSRequest): Promise<SMSDeliveryStatus[]> {
    try {
      logger.info(`Sending bulk SMS to ${request.recipients.length} recipients`, { 
        campaignId: request.campaignId 
      });

      // Validate all phone numbers
      const validRecipients: string[] = [];
      const invalidRecipients: string[] = [];

      for (const recipient of request.recipients) {
        const isValid = await verifyPhoneNumber(recipient);
        if (isValid) {
          validRecipients.push(recipient);
        } else {
          invalidRecipients.push(recipient);
          logger.warn(`Invalid phone number in bulk SMS: ${recipient}`);
        }
      }

      if (validRecipients.length === 0) {
        throw new Error('No valid phone numbers found in recipients list');
      }

      // Send bulk SMS via Twilio
      const twilioMessages = await sendBulkSMS(
        validRecipients,
        request.message,
        request.from
      );

      // Process delivery statuses
      const deliveryStatuses: SMSDeliveryStatus[] = twilioMessages.map((msg, index) => ({
        messageId: (msg as any).sid,
        to: validRecipients[index] || '',
        status: 'pending',
        campaignId: request.campaignId,
      }));

      // Update campaign stats if campaignId is provided
      if (request.campaignId) {
        await this.updateCampaignStats(request.campaignId, 'sent', validRecipients.length);
      }

      // Log invalid recipients
      if (invalidRecipients.length > 0) {
        logger.warn(`Skipped ${invalidRecipients.length} invalid phone numbers`, { 
          invalidRecipients,
          campaignId: request.campaignId 
        });
      }

      logger.info(`Bulk SMS sent successfully to ${validRecipients.length} recipients`, { 
        campaignId: request.campaignId,
        invalidCount: invalidRecipients.length 
      });

      return deliveryStatuses;
    } catch (error) {
      logger.error('Failed to send bulk SMS', { 
        error: (error as any).message,
        campaignId: request.campaignId 
      });

      // Update campaign stats if campaignId is provided
      if (request.campaignId) {
        await this.updateCampaignStats(request.campaignId, 'failed', request.recipients.length);
      }

      throw error;
    }
  }

  /**
   * Send SMS campaign
   */
  static async sendSMSCampaign(campaignId: string): Promise<void> {
    try {
      logger.info(`Starting SMS campaign: ${campaignId}`);

      // Find campaign
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        throw new Error(`Campaign not found: ${campaignId}`);
      }

      if (campaign.type !== CampaignType.SMS) {
        throw new Error(`Campaign type is not SMS: ${campaign.type}`);
      }

      if (campaign.status !== CampaignStatus.ACTIVE) {
        throw new Error(`Campaign is not active: ${campaign.status}`);
      }

      // Get target audience (this would typically come from a contact list or database)
      const targetAudience = await this.getTargetAudience(campaign.targetAudience);
      
      if (targetAudience.length === 0) {
        logger.warn(`No target audience found for campaign: ${campaignId}`);
        return;
      }

      // Send SMS to target audience
      const deliveryStatuses = await this.sendBulkSMS({
        recipients: targetAudience,
        message: campaign.message.body,
        campaignId: campaignId,
      });

      // Update campaign stats
      const totalSent = deliveryStatuses.length;
      const totalDelivered = deliveryStatuses.filter(s => s.status === 'delivered').length;
      const totalFailed = deliveryStatuses.filter(s => s.status === 'failed').length;

      await campaign.updateStats({
        totalSent,
        totalDelivered,
        totalFailed,
      });

      logger.info(`SMS campaign completed: ${campaignId}`, {
        totalSent,
        totalDelivered,
        totalFailed,
      });
    } catch (error) {
      logger.error(`Failed to send SMS campaign: ${campaignId}`, { error: (error as any).message });
      throw error;
    }
  }

  /**
   * Process SMS delivery webhook from Twilio
   */
  static async processDeliveryWebhook(webhookData: any): Promise<void> {
    try {
      const { MessageSid, MessageStatus } = webhookData;

      logger.info(`Processing SMS delivery webhook for message: ${MessageSid}`, { status: MessageStatus });

      // Update delivery status in your system
      // This would typically update a message tracking table
      
      // If this was part of a campaign, update campaign stats
      // You would need to look up the campaign ID from the message tracking

      logger.info(`SMS delivery webhook processed: ${MessageSid}`, { status: MessageStatus });
    } catch (error) {
      logger.error('Failed to process SMS delivery webhook', { error: (error as any).message });
      throw error;
    }
  }

  /**
   * Get phone number information
   */
  static async getPhoneNumberInfo(phoneNumber: string) {
    try {
      const info = await getPhoneNumberInfo(phoneNumber);
      return info;
    } catch (error) {
      logger.error(`Failed to get phone number info for ${phoneNumber}`, { error: (error as any).message });
      throw error;
    }
  }

  /**
   * Validate phone number
   */
  static async validatePhoneNumber(phoneNumber: string): Promise<boolean> {
    try {
      return await verifyPhoneNumber(phoneNumber);
    } catch (error) {
      logger.error(`Failed to validate phone number: ${phoneNumber}`, { error: (error as any).message });
      return false;
    }
  }

  /**
   * Get estimated SMS cost
   */
  static async getEstimatedCost(recipients: string[], messageLength: number): Promise<number> {
    try {
      // This is a simplified cost calculation
      // In a real application, you would use Twilio's pricing API or your own pricing model
      
      const baseCost = 0.0075; // Base cost per SMS (example)
      const costPerCharacter = 0.0001; // Cost per character (example)
      
      const totalCost = recipients.length * (baseCost + (messageLength * costPerCharacter));
      
      return Math.round(totalCost * 100) / 100; // Round to 2 decimal places
    } catch (error) {
      logger.error('Failed to calculate estimated SMS cost', { error: (error as any).message });
      throw error;
    }
  }

  /**
   * Update campaign stats
   */
  private static async updateCampaignStats(campaignId: string, action: 'sent' | 'delivered' | 'failed', count: number = 1): Promise<void> {
    try {
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        logger.warn(`Campaign not found for stats update: ${campaignId}`);
        return;
      }

      const currentStats = campaign.stats;
      
      switch (action) {
        case 'sent':
          currentStats.totalSent += count;
          break;
        case 'delivered':
          currentStats.totalDelivered += count;
          break;
        case 'failed':
          currentStats.totalFailed += count;
          break;
      }

      await campaign.updateStats(currentStats);
    } catch (error) {
      logger.error(`Failed to update campaign stats: ${campaignId}`, { error: (error as any).message });
    }
  }

  /**
   * Get target audience for campaign
   * This is a placeholder - in a real application, this would query your contact database
   */
  private static async getTargetAudience(_audienceFilters: any): Promise<string[]> {
    try {
      // This is a simplified implementation
      // In a real application, you would:
      // 1. Parse the audience filters
      // 2. Query your contact database based on the filters
      // 3. Return the list of phone numbers
      
      // For now, return a mock list
      return ['+1234567890', '+1987654321', '+1555123456'];
    } catch (error) {
      logger.error('Failed to get target audience', { error: (error as any).message });
      return [];
    }
  }
}

export default SMSService;

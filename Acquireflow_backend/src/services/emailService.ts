import nodemailer from 'nodemailer';
import { config } from '../config/env';
import logger from '../utils/logger';

class EmailService {
  private static transporter: nodemailer.Transporter | null = null;

  /**
   * Initialize Nodemailer transporter with Gmail SMTP
   */
  private static async getTransporter(): Promise<nodemailer.Transporter> {
    if (!this.transporter) {
      logger.info("Initializing Gmail SMTP transporter", {
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure,
        user: config.smtp.user,
        fromEmail: config.smtp.fromEmail,
        fromName: config.smtp.fromName,
      });
  
      try {
        logger.info("Attempting to connect to Gmail SMTP...");
  
        // Create transporter
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // SSL required for Gmail App Passwords
          auth: {
            user: config.smtp.user,
            pass: config.smtp.pass,
          },
        });
  
        // Verify connection ONCE at initialization
        await transporter.verify();
        logger.info("✅ Gmail SMTP connection established successfully");
  
        this.transporter = transporter; // Save instance
      } catch (error: any) {
        logger.error("❌ Gmail SMTP failed:", error.message);
        console.error("\n❌ Gmail SMTP Error:", error.message);
        console.error("👉 Please check your Gmail App Password configuration.\n");
        throw new Error(`Gmail SMTP connection failed: ${error.message}`);
      }
    }
  
    return this.transporter;
  }
  

  /**
   * Send password reset email
   */
  static async sendPasswordResetEmail(
    email: string,
    userName: string,
    resetToken: string
  ): Promise<void> {
    try {
      
      const transporter = await this.getTransporter();
      const resetUrl = `https://acquireflow-dev.vercel.app/reset-password?token=${resetToken}`;

      console.log('Generated Reset URL:', resetUrl); // 👀 Debug log

      const mailOptions = {
        from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
        to: email,
        subject: 'Reset Your Password - AcquireFlow',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">AcquireFlow</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Password Reset Request</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Hello ${userName},</h2>
              
              <p style="color: #666; line-height: 1.6;">
                We received a request to reset your password for your AcquireFlow account. 
                If you didn't make this request, you can safely ignore this email.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 25px; 
                          display: inline-block; 
                          font-weight: bold;
                          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                  Reset Password
                </a>
              </div>
              
              <p style="color: #666; line-height: 1.6; font-size: 14px;">
                If the button doesn't work, copy and paste this link into your browser:
                <br>
                <a href="${resetUrl}" style="color: #667eea; word-break: break-all;">${resetUrl}</a>
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  This link will expire in 15 minutes for security reasons.
                  <br>
                  If you have any questions, please contact our support team.
                </p>
              </div>
            </div>
          </div>
        `,
        text: `
          Hello ${userName},
          
          We received a request to reset your password for your AcquireFlow account. 
          If you didn't make this request, you can safely ignore this email.
          
          To reset your password, click the link below:
          ${resetUrl}
          
          This link will expire in 15 minutes for security reasons.
          
          If you have any questions, please contact our support team.
        `
      };

      const info = await transporter.sendMail(mailOptions);

      logger.info('Password reset email sent successfully via Gmail', {
        email,
        userName,
        messageId: info.messageId,
      });

      console.log('\n📧 EMAIL SENT SUCCESSFULLY VIA GMAIL!');
      console.log('Message ID:', info.messageId, '\n');
    } catch (error) {
      logger.error('Failed to send password reset email', {
        error: (error as any).message,
        email,
        userName,
      });
      throw new Error('Failed to send password reset email');
    }
  }

  /**
   * Send welcome email to new users
   */
  static async sendWelcomeEmail(email: string, userName: string): Promise<void> {
    try {
      const transporter = await this.getTransporter();

      const mailOptions = {
        from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
        to: email,
        subject: 'Welcome to AcquireFlow! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">AcquireFlow</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Welcome to Your Real Estate Success Platform</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Welcome, ${userName}! 🎉</h2>
              
              <p style="color: #666; line-height: 1.6;">
                Thank you for joining AcquireFlow! We're excited to help you streamline your real estate business and achieve greater success.
              </p>
              
              <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2c5aa0; margin-top: 0;">What you can do with AcquireFlow:</h3>
                <ul style="color: #666; line-height: 1.8;">
                  <li>📊 Track your real estate pipeline and deals</li>
                  <li>📧 Generate professional LOI templates</li>
                  <li>📈 Analyze your business performance</li>
                  <li>👥 Manage your contacts and relationships</li>
                  <li>📋 Create detailed property reports</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${config.app.frontendUrl}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 25px; 
                          display: inline-block; 
                          font-weight: bold;
                          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                  Get Started Now
                </a>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  If you have any questions or need assistance, don't hesitate to reach out to our support team.
                  <br>
                  Welcome to the AcquireFlow family! 🏠
                </p>
              </div>
            </div>
          </div>
        `,
        text: `
          Welcome to AcquireFlow, ${userName}! 🎉
          
          Thank you for joining AcquireFlow! We're excited to help you streamline your real estate business and achieve greater success.
          
          What you can do with AcquireFlow:
          - Track your real estate pipeline and deals
          - Generate professional LOI templates
          - Analyze your business performance
          - Manage your contacts and relationships
          - Create detailed property reports
          
          Get started now: ${config.app.frontendUrl}
          
          If you have any questions or need assistance, don't hesitate to reach out to our support team.
          Welcome to the AcquireFlow family! 🏠
        `
      };

      const info = await transporter.sendMail(mailOptions);

      logger.info('Welcome email sent successfully', {
        email,
        userName,
        messageId: info.messageId,
      });
    } catch (error) {
      logger.error('Failed to send welcome email', {
        error: (error as any).message,
        email,
        userName,
      });
      throw new Error('Failed to send welcome email');
    }
  }

  /**
   * Send 2FA login OTP email
   */
  static async send2FAOTP(email: string, otpCode: string): Promise<void> {
    try {
      const transporter = await this.getTransporter();

      const mailOptions = {
        from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
        to: email,
        subject: 'Your 2FA Login Code - AcquireFlow',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">AcquireFlow</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Two-Factor Authentication</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Your Login Code</h2>
              
              <p style="color: #666; line-height: 1.6;">
                You've requested to log in to your AcquireFlow account. Please use the following verification code:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="background: #667eea; color: white; padding: 20px; border-radius: 10px; font-size: 32px; font-weight: bold; letter-spacing: 5px; display: inline-block;">
                  ${otpCode}
                </div>
              </div>
              
              <p style="color: #666; line-height: 1.6; font-size: 14px;">
                This code will expire in 15 minutes for security reasons.
                <br>
                If you didn't request this code, please ignore this email and contact support immediately.
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  For security, never share this code with anyone.
                </p>
              </div>
            </div>
          </div>
        `,
        text: `
          Your AcquireFlow Login Code
          
          You've requested to log in to your AcquireFlow account. Please use the following verification code:
          
          ${otpCode}
          
          This code will expire in 15 minutes for security reasons.
          If you didn't request this code, please ignore this email and contact support immediately.
          
          For security, never share this code with anyone.
        `
      };

      const info = await transporter.sendMail(mailOptions);

      logger.info('2FA login OTP email sent successfully', {
        email,
        messageId: info.messageId,
      });
    } catch (error) {
      logger.error('Failed to send 2FA login OTP email', {
        error: (error as any).message,
        email,
      });
      throw new Error('Failed to send 2FA login OTP email');
    }
  }

  /**
   * Send 2FA setup OTP email
   */
  static async send2FASetupOTP(email: string, otpCode: string): Promise<void> {
    try {
      const transporter = await this.getTransporter();

      const mailOptions = {
        from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
        to: email,
        subject: 'Setup 2FA - AcquireFlow',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">AcquireFlow</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Two-Factor Authentication Setup</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Setup Your 2FA</h2>
              
              <p style="color: #666; line-height: 1.6;">
                You're setting up two-factor authentication for your AcquireFlow account. Please use the following verification code:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="background: #667eea; color: white; padding: 20px; border-radius: 10px; font-size: 32px; font-weight: bold; letter-spacing: 5px; display: inline-block;">
                  ${otpCode}
                </div>
              </div>
              
              <p style="color: #666; line-height: 1.6; font-size: 14px;">
                This code will expire in 15 minutes for security reasons.
                <br>
                If you didn't request to setup 2FA, please ignore this email and contact support immediately.
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  For security, never share this code with anyone.
                </p>
              </div>
            </div>
          </div>
        `,
        text: `
          Setup 2FA - AcquireFlow
          
          You're setting up two-factor authentication for your AcquireFlow account. Please use the following verification code:
          
          ${otpCode}
          
          This code will expire in 15 minutes for security reasons.
          If you didn't request to setup 2FA, please ignore this email and contact support immediately.
          
          For security, never share this code with anyone.
        `
      };

      const info = await transporter.sendMail(mailOptions);

      logger.info('2FA setup OTP email sent successfully', {
        email,
        messageId: info.messageId,
      });
    } catch (error) {
      logger.error('Failed to send 2FA setup OTP email', {
        error: (error as any).message,
        email,
      });
      throw new Error('Failed to send 2FA setup OTP email');
    }
  }

  /**
   * Send 2FA disable OTP email
   */
  static async send2FADisableOTP(email: string, otpCode: string): Promise<void> {
    try {
      const transporter = await this.getTransporter();

      const mailOptions = {
        from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
        to: email,
        subject: 'Disable 2FA - AcquireFlow',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">AcquireFlow</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Two-Factor Authentication Disable</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Disable Your 2FA</h2>
              
              <p style="color: #666; line-height: 1.6;">
                You're requesting to disable two-factor authentication for your AcquireFlow account. Please use the following verification code:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="background: #667eea; color: white; padding: 20px; border-radius: 10px; font-size: 32px; font-weight: bold; letter-spacing: 5px; display: inline-block;">
                  ${otpCode}
                </div>
              </div>
              
              <p style="color: #666; line-height: 1.6; font-size: 14px;">
                This code will expire in 10 minutes for security reasons.
                <br>
                If you didn't request to disable 2FA, please ignore this email and contact support immediately.
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  For security, never share this code with anyone.
                </p>
              </div>
            </div>
          </div>
        `,
        text: `
          Disable 2FA - AcquireFlow
          
          You're requesting to disable two-factor authentication for your AcquireFlow account. Please use the following verification code:
          
          ${otpCode}
          
          This code will expire in 10 minutes for security reasons.
          If you didn't request to disable 2FA, please ignore this email and contact support immediately.
          
          For security, never share this code with anyone.
        `
      };

      const info = await transporter.sendMail(mailOptions);

      logger.info('2FA disable OTP email sent successfully', {
        email,
        messageId: info.messageId,
      });
    } catch (error) {
      logger.error('Failed to send 2FA disable OTP email', {
        error: (error as any).message,
        email,
      });
      throw new Error('Failed to send 2FA disable OTP email');
    }
  }

  /**
   * Test Gmail SMTP connection
   */
  static async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      await this.getTransporter();
      return {
        success: true,
        message: 'Gmail SMTP is properly configured and working!',
      };
    } catch (error) {
      return {
        success: false,
        message: `Gmail SMTP test failed: ${(error as any).message}`,
      };
    }
  }
}

export default EmailService;

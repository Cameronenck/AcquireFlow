import nodemailer from 'nodemailer';
import { config } from '../config/env';
import { logger } from '../utils/logger';

export class EmailService {
  private static transporter: nodemailer.Transporter | null = null;

  /**
   * Initialize Nodemailer transporter
   */
  private static async getTransporter(): Promise<nodemailer.Transporter> {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure, // true for 465, false for other ports
        auth: {
          user: config.smtp.user,
          pass: config.smtp.pass,
        },
        tls: {
          rejectUnauthorized: false // For development
        }
      });

      // Verify connection
      try {
        await this.transporter.verify();
        logger.info('SMTP connection established successfully');
      } catch (error) {
        logger.error('SMTP connection failed:', error);
        throw new Error('Failed to establish SMTP connection');
      }
    }
    return this.transporter;
  }

  /**
   * Send password reset email
   */
  static async sendPasswordResetEmail(email: string, resetToken: string, userName: string): Promise<void> {
    try {
      const transporter = await this.getTransporter();
      const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
      
      const mailOptions = {
        from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
        to: email,
        subject: 'Reset Your Password - AcquireFlow',
        html: this.generatePasswordResetHTML(userName, resetUrl, email),
        text: this.generatePasswordResetText(userName, resetUrl, email)
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info('Password reset email sent successfully', { 
        email, 
        userName, 
        messageId: info.messageId 
      });
    } catch (error) {
      logger.error('Failed to send password reset email', { error: (error as any).message, email });
      throw new Error('Failed to send password reset email');
    }
  }

  /**
   * Send welcome email
   */
  static async sendWelcomeEmail(email: string, userName: string): Promise<void> {
    try {
      const transporter = await this.getTransporter();
      
      const mailOptions = {
        from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
        to: email,
        subject: 'Welcome to AcquireFlow! 🎉',
        html: this.generateWelcomeHTML(userName),
        text: this.generateWelcomeText(userName)
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info('Welcome email sent successfully', { 
        email, 
        userName, 
        messageId: info.messageId 
      });
    } catch (error) {
      logger.error('Failed to send welcome email', { error: (error as any).message, email });
      // Don't throw error for welcome email - it's not critical
    }
  }

  /**
   * Generate HTML content for password reset email
   */
  private static generatePasswordResetHTML(userName: string, resetUrl: string, email: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - AcquireFlow</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; 
            padding: 20px 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #ffffff; 
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
            position: relative;
          }
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }
          .header h1 { 
            margin: 0; 
            font-size: 32px; 
            font-weight: 700;
            position: relative;
            z-index: 1;
          }
          .header .icon {
            font-size: 48px;
            margin-bottom: 16px;
            display: block;
          }
          .content { 
            padding: 50px 40px; 
            background: #ffffff;
            position: relative;
          }
          .content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 40px;
            right: 40px;
            height: 4px;
            background: linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6);
            border-radius: 2px;
          }
          .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
          }
          .description {
            font-size: 16px; 
            color: #6b7280; 
            margin-bottom: 30px;
            line-height: 1.7;
          }
          .button-container {
            text-align: center;
            margin: 35px 0;
          }
          .button { 
            display: inline-block; 
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white; 
            padding: 18px 36px; 
            text-decoration: none; 
            border-radius: 12px; 
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }
          .button:hover::before {
            left: 100%;
          }
          .warning { 
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 1px solid #f59e0b; 
            padding: 25px; 
            border-radius: 12px; 
            margin: 30px 0;
            position: relative;
            border-left: 4px solid #f59e0b;
          }
          .warning-icon {
            display: inline-block;
            margin-right: 8px;
            font-size: 20px;
          }
          .warning strong {
            color: #92400e;
            font-weight: 600;
          }
          .support-link {
            color: #10b981;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
          }
          .support-link:hover {
            color: #059669;
          }
          .closing {
            margin-top: 30px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
          }
          .footer { 
            text-align: center; 
            padding: 30px; 
            color: #9ca3af; 
            font-size: 14px; 
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
          }
          .footer p {
            margin-bottom: 8px;
          }
          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 15px;
          }
          @media (max-width: 600px) {
            .container { margin: 10px; border-radius: 12px; }
            .header { padding: 30px 20px; }
            .header h1 { font-size: 28px; }
            .content { padding: 30px 20px; }
            .button { padding: 16px 28px; font-size: 15px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="icon">🔐</span>
            <h1>Reset Your Password</h1>
          </div>
          <div class="content">
            <div class="greeting">Hello ${userName},</div>
            <p class="description">
              We received a request to reset your password for your AcquireFlow account. 
              Click the button below to securely reset your password and regain access to your account.
            </p>
            
            <div class="button-container">
              <a href="${resetUrl}" class="button">Reset Password Now</a>
            </div>
            
            <div class="warning">
              <span class="warning-icon">⚠️</span>
              <strong>Important:</strong> This password reset link will expire in 1 hour for security reasons. 
              If you don't reset your password within this time, you'll need to request a new link.
            </div>
            
            <p class="description">
              If you didn't request this password reset, you can safely ignore this email. 
              Your password will remain unchanged and your account is secure.
            </p>
            
            <p class="description">
              Need help? Our support team is here for you at 
              <a href="mailto:support@acquireflow.com" class="support-link">support@acquireflow.com</a>
            </p>
            
            <div class="closing">
              <p class="description">
                Best regards,<br>
                <strong>The AcquireFlow Team</strong>
              </p>
            </div>
          </div>
          <div class="footer">
            <div class="logo">🏠 AcquireFlow</div>
            <p>This email was sent to <strong>${email}</strong></p>
            <p>© 2024 AcquireFlow. All rights reserved.</p>
            <p>Empowering real estate professionals with intelligent lead generation</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate plain text content for password reset email
   */
  private static generatePasswordResetText(userName: string, resetUrl: string, email: string): string {
    return `
╔══════════════════════════════════════════════════════════════╗
║                    🔐 RESET YOUR PASSWORD                    ║
║                        AcquireFlow                          ║
╚══════════════════════════════════════════════════════════════╝

Hello ${userName},

We received a request to reset your password for your AcquireFlow account. 
Click the link below to securely reset your password and regain access to your account.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔐 RESET PASSWORD NOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${resetUrl}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  SECURITY NOTICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This password reset link will expire in 1 hour for security reasons. 
If you don't reset your password within this time, you'll need to 
request a new link.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️  IMPORTANT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• If you didn't request this password reset, you can safely ignore this email
• Your password will remain unchanged and your account is secure
• This is an automated message - please do not reply to this email

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆘 NEED HELP?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Our support team is here for you at: support@acquireflow.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Best regards,
The AcquireFlow Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏠 AcquireFlow - Empowering Real Estate Professionals
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Email sent to: ${email}
© 2024 AcquireFlow. All rights reserved.
    `;
  }

  /**
   * Generate HTML content for welcome email
   */
  private static generateWelcomeHTML(userName: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to AcquireFlow!</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; 
            padding: 20px 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #ffffff; 
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
            position: relative;
          }
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }
          .header h1 { 
            margin: 0; 
            font-size: 32px; 
            font-weight: 700;
            position: relative;
            z-index: 1;
          }
          .header .icon {
            font-size: 48px;
            margin-bottom: 16px;
            display: block;
          }
          .content { 
            padding: 50px 40px; 
            background: #ffffff;
            position: relative;
          }
          .content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 40px;
            right: 40px;
            height: 4px;
            background: linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6);
            border-radius: 2px;
          }
          .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
          }
          .description {
            font-size: 16px; 
            color: #6b7280; 
            margin-bottom: 30px;
            line-height: 1.7;
          }
          .feature-list { 
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 30px; 
            border-radius: 16px; 
            margin: 30px 0;
            border: 1px solid #e2e8f0;
            position: relative;
          }
          .feature-list::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #10b981, #3b82f6);
            border-radius: 3px 3px 0 0;
          }
          .feature-list h3 {
            color: #1f2937; 
            margin-bottom: 20px;
            font-size: 20px;
            font-weight: 600;
          }
          .feature-list ul {
            color: #4b5563; 
            font-size: 16px;
            list-style: none;
          }
          .feature-list li {
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
          }
          .feature-list li:last-child {
            border-bottom: none;
          }
          .feature-list li::before {
            content: '✨';
            margin-right: 12px;
            font-size: 18px;
          }
          .cta-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border-radius: 16px;
            border: 1px solid #bfdbfe;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
          }
          .closing {
            margin-top: 30px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
          }
          .footer { 
            text-align: center; 
            padding: 30px; 
            color: #9ca3af; 
            font-size: 14px; 
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
          }
          .footer p {
            margin-bottom: 8px;
          }
          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 15px;
          }
          @media (max-width: 600px) {
            .container { margin: 10px; border-radius: 12px; }
            .header { padding: 30px 20px; }
            .header h1 { font-size: 28px; }
            .content { padding: 30px 20px; }
            .feature-list { padding: 20px; }
            .cta-section { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="icon">🎉</span>
            <h1>Welcome to AcquireFlow!</h1>
          </div>
          <div class="content">
            <div class="greeting">Hello ${userName},</div>
            <p class="description">
              Welcome to AcquireFlow! We're thrilled to have you join our community of real estate professionals. 
              Your account has been successfully created and you now have access to all our powerful lead generation tools.
            </p>
            
            
            <div class="cta-section">
              <p class="description" style="margin-bottom: 20px;">
                Ready to get started? Your dashboard is waiting for you!
              </p>
              <a href="http://localhost:5173/dashboard" class="cta-button">
                Go to Dashboard
              </a>
            </div>
            
            <p class="description">
              If you have any questions or need help getting started, our support team is here to help! 
              Don't hesitate to reach out at <a href="mailto:support@acquireflow.com" style="color: #10b981; text-decoration: none;">support@acquireflow.com</a>
            </p>
            
            <div class="closing">
              <p class="description">
                Best regards,<br>
                <strong>The AcquireFlow Team</strong>
              </p>
            </div>
          </div>
          <div class="footer">
            <div class="logo">🏠 AcquireFlow</div>
            <p>© 2024 AcquireFlow. All rights reserved.</p>
            <p>Empowering real estate professionals with intelligent lead generation</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate plain text content for welcome email
   */
  private static generateWelcomeText(userName: string): string {
    return `
╔══════════════════════════════════════════════════════════════╗
║                    🎉 WELCOME TO ACQUIREFLOW                 ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Hello ${userName},

Welcome to AcquireFlow! We're thrilled to have you join our community 
of real estate professionals. Your account has been successfully created 
and you now have access to all our powerful lead generation tools.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 GETTING STARTED GUIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Here's what you can do next:

✨ Explore your personalized dashboard
✨ Create your first marketing campaign  
✨ Import and manage your contacts
✨ Set up your preferences and automation
✨ Access market intelligence reports

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 READY TO START?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your dashboard is waiting for you! Visit:
http://localhost:5173/dashboard

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 PRO TIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Start with a simple campaign to get familiar with the platform
• Import your existing contacts to build your first audience
• Check out our tutorials in the Help Center
• Set up your profile and preferences for personalized experience

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆘 NEED HELP?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If you have any questions or need help getting started, our support 
team is here for you! Don't hesitate to reach out at:
support@acquireflow.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Best regards,
The AcquireFlow Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏠 AcquireFlow - Empowering Real Estate Professionals
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

© 2024 AcquireFlow. All rights reserved.
    `;
  }

  /**
   * Send 2FA OTP for login
   */
  static async send2FAOTP(email: string, otpCode: string): Promise<void> {
    try {
      const transporter = await this.getTransporter();
      
      const mailOptions = {
        from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
        to: email,
        subject: 'Your 2FA Code - AcquireFlow',
        html: this.generate2FAOTPHTML(otpCode),
        text: this.generate2FAOTPText(otpCode)
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info('2FA OTP email sent successfully', { 
        email, 
        messageId: info.messageId 
      });
    } catch (error) {
      logger.error('Failed to send 2FA OTP email', { error: (error as any).message, email });
      throw new Error('Failed to send 2FA OTP email');
    }
  }

  /**
   * Send 2FA setup OTP
   */
  static async send2FASetupOTP(email: string, otpCode: string): Promise<void> {
    try {
      const transporter = await this.getTransporter();
      
      const mailOptions = {
        from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
        to: email,
        subject: 'Setup 2FA - Your Verification Code - AcquireFlow',
        html: this.generate2FASetupOTPHTML(otpCode),
        text: this.generate2FASetupOTPText(otpCode)
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info('2FA setup OTP email sent successfully', { 
        email, 
        messageId: info.messageId 
      });
    } catch (error) {
      logger.error('Failed to send 2FA setup OTP email', { error: (error as any).message, email });
      throw new Error('Failed to send 2FA setup OTP email');
    }
  }

  /**
   * Send 2FA disable OTP
   */
  static async send2FADisableOTP(email: string, otpCode: string): Promise<void> {
    try {
      const transporter = await this.getTransporter();
      
      const mailOptions = {
        from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
        to: email,
        subject: 'Disable 2FA - Your Verification Code - AcquireFlow',
        html: this.generate2FADisableOTPHTML(otpCode),
        text: this.generate2FADisableOTPText(otpCode)
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info('2FA disable OTP email sent successfully', { 
        email, 
        messageId: info.messageId 
      });
    } catch (error) {
      logger.error('Failed to send 2FA disable OTP email', { error: (error as any).message, email });
      throw new Error('Failed to send 2FA disable OTP email');
    }
  }

  /**
   * Generate HTML content for 2FA OTP email
   */
  private static generate2FAOTPHTML(otpCode: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>2FA Code - AcquireFlow</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .otp-code { background: #e5e7eb; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; margin: 20px 0; }
          .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Two-Factor Authentication</h1>
          </div>
          <div class="content">
            <h2>Your Login Verification Code</h2>
            <p>Use this code to complete your login:</p>
            <div class="otp-code">${otpCode}</div>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul>
                <li>This code expires in 10 minutes</li>
                <li>Never share this code with anyone</li>
                <li>If you didn't request this code, please contact support immediately</li>
              </ul>
            </div>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate text content for 2FA OTP email
   */
  private static generate2FAOTPText(otpCode: string): string {
    return `
Two-Factor Authentication - AcquireFlow

Your Login Verification Code: ${otpCode}

This code expires in 10 minutes.

SECURITY NOTICE:
- Never share this code with anyone
- If you didn't request this code, contact support immediately

If you have any questions, please contact our support team.
    `;
  }

  /**
   * Generate HTML content for 2FA setup OTP email
   */
  private static generate2FASetupOTPHTML(otpCode: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Setup 2FA - AcquireFlow</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .otp-code { background: #e5e7eb; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; margin: 20px 0; }
          .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Setup Two-Factor Authentication</h1>
          </div>
          <div class="content">
            <h2>Your Setup Verification Code</h2>
            <p>Use this code to complete your 2FA setup:</p>
            <div class="otp-code">${otpCode}</div>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul>
                <li>This code expires in 15 minutes</li>
                <li>Never share this code with anyone</li>
                <li>This code is only for setting up 2FA</li>
              </ul>
            </div>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate text content for 2FA setup OTP email
   */
  private static generate2FASetupOTPText(otpCode: string): string {
    return `
Setup Two-Factor Authentication - AcquireFlow

Your Setup Verification Code: ${otpCode}

This code expires in 15 minutes.

SECURITY NOTICE:
- Never share this code with anyone
- This code is only for setting up 2FA

If you have any questions, please contact our support team.
    `;
  }

  /**
   * Generate HTML content for 2FA disable OTP email
   */
  private static generate2FADisableOTPHTML(otpCode: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Disable 2FA - AcquireFlow</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .otp-code { background: #e5e7eb; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; margin: 20px 0; }
          .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔓 Disable Two-Factor Authentication</h1>
          </div>
          <div class="content">
            <h2>Your Disable Verification Code</h2>
            <p>Use this code to disable 2FA:</p>
            <div class="otp-code">${otpCode}</div>
            <div class="warning">
              <strong>⚠️ Security Warning:</strong>
              <ul>
                <li>This code expires in 10 minutes</li>
                <li>Never share this code with anyone</li>
                <li>Disabling 2FA reduces your account security</li>
                <li>Only proceed if you're sure you want to disable 2FA</li>
              </ul>
            </div>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate text content for 2FA disable OTP email
   */
  private static generate2FADisableOTPText(otpCode: string): string {
    return `
Disable Two-Factor Authentication - AcquireFlow

Your Disable Verification Code: ${otpCode}

This code expires in 10 minutes.

SECURITY WARNING:
- Never share this code with anyone
- Disabling 2FA reduces your account security
- Only proceed if you're sure you want to disable 2FA

If you have any questions, please contact our support team.
    `;
  }

  /**
   * Test email connection
   */
  static async testConnection(): Promise<boolean> {
    try {
      const transporter = await this.getTransporter();
      await transporter.verify();
      return true;
    } catch (error) {
      logger.error('SMTP connection test failed:', error);
      return false;
    }
  }
}

export default EmailService; 
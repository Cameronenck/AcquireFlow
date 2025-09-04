# Email Service Setup Guide

## Current Status
The email service is currently using **Ethereal Email** for testing. This means:
- ✅ Emails are being sent to a test account
- ✅ You can view emails via preview URLs in the server console
- ❌ Emails are NOT being sent to real user email addresses
- ⚠️ This is for development/testing only

## How to View Test Emails

When you request a password reset, check your server console for output like:
```
📧 TEST EMAIL SENT!
Preview URL: https://ethereal.email/message/abc123...
This is a test email - check the URL above to see the email content
```

Click the preview URL to see the actual email that would be sent.

## To Send Real Emails

You need to configure one of the following services:

### Option 1: Fix Gmail (Recommended for Development)

#### Step 1: Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"

#### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" as the app
3. Select "Other" as the device
4. Click "Generate"
5. Copy the 16-character password

#### Step 3: Update .env File
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_16_character_app_password
SMTP_FROM_EMAIL=your_gmail@gmail.com
SMTP_FROM_NAME=AcquireFlow
```

### Option 2: Use SendGrid (Recommended for Production)

#### Step 1: Create SendGrid Account
1. Go to https://sendgrid.com/
2. Sign up for free account (100 emails/day free)
3. Verify your domain or use single sender verification

#### Step 2: Get API Key
1. Go to Settings → API Keys
2. Create a new API Key with "Mail Send" permissions
3. Copy the API key

#### Step 3: Update .env File
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
SMTP_FROM_EMAIL=your_verified_email@yourdomain.com
SMTP_FROM_NAME=AcquireFlow
```

### Option 3: Use Mailgun (Free Tier)

#### Step 1: Create Mailgun Account
1. Go to https://www.mailgun.com/
2. Sign up for free account (5,000 emails/month free)
3. Verify your domain

#### Step 2: Get SMTP Credentials
1. Go to Sending → Domains
2. Click on your domain
3. Copy SMTP credentials

#### Step 3: Update .env File
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@yourdomain.com
SMTP_PASS=your_mailgun_password
SMTP_FROM_EMAIL=noreply@yourdomain.com
SMTP_FROM_NAME=AcquireFlow
```

### Option 4: Use Outlook/Hotmail

#### Step 1: Create Outlook Account
1. Go to https://outlook.live.com/
2. Create a new account

#### Step 2: Update .env File
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_outlook_email@outlook.com
SMTP_PASS=your_outlook_password
SMTP_FROM_EMAIL=your_outlook_email@outlook.com
SMTP_FROM_NAME=AcquireFlow
```

## Testing

After configuring any of the above services:

1. Restart your backend server
2. Test the email connection:
   ```bash
   curl http://localhost:3000/api/v1/auth/test-email
   ```
3. Try the forgot password feature
4. Check your email inbox (not the server console)

## Current Behavior

Until you configure a real email service:
- ✅ Password reset requests work (no errors)
- ✅ Emails are sent to test account
- ✅ Preview URLs are provided in server console
- ❌ Emails are not delivered to real user email addresses
- ⚠️ Users will think emails were sent but won't receive them

## Recommendation

- **For Development**: Use **Gmail with App Password** (Option 1) - easiest to set up
- **For Production**: Use **SendGrid** (Option 2) - more reliable and better deliverability
- **For Testing**: Current Ethereal Email setup is perfect for development

## Quick Fix

To get real emails working immediately:
1. Follow Option 1 (Gmail) above
2. Update your `.env` file with the correct credentials
3. Restart the server
4. Test with forgot password feature

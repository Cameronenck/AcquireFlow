# Test Environment Setup for Email Functionality

## Required Environment Variables

Make sure you have these in your `.env` file:

```bash
# SMTP Configuration (for Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM_EMAIL=your_email@gmail.com
SMTP_FROM_NAME=AcquireFlow

# Other required variables
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
SESSION_SECRET=your-session-secret-key
MONGODB_URI=your_mongodb_connection_string
```

## SMTP Setup (Much Easier than SendGrid!)

### Option 1: Gmail (Recommended for Testing)
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**: Go to Google Account → Security → App Passwords
3. **Use App Password**: Use the generated password as `SMTP_PASS`
4. **Update .env**: Set `SMTP_USER` to your Gmail address

### Option 2: Outlook/Hotmail
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Option 3: Custom SMTP Server
```bash
SMTP_HOST=your_smtp_server.com
SMTP_PORT=587
SMTP_SECURE=false
```

## Testing the Email API

### 1. Test SMTP Connection

```bash
curl -X GET http://localhost:3000/api/v1/auth/test-email
```

**Expected Response:**
```json
{
  "success": true,
  "message": "SMTP connection successful"
}
```

### 2. Test Forgot Password (Send Reset Email)

```bash
curl -X POST http://localhost:3000/api/v1/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "If an account with that email exists, a password reset link has been sent"
}
```

### 3. Test Reset Token Verification

```bash
curl -X POST http://localhost:3000/api/v1/auth/verify-reset-token \
  -H "Content-Type: application/json" \
  -d '{
    "resetToken": "your_jwt_token_here"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Reset token is valid",
  "data": {
    "email": "test@example.com",
    "userName": "Test"
  }
}
```

### 4. Test Password Reset

```bash
curl -X POST http://localhost:3000/api/v1/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "resetToken": "your_jwt_token_here",
    "newPassword": "NewPassword123!"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

## Email Templates

The system includes:
- **Password Reset Email**: Professional HTML email with reset link
- **Welcome Email**: Sent after successful registration
- **Beautiful Design**: Modern, responsive email templates

## Troubleshooting

1. **Gmail Issues**: Make sure you're using an App Password, not your regular password
2. **Check Server Logs**: Look for SMTP connection errors
3. **Verify Environment**: Ensure all SMTP variables are set correctly
4. **Test Connection**: Use the test endpoint first
5. **Check Spam Folder**: Test emails might go to spam initially

## Security Features

- **Token Expiration**: Reset tokens expire in 1 hour
- **Secure Links**: Reset URLs include encrypted tokens
- **Rate Limiting**: Built-in protection against abuse
- **Logging**: Comprehensive audit trail for security

## Why Nodemailer is Better

✅ **Free**: No monthly costs or API limits
✅ **Simple**: Easy to set up and configure
✅ **Flexible**: Works with any SMTP provider
✅ **Reliable**: Industry-standard email library
✅ **Local Testing**: Can test with local SMTP servers 
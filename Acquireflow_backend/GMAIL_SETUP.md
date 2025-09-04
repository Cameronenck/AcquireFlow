# Gmail SMTP Setup Guide

## Current Issue
Your Gmail app password is not working, which is why emails are being sent to test accounts instead of real user inboxes.

## Step-by-Step Fix

### Step 1: Check Your Current .env File
First, let's see what's currently in your `.env` file:
```bash
SMTP_USER=varunbro2107@gmail.com
SMTP_PASS=qpxfjpgaxmlrncqf  # This password is not working
```

### Step 2: Generate a New Gmail App Password

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Sign in with**: `varunbro2107@gmail.com`
3. **Navigate to Security**: Click "Security" in the left sidebar
4. **Enable 2-Step Verification** (if not already enabled):
   - Click "2-Step Verification"
   - Follow the setup process
5. **Generate App Password**:
   - Go back to Security
   - Click "2-Step Verification" again
   - Scroll down to "App passwords"
   - Click "App passwords"
   - Select "Mail" as the app
   - Select "Other" as the device
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update Your .env File

Replace your current `.env` file with:
```bash
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
MONGODB_URI=mongodb+srv://vineetdev2007:vineetdev2007@cluster0.8qjgnmp.mongodb.net/?retrywrites=

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=varunbro2107@gmail.com
SMTP_PASS=your_new_16_character_app_password
SMTP_FROM_EMAIL=varunbro2107@gmail.com
SMTP_FROM_NAME=AcquireFlow

# Other configurations...
```

**Important**: Replace `your_new_16_character_app_password` with the actual 16-character password you generated.

### Step 4: Test the Configuration

1. **Restart your backend server**
2. **Try the forgot password feature**
3. **Check the console output** - you should see:
   ```
   📧 EMAIL SENT SUCCESSFULLY VIA GMAIL!
   Check your email inbox for the password reset link.
   ```

### Step 5: Verify Email Delivery

1. **Check the user's Gmail inbox** (including spam folder)
2. **Look for an email from**: `varunbro2107@gmail.com`
3. **Subject**: "Reset Your Password - AcquireFlow"

## Common Issues and Solutions

### Issue 1: "Invalid login" Error
**Solution**: The app password is incorrect or expired
- Generate a new app password
- Make sure you're using the 16-character password (remove spaces)

### Issue 2: "Less secure app access" Error
**Solution**: Gmail no longer supports this
- You MUST use app passwords
- 2-Step Verification must be enabled

### Issue 3: "Username and Password not accepted"
**Solution**: 
- Check if the email address is correct
- Verify the app password is copied correctly
- Make sure 2-Step Verification is enabled

### Issue 4: Emails going to spam
**Solution**:
- Check the spam folder
- Mark the email as "Not spam"
- Add `varunbro2107@gmail.com` to contacts

## Alternative: Use a Different Gmail Account

If you continue having issues with `varunbro2107@gmail.com`:

1. **Create a new Gmail account** specifically for your application
2. **Follow the same steps** above with the new account
3. **Update your .env file** with the new credentials

## Testing Checklist

- [ ] 2-Step Verification enabled
- [ ] App password generated (16 characters)
- [ ] .env file updated with correct credentials
- [ ] Backend server restarted
- [ ] Forgot password feature tested
- [ ] Email received in user's inbox
- [ ] Reset link works correctly

## Expected Behavior After Fix

- ✅ **Gmail SMTP connection established successfully**
- ✅ **Email sent successfully via Gmail**
- ✅ **User receives email in their Gmail inbox**
- ✅ **Password reset link works correctly**

## Need Help?

If you're still having issues:
1. Double-check all steps above
2. Try with a different Gmail account
3. Check the server logs for specific error messages
4. Make sure your Gmail account is not restricted

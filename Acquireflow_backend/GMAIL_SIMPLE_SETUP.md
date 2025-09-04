# Simple Gmail SMTP Setup

## Current Issue
Your Gmail app password is not working. Let's fix this step by step.

## Quick Fix Steps

### Step 1: Generate a New Gmail App Password

1. **Go to**: https://myaccount.google.com/apppasswords
2. **Sign in** with: `varunbro2107@gmail.com`
3. **Select app**: Choose "Mail"
4. **Select device**: Choose "Other (Custom name)"
5. **Enter name**: "AcquireFlow"
6. **Click**: "Generate"
7. **Copy the 16-character password** (remove spaces)

### Step 2: Update Your .env File

Make sure your `.env` file has these exact settings:

```bash
# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=varunbro2107@gmail.com
SMTP_PASS=your_new_16_character_app_password
SMTP_FROM_EMAIL=varunbro2107@gmail.com
SMTP_FROM_NAME=AcquireFlow

# App Configuration
FRONTEND_URL=http://localhost:5173
```

**Important**: Replace `your_new_16_character_app_password` with the actual password you generated.

### Step 3: Test the Configuration

1. **Restart your backend server**
2. **Test the connection**:
   ```bash
   curl http://localhost:3000/api/v1/auth/test-email
   ```
3. **Try the forgot password feature**

## Expected Results

✅ **Gmail SMTP connected successfully!**  
✅ **Emails will be sent to real user inboxes.**  
✅ **📧 EMAIL SENT SUCCESSFULLY VIA GMAIL!**  

## Common Issues

### "Invalid login" Error
- Generate a new app password
- Make sure 2-Step Verification is enabled
- Copy the password exactly (16 characters, no spaces)

### "Username and Password not accepted"
- Check that the email address is correct
- Verify the app password is copied correctly
- Make sure you're using the app password, not your regular Gmail password

### "Less secure app access" Error
- Gmail no longer supports this
- You MUST use app passwords
- 2-Step Verification must be enabled

## Testing Checklist

- [ ] 2-Step Verification enabled
- [ ] New app password generated
- [ ] .env file updated
- [ ] Backend server restarted
- [ ] Test endpoint working
- [ ] Forgot password working
- [ ] Emails received in inbox

## Need Help?

If you're still having issues:
1. Double-check all steps above
2. Try with a different Gmail account
3. Check the server logs for specific error messages
4. Make sure your Gmail account is not restricted

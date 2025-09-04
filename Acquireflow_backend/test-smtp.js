const nodemailer = require('nodemailer');
require('dotenv').config();

async function testSMTP() {
  console.log('Testing SMTP connection...');
  console.log('SMTP Configuration:');
  console.log('Host:', process.env.SMTP_HOST);
  console.log('Port:', process.env.SMTP_PORT);
  console.log('User:', process.env.SMTP_USER);
  console.log('From Email:', process.env.SMTP_FROM_EMAIL);
  console.log('Password length:', process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 'NOT SET');
  
  // Create transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true,
    logger: true
  });

  try {
    console.log('\nVerifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    // Test sending an email
    console.log('\nTesting email send...');
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Test'}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_USER, // Send to yourself for testing
      subject: 'SMTP Test - AcquireFlow',
      text: 'This is a test email to verify SMTP configuration.',
      html: '<h1>SMTP Test</h1><p>This is a test email to verify SMTP configuration.</p>'
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ SMTP connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('Command:', error.command);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Make sure 2-Factor Authentication is enabled on your Gmail account');
      console.log('2. Generate a new App Password: Google Account → Security → 2-Step Verification → App Passwords');
      console.log('3. Use the 16-character app password (without spaces)');
      console.log('4. Make sure you\'re using the correct Gmail address');
    }
  }
}

testSMTP();

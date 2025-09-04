const { EmailService } = require('./dist/services/emailService');

async function testFixedEmail() {
  console.log('Testing fixed email service...');
  
  try {
    // Test connection
    console.log('\n1. Testing email connection...');
    const isConnected = await EmailService.testConnection();
    
    if (isConnected) {
      console.log('✅ Email service is working!');
      
      // Test sending an email
      console.log('\n2. Testing email send...');
      await EmailService.sendPasswordResetEmail(
        'test@example.com',
        'test-token-123',
        'Test User'
      );
      
      console.log('✅ Email sent successfully!');
      console.log('📧 Check the console output above for preview URL if using test account');
      
    } else {
      console.log('❌ Email service connection failed');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFixedEmail();

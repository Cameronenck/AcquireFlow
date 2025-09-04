const { AuthService } = require('./dist/services/authService');

async function testEmailError() {
  console.log('Testing email error functionality...');
  
  try {
    // Test with a non-existent email
    const nonExistentEmail = 'nonexistent@example.com';
    console.log('\n1. Testing password reset for non-existent email:', nonExistentEmail);
    
    try {
      await AuthService.requestPasswordReset(nonExistentEmail);
      console.log('❌ ERROR: Should have thrown an error for non-existent email');
    } catch (error) {
      console.log('✅ SUCCESS: Error thrown for non-existent email');
      console.log('Error message:', error.message);
    }
    
    // Test with an existing email (if you have one in your database)
    const existingEmail = 'dev.univisionz@gmail.com';
    console.log('\n2. Testing password reset for existing email:', existingEmail);
    
    try {
      await AuthService.requestPasswordReset(existingEmail);
      console.log('✅ SUCCESS: Password reset sent for existing email');
    } catch (error) {
      console.log('❌ ERROR: Should not have thrown an error for existing email');
      console.log('Error message:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testEmailError();

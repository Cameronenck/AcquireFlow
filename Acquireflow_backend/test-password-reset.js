const { AuthService } = require('./dist/services/authService');

async function testPasswordReset() {
  console.log('Testing password reset functionality...');
  
  try {
    // Test with a specific email
    const testEmail = 'test@example.com';
    console.log('\n1. Testing password reset for:', testEmail);
    
    await AuthService.requestPasswordReset(testEmail);
    
    console.log('✅ Password reset test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPasswordReset();

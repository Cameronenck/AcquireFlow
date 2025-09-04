const { AuthService } = require('./dist/services/authService');

async function testErrorFix() {
  console.log('Testing error fix for non-existent emails...');
  
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
      
      if (error.message === 'No account found with this email address') {
        console.log('✅ CORRECT: Error message is correct');
      } else {
        console.log('❌ WRONG: Error message is incorrect:', error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testErrorFix();

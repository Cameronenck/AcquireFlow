import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const ResetPasswordForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [userInfo, setUserInfo] = useState<{ email: string; userName: string } | null>(null);

  const resetToken = searchParams.get('token');

  // Password strength validation
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passwordStrength = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;

  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 4) return 'Medium';
    return 'Strong';
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Validate reset token on component mount
  useEffect(() => {
    const validateToken = async () => {
      if (!resetToken) {
        setError('Invalid reset link. Please request a new password reset.');
        setIsValidating(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/v1/auth/verify-reset-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resetToken })
        });

        const data = await response.json();

        if (data.success) {
          setUserInfo(data.data);
        } else {
          setError(data.message || 'Invalid or expired reset link');
        }
      } catch (err) {
        setError('Failed to validate reset link. Please try again.');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [resetToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Please create a stronger password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Validating Reset Link</h3>
            <p className="text-gray-600">Please wait while we verify your reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Password Reset Successful!</h3>
              <p className="text-green-100">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
            </div>
            <div className="px-8 py-8 text-center">
              <button 
                onClick={() => navigate('/auth')} 
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Sign In Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 px-8 py-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Reset Link Invalid</h3>
              <p className="text-red-100">{error}</p>
            </div>
            <div className="px-8 py-8 text-center">
              <button 
                onClick={() => navigate('/auth')} 
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/auth')} 
          className="flex items-center text-gray-600 hover:text-primary mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Sign In
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-8 text-center relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={28} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Reset Your Password
              </h1>
              <p className="text-emerald-100 text-lg">
                Hello {userInfo?.userName}, enter your new password below
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 flex items-start">
                <AlertCircle size={20} className="flex-shrink-0 mr-3 mt-0.5 text-red-500" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div>
                <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700 mb-3">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input 
                    id="new-password" 
                    type={showPassword ? 'text' : 'password'} 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)} 
                    className="pl-12 pr-12 py-4 w-full border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg" 
                    placeholder="••••••••" 
                    required 
                    disabled={isLoading}
                  />
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors duration-200" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 
                      <EyeOff size={20} className="text-gray-400 hover:text-gray-600" /> : 
                      <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                    }
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-700">Password Strength</span>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        passwordStrength <= 2 ? 'bg-red-100 text-red-700' :
                        passwordStrength <= 4 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {getPasswordStrengthLabel()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength <= 2 ? 'bg-red-500' :
                          passwordStrength <= 4 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`} 
                        style={{ width: `${passwordStrength / 5 * 100}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center ${hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">{hasMinLength ? '✓' : '○'}</span>
                        At least 8 characters
                      </div>
                      <div className={`flex items-center ${hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">{hasUpperCase ? '✓' : '○'}</span>
                        Uppercase letter
                      </div>
                      <div className={`flex items-center ${hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">{hasLowerCase ? '✓' : '○'}</span>
                        Lowercase letter
                      </div>
                      <div className={`flex items-center ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">{hasNumber ? '✓' : '○'}</span>
                        Number
                      </div>
                      <div className={`flex items-center ${hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">{hasSpecialChar ? '✓' : '○'}</span>
                        Special character
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-3">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input 
                    id="confirm-password" 
                    type={showPassword ? 'text' : 'password'} 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    className={`pl-12 pr-4 py-4 w-full border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg ${
                      confirmPassword && newPassword !== confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`} 
                    placeholder="••••••••" 
                    required 
                    disabled={isLoading}
                  />
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <div className="mt-2 text-red-500 text-sm flex items-center">
                    <AlertCircle size={16} className="mr-2" />
                    Passwords do not match
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                  isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword || passwordStrength < 3 
                    ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] shadow-lg hover:shadow-xl'
                } text-white`} 
                disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword || passwordStrength < 3}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting Password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Security Note:</strong> Your new password will be securely encrypted and stored. 
                    Make sure to choose a strong, unique password that you haven't used elsewhere.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
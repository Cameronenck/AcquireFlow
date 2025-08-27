import React, { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, X } from 'lucide-react';
import { passwordService, UpdatePasswordRequest } from '../../services/passwordService';

interface PasswordUpdateFormProps {
  onClose?: () => void;
}

export const PasswordUpdateForm = ({ onClose }: PasswordUpdateFormProps) => {
  const [formData, setFormData] = useState<UpdatePasswordRequest>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<UpdatePasswordRequest>>({});

  const handleInputChange = (field: keyof UpdatePasswordRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear success message when user makes changes
    if (message?.type === 'success') {
      setMessage(null);
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<UpdatePasswordRequest> = {};

    if (!formData.oldPassword) {
      errors.oldPassword = 'Old password is required';
    }

    if (!formData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = 'New password must be at least 8 characters long';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.newPassword)) {
      errors.newPassword = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (formData.oldPassword === formData.newPassword) {
      errors.newPassword = 'New password must be different from old password';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const response = await passwordService.updatePassword(formData);
      
      if (response.success) {
        setMessage({ type: 'success', text: response.message });
        // Clear form on success
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setShowPasswords({
          oldPassword: false,
          newPassword: false,
          confirmPassword: false,
        });
        
        // Close the form after a short delay to show success message
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 2000);
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; color: string } => {
    if (password.length === 0) return { strength: 'weak', color: 'text-gray-400' };
    
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    const isLongEnough = password.length >= 8;

    const score = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;

    if (score <= 2) return { strength: 'weak', color: 'text-red-500' };
    if (score <= 4) return { strength: 'medium', color: 'text-yellow-500' };
    return { strength: 'strong', color: 'text-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium text-lg">Update Password</h2>
            <p className="text-sm text-gray-500 mt-1">
              Change your account password securely
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message Display */}
          {message && (
            <div className={`flex items-center p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle size={20} className="mr-2" />
              ) : (
                <AlertCircle size={20} className="mr-2" />
              )}
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          )}

          {/* Old Password */}
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.oldPassword ? 'text' : 'password'}
                id="oldPassword"
                value={formData.oldPassword}
                onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                  validationErrors.oldPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your current password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('oldPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPasswords.oldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {validationErrors.oldPassword && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.oldPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.newPassword ? 'text' : 'password'}
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                  validationErrors.newPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your new password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPasswords.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Strength:</span>
                  <span className={`text-xs font-medium ${passwordStrength.color}`}>
                    {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                  </span>
                </div>
                <div className="mt-1 flex space-x-1">
                  {[1, 2, 3, 4, 5].map((bar) => {
                    let bgColor = 'bg-gray-200';
                    if (passwordStrength.strength === 'strong' && bar <= 5) bgColor = 'bg-green-500';
                    else if (passwordStrength.strength === 'medium' && bar <= 3) bgColor = 'bg-yellow-500';
                    else if (passwordStrength.strength === 'weak' && bar <= 2) bgColor = 'bg-red-500';
                    
                    return (
                      <div
                        key={bar}
                        className={`h-1 flex-1 rounded-full transition-colors ${bgColor}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            
            {validationErrors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                  validationErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Confirm your new password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPasswords.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {validationErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  formData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                At least 8 characters long
              </li>
              <li className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  /[a-z]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                One lowercase letter
              </li>
              <li className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  /[A-Z]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                One uppercase letter
              </li>
              <li className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  /\d/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                One number
              </li>
              <li className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  /[@$!%*?&]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                One special character (@$!%*?&)
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Updating Password...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Lock size={20} className="mr-2" />
                  Update Password
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

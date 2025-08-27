import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { twoFactorAuthService } from '../../services/twoFactorAuthService';

interface TwoFactorAuthSetupProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const TwoFactorAuthSetup: React.FC<TwoFactorAuthSetupProps> = ({ onClose, onSuccess }) => {
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    initializeSetup();
  }, []);

  const initializeSetup = async () => {
    try {
      setLoading(true);
      setMessage(null);
      
      await twoFactorAuthService.setup2FA();
      setMessage({ type: 'success', text: 'OTP sent to your email. Please check and enter the code below.' });
    } catch (error) {
      setMessage({ type: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode.trim()) {
      setMessage({ type: 'error', text: 'Please enter the OTP code' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      
      const isEnabled = await twoFactorAuthService.verifySetupOTP(otpCode);
      
      if (isEnabled) {
        setMessage({ type: 'success', text: '2FA enabled successfully!' });
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Failed to enable 2FA. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Setting up 2FA...</h2>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg">Complete 2FA Setup</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
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

        {/* OTP Verification */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Verify 2FA Setup</h3>
          <p className="text-sm text-gray-600 mb-4">
            Enter the 6-digit code sent to your email to complete the 2FA setup.
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="otpCode"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-center text-lg font-mono tracking-widest"
                placeholder="000000"
                maxLength={6}
                disabled={loading}
              />
            </div>
            
            <button
              onClick={handleVerifyOTP}
              disabled={loading || otpCode.length !== 6}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CheckCircle size={20} className="mr-2" />
                  Complete Setup
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

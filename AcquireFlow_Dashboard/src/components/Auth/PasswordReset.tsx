import React, { useState } from 'react';
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

type PasswordResetProps = {
  onBack: () => void;
};

export const PasswordReset: React.FC<PasswordResetProps> = ({
  onBack
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err: any) {
      // Handle specific error messages from the backend
      if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to send reset email. Please check your email address and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button 
        onClick={onBack} 
        className="flex items-center text-gray-600 hover:text-primary mb-6"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Sign In
      </button>
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-dark mb-2">
          Reset Your Password
        </h1>
        <p className="text-gray-500">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 flex items-start">
          <AlertCircle size={18} className="flex-shrink-0 mr-2 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 flex flex-col items-center">
          <CheckCircle size={40} className="mb-4 text-green-500" />
          <h3 className="text-lg font-medium mb-2">Reset Link Sent!</h3>
          <p className="text-center mb-4">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-600 text-center mb-4">
            Please check your email and follow the instructions to reset your password. 
            The link will expire in 1 hour for security reasons.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
            <p className="text-sm text-blue-800 text-center">
              💡 <strong>Tip:</strong> If you don't see the email, check your spam folder
            </p>
          </div>
          <button 
            onClick={onBack} 
            className="mt-6 w-full py-3 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Return to Sign In
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input 
                id="reset-email" 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="you@example.com" 
                required 
                disabled={isLoading}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className={`w-full py-3 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`} 
            disabled={isLoading || !email.trim()}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Reset Link...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
      )}
    </div>
  );
};
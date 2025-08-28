import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, AlertCircle, Check, CreditCard, Calendar, Shield, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { useAuth } from './AuthContext';
type SignupFormProps = {
  onToggleForm: () => void;
};
export const SignupForm: React.FC<SignupFormProps> = ({
  onToggleForm
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  // Credit card information
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [zipCode, setZipCode] = useState('');
  const {
    signup,
    loginWithGoogle
  } = useAuth();
  // Password strength validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
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
  const validateFirstStep = () => {
    setError(null);
    
    // Check if all required fields are filled
    if (!name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    
    // Ensure name has at least first and last name
    const nameParts = name.trim().split(' ');
    if (nameParts.length < 2) {
      setError('Please enter both your first and last name');
      return false;
    }
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    
    if (!password) {
      setError('Please enter a password');
      return false;
    }
    
    if (!confirmPassword) {
      setError('Please confirm your password');
      return false;
    }
    
    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (passwordStrength < 3) {
      setError('Please create a stronger password');
      return false;
    }
    
    return true;
  };
  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format with spaces after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };
  const validateCreditCardInfo = () => {
    setError(null);
    // Basic validations
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }
    if (!cardName) {
      setError('Please enter the name on your card');
      return false;
    }
    if (expiryDate.length !== 5) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (cvv.length < 3 || cvv.length > 4) {
      setError('Please enter a valid CVV/CVC code (3-4 digits)');
      return false;
    }
    if (zipCode.length < 3) {
      setError('Please enter a valid ZIP/postal code');
      return false;
    }
    return true;
  };
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFirstStep()) {
      setCurrentStep(2);
    }
  };
  const handleBack = () => {
    setCurrentStep(1);
    setError(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCreditCardInfo()) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // Prepare card details for the backend
      const cardDetails = {
        cardNumber: cardNumber.replace(/\s/g, ''), // Remove spaces for backend
        nameOnCard: cardName,
        expiryDate: expiryDate,
        cvv: cvv,
        billingZipCode: zipCode
      };
      
      console.log('Submitting signup with card details:', {
        name,
        email,
        cardDetails: {
          ...cardDetails,
          cardNumber: '****' + cardDetails.cardNumber.slice(-4) // Log masked card number
        }
      });
      
      // Call signup with card details
      await signup(name, email, password, cardDetails);
      // Success - user will be redirected by the auth context
    } catch (err: any) {
      console.error('Signup error:', err);
      // Handle specific error messages from the backend
      if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleSignup = async () => {
    setError(null);
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      // After Google login is successful, set the current step to payment information
      setCurrentStep(2);
    } catch (err) {
      setError('Failed to sign up with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };
  return <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-dark mb-2">
          {currentStep === 1 ? 'Start Your 7-Day Free Trial' : 'Payment Information'}
        </h1>
        <p className="text-gray-500">
          {currentStep === 1 ? 'Get full access to all AcquireFlow features' : 'Your card will not be charged until your free trial ends'}
        </p>
      </div>

      {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 flex items-start">
          <AlertCircle size={18} className="flex-shrink-0 mr-2 mt-0.5" />
          <span>{error}</span>
        </div>}

      {/* Step indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-primary text-white' : 'bg-primary-light text-primary'}`}>
              1
            </div>
            <span className="text-xs mt-1">Account</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-200">
            <div className={`h-1 bg-primary ${currentStep === 2 ? 'w-full' : 'w-0'} transition-all duration-300`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <span className="text-xs mt-1">Payment</span>
          </div>
        </div>
      </div>

      {currentStep === 1 ? <form onSubmit={handleContinue}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input 
                id="name" 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className={`pl-10 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  name && name.trim().split(' ').length < 2 ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`} 
                placeholder="John Doe" 
                required 
              />
            </div>
            <div className={`text-xs mt-1 ${
              name && name.trim().split(' ').length < 2 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {name && name.trim().split(' ').length < 2 
                ? 'Please enter both your first and last name' 
                : 'Please enter your first and last name'
              }
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input id="signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" required />
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input id="signup-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-12 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" required />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} className="text-gray-400 hover:text-gray-600" /> : <Eye size={18} className="text-gray-400 hover:text-gray-600" />}
              </button>
            </div>
            {password && <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                    <div className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} style={{
                width: `${passwordStrength / 5 * 100}%`
              }}></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {getPasswordStrengthLabel()}
                  </span>
                </div>
                <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <li className={`flex items-center ${hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                    {hasMinLength ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1">·</span>}
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                    {hasUpperCase ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1">·</span>}
                    Uppercase letter
                  </li>
                  <li className={`flex items-center ${hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                    {hasLowerCase ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1">·</span>}
                    Lowercase letter
                  </li>
                  <li className={`flex items-center ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                    {hasNumber ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1">·</span>}
                    Number
                  </li>
                  <li className={`flex items-center ${hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                    {hasSpecialChar ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1">·</span>}
                    Special character
                  </li>
                </ul>
              </div>}
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input id="confirm-password" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={`pl-10 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${confirmPassword && password !== confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} placeholder="••••••••" required />
              {confirmPassword && password !== confirmPassword && <div className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </div>}
            </div>
          </div>
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <div className="flex">
              <Info size={18} className="flex-shrink-0 mr-2" />
              <div>
                <p className="font-medium">Free Trial Information</p>
                <p className="mt-1">
                  You're signing up for a 7-day free trial. After your trial
                  ends, you'll be charged $49/month unless you cancel.
                </p>
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors ${
              !name.trim() || name.trim().split(' ').length < 2 || !email.trim() || !password || !confirmPassword || passwordStrength < 3 || password !== confirmPassword || isLoading || isGoogleLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`} 
            disabled={!name.trim() || name.trim().split(' ').length < 2 || !email.trim() || !password || !confirmPassword || passwordStrength < 3 || password !== confirmPassword || isLoading || isGoogleLoading}
          >
            Continue
            <ArrowRight size={18} className="ml-2" />
          </button>
        </form> : <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard size={18} className="text-gray-400" />
              </div>
              <input 
                id="card-number" 
                type="text" 
                value={cardNumber} 
                onChange={e => setCardNumber(formatCardNumber(e.target.value))} 
                className={`pl-10 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  cardNumber && cardNumber.replace(/\s/g, '').length !== 16 ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`} 
                placeholder="1234 5678 9012 3456" 
                maxLength={19} 
                required 
              />
            </div>
            {cardNumber && cardNumber.replace(/\s/g, '').length !== 16 && (
              <div className="text-red-500 text-xs mt-1">
                Please enter a valid 16-digit card number
              </div>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input 
                id="card-name" 
                type="text" 
                value={cardName} 
                onChange={e => setCardName(e.target.value)} 
                className={`pl-10 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  cardName && cardName.length < 2 ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`} 
                placeholder="John Doe" 
                required 
              />
            </div>
            {cardName && cardName.length < 2 && (
              <div className="text-red-500 text-xs mt-1">
                Please enter a valid name
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input 
                  id="expiry-date" 
                  type="text" 
                  value={expiryDate} 
                  onChange={e => setExpiryDate(formatExpiryDate(e.target.value))} 
                  className={`pl-10 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    expiryDate && expiryDate.length !== 5 ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`} 
                  placeholder="MM/YY" 
                  maxLength={5} 
                  required 
                />
              </div>
              {expiryDate && expiryDate.length !== 5 && (
                <div className="text-red-500 text-xs mt-1">
                  Please enter a valid expiry date (MM/YY)
                </div>
              )}
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV/CVC
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield size={18} className="text-gray-400" />
                </div>
                <input 
                  id="cvv" 
                  type="text" 
                  value={cvv} 
                  onChange={e => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))} 
                  className={`pl-10 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    cvv && (cvv.length < 3 || cvv.length > 4) ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`} 
                  placeholder="123" 
                  maxLength={4} 
                  required 
                />
              </div>
              {cvv && (cvv.length < 3 || cvv.length > 4) && (
                <div className="text-red-500 text-xs mt-1">
                  CVV must be 3-4 digits
                </div>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700 mb-1">
              Billing ZIP/Postal Code
            </label>
            <input 
              id="zip-code" 
              type="text" 
              value={zipCode} 
              onChange={e => setZipCode(e.target.value.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10))} 
              className={`px-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                zipCode && zipCode.length < 3 ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`} 
              placeholder="12345" 
              required 
            />
            {zipCode && zipCode.length < 3 && (
              <div className="text-red-500 text-xs mt-1">
                Please enter a valid ZIP/postal code
              </div>
            )}
          </div>
          <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
            <div className="flex items-start">
              <Check size={18} className="flex-shrink-0 mr-2 text-primary" />
              <div>
                <p className="font-medium">7-Day Free Trial</p>
                <p className="mt-1 text-gray-600">
                  Your card will not be charged until the end of your 7-day free
                  trial. You can cancel anytime before then.
                </p>
                <p className="mt-2 text-gray-600">
                  After your trial, you'll be charged{' '}
                  <span className="font-medium">$49/month</span> for the
                  Professional Plan.
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mb-6">
            <button type="button" onClick={handleBack} className="flex-1 flex justify-center items-center py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              <ArrowLeft size={18} className="mr-2" />
              Back
            </button>
            <button type="submit" className={`flex-1 flex justify-center items-center py-3 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={18} className="mr-2" />
                  Start Free Trial
                </>
              )}
            </button>
          </div>
        </form>}

      {currentStep === 1 && <>
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button type="button" onClick={handleGoogleSignup} disabled={isLoading || isGoogleLoading} className={`w-full flex justify-center items-center py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors ${isGoogleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {isGoogleLoading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> : <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>}
              {isGoogleLoading ? 'Signing up...' : 'Sign up with Google'}
            </button>
          </div>
        </>}

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button onClick={onToggleForm} className="text-primary font-medium hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>;
};
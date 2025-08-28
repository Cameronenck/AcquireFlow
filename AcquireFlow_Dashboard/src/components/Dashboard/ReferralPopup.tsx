import React, { useEffect, useState, useRef } from 'react';
import { X, Gift, Check } from 'lucide-react';
export const ReferralPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const popupRef = useRef(null);
  const timeoutRef = useRef(null);
  const autoDismissRef = useRef(null);
  // Show popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  // Auto dismiss after 30 seconds of no interaction
  useEffect(() => {
    if (isVisible) {
      autoDismissRef.current = setTimeout(() => {
        handleDismiss();
      }, 30000);
    }
    return () => {
      if (autoDismissRef.current) {
        clearTimeout(autoDismissRef.current);
      }
    };
  }, [isVisible]);
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (popupRef.current && !popupRef.current.contains(event.target) && isVisible) {
        handleDismiss();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);
  // Handle escape key
  useEffect(() => {
    const handleEscKey = event => {
      if (event.key === 'Escape' && isVisible) {
        handleDismiss();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isVisible]);
  const handleDismiss = () => {
    // Reset auto-dismiss timer
    if (autoDismissRef.current) {
      clearTimeout(autoDismissRef.current);
    }
    setIsExiting(true);
    // Remove from DOM after animation completes
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
    }, 300);
  };
  const handleCTAClick = () => {
    // Reset auto-dismiss timer
    if (autoDismissRef.current) {
      clearTimeout(autoDismissRef.current);
    }
    // Show success state briefly
    setIsSuccess(true);
    // Then dismiss after a short delay
    setTimeout(() => {
      handleDismiss();
    }, 1500);
  };
  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (autoDismissRef.current) {
        clearTimeout(autoDismissRef.current);
      }
    };
  }, []);
  if (!isVisible && !isExiting) {
    return null;
  }
  return <div className={`fixed bottom-6 left-6 z-[9999] w-80 transition-all duration-400 ${isExiting ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`} style={{
    transitionTimingFunction: isExiting ? 'ease-in' : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  }}>
      <div ref={popupRef} className="rounded-2xl bg-dark border border-solid border-opacity-20 shadow-xl overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl" style={{
      borderColor: 'rgba(58, 183, 149, 0.2)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
      transform: isSuccess ? 'scale(0.98)' : 'scale(1)',
      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>
        <div className="p-6 relative" style={{
        background: 'linear-gradient(135deg, #2c2c2c 0%, #1f1f1f 100%)'
      }}>
          {/* Close button */}
          <button onClick={handleDismiss} className="absolute top-3 right-3 text-white text-opacity-60 hover:text-opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1" aria-label="Close referral popup">
            <X size={16} />
          </button>
          <div className="flex items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4 animate-pulse-subtle" style={{
            boxShadow: '0 0 0 rgba(58, 183, 149, 0.4)'
          }}>
              {isSuccess ? <Check size={24} className="text-primary" /> : <Gift size={24} className="text-primary" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {isSuccess ? 'Thanks for sharing!' : 'Refer & Earn'}
              </h3>
              <p className="text-sm text-white text-opacity-80 mt-1">
                {isSuccess ? "We'll send you details via email" : 'Get $500 for every qualified investor you refer'}
              </p>
            </div>
          </div>
          {!isSuccess && <button onClick={handleCTAClick} className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium transition-all duration-200 hover:bg-primary-dark hover:scale-105 active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Start Referring
            </button>}
          {/* Particle effects on hover (optional) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(58, 183, 149, 0.4), transparent 70%)'
          }}></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-10" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%)'
          }}></div>
          </div>
        </div>
      </div>
    </div>;
};
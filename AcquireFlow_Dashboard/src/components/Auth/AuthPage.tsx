import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { PasswordReset } from './PasswordReset';
import { Search, Megaphone, LineChart, CheckCircle, ArrowRight, Building, TrendingUp, Zap, Shield, DollarSign, Clock, Target, CreditCard } from 'lucide-react';
export const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');
  const location = useLocation();
  const navigate = useNavigate();

  // Sync internal mode with route path
  useEffect(() => {
    if (location.pathname.startsWith('/signup')) setAuthMode('signup');
    else if (location.pathname.startsWith('/reset')) setAuthMode('reset');
    else setAuthMode('login');
  }, [location.pathname]);
  const toggleAuthMode = () => {
    const next = authMode === 'login' ? 'signup' : 'login';
    setAuthMode(next);
    navigate(next === 'login' ? '/login' : '/signup', { replace: true });
  };
  const showPasswordReset = () => {
    setAuthMode('reset');
    navigate('/reset', { replace: true });
  };
  const backToLogin = () => {
    setAuthMode('login');
    navigate('/login', { replace: true });
  };
  return <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header with logo */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src="/AcquireFlow_Logo_%281%29.svg" alt="AcquireFlow Logo" className="h-10 w-auto" />
          <div className="hidden sm:flex space-x-3">
            {authMode !== 'login' ? <button onClick={() => setAuthMode('login')} className="text-gray-600 hover:text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Sign in
              </button> : <button onClick={() => setAuthMode('signup')} className="text-gray-600 hover:text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Start free trial
              </button>}
            <a href="#" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow">
              Book a demo
            </a>
          </div>
        </div>
      </header>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-start pt-10 pb-16 px-4">
        <div className="w-full max-w-md mx-auto mb-16">
          {/* Form section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform transition-all hover:shadow-2xl">
            {authMode === 'login' && <LoginForm onToggleForm={toggleAuthMode} onForgotPassword={showPasswordReset} />}
            {authMode === 'signup' && <SignupForm onToggleForm={toggleAuthMode} />}
            {authMode === 'reset' && <PasswordReset onBack={backToLogin} />}
          </div>
        </div>
        {/* Features section */}
        <div className="w-full max-w-6xl mx-auto">
          {/* Value proposition */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">
              Unlock Real Estate Investing Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              AcquireFlow helps you find, analyze and close more real estate
              deals with less effort. Our all-in-one platform gives you the edge
              in today's competitive market.
            </p>
          </div>
          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <DollarSign size={28} className="text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-1">$780M+</h3>
              <p className="text-gray-600">In real estate deals facilitated</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-tertiary bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp size={28} className="text-tertiary-dark" />
              </div>
              <h3 className="text-3xl font-bold text-tertiary-dark mb-1">
                23%
              </h3>
              <p className="text-gray-600">Higher ROI than market average</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-secondary bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <Building size={28} className="text-secondary" />
              </div>
              <h3 className="text-3xl font-bold text-secondary mb-1">5,400+</h3>
              <p className="text-gray-600">Active real estate investors</p>
            </div>
          </div>
          {/* Testimonial section */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 text-white shadow-lg mb-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" alt="Michael R." className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                  <div className="absolute -bottom-2 -right-2 bg-tertiary rounded-full w-10 h-10 flex items-center justify-center border-2 border-white">
                    <Building size={18} className="text-dark" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-6 h-6 text-yellow-300 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>)}
                </div>
                <p className="text-xl italic mb-4">
                  "AcquireFlow has completely transformed my investment
                  business. I closed 3 deals in my first month that I would have
                  never found otherwise. The ROI analytics helped me negotiate
                  better terms and increase my profits by 18%."
                </p>
                <div>
                  <p className="font-bold text-lg">Michael Rodriguez</p>
                  <p className="text-white text-opacity-90">
                    Principal at MR Capital Investments, Orlando FL
                  </p>
                  <p className="mt-2 text-sm bg-white bg-opacity-20 inline-block px-3 py-1 rounded-full">
                    $12M+ in deals closed with AcquireFlow
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* CTA section */}
          <div className="bg-gray-900 rounded-2xl p-8 text-white shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to transform your real estate investment strategy?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful investors who are finding better
              deals, closing faster, and maximizing their returns with
              AcquireFlow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center">
                <span>Start 7-day free trial</span>
                <CreditCard size={18} className="ml-2" />
              </button>
              <button className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Schedule a demo
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              Credit card required. Your 7-day free trial includes full access
              to all features.
            </p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2">
              <img src="/AcquireFlow_Logo_%281%29.svg" alt="AcquireFlow Logo" className="h-8 w-auto mb-4" />
              <p className="text-gray-500 text-sm mb-4 max-w-xs">
                AcquireFlow helps real estate investors find, analyze, and close
                more deals with less effort.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary text-sm">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} AcquireFlow. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
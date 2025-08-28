import React, { useState } from 'react';
import { CreditCard, Package, Download, AlertTriangle } from 'lucide-react';
export const BillingSubscription = () => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  return <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Billing & Subscription</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your subscription and billing information
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* Current Plan */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Current Plan
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Professional Plan</h4>
                    <p className="text-sm text-gray-500">$49/month</p>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
            {/* Payment Method */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Payment Method
              </h3>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CreditCard className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/24</p>
                  </div>
                </div>
                <button className="text-primary text-sm font-medium">
                  Update
                </button>
              </div>
            </div>
            {/* Cancel Plan */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Cancel Subscription
              </h3>
              <div className="border border-gray-200 rounded-lg p-4">
                {!showCancelConfirm ? <div>
                    <p className="text-sm text-gray-700 mb-4">
                      If you cancel your subscription, you'll still have access
                      to your current plan until the end of your billing period.
                    </p>
                    <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors" onClick={() => setShowCancelConfirm(true)}>
                      Cancel Plan
                    </button>
                  </div> : <div>
                    <div className="flex items-start mb-4">
                      <AlertTriangle className="text-red-500 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Are you sure you want to cancel?
                        </h4>
                        <p className="text-sm text-gray-700">
                          This will cancel your subscription at the end of the
                          current billing period. You'll lose access to premium
                          features after{' '}
                          <span className="font-medium">June 30, 2023</span>.
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        Confirm Cancellation
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors" onClick={() => setShowCancelConfirm(false)}>
                        Keep My Plan
                      </button>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
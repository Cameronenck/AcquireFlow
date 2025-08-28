import React from 'react';
import { Award, CheckCircle, Clock, Calendar, User, Users, MessageSquare, Video, Phone, FileText, ArrowRight, ChevronRight } from 'lucide-react';
export const PremiumSupport = () => {
  return <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-dark">Premium Support</h1>
              <p className="text-gray-500 mt-1">
                Enhanced support options for enterprise customers
              </p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
              <Award size={16} className="mr-2" />
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Premium Plans Comparison */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-medium text-lg">Premium Support Plans</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-medium text-center">Standard</h3>
                    <div className="text-center mt-2">
                      <span className="text-3xl font-bold">Free</span>
                      <span className="text-gray-500 ml-1">
                        with subscription
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Email support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Community forum access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Knowledge base</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">
                          24-48 hour response time
                        </span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                        Current Plan
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-medium text-center">Enhanced</h3>
                    <div className="text-center mt-2">
                      <span className="text-3xl font-bold">$99</span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Everything in Standard</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Priority email support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Live chat support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">8-12 hour response time</span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <button className="w-full py-2 bg-primary text-white rounded-lg text-sm">
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-primary rounded-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium">
                    Popular
                  </div>
                  <div className="p-6 bg-primary bg-opacity-5 border-b border-primary">
                    <h3 className="font-medium text-center">Premium</h3>
                    <div className="text-center mt-2">
                      <span className="text-3xl font-bold">$299</span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Everything in Enhanced</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Phone support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Dedicated support agent</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">4-hour response time</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Monthly check-in calls</span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <button className="w-full py-2 bg-primary text-white rounded-lg text-sm">
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-medium text-center">Enterprise</h3>
                    <div className="text-center mt-2">
                      <span className="text-3xl font-bold">Custom</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Everything in Premium</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">
                          Dedicated account manager
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Custom SLA</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">
                          On-site training sessions
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Custom implementation</span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Premium Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-medium">Priority Support Access</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
                    <MessageSquare size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dedicated Support Channels</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Get priority access to our support team through dedicated
                      channels.
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">
                        Priority Email Support
                      </h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Enhanced+
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Your support tickets are prioritized in our queue,
                      ensuring faster response times.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">Direct Phone Line</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Premium+
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Access to a direct phone line for immediate assistance
                      during business hours.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">
                        24/7 Emergency Support
                      </h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Enterprise
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Round-the-clock support for critical issues, even outside
                      of business hours.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                    Upgrade for Priority Support
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-medium">Dedicated Account Management</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Your Personal Success Team</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Work with a dedicated team focused on your success.
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">
                        Dedicated Support Agent
                      </h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Premium+
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      A support specialist who knows your account and history,
                      providing personalized assistance.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">Account Manager</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Enterprise
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      A dedicated account manager who serves as your strategic
                      advisor and main point of contact.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">
                        Quarterly Business Reviews
                      </h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Enterprise
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Regular reviews to analyze your usage, results, and plan
                      for future optimization.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                    Get Dedicated Support
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-medium">Custom Training Sessions</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-tertiary bg-opacity-10 rounded-lg mr-3">
                    <Users size={20} className="text-tertiary" />
                  </div>
                  <h3 className="font-medium">Personalized Training</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Tailored training sessions designed specifically for your
                  team's needs and use cases.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Custom curriculum</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Live virtual sessions</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">On-site training available</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">
                      Recorded for future reference
                    </span>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 border border-tertiary text-tertiary rounded-lg text-sm hover:bg-tertiary hover:text-white transition-colors">
                  Schedule Training
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-medium">Implementation Assistance</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-secondary bg-opacity-10 rounded-lg mr-3">
                    <FileText size={20} className="text-secondary" />
                  </div>
                  <h3 className="font-medium">Expert Implementation</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Get help setting up your account, importing data, and
                  configuring the platform to your specific needs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Data migration assistance</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Custom configuration</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Integration setup</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Workflow optimization</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 border border-secondary text-secondary rounded-lg text-sm hover:bg-secondary hover:text-white transition-colors">
                  Get Implementation Help
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-medium">Success Coaching</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
                    <Award size={20} className="text-primary" />
                  </div>
                  <h3 className="font-medium">Strategic Guidance</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Work with a success coach who helps you maximize your ROI and
                  achieve your business goals.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Strategy development</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Best practice guidance</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Performance optimization</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Regular coaching sessions</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                  Get a Success Coach
                </button>
              </div>
            </div>
          </div>
          {/* Service Level Agreement */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-medium">Service Level Agreement (SLA)</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Support Feature
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Standard
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enhanced
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Premium
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Response Time
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        24-48 hours
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        8-12 hours
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        4 hours
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        1 hour
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Support Hours
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Business hours
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Extended hours
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Extended hours
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        24/7
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Support Channels
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Email, Community
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Email, Chat
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Email, Chat, Phone
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        All channels + Dedicated
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Training Sessions
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Self-service
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        1 session/quarter
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        2 sessions/quarter
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Unlimited
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Account Reviews
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        None
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        None
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Quarterly
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        Monthly
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Testimonials */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-medium">What Our Premium Customers Say</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Customer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">Robert Johnson</h4>
                      <p className="text-sm text-gray-500">
                        CEO, Johnson Properties
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    "The dedicated account manager has been a game-changer for
                    our business. They understand our unique needs and have
                    helped us optimize our workflow."
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/women/41.jpg" alt="Customer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">Sarah Williams</h4>
                      <p className="text-sm text-gray-500">
                        COO, Williams Investments
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    "The custom training sessions have significantly reduced our
                    onboarding time for new team members. Everyone is up to
                    speed quickly and efficiently."
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">Michael Chen</h4>
                      <p className="text-sm text-gray-500">
                        Director, Chen Real Estate
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    "The priority support has saved us countless hours. Issues
                    are resolved quickly, allowing us to focus on growing our
                    business rather than troubleshooting."
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg overflow-hidden">
            <div className="p-8 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to Upgrade Your Support Experience?
                </h2>
                <p className="mb-6">
                  Get the personalized attention and expert guidance your
                  business deserves with our premium support options.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                    Upgrade Now
                  </button>
                  <button className="px-6 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
                    Schedule a Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
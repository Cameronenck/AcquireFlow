import React from 'react';
import { MessageSquare, Phone, Mail, Video, Users, Clock, Calendar, ArrowRight } from 'lucide-react';
export const ContactOptions = () => {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
              <MessageSquare size={20} className="text-primary" />
            </div>
            <h3 className="font-medium">Live Chat</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Chat with our support team in real-time for immediate assistance.
          </p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock size={16} className="mr-2" />
            <span>Available 24/7</span>
          </div>
          <button className="w-full py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
            Start Chat
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-secondary bg-opacity-10 rounded-lg mr-3">
              <Mail size={20} className="text-secondary" />
            </div>
            <h3 className="font-medium">Email Support</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Send us an email and we'll get back to you within 24 hours.
          </p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock size={16} className="mr-2" />
            <span>Response within 24 hours</span>
          </div>
          <button className="w-full py-2 bg-secondary text-white rounded-lg text-sm hover:bg-secondary-dark transition-colors">
            Send Email
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-tertiary bg-opacity-10 rounded-lg mr-3">
              <Phone size={20} className="text-tertiary" />
            </div>
            <h3 className="font-medium">Phone Support</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Speak directly with a support representative over the phone.
          </p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock size={16} className="mr-2" />
            <span>Mon-Fri, 9AM-6PM ET</span>
          </div>
          <button className="w-full py-2 bg-tertiary text-dark rounded-lg text-sm hover:bg-tertiary-dark transition-colors">
            Call Support
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-gray-100 rounded-lg mr-3">
              <Video size={20} className="text-gray-700" />
            </div>
            <h3 className="font-medium">Screen Sharing</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Schedule a screen sharing session for personalized assistance.
          </p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar size={16} className="mr-2" />
            <span>Book a 30-min session</span>
          </div>
          <button className="w-full py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
            Schedule Session
          </button>
        </div>
      </div>
      {/* Community forum banner */}
      <div className="md:col-span-2 lg:col-span-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-white bg-opacity-10 rounded-lg mr-3">
                <Users size={20} className="text-white" />
              </div>
              <h3 className="font-medium text-white">Community Forum</h3>
            </div>
            <p className="text-white text-opacity-80 text-sm">
              Connect with other AcquireFlow.AI users, share tips, and get help
              from the community.
            </p>
          </div>
          <button className="px-4 py-2 bg-white text-gray-800 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center">
            Visit Community Forum <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>;
};
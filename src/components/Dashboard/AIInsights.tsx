import React from 'react';
import { Phone, Send, ClipboardList, AlertTriangle } from 'lucide-react';
export const AIInsights = () => {
  return <div className="bg-cardBg rounded-lg shadow-md p-5 text-dark border border-gray-100 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">AI Investment Insights</h2>
        <div className="flex space-x-2">
          <span className="bg-primary bg-opacity-10 px-2 py-1 text-xs rounded-full text-primary">
            3 insights
          </span>
          <span className="bg-primary px-2 py-1 text-xs rounded-full flex items-center text-white">
            <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
            Real-time
          </span>
        </div>
      </div>
      <div className="flex space-x-3 mb-5">
        <div className="flex-1">
          <select className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white">
            <option>All Regions</option>
            <option>Orlando</option>
            <option>Miami</option>
            <option>Tampa</option>
          </select>
        </div>
        <div className="flex-1">
          <select className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white">
            <option>All Deal Types</option>
            <option>Fix & Flip</option>
            <option>Buy & Hold</option>
            <option>Wholesale</option>
          </select>
        </div>
      </div>
      <div className="bg-white border-l-4 border-secondary p-4 rounded-md mb-5">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <AlertTriangle size={18} className="text-secondary mr-2" />
              <h3 className="font-bold">Hot Lead Alert: Sarah Johnson</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Potential cash buyer for the Main St property
            </p>
          </div>
          <div className="bg-tertiary px-2 py-1 rounded-md text-sm font-bold text-dark">
            89% confidence
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <p className="text-xs text-gray-500">Deal Score</p>
            <p className="font-bold text-lg">89%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Days Since Contact</p>
            <p className="font-bold text-lg">2</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Est. Close Time</p>
            <p className="font-bold text-lg">7 days</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Profit Potential</p>
            <p className="font-bold text-lg">$47K</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-2">Suggested Actions:</h4>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center px-3 py-1.5 bg-tertiary text-dark rounded-md text-sm shadow-sm hover:bg-opacity-90 transition-colors">
              <Phone size={14} className="mr-1" />
              Call Now
              <span className="ml-1 px-1 bg-white text-tertiary text-xs rounded">
                High
              </span>
            </button>
            <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded-md text-sm shadow-sm hover:bg-opacity-90 transition-colors">
              <Send size={14} className="mr-1" />
              Send LOI
              <span className="ml-1 px-1 bg-white text-primary text-xs rounded">
                High
              </span>
            </button>
            <button className="flex items-center px-3 py-1.5 bg-gray-200 text-dark rounded-md text-sm shadow-sm hover:bg-opacity-90 transition-colors">
              <ClipboardList size={14} className="mr-1" />
              Create Follow-Up Task
              <span className="ml-1 px-1 bg-yellow-500 text-white text-xs rounded">
                Medium
              </span>
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-secondary bg-opacity-10 text-secondary px-2 py-0.5 rounded text-xs">
            Hot Lead
          </span>
          <span className="bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded text-xs">
            Cash Buyer
          </span>
          <span className="bg-tertiary bg-opacity-10 text-tertiary px-2 py-0.5 rounded text-xs">
            Main St Property
          </span>
        </div>
      </div>
    </div>;
};
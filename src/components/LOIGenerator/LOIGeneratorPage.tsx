import React, { useState } from 'react';
import { SimpleLOIGenerator } from './SimpleLOIGenerator';
export const LOIGeneratorPage = () => {
  return <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-dark">LOI Generator</h1>
              <p className="text-gray-500 mt-1">
                Create and send professional Letters of Intent
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <SimpleLOIGenerator />
      </div>
    </div>;
};
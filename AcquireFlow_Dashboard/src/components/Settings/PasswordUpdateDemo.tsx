import React from 'react';
import { PasswordUpdateForm } from './PasswordUpdateForm';

export const PasswordUpdateDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Password Update Demo
          </h1>
          <p className="text-gray-600">
            Test the new password update API with old, new, and confirm password fields
          </p>
        </div>
        
        <PasswordUpdateForm />
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">API Endpoint:</h3>
          <code className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">
            POST /api/auth/update-password
          </code>
          
          <h3 className="text-sm font-medium text-blue-800 mt-3 mb-2">Request Body:</h3>
          <pre className="text-xs text-blue-700 bg-blue-100 p-3 rounded overflow-x-auto">
{`{
  "oldPassword": "current_password",
  "newPassword": "new_secure_password",
  "confirmPassword": "new_secure_password"
}`}
          </pre>
          
          <h3 className="text-sm font-medium text-blue-800 mt-3 mb-2">Features:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Three-field validation (old, new, confirm)</li>
            <li>• Password strength indicator</li>
            <li>• Real-time validation feedback</li>
            <li>• Password requirements checklist</li>
            <li>• Show/hide password toggles</li>
            <li>• Loading states and error handling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

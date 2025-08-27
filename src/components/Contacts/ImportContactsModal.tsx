import React, { useState } from 'react';
import { X, Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { Contact } from './ContactsPage';
type ImportContactsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onImport: (contacts: Contact[]) => void;
};
export const ImportContactsModal = ({
  isOpen,
  onClose,
  onImport
}: ImportContactsModalProps) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [mapping, setMapping] = useState({
    name: 'name',
    email: 'email',
    phone: 'phone',
    type: 'type',
    company: 'company',
    position: 'position'
  });
  const [importResult, setImportResult] = useState({
    total: 0,
    success: 0,
    errors: 0,
    warnings: 0
  });
  if (!isOpen) return null;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const handleMappingChange = (field: string, value: string) => {
    setMapping(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleContinue = () => {
    if (step === 1 && file) {
      setStep(2);
    } else if (step === 2) {
      // Simulate file processing
      setStep(3);
      // Mock import result
      setImportResult({
        total: 25,
        success: 22,
        errors: 1,
        warnings: 2
      });
    } else if (step === 3) {
      // Generate mock imported contacts
      const mockImportedContacts: Contact[] = [{
        id: `import-${Date.now()}-1`,
        name: 'John Thompson',
        email: 'john.thompson@example.com',
        phone: '(407) 555-9876',
        type: 'Investor',
        company: 'Thompson Investments',
        position: 'CEO',
        relationshipStrength: 60,
        tags: ['Imported', 'Commercial']
      }, {
        id: `import-${Date.now()}-2`,
        name: 'Rebecca Clark',
        email: 'rebecca.c@example.com',
        phone: '(407) 555-5432',
        type: 'Agent',
        company: 'Sunshine Realty',
        position: 'Broker',
        relationshipStrength: 55,
        tags: ['Imported', 'Residential']
      }];
      onImport(mockImportedContacts);
    }
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <div className="p-5">
            <h3 className="text-lg font-medium mb-4">Upload File</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Upload size={24} className="text-gray-500" />
                </div>
                {file ? <div>
                    <div className="flex items-center">
                      <FileText size={20} className="text-primary mr-2" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                    <button className="mt-2 text-secondary text-sm hover:underline" onClick={() => setFile(null)}>
                      Remove
                    </button>
                  </div> : <>
                    <p className="text-gray-600 mb-3">
                      Drag and drop your CSV or Excel file here, or click to
                      browse
                    </p>
                    <input type="file" id="file-upload" className="hidden" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="px-4 py-2 bg-primary text-white font-medium rounded-lg cursor-pointer">
                      Select File
                    </label>
                    <p className="text-xs text-gray-500 mt-3">
                      Supported formats: CSV, Excel (.xlsx, .xls)
                    </p>
                  </>}
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Instructions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Prepare your contact data in CSV or Excel format</li>
                <li>• Include at least name, email, and phone number</li>
                <li>• Each row should represent one contact</li>
                <li>• First row should contain column headers</li>
              </ul>
            </div>
          </div>;
      case 2:
        return <div className="p-5">
            <h3 className="text-lg font-medium mb-4">Map Fields</h3>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="flex items-center text-sm">
                <FileText size={16} className="text-gray-500 mr-2" />
                <span className="font-medium">{file?.name}</span>
                <span className="ml-auto text-xs text-gray-500">
                  {importResult.total || 25} contacts found
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-secondary">*</span>
                  </label>
                  <select value={mapping.name} onChange={e => handleMappingChange('name', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="name">name</option>
                    <option value="full_name">full_name</option>
                    <option value="contact_name">contact_name</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-secondary">*</span>
                  </label>
                  <select value={mapping.email} onChange={e => handleMappingChange('email', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="email">email</option>
                    <option value="email_address">email_address</option>
                    <option value="contact_email">contact_email</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-secondary">*</span>
                  </label>
                  <select value={mapping.phone} onChange={e => handleMappingChange('phone', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="phone">phone</option>
                    <option value="phone_number">phone_number</option>
                    <option value="contact_phone">contact_phone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Type
                  </label>
                  <select value={mapping.type} onChange={e => handleMappingChange('type', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="type">type</option>
                    <option value="contact_type">contact_type</option>
                    <option value="category">category</option>
                    <option value="not_mapped">Don't map</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <select value={mapping.company} onChange={e => handleMappingChange('company', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="company">company</option>
                    <option value="organization">organization</option>
                    <option value="business">business</option>
                    <option value="not_mapped">Don't map</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <select value={mapping.position} onChange={e => handleMappingChange('position', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="position">position</option>
                    <option value="job_title">job_title</option>
                    <option value="title">title</option>
                    <option value="not_mapped">Don't map</option>
                  </select>
                </div>
              </div>
              <div className="bg-tertiary bg-opacity-10 p-3 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle size={18} className="text-tertiary-dark mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-tertiary-dark">
                      Field Mapping Tips
                    </p>
                    <p className="text-xs text-gray-700 mt-1">
                      Match your file's column headers with AcquireFlow's
                      contact fields. Required fields are marked with an
                      asterisk (*).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>;
      case 3:
        return <div className="p-5">
            <h3 className="text-lg font-medium mb-4">Import Summary</h3>
            <div className="bg-primary bg-opacity-10 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
                  <Check size={24} className="text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-primary">Import Complete</h4>
                  <p className="text-sm text-gray-600">
                    Your contacts have been processed
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold">{importResult.total}</div>
                <div className="text-sm text-gray-500">Total Contacts</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {importResult.success}
                </div>
                <div className="text-sm text-gray-500">Successful</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {importResult.warnings}
                </div>
                <div className="text-sm text-gray-500">Warnings</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">
                  {importResult.errors}
                </div>
                <div className="text-sm text-gray-500">Errors</div>
              </div>
            </div>
            {importResult.errors > 0 && <div className="bg-red-50 p-3 rounded-lg mb-4">
                <div className="flex items-start">
                  <AlertCircle size={18} className="text-red-600 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-red-600">
                      Some contacts could not be imported
                    </p>
                    <p className="text-xs text-gray-700 mt-1">
                      1 contact(s) had missing required fields. You can download
                      the error report to fix the issues and try again.
                    </p>
                    <button className="mt-2 text-sm text-primary hover:underline">
                      Download Error Report
                    </button>
                  </div>
                </div>
              </div>}
            {importResult.warnings > 0 && <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle size={18} className="text-yellow-600 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-yellow-600">
                      Some contacts were imported with warnings
                    </p>
                    <p className="text-xs text-gray-700 mt-1">
                      2 contact(s) had potential duplicates or missing optional
                      fields. They were imported but may need review.
                    </p>
                  </div>
                </div>
              </div>}
          </div>;
      default:
        return null;
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-dark">Import Contacts</h2>
          <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {/* Step Indicator */}
        <div className="px-5 pt-5">
          <div className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
            `}>
              1
            </div>
            <div className={`
              flex-1 h-1 mx-2
              ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}
            `}></div>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
            `}>
              2
            </div>
            <div className={`
              flex-1 h-1 mx-2
              ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}
            `}></div>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
            `}>
              3
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
            <span>Upload</span>
            <span>Map Fields</span>
            <span>Review</span>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto">{renderStepContent()}</div>
        {/* Footer */}
        <div className="flex justify-between p-5 border-t border-gray-200">
          {step > 1 ? <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg" onClick={() => setStep(prev => prev - 1)}>
              Back
            </button> : <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg" onClick={onClose}>
              Cancel
            </button>}
          <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg" onClick={handleContinue} disabled={step === 1 && !file}>
            {step === 3 ? 'Finish Import' : 'Continue'}
          </button>
        </div>
      </div>
    </div>;
};
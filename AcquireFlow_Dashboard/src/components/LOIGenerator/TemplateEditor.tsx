import React, { useEffect, useState } from 'react';
import { X, Save, Trash, Edit, AlertTriangle } from 'lucide-react';
import { LOITemplate as LOITemplateType } from '../../services/loiTemplateService';

export interface LOITemplate {
  _id: string;
  name: string;
  description: string;
  content: string;
  icon: string;
  isCustom?: boolean;
  isDefault?: boolean;
  category?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}
interface TemplateEditorProps {
  template: LOITemplate;
  onSave: (template: LOITemplate) => void;
  onCancel: () => void;
  isNew?: boolean;
}
export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  template,
  onSave,
  onCancel,
  isNew = false
}) => {
  const [name, setName] = useState(template.name);
  const [description, setDescription] = useState(template.description);
  const [content, setContent] = useState(template.content || '');
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    content?: string;
  }>({});
  // Validate the form
  const validateForm = () => {
    const newErrors: {
      name?: string;
      description?: string;
      content?: string;
    } = {};
    if (!name.trim()) {
      newErrors.name = 'Template name is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Template description is required';
    }
    if (!content.trim()) {
      newErrors.content = 'Template content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle save
  const handleSave = () => {
    if (validateForm()) {
      const updatedTemplate: LOITemplate = {
        ...template,
        name,
        description,
        content,
        isCustom: true,
        updatedAt: new Date(),
        createdAt: template.createdAt || new Date()
      };
      onSave(updatedTemplate);
    }
  };
  // Handle content placeholder replacements
  const handleInsertPlaceholder = (placeholder: string) => {
    setContent(prev => prev + placeholder);
  };
  return <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="font-medium text-lg">
          {isNew ? 'Create New Template' : 'Edit Template'}
        </h2>
        <button onClick={onCancel} className="p-1 rounded-full hover:bg-gray-200">
          <X size={20} />
        </button>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template Name*
          </label>
          <input type="text" className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`} placeholder="Enter template name" value={name} onChange={e => setName(e.target.value)} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <input type="text" className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`} placeholder="Enter template description" value={description} onChange={e => setDescription(e.target.value)} />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template Content*
          </label>
          <div className="mb-2 flex flex-wrap gap-2">
            <button className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200" onClick={() => handleInsertPlaceholder('[PROPERTY_ADDRESS]')}>
              Property Address
            </button>
            <button className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200" onClick={() => handleInsertPlaceholder('[AGENT_NAME]')}>
              Agent Name
            </button>
            <button className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200" onClick={() => handleInsertPlaceholder('[OFFER_AMOUNT]')}>
              Offer Amount
            </button>
            <button className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200" onClick={() => handleInsertPlaceholder('[CLOSING_TIMELINE]')}>
              Closing Timeline
            </button>
            <button className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200" onClick={() => handleInsertPlaceholder('[EARNEST_MONEY]')}>
              Earnest Money
            </button>
          </div>
          <textarea className={`w-full px-3 py-2 border ${errors.content ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[300px]`} placeholder="Enter template content" value={content} onChange={e => setContent(e.target.value)} />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
        </div>
        <div className="bg-tertiary bg-opacity-10 rounded-lg p-3 mb-4">
          <div className="flex items-start">
            <AlertTriangle size={16} className="text-tertiary-dark mr-2 mt-0.5" />
            <div>
              <p className="text-xs text-gray-700">
                Use placeholders like [PROPERTY_ADDRESS], [AGENT_NAME], etc. to
                automatically insert property-specific information into your
                template.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 border-t border-gray-200 flex justify-end">
        <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all mr-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-all flex items-center" onClick={handleSave}>
          <Save size={16} className="mr-1.5" />
          Save Template
        </button>
      </div>
    </div>;
};
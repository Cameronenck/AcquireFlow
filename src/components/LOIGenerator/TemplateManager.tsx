import React, { useState } from 'react';
import { Plus, Edit, Trash, FileText, Check, DollarSign, Home, Calendar, AlertTriangle } from 'lucide-react';
import { LOITemplate } from './TemplateEditor';
interface TemplateManagerProps {
  templates: LOITemplate[];
  selectedTemplate: LOITemplate;
  onSelectTemplate: (template: LOITemplate) => void;
  onEditTemplate: (template: LOITemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  onCreateTemplate: () => void;
}
export const TemplateManager: React.FC<TemplateManagerProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onCreateTemplate
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  // Handle delete confirmation
  const handleConfirmDelete = (templateId: string) => {
    setShowConfirmDelete(templateId);
  };
  const handleCancelDelete = () => {
    setShowConfirmDelete(null);
  };
  const handleDelete = (templateId: string) => {
    onDeleteTemplate(templateId);
    setShowConfirmDelete(null);
  };
  // Group templates by system vs custom
  const systemTemplates = templates.filter(t => !t.isCustom);
  const customTemplates = templates.filter(t => t.isCustom);
  return <div className="space-y-4">
      {/* System Templates */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          System Templates
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {systemTemplates.map(template => <div key={template.id} className={`border rounded-lg p-3 cursor-pointer transition-all flex items-center ${selectedTemplate.id === template.id ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => onSelectTemplate(template)}>
              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                {template.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{template.name}</h4>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
              {selectedTemplate.id === template.id && <div className="bg-primary rounded-full p-1">
                  <Check size={14} className="text-white" />
                </div>}
            </div>)}
        </div>
      </div>
      {/* Custom Templates */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-700">My Templates</h3>
          <button className="text-xs flex items-center text-primary hover:text-primary-dark" onClick={onCreateTemplate}>
            <Plus size={14} className="mr-1" />
            New Template
          </button>
        </div>
        {customTemplates.length === 0 ? <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500 mb-2">
              No custom templates yet
            </p>
            <button className="text-xs inline-flex items-center text-primary hover:text-primary-dark" onClick={onCreateTemplate}>
              <Plus size={14} className="mr-1" />
              Create your first template
            </button>
          </div> : <div className="grid grid-cols-1 gap-3">
            {customTemplates.map(template => <div key={template.id} className={`border rounded-lg p-3 transition-all ${selectedTemplate.id === template.id ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200'}`}>
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3 cursor-pointer" onClick={() => onSelectTemplate(template)}>
                    <FileText size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 cursor-pointer" onClick={() => onSelectTemplate(template)}>
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <p className="text-xs text-gray-500">
                      {template.description}
                    </p>
                  </div>
                  {selectedTemplate.id === template.id && <div className="bg-primary rounded-full p-1 mr-2">
                      <Check size={14} className="text-white" />
                    </div>}
                </div>
                {showConfirmDelete === template.id ? <div className="flex items-center justify-end mt-2 text-xs">
                    <span className="text-gray-500 mr-2">
                      Delete this template?
                    </span>
                    <button className="px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 mr-1" onClick={() => handleDelete(template.id)}>
                      Yes
                    </button>
                    <button className="px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200" onClick={handleCancelDelete}>
                      No
                    </button>
                  </div> : <div className="flex justify-end mt-1">
                    <button className="p-1.5 text-gray-400 hover:text-primary rounded-full hover:bg-gray-100" onClick={() => onEditTemplate(template)} title="Edit Template">
                      <Edit size={14} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100" onClick={() => handleConfirmDelete(template.id)} title="Delete Template">
                      <Trash size={14} />
                    </button>
                  </div>}
              </div>)}
          </div>}
      </div>
    </div>;
};
import React, { useState } from 'react';
import { X, Plus, Upload } from 'lucide-react';
import { Deal, DealStage, PropertyType, DealPriority } from './types';
type AddDealModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (deal: Deal) => void;
};
export const AddDealModal = ({
  isOpen,
  onClose,
  onAdd
}: AddDealModalProps) => {
  const [dealData, setDealData] = useState<Partial<Deal>>({
    title: '',
    stage: 'Prospecting',
    priority: 'Medium',
    value: 0,
    potentialProfit: 0,
    property: {
      id: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      type: 'SingleFamily',
      beds: 0,
      baths: 0,
      sqft: 0,
      yearBuilt: 0,
      image: 'https://source.unsplash.com/random/600x400/?house'
    },
    agent: {
      id: '',
      name: '',
      email: '',
      phone: '',
      company: ''
    },
    financial: {
      purchasePrice: 0,
      closingCosts: 0,
      repairCosts: 0,
      arv: 0
    }
  });
  if (!isOpen) return null;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, section?: string, subsection?: string) => {
    const {
      name,
      value
    } = e.target;
    if (section) {
      if (subsection) {
        setDealData(prev => ({
          ...prev,
          [section]: {
            ...prev[section as keyof typeof prev],
            [subsection]: {
              ...(prev[section as keyof typeof prev] as any)[subsection],
              [name]: value
            }
          }
        }));
      } else {
        setDealData(prev => ({
          ...prev,
          [section]: {
            ...prev[section as keyof typeof prev],
            [name]: name === 'type' ? value : ['beds', 'baths', 'sqft', 'yearBuilt'].includes(name) ? parseInt(value) : value
          }
        }));
      }
    } else {
      setDealData(prev => ({
        ...prev,
        [name]: name === 'value' || name === 'potentialProfit' ? parseFloat(value) : value
      }));
    }
  };
  const handleFinancialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    const numValue = parseFloat(value);
    setDealData(prev => ({
      ...prev,
      financial: {
        ...prev.financial!,
        [name]: numValue
      }
    }));
    // Auto-calculate potential profit when financial values change
    if (['purchasePrice', 'closingCosts', 'repairCosts', 'arv'].includes(name)) {
      const financial = {
        ...dealData.financial!,
        [name]: numValue
      };
      const potentialProfit = financial.arv - financial.purchasePrice - financial.closingCosts - financial.repairCosts;
      setDealData(prev => ({
        ...prev,
        value: financial.purchasePrice,
        potentialProfit: potentialProfit > 0 ? potentialProfit : 0
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new deal with the form data
    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      title: dealData.title || 'New Deal',
      stage: dealData.stage as DealStage,
      priority: dealData.priority as DealPriority,
      value: dealData.value || 0,
      potentialProfit: dealData.potentialProfit || 0,
      property: dealData.property as any,
      agent: dealData.agent as any,
      financial: dealData.financial as any,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      stageHistory: [{
        stage: dealData.stage as DealStage,
        date: new Date().toISOString(),
        daysInStage: 0
      }],
      tasks: [],
      documents: [],
      communications: [],
      daysInCurrentStage: 0
    };
    onAdd(newDeal);
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-dark">Add New Deal</h2>
          <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deal Information */}
            <div>
              <h3 className="font-medium text-dark mb-3 pb-2 border-b border-gray-200">
                Deal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deal Title
                  </label>
                  <input type="text" name="title" value={dealData.title} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stage
                    </label>
                    <select name="stage" value={dealData.stage} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg">
                      <option value="Prospecting">Prospecting</option>
                      <option value="UnderContract">Under Contract</option>
                      <option value="DueDiligence">Due Diligence</option>
                      <option value="Negotiations">Negotiations</option>
                      <option value="Closing">Closing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select name="priority" value={dealData.priority} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Financial Details
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Purchase Price
                      </label>
                      <input type="number" name="purchasePrice" value={dealData.financial?.purchasePrice || 0} onChange={handleFinancialChange} className="w-full p-2 border border-gray-300 rounded-lg" min="0" step="1000" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Closing Costs
                      </label>
                      <input type="number" name="closingCosts" value={dealData.financial?.closingCosts || 0} onChange={handleFinancialChange} className="w-full p-2 border border-gray-300 rounded-lg" min="0" step="100" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Repair Costs
                      </label>
                      <input type="number" name="repairCosts" value={dealData.financial?.repairCosts || 0} onChange={handleFinancialChange} className="w-full p-2 border border-gray-300 rounded-lg" min="0" step="100" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        After Repair Value (ARV)
                      </label>
                      <input type="number" name="arv" value={dealData.financial?.arv || 0} onChange={handleFinancialChange} className="w-full p-2 border border-gray-300 rounded-lg" min="0" step="1000" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deal Value
                    </label>
                    <input type="number" name="value" value={dealData.value || 0} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50" readOnly />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-calculated from purchase price
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Potential Profit
                    </label>
                    <input type="number" name="potentialProfit" value={dealData.potentialProfit || 0} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50" readOnly />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-calculated from financial details
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Property Information */}
            <div>
              <h3 className="font-medium text-dark mb-3 pb-2 border-b border-gray-200">
                Property Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Address
                  </label>
                  <input type="text" name="address" value={dealData.property?.address || ''} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input type="text" name="city" value={dealData.property?.city || ''} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input type="text" name="state" value={dealData.property?.state || ''} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP
                    </label>
                    <input type="text" name="zip" value={dealData.property?.zip || ''} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select name="type" value={dealData.property?.type || 'SingleFamily'} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="SingleFamily">Single Family</option>
                    <option value="MultiFamily">Multi-Family</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Beds
                    </label>
                    <input type="number" name="beds" value={dealData.property?.beds || 0} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" min="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Baths
                    </label>
                    <input type="number" name="baths" value={dealData.property?.baths || 0} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" min="0" step="0.5" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sq Ft
                    </label>
                    <input type="number" name="sqft" value={dealData.property?.sqft || 0} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" min="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year Built
                    </label>
                    <input type="number" name="yearBuilt" value={dealData.property?.yearBuilt || 0} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" min="1800" max={new Date().getFullYear()} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Image
                  </label>
                  <div className="border border-gray-300 rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                      {dealData.property?.image ? <img src={dealData.property.image} alt="Property" className="w-full h-full object-cover" /> : <Upload size={24} className="text-gray-400" />}
                    </div>
                    <button type="button" className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Agent Information */}
            <div className="md:col-span-2">
              <h3 className="font-medium text-dark mb-3 pb-2 border-b border-gray-200">
                Agent Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agent Name
                  </label>
                  <input type="text" name="name" value={dealData.agent?.name || ''} onChange={e => handleInputChange(e, 'agent')} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input type="email" name="email" value={dealData.agent?.email || ''} onChange={e => handleInputChange(e, 'agent')} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input type="text" name="phone" value={dealData.agent?.phone || ''} onChange={e => handleInputChange(e, 'agent')} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input type="text" name="company" value={dealData.agent?.company || ''} onChange={e => handleInputChange(e, 'agent')} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-medium rounded-lg">
              <Plus size={18} className="inline mr-1" />
              Add Deal
            </button>
          </div>
        </form>
      </div>
    </div>;
};
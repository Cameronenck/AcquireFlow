import React, { useEffect, useState } from 'react';
import { X, FileText, DollarSign, Calendar, Send, Clock, Percent, CheckCircle, BarChart2, AlertTriangle, ChevronRight, Mail, MessageCircle, Home, Building, Building2, Warehouse, Eye, Phone } from 'lucide-react';
interface BulkOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperties: number[];
  propertyData: any[];
  investmentStrategy: string;
}
// Import LOI template types from LOI Generator
interface LOITemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  content?: string;
  isCustom?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export const BulkOfferModal: React.FC<BulkOfferModalProps> = ({
  isOpen,
  onClose,
  selectedProperties,
  propertyData,
  investmentStrategy
}) => {
  const [step, setStep] = useState<'template' | 'preview' | 'review' | 'confirmation'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [offerPercentage, setOfferPercentage] = useState(80);
  const [deliveryMethods, setDeliveryMethods] = useState<{
    email: boolean;
    text: boolean;
  }>({
    email: true,
    text: false
  });
  const [previewType, setPreviewType] = useState<'email' | 'text'>('email');
  const [schedulingOption, setSchedulingOption] = useState<'now' | 'schedule' | 'draft'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('09:00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loiTemplates, setLoiTemplates] = useState<LOITemplate[]>([]);
  // Get LOI templates from localStorage or use defaults
  useEffect(() => {
    // Default templates similar to LOI Generator
    const defaultTemplates: LOITemplate[] = [{
      id: 'standard-cash',
      name: 'Standard Cash Offer',
      description: 'Quick closing with cash offer',
      icon: <DollarSign size={20} className="text-primary" />
    }, {
      id: 'subject-to',
      name: 'Subject To Acquisition',
      description: 'Take over existing financing',
      icon: <Home size={20} className="text-primary" />
    }, {
      id: 'seller-financing',
      name: 'Seller Financing Offer',
      description: 'Owner financing terms',
      icon: <Calendar size={20} className="text-primary" />
    }, {
      id: 'hybrid',
      name: 'Hybrid Offer- Subject To + Seller Finance',
      description: 'Combined financing approach',
      icon: <AlertTriangle size={20} className="text-primary" />
    }];
    // Try to get custom templates from localStorage
    try {
      const savedTemplates = localStorage.getItem('loiTemplates');
      const customTemplates = savedTemplates ? JSON.parse(savedTemplates) : [];
      // Combine default and custom templates
      setLoiTemplates([...defaultTemplates, ...customTemplates]);
      // Set default selected template
      setSelectedTemplate('standard-cash');
    } catch (error) {
      console.error('Error loading LOI templates:', error);
      setLoiTemplates(defaultTemplates);
    }
  }, []);
  // Set default offer percentage based on investment strategy
  useEffect(() => {
    switch (investmentStrategy) {
      case 'wholesaling':
        setOfferPercentage(65);
        break;
      case 'fixAndFlip':
        setOfferPercentage(70);
        break;
      case 'buyAndHold':
        setOfferPercentage(90);
        break;
      case 'shortTermRental':
        setOfferPercentage(92);
        break;
      default:
        setOfferPercentage(80);
        break;
    }
  }, [investmentStrategy]);
  // Set default scheduled date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setScheduledDate(tomorrow.toISOString().split('T')[0]);
  }, []);
  // Handle delivery method toggle
  const toggleDeliveryMethod = (method: 'email' | 'text') => {
    setDeliveryMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };
  // Get active delivery methods count
  const getActiveDeliveryMethodsCount = () => {
    return Object.values(deliveryMethods).filter(Boolean).length;
  };
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmation');
      // If scheduled, we'd add to campaigns here
      if (schedulingOption === 'schedule') {
        // In a real app, we would add this to the active campaigns
        console.log('Added to scheduled campaigns');
      }
    }, 1500);
  };
  const selectedPropertiesData = propertyData.filter(property => selectedProperties.includes(property.id));
  const getTotalValue = () => {
    return selectedPropertiesData.reduce((sum, property) => sum + property.price, 0);
  };
  const getAveragePrice = () => {
    if (selectedPropertiesData.length === 0) return 0;
    return getTotalValue() / selectedPropertiesData.length;
  };
  const getTotalOfferAmount = () => {
    return getTotalValue() * (offerPercentage / 100);
  };
  const getOfferAmount = (price: number) => {
    return price * (offerPercentage / 100);
  };
  // Get template icon based on template ID
  const getTemplateIcon = (templateId: string) => {
    const template = loiTemplates.find(t => t.id === templateId);
    if (template && template.icon) {
      return template.icon;
    }
    // Default icons based on template type
    if (templateId.includes('cash')) {
      return <DollarSign size={20} className="text-primary" />;
    } else if (templateId.includes('subject')) {
      return <Home size={20} className="text-primary" />;
    } else if (templateId.includes('financing')) {
      return <Calendar size={20} className="text-primary" />;
    } else if (templateId.includes('hybrid')) {
      return <AlertTriangle size={20} className="text-primary" />;
    }
    return <FileText size={20} className="text-primary" />;
  };
  // Get delivery methods as text
  const getDeliveryMethodsText = () => {
    const methods = [];
    if (deliveryMethods.email) methods.push('Email');
    if (deliveryMethods.text) methods.push('Text Message');
    return methods.join(', ');
  };
  // Generate email preview content
  const getEmailPreviewContent = (property: any) => {
    const template = loiTemplates.find(t => t.id === selectedTemplate);
    const templateName = template ? template.name : 'Standard Offer';
    const offerAmount = formatCurrency(getOfferAmount(property.price));
    return {
      subject: `Letter of Intent for ${property.address}`,
      body: `Dear ${property.agent},
I hope this email finds you well. I am writing to express my interest in the property at ${property.address}.
Please find attached our formal Letter of Intent for this property. We are offering ${offerAmount}, with a closing timeline of 30 days.
Our team at AcquireFlow has extensive experience with properties in this area, and we're committed to making this a smooth transaction for all parties involved.
If you have any questions or would like to discuss this offer further, please don't hesitate to contact me directly at (555) 123-4567 or reply to this email.
I look forward to your response.
Best regards,
Your Name
AcquireFlow Acquisitions Team
(555) 123-4567`
    };
  };
  // Generate text message preview content
  const getTextPreviewContent = (property: any) => {
    const offerAmount = formatCurrency(getOfferAmount(property.price));
    return `Hi ${property.agent}, we've sent a Letter of Intent for ${property.address}. Our offer is ${offerAmount}. Please check your email or call (555) 123-4567 to discuss.`;
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative animate-scale-in">
        {/* Close button */}
        <button className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        {step === 'template' && <>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-dark">
                Generate Bulk Offers
              </h2>
              <p className="text-gray-500 mt-1">
                Configure your offer settings for {selectedProperties.length}{' '}
                selected properties
              </p>
            </div>
            <div className="p-6 overflow-y-auto" style={{
          maxHeight: '70vh'
        }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Template and Offer Settings */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">LOI Template</h3>
                    <div className="space-y-3">
                      {loiTemplates.map(template => <div key={template.id} className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedTemplate(template.id)}>
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              {template.icon}
                              <h4 className="font-medium ml-2">
                                {template.name}
                              </h4>
                            </div>
                            {template.isCustom && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                Custom
                              </span>}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {template.description}
                          </p>
                        </div>)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Offer Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Offer Percentage
                        </label>
                        <div className="flex items-center">
                          <input type="range" min={50} max={100} step={1} value={offerPercentage} onChange={e => setOfferPercentage(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mr-3" />
                          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 min-w-[70px] justify-center">
                            <span className="font-medium text-dark">
                              {offerPercentage}
                            </span>
                            <Percent size={14} className="ml-1 text-gray-500" />
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>50%</span>
                          <span>75%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Methods
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button className={`p-3 border rounded-lg flex items-center text-sm ${deliveryMethods.email ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => toggleDeliveryMethod('email')}>
                            <Mail size={20} className={`mr-2 ${deliveryMethods.email ? 'text-primary' : 'text-gray-400'}`} />
                            <span>Email</span>
                          </button>
                          <button className={`p-3 border rounded-lg flex items-center text-sm ${deliveryMethods.text ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => toggleDeliveryMethod('text')}>
                            <MessageCircle size={20} className={`mr-2 ${deliveryMethods.text ? 'text-primary' : 'text-gray-400'}`} />
                            <span>Text Message</span>
                          </button>
                        </div>
                        {getActiveDeliveryMethodsCount() === 0 && <p className="text-xs text-tertiary-dark mt-2">
                            Please select at least one delivery method
                          </p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scheduling
                        </label>
                        <div className="space-y-3">
                          <div className={`border rounded-lg p-3 cursor-pointer transition-all flex items-center ${schedulingOption === 'now' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSchedulingOption('now')}>
                            <Send size={20} className={`mr-3 ${schedulingOption === 'now' ? 'text-primary' : 'text-gray-400'}`} />
                            <div>
                              <div className="font-medium">
                                Send Immediately
                              </div>
                              <div className="text-xs text-gray-500">
                                Offers will be sent as soon as you confirm
                              </div>
                            </div>
                          </div>
                          <div className={`border rounded-lg p-3 cursor-pointer transition-all ${schedulingOption === 'schedule' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSchedulingOption('schedule')}>
                            <div className="flex items-center mb-2">
                              <Calendar size={20} className={`mr-3 ${schedulingOption === 'schedule' ? 'text-primary' : 'text-gray-400'}`} />
                              <div>
                                <div className="font-medium">
                                  Schedule for Later
                                </div>
                                <div className="text-xs text-gray-500">
                                  Set a specific date and time to send offers
                                </div>
                              </div>
                            </div>
                            {schedulingOption === 'schedule' && <div className="grid grid-cols-2 gap-3 mt-3">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">
                                    Date
                                  </label>
                                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">
                                    Time
                                  </label>
                                  <input type="time" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} />
                                </div>
                              </div>}
                          </div>
                          <div className={`border rounded-lg p-3 cursor-pointer transition-all flex items-center ${schedulingOption === 'draft' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSchedulingOption('draft')}>
                            <FileText size={20} className={`mr-3 ${schedulingOption === 'draft' ? 'text-primary' : 'text-gray-400'}`} />
                            <div>
                              <div className="font-medium">Save as Draft</div>
                              <div className="text-xs text-gray-500">
                                Save offers as drafts to review later
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right column - Properties and Preview */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Selected Properties ({selectedProperties.length})
                    </h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="max-h-[300px] overflow-y-auto">
                        {selectedPropertiesData.map(property => <div key={property.id} className="p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start">
                                <div className="h-12 w-12 rounded overflow-hidden mr-3 flex-shrink-0">
                                  <img src={property.image} alt={property.address} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm line-clamp-1">
                                    {property.address}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    {property.city}, {property.state}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-primary">
                                  {formatCurrency(property.price)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Offer:{' '}
                                  {formatCurrency(getOfferAmount(property.price))}
                                </div>
                              </div>
                            </div>
                          </div>)}
                      </div>
                      <div className="bg-gray-50 p-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Total Value:
                          </span>
                          <span className="text-sm font-medium">
                            {formatCurrency(getTotalValue())}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm font-medium">
                            Total Offer Amount:
                          </span>
                          <span className="text-sm font-medium text-primary">
                            {formatCurrency(getTotalOfferAmount())}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-tertiary bg-opacity-10 rounded-lg p-4 border border-tertiary border-opacity-20">
                    <div className="flex items-start">
                      <AlertTriangle size={18} className="text-tertiary-dark mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-dark">
                          Offer Strategy Tips
                        </h4>
                        <p className="text-sm text-gray-700 mt-1">
                          {investmentStrategy === 'wholesaling' ? 'For wholesaling, consider offering 60-70% of ARV minus repair costs to ensure enough spread for your buyers.' : investmentStrategy === 'fixAndFlip' ? 'For fix & flip, the 70% rule (ARV × 70% - repairs) is recommended to ensure adequate profit margin after renovation costs.' : investmentStrategy === 'buyAndHold' ? 'For buy & hold, focus on properties that will generate positive cash flow at 90-95% of asking price with good cap rates.' : investmentStrategy === 'shortTermRental' ? 'For short-term rentals, locations with high tourism or business travel can command premium rates, allowing for higher offer percentages.' : 'Customize your offer percentage based on property condition, market trends, and your investment goals.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button className="px-4 py-2 text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center" onClick={() => setStep('preview')}>
                      <Eye size={18} className="mr-2" />
                      Preview Delivery
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button className="px-6 py-2.5 bg-gray-100 text-dark font-medium rounded-lg hover:bg-gray-200 transition-colors mr-3" onClick={onClose}>
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center" onClick={() => {
            if (getActiveDeliveryMethodsCount() === 0) {
              alert('Please select at least one delivery method');
              return;
            }
            setStep('review');
          }}>
                Review Offers
                <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          </>}
        {step === 'preview' && <>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-dark">Preview Delivery</h2>
              <p className="text-gray-500 mt-1">
                Preview how your offers will look when delivered
              </p>
            </div>
            <div className="p-6 overflow-y-auto" style={{
          maxHeight: '70vh'
        }}>
              <div className="space-y-6">
                <div className="flex space-x-4 mb-6">
                  <button className={`px-4 py-2 rounded-lg flex items-center ${previewType === 'email' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setPreviewType('email')}>
                    <Mail size={18} className="mr-2" />
                    Email Preview
                  </button>
                  <button className={`px-4 py-2 rounded-lg flex items-center ${previewType === 'text' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setPreviewType('text')}>
                    <MessageCircle size={18} className="mr-2" />
                    Text Message Preview
                  </button>
                </div>
                {previewType === 'email' && <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200">
                      <h3 className="font-medium">Email Preview</h3>
                    </div>
                    <div className="p-6">
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b border-gray-200">
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">From:</span>
                              <span className="ml-1">
                                AcquireFlow Acquisitions Team
                                &lt;acquisitions@acquireflow.com&gt;
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">To:</span>
                              <span className="ml-1">
                                {selectedPropertiesData[0]?.agent || 'Property Agent'}{' '}
                                &lt;
                                {selectedPropertiesData[0]?.agent ? selectedPropertiesData[0].agent.toLowerCase().replace(/\s+/g, '.') : 'agent.name'}
                                @example.com&gt;
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Subject:</span>
                              <span className="ml-1 font-medium">
                                Letter of Intent for{' '}
                                {selectedPropertiesData[0]?.address || 'Property Address'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 max-h-96 overflow-y-auto bg-white">
                          <div className="space-y-4 text-sm whitespace-pre-line">
                            {`Dear ${selectedPropertiesData[0]?.agent || 'Property Agent'},
I hope this email finds you well. I am writing to express my interest in the property at ${selectedPropertiesData[0]?.address || 'Property Address'}.
Please find attached our formal Letter of Intent for this property. We are offering ${formatCurrency(selectedPropertiesData[0] ? getOfferAmount(selectedPropertiesData[0].price) : 0)}, with a closing timeline of 30 days.
Our team at AcquireFlow has extensive experience with properties in this area, and we're committed to making this a smooth transaction for all parties involved.
If you have any questions or would like to discuss this offer further, please don't hesitate to contact me directly at (555) 123-4567 or reply to this email.
I look forward to your response.
Best regards,
Your Name
AcquireFlow Acquisitions Team
(555) 123-4567`}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        <p>
                          This is a preview of the email that will be sent to
                          each property agent.
                        </p>
                        <p className="mt-1">
                          The content will be personalized with each property's
                          details.
                        </p>
                      </div>
                    </div>
                  </div>}
                {previewType === 'text' && <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200">
                      <h3 className="font-medium">Text Message Preview</h3>
                    </div>
                    <div className="p-6">
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-800 p-6 rounded-lg">
                          <div className="max-w-xs mx-auto">
                            <div className="flex items-center mb-4">
                              <Phone size={16} className="text-white mr-2" />
                              <span className="text-white text-sm">
                                Text Message to{' '}
                                {selectedPropertiesData[0]?.agent}
                              </span>
                            </div>
                            <div className="bg-primary rounded-lg p-3 text-sm text-white">
                              {getTextPreviewContent(selectedPropertiesData[0])}
                            </div>
                            <div className="text-xs text-gray-400 mt-1 text-right">
                              Just now
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        <p>
                          This is a preview of the text message that will be
                          sent to each property agent.
                        </p>
                        <p className="mt-1">
                          The content will be personalized with each property's
                          details.
                        </p>
                        <p className="mt-3 text-xs">
                          <strong>Note:</strong> Text messages are limited to
                          160 characters. Longer messages may be split into
                          multiple texts.
                        </p>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <button className="px-6 py-2.5 text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center" onClick={() => setStep('template')}>
                Back to Settings
              </button>
              <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center" onClick={() => setStep('review')}>
                Continue to Review
                <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          </>}
        {step === 'review' && <>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-dark">Review Offers</h2>
              <p className="text-gray-500 mt-1">
                Review and confirm your offers before sending
              </p>
            </div>
            <div className="p-6 overflow-y-auto" style={{
          maxHeight: '70vh'
        }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="font-medium">Offer Summary</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">
                              Template
                            </div>
                            <div className="font-medium flex items-center">
                              {getTemplateIcon(selectedTemplate)}
                              <span className="ml-2">
                                {loiTemplates.find(t => t.id === selectedTemplate)?.name || 'Standard Template'}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Offer Percentage
                            </div>
                            <div className="font-medium">
                              {offerPercentage}% of asking price
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Delivery Methods
                            </div>
                            <div className="font-medium">
                              {getDeliveryMethodsText()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Scheduling
                            </div>
                            <div className="font-medium">
                              {schedulingOption === 'now' ? 'Send Immediately' : schedulingOption === 'schedule' ? `Scheduled for ${scheduledDate} at ${scheduledTime}` : 'Save as Draft'}
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-500 mb-2">
                            Properties and Offer Amounts
                          </div>
                          <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {selectedPropertiesData.map(property => <div key={property.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded overflow-hidden mr-3 flex-shrink-0">
                                    <img src={property.image} alt={property.address} className="h-full w-full object-cover" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm line-clamp-1">
                                      {property.address}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {property.city}, {property.state}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-gray-500 line-through">
                                    {formatCurrency(property.price)}
                                  </div>
                                  <div className="text-sm font-medium text-primary">
                                    {formatCurrency(getOfferAmount(property.price))}
                                  </div>
                                </div>
                              </div>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="font-medium">Offer Statistics</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500">
                            Total Properties
                          </div>
                          <div className="text-2xl font-bold">
                            {selectedProperties.length}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">
                            Average Property Value
                          </div>
                          <div className="text-2xl font-bold">
                            {formatCurrency(getAveragePrice())}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">
                            Total Market Value
                          </div>
                          <div className="text-2xl font-bold">
                            {formatCurrency(getTotalValue())}
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-500">
                            Total Offer Amount
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            {formatCurrency(getTotalOfferAmount())}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {offerPercentage}% of market value
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-500 mb-2">
                            Estimated Savings
                          </div>
                          <div className="text-2xl font-bold text-tertiary-dark">
                            {formatCurrency(getTotalValue() - getTotalOfferAmount())}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <button className="px-6 py-2.5 text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center" onClick={() => setStep('template')}>
                Back to Settings
              </button>
              <div>
                <button className="px-6 py-2.5 bg-gray-100 text-dark font-medium rounded-lg hover:bg-gray-200 transition-colors mr-3" onClick={onClose}>
                  Cancel
                </button>
                <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? <>
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </> : <>
                      {schedulingOption === 'now' ? 'Send Offers Now' : schedulingOption === 'schedule' ? 'Schedule Campaign' : 'Save as Draft'}
                      <Send size={18} className="ml-2" />
                    </>}
                </button>
              </div>
            </div>
          </>}
        {step === 'confirmation' && <div className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                <CheckCircle size={32} className="text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">
              {schedulingOption === 'now' ? 'Offers Sent Successfully!' : schedulingOption === 'schedule' ? 'Campaign Scheduled!' : 'Drafts Saved Successfully!'}
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {schedulingOption === 'now' ? `Your offers have been sent to ${selectedProperties.length} properties via ${getDeliveryMethodsText()}. You can track responses in the Campaigns section.` : schedulingOption === 'schedule' ? `Your campaign has been scheduled for ${scheduledDate} at ${scheduledTime}. You can view and manage it in the Campaigns section.` : `Your offers have been saved as drafts. You can review and send them from the Campaigns section.`}
            </p>
            <div className="flex justify-center space-x-3">
              <button className="px-6 py-2.5 bg-gray-100 text-dark font-medium rounded-lg hover:bg-gray-200 transition-colors" onClick={onClose}>
                Close
              </button>
              <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center" onClick={() => {
            // In a real app, this would navigate to the campaigns page
            onClose();
            alert('Navigating to Campaigns page');
          }}>
                {schedulingOption === 'now' ? 'View Sent Offers' : schedulingOption === 'schedule' ? 'View Scheduled Campaign' : 'View Drafts'}
                <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          </div>}
      </div>
    </div>;
};
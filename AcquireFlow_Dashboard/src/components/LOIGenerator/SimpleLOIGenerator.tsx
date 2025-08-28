import React, { useEffect, useState, useRef } from 'react';
import { Check, Download, Send, Save, RefreshCw, DollarSign, Calendar, Clock, Percent, Search, Home, Building, Building2, Warehouse, AlertTriangle, FileText, Loader, Edit, Plus, X } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TemplateEditor, LOITemplate } from './TemplateEditor';
import { TemplateManager } from './TemplateManager';
import { loiTemplateService, LOITemplate as LOITemplateType } from '../../services/loiTemplateService';
export const SimpleLOIGenerator = () => {
  // Templates
  const defaultTemplates: LOITemplate[] = [{
    _id: 'standard-cash',
    name: 'Standard Cash Offer',
    description: 'Quick closing with cash offer',
    icon: 'DollarSign',
    content: `Dear [AGENT_NAME],

I am writing to express my interest in purchasing the property located at [PROPERTY_ADDRESS]. After careful consideration of the property's location, condition, and potential, I would like to submit the following Letter of Intent:

**Purchase Price:** [OFFER_AMOUNT]
**Earnest Money Deposit:** [EARNEST_MONEY]
**Closing Timeline:** [CLOSING_TIMELINE] days from acceptance
**Inspection Period:** [INSPECTION_PERIOD] days

**Financing:** Cash offer with no financing contingency
**Proof of Funds:** Available upon request
**Contingencies:** Inspection

I am prepared to move forward quickly with this cash offer and can provide proof of funds immediately upon request. With no financing contingency, we can close in as little as [CLOSING_TIMELINE] days, providing you with certainty and a clean, efficient transaction.

My team and I have extensive experience in real estate acquisitions in this area and are committed to a smooth transaction process.

Please consider this a formal expression of my interest in the property. I look forward to your response and am available to discuss any aspects of this offer at your convenience.

Sincerely,
[YOUR_NAME]
[YOUR_COMPANY]
[YOUR_CONTACT_INFO]`,
    isCustom: false,
    isDefault: true,
    category: 'cash-offer',
    tags: ['cash', 'quick-close', 'no-financing'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }, {
    _id: 'subject-to',
    name: 'Subject To Acquisition',
    description: 'Take over existing financing',
    icon: 'Home',
    content: `Dear [AGENT_NAME],

I am writing to express my interest in purchasing the property located at [PROPERTY_ADDRESS]. After careful consideration of the property's location, condition, and potential, I would like to submit the following Letter of Intent:

**Purchase Price:** [OFFER_AMOUNT]
**Earnest Money Deposit:** [EARNEST_MONEY]
**Closing Timeline:** [CLOSING_TIMELINE] days from acceptance
**Inspection Period:** [INSPECTION_PERIOD] days

**Contingencies:** Inspection, Appraisal

**Subject To Existing Financing:** This offer is made subject to the existing financing on the property. Buyer intends to take over the existing mortgage payments while keeping the loan in the Seller's name, with appropriate legal safeguards for both parties.

This "Subject-To" offer allows you to sell your property without paying off your existing mortgage. I will take over the responsibility of making the mortgage payments while you receive the difference between your mortgage balance and the purchase price in cash at closing.

My team and I have extensive experience in real estate acquisitions in this area and are committed to a smooth transaction process.

Please consider this a formal expression of my interest in the property. I look forward to your response and am available to discuss any aspects of this offer at your convenience.

Sincerely,
[YOUR_NAME]
[YOUR_COMPANY]
[YOUR_CONTACT_INFO]`,
    isCustom: false,
    isDefault: true,
    category: 'subject-to',
    tags: ['subject-to', 'existing-financing', 'mortgage-assumption'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }, {
    _id: 'seller-financing',
    name: 'Seller Financing Offer',
    description: 'Owner financing terms',
    icon: 'Calendar',
    content: `Dear [AGENT_NAME],

I am writing to express my interest in purchasing the property located at [PROPERTY_ADDRESS]. After careful consideration of the property's location, condition, and potential, I would like to submit the following Letter of Intent:

**Purchase Price:** [OFFER_AMOUNT]
**Earnest Money Deposit:** [EARNEST_MONEY]
**Closing Timeline:** [CLOSING_TIMELINE] days from acceptance
**Inspection Period:** [INSPECTION_PERIOD] days

**Contingencies:** Inspection, Appraisal

**Seller Financing Terms:**
- Down Payment: [DOWN_PAYMENT_AMOUNT]
- Financed Amount: [FINANCED_AMOUNT]
- Interest Rate: [INTEREST_RATE]%
- Loan Term: [LOAN_TERM] years
- Monthly Payment: [MONTHLY_PAYMENT]

The seller financing structure outlined above provides you with an immediate down payment plus ongoing monthly income at an attractive interest rate. This arrangement can offer tax advantages by spreading your capital gains over time while providing a competitive return on your equity.

My team and I have extensive experience in real estate acquisitions in this area and are committed to a smooth transaction process.

Please consider this a formal expression of my interest in the property. I look forward to your response and am available to discuss any aspects of this offer at your convenience.

Sincerely,
[YOUR_NAME]
[YOUR_COMPANY]
[YOUR_CONTACT_INFO]`,
    isCustom: false,
    isDefault: true,
    category: 'seller-financing',
    tags: ['seller-financing', 'owner-financing', 'monthly-income'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }, {
    _id: 'hybrid',
    name: 'Hybrid Offer- Subject To + Seller Finance',
    description: 'Combined financing approach',
    icon: 'AlertTriangle',
    content: `Dear [AGENT_NAME],

I am writing to express my interest in purchasing the property located at [PROPERTY_ADDRESS]. After careful consideration of the property's location, condition, and potential, I would like to submit the following Letter of Intent:

**Purchase Price:** [OFFER_AMOUNT]
**Earnest Money Deposit:** [EARNEST_MONEY]
**Closing Timeline:** [CLOSING_TIMELINE] days from acceptance
**Inspection Period:** [INSPECTION_PERIOD] days

**Contingencies:** Inspection, Appraisal

**Hybrid Financing Structure:**
- Assumption of Existing Mortgage: [ASSUMED_LOAN_BALANCE]
- Seller Financing: [SELLER_FINANCE_AMOUNT]
  - Interest Rate: [INTEREST_RATE]%
  - Term: [LOAN_TERM] years
- Cash Down Payment: [CASH_DOWN_PAYMENT]

This hybrid structure combines the benefits of a Subject-To transaction with seller financing. You'll receive an immediate cash payment while you also creating ongoing monthly income from the seller-financed portion. This creative approach maximizes flexibility for both parties while allowing for a faster closing than traditional financing would permit.

My team and I have extensive experience in real estate acquisitions in this area and are committed to a smooth transaction process.

Please consider this a formal expression of my interest in the property. I look forward to your response and am available to discuss any aspects of this offer at your convenience.

Sincerely,
[YOUR_NAME]
[YOUR_COMPANY]
[YOUR_CONTACT_INFO]`,
    isCustom: false,
    isDefault: true,
    category: 'hybrid',
    tags: ['hybrid', 'subject-to', 'seller-financing', 'creative-financing'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }];
  // Mock property data
  const properties = [{
    id: 1,
    address: '123 Main St, Orlando, FL 32801',
    type: 'Single Family',
    price: 350000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: 'https://source.unsplash.com/random/800x600/?house,1',
    agent: 'Sarah Johnson',
    agentEmail: 'sarah@example.com',
    agentPhone: '(407) 555-1234',
    agentCompany: 'Orlando Realty Group'
  }, {
    id: 2,
    address: '456 Oak Ave, Miami, FL 33101',
    type: 'Multi-Family',
    price: 750000,
    beds: 6,
    baths: 4,
    sqft: 3200,
    image: 'https://source.unsplash.com/random/800x600/?house,2',
    agent: 'Michael Brown',
    agentEmail: 'michael@example.com',
    agentPhone: '(305) 555-6789',
    agentCompany: 'Miami Property Experts'
  }];
  // Load templates from API
  const loadTemplates = async () => {
    setIsLoadingTemplates(true);
    try {
      const apiTemplates = await loiTemplateService.getUserTemplates();
      // Convert API templates to component format
      const convertedTemplates: LOITemplate[] = apiTemplates.map(template => ({
        _id: template._id,
        name: template.name,
        description: template.description,
        content: template.content,
        icon: template.icon,
        isCustom: template.isCustom,
        isDefault: template.isDefault,
        category: template.category,
        tags: template.tags,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt
      }));
      
      // If no templates from API, seed defaults and try again
      if (convertedTemplates.length === 0) {
        try {
          await loiTemplateService.seedDefaultTemplates();
          const defaultApiTemplates = await loiTemplateService.getUserTemplates();
          const defaultConvertedTemplates: LOITemplate[] = defaultApiTemplates.map(template => ({
            _id: template._id,
            name: template.name,
            description: template.description,
            content: template.content,
            icon: template.icon,
            isCustom: template.isCustom,
            isDefault: template.isDefault,
            category: template.category,
            tags: template.tags,
            createdAt: template.createdAt,
            updatedAt: template.updatedAt
          }));
          setTemplates(defaultConvertedTemplates);
          setSelectedTemplate(defaultConvertedTemplates[0]);
          setIsLoadingTemplates(false);
          return;
        } catch (seedError) {
          console.error('Error seeding default templates:', seedError);
          // If seeding fails, use local defaults
          setTemplates(defaultTemplates);
          setSelectedTemplate(defaultTemplates[0]);
          setIsLoadingTemplates(false);
          return;
        }
      }
      
      setTemplates(convertedTemplates);
      setSelectedTemplate(convertedTemplates[0]);
    } catch (error) {
      console.error('Error loading templates from API:', error);
      // Fallback to default templates
      setTemplates(defaultTemplates);
      setSelectedTemplate(defaultTemplates[0]);
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  // Helper function to convert icon string to React component
  const getIconComponent = (iconName: string): React.ReactNode => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'DollarSign': <DollarSign size={20} className="text-primary" />,
      'Home': <Home size={20} className="text-primary" />,
      'Calendar': <Calendar size={20} className="text-primary" />,
      'AlertTriangle': <AlertTriangle size={20} className="text-primary" />,
      'FileText': <FileText size={20} className="text-primary" />
    };
    return iconMap[iconName] || <FileText size={20} className="text-primary" />;
  };

  // State
  const [templates, setTemplates] = useState<LOITemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<LOITemplate | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [offerPercentage, setOfferPercentage] = useState(80);
  const [customOfferAmount, setCustomOfferAmount] = useState('');
  const [closingTimeline, setClosingTimeline] = useState(30);
  const [earnestMoney, setEarnestMoney] = useState(1);
  const [earnestMoneyAmount, setEarnestMoneyAmount] = useState(Math.round(selectedProperty.price * (offerPercentage / 100) * (earnestMoney / 100)));
  const [inspectionPeriod, setInspectionPeriod] = useState(7);
  // Template editor state
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<LOITemplate | null>(null);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  // Subject to options
  const [subjectToOptions, setSubjectToOptions] = useState({
    inspection: true,
    financing: true,
    appraisal: false,
    attorneyReview: false,
    partnerApproval: false,
    custom: ''
  });
  // Seller financing terms
  const [sellerFinancingTerms, setSellerFinancingTerms] = useState({
    downPayment: 20,
    interestRate: 6.5,
    loanTerm: 30,
    balloonPayment: false,
    balloonTerm: 5
  });
  // Hybrid financing terms
  const [hybridFinancingTerms, setHybridFinancingTerms] = useState({
    assumedLoanBalance: Math.round(selectedProperty.price * 0.6),
    sellerFinanceAmount: Math.round(selectedProperty.price * 0.3),
    downPayment: Math.round(selectedProperty.price * 0.1),
    interestRate: 7.0,
    loanTerm: 10,
    balloonPayment: true,
    balloonTerm: 5
  });
  // Calculate offer amount
  const offerAmount = customOfferAmount ? parseFloat(customOfferAmount) : Math.round(selectedProperty.price * (offerPercentage / 100));
  // Calculate monthly payment for seller financing
  const calculateMonthlyPayment = () => {
    const principal = offerAmount * (1 - sellerFinancingTerms.downPayment / 100);
    const monthlyRate = sellerFinancingTerms.interestRate / 100 / 12;
    const numberOfPayments = sellerFinancingTerms.loanTerm * 12;
    if (monthlyRate === 0) return principal / numberOfPayments;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return Math.round(payment);
  };
  const monthlyPayment = calculateMonthlyPayment();
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  // Load templates when component mounts
  useEffect(() => {
    loadTemplates();
  }, []);

  // Update earnest money amount when offer changes
  useEffect(() => {
    setEarnestMoneyAmount(Math.round(offerAmount * (earnestMoney / 100)));
  }, [offerAmount, earnestMoney]);
  // Add a ref for the LOI content
  const loiContentRef = useRef<HTMLDivElement>(null);
  // Add a loading state for PDF generation
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  // Handle percentage button click
  const handlePercentageClick = (percentage: number) => {
    setOfferPercentage(percentage);
    setCustomOfferAmount('');
  };
  // Handle custom offer amount change
  const handleCustomOfferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomOfferAmount(value);
    // Calculate percentage based on custom amount
    if (value) {
      const newPercentage = Math.round(parseInt(value) / selectedProperty.price * 100);
      setOfferPercentage(newPercentage);
    }
  };
  // Handle subject to option change
  const handleSubjectToChange = (option: string, value: boolean | string) => {
    setSubjectToOptions({
      ...subjectToOptions,
      [option]: value
    });
  };
  // Handle seller financing term change
  const handleFinancingTermChange = (term: string, value: number | boolean) => {
    setSellerFinancingTerms({
      ...sellerFinancingTerms,
      [term]: value
    });
  };
  // Handle hybrid financing term change
  const handleHybridTermChange = (term: string, value: number | boolean) => {
    setHybridFinancingTerms({
      ...hybridFinancingTerms,
      [term]: value
    });
  };
  // Reset form
  const handleReset = () => {
    setSelectedTemplate(templates[0]);
    setOfferPercentage(80);
    setCustomOfferAmount('');
    setClosingTimeline(30);
    setEarnestMoney(1);
    setInspectionPeriod(7);
    setSubjectToOptions({
      inspection: true,
      financing: true,
      appraisal: false,
      attorneyReview: false,
      partnerApproval: false,
      custom: ''
    });
    setSellerFinancingTerms({
      downPayment: 20,
      interestRate: 6.5,
      loanTerm: 30,
      balloonPayment: false,
      balloonTerm: 5
    });
  };
  
  // Template management functions
  const handleCreateTemplate = () => {
    const newTemplate: LOITemplate = {
      _id: `custom-${Date.now()}`,
      name: 'New Custom Template',
      description: 'My custom template',
      content: generateDefaultTemplateContent(),
      icon: 'FileText',
      isCustom: true,
      isDefault: false,
      category: 'custom',
      tags: ['custom'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEditingTemplate(newTemplate);
    setIsCreatingTemplate(true);
    setShowTemplateEditor(true);
  };

  const handleEditTemplate = (template: LOITemplate) => {
    setEditingTemplate(template);
    setIsCreatingTemplate(false);
    setShowTemplateEditor(true);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      await loiTemplateService.deleteTemplate(templateId);
      const updatedTemplates = templates.filter(t => t._id !== templateId);
      setTemplates(updatedTemplates);
      // If the deleted template was selected, select the first available template
      if (selectedTemplate && selectedTemplate._id === templateId) {
        setSelectedTemplate(updatedTemplates[0] || null);
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      alert('Failed to delete template. Please try again.');
    }
  };

  const handleSaveTemplate = async (template: LOITemplate) => {
    try {
      let savedTemplate: LOITemplate;
      
      if (isCreatingTemplate) {
        // Create new template via API
        const apiTemplate = await loiTemplateService.createTemplate({
          name: template.name,
          description: template.description,
          content: template.content,
          icon: template.icon,
          category: template.category,
          tags: template.tags
        });
        
        // Convert API response to component format
        savedTemplate = {
          _id: apiTemplate._id,
          name: apiTemplate.name,
          description: apiTemplate.description,
          content: apiTemplate.content,
          icon: apiTemplate.icon,
          isCustom: apiTemplate.isCustom,
          isDefault: apiTemplate.isDefault,
          category: apiTemplate.category,
          tags: apiTemplate.tags,
          createdAt: apiTemplate.createdAt,
          updatedAt: apiTemplate.updatedAt
        };
        
        const updatedTemplates = [...templates, savedTemplate];
        setTemplates(updatedTemplates);
      } else {
        // Update existing template via API
        const apiTemplate = await loiTemplateService.updateTemplate(template._id, {
          name: template.name,
          description: template.description,
          content: template.content,
          icon: template.icon,
          category: template.category,
          tags: template.tags
        });
        
        // Convert API response to component format
        savedTemplate = {
          _id: apiTemplate._id,
          name: apiTemplate.name,
          description: apiTemplate.description,
          content: apiTemplate.content,
          icon: apiTemplate.icon,
          isCustom: apiTemplate.isCustom,
          isDefault: apiTemplate.isDefault,
          category: apiTemplate.category,
          tags: apiTemplate.tags,
          createdAt: apiTemplate.createdAt,
          updatedAt: apiTemplate.updatedAt
        };
        
        const updatedTemplates = templates.map(t => t._id === template._id ? savedTemplate : t);
        setTemplates(updatedTemplates);
      }
      
      setSelectedTemplate(savedTemplate);
      setShowTemplateEditor(false);
      setEditingTemplate(null);
      setIsCreatingTemplate(false);
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template. Please try again.');
    }
  };

  const handleCancelTemplateEdit = () => {
    setShowTemplateEditor(false);
    setEditingTemplate(null);
    setIsCreatingTemplate(false);
  };
  // Generate default template content
  const generateDefaultTemplateContent = () => {
    return `Dear [AGENT_NAME],
I am writing to express my interest in purchasing the property located at [PROPERTY_ADDRESS]. After careful consideration of the property's location, condition, and potential, I would like to submit the following Letter of Intent:
- Purchase Price: [OFFER_AMOUNT]
- Earnest Money Deposit: [EARNEST_MONEY]
- Closing Timeline: [CLOSING_TIMELINE] days from acceptance
- Inspection Period: [INSPECTION_PERIOD] days
I am prepared to move forward quickly and can provide proof of funds upon request. My team and I have extensive experience in real estate acquisitions in this area and are committed to a smooth transaction process.
Please consider this a formal expression of my interest in the property. I look forward to your response and am available to discuss any aspects of this offer at your convenience.
Sincerely,
[YOUR_NAME]
[YOUR_COMPANY]
[YOUR_CONTACT_INFO]`;
  };

  // Function to replace placeholders in template content
  const replacePlaceholders = (templateContent: string) => {
    return templateContent
      .replace(/\[PROPERTY_ADDRESS\]/g, selectedProperty.address)
      .replace(/\[AGENT_NAME\]/g, selectedProperty.agent)
      .replace(/\[AGENT_EMAIL\]/g, selectedProperty.agentEmail)
      .replace(/\[AGENT_PHONE\]/g, selectedProperty.agentPhone)
      .replace(/\[AGENT_COMPANY\]/g, selectedProperty.agentCompany)
      .replace(/\[OFFER_AMOUNT\]/g, formatCurrency(offerAmount))
      .replace(/\[EARNEST_MONEY\]/g, formatCurrency(earnestMoneyAmount))
      .replace(/\[CLOSING_TIMELINE\]/g, closingTimeline.toString())
      .replace(/\[INSPECTION_PERIOD\]/g, inspectionPeriod.toString())
      .replace(/\[LIST_PRICE\]/g, formatCurrency(selectedProperty.price))
      .replace(/\[OFFER_PERCENTAGE\]/g, offerPercentage.toString())
      .replace(/\[PROPERTY_TYPE\]/g, selectedProperty.type)
      .replace(/\[YOUR_NAME\]/g, 'Your Name')
      .replace(/\[YOUR_COMPANY\]/g, 'AcquireFlow Real Estate')
      .replace(/\[YOUR_CONTACT_INFO\]/g, '(555) 123-4567\ninvestor@acquireflow.com')
      // Additional placeholders for specific templates
      .replace(/\[DOWN_PAYMENT_AMOUNT\]/g, formatCurrency(offerAmount * (sellerFinancingTerms.downPayment / 100)))
      .replace(/\[FINANCED_AMOUNT\]/g, formatCurrency(offerAmount * (1 - sellerFinancingTerms.downPayment / 100)))
      .replace(/\[INTEREST_RATE\]/g, sellerFinancingTerms.interestRate.toString())
      .replace(/\[LOAN_TERM\]/g, sellerFinancingTerms.loanTerm.toString())
      .replace(/\[MONTHLY_PAYMENT\]/g, formatCurrency(monthlyPayment))
      .replace(/\[ASSUMED_LOAN_BALANCE\]/g, formatCurrency(hybridFinancingTerms.assumedLoanBalance))
      .replace(/\[SELLER_FINANCE_AMOUNT\]/g, formatCurrency(hybridFinancingTerms.sellerFinanceAmount))
      .replace(/\[CASH_DOWN_PAYMENT\]/g, formatCurrency(hybridFinancingTerms.downPayment));
  };
  // Function to generate and download PDF
  const handleDownloadPDF = async () => {
    if (!loiContentRef.current) return;
    setIsPdfGenerating(true);
    try {
      const content = loiContentRef.current;
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      const imgWidth = 210; // A4 width in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      // If content is longer than one page
      if (imgHeight > 297) {
        // A4 height
        const pageCount = Math.ceil(imgHeight / 297);
        for (let i = 1; i < pageCount; i++) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, -(i * 297), imgWidth, imgHeight);
        }
      }
      // Generate filename based on property address
      const filename = `LOI_${selectedProperty.address.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsPdfGenerating(false);
    }
  };
  // Save current template as a new custom template
  const handleSaveCurrentAsTemplate = () => {
    if (!selectedTemplate) return;
    
    // Generate a preview of the current LOI content
    const loiContent = loiContentRef.current?.textContent || '';
    const newTemplate: LOITemplate = {
      _id: `custom-${Date.now()}`,
      name: `Template based on ${selectedTemplate.name}`,
      description: 'Custom template created from current LOI',
      content: loiContent,
      icon: 'FileText',
      isCustom: true,
      isDefault: false,
      category: 'custom',
      tags: ['custom', 'derived'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEditingTemplate(newTemplate);
    setIsCreatingTemplate(true);
    setShowTemplateEditor(true);
  };
  // Show loading state while templates are being fetched
  if (isLoadingTemplates) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  // Show error state if no templates are available
  if (!selectedTemplate || templates.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No templates available</p>
          <button 
            onClick={loadTemplates}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
          >
            Retry Loading Templates
          </button>
        </div>
      </div>
    );
  }

  return <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Panel - Template Selection & Settings (40%) */}
      <div className="w-full lg:w-2/5 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h2 className="font-medium text-lg">
              Choose Template & Configure Offer
            </h2>
          </div>
          {/* Template Selection */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Template Selection
            </h3>
            <TemplateManager templates={templates} selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} onEditTemplate={handleEditTemplate} onDeleteTemplate={handleDeleteTemplate} onCreateTemplate={handleCreateTemplate} />
          </div>
          {/* Property Selection */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Property</h3>
            <div className="border rounded-lg p-3 bg-gray-50">
              <div className="flex items-center">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1.5 text-gray-800">
                    {selectedProperty.address}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <Home size={12} className="mr-1.5 text-gray-400" />
                    <span>{selectedProperty.type}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <DollarSign size={12} className="mr-1.5 text-gray-400" />
                    <span className="font-medium text-primary">
                      {formatCurrency(selectedProperty.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Offer Calculation Settings */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Offer Calculation
            </h3>
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">
                List Price
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50" value={formatCurrency(selectedProperty.price).replace('$', '')} disabled />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">
                Offer Percentage
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[70, 75, 80].map(percent => <button key={percent} className={`py-1.5 rounded-lg text-sm ${offerPercentage === percent ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handlePercentageClick(percent)}>
                    {percent}%
                  </button>)}
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[85, 90, 95].map(percent => <button key={percent} className={`py-1.5 rounded-lg text-sm ${offerPercentage === percent ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handlePercentageClick(percent)}>
                    {percent}%
                  </button>)}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">
                Custom Offer Amount
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter custom amount" value={customOfferAmount} onChange={handleCustomOfferChange} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">
                Custom Percentage
              </label>
              <div className="relative">
                <Percent size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter custom percentage" value={customOfferAmount ? offerPercentage : ''} onChange={e => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value) {
                  const percentage = parseInt(value);
                  setOfferPercentage(percentage);
                  // Calculate amount based on percentage
                  const amount = Math.round(selectedProperty.price * (percentage / 100));
                  setCustomOfferAmount(amount.toString());
                } else {
                  setCustomOfferAmount('');
                }
              }} />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                  %
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Calculated Offer</div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(offerAmount)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {offerPercentage}% of list price
              </div>
            </div>
          </div>
          {/* Terms & Conditions */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Terms & Conditions
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Closing Timeline
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={closingTimeline} onChange={e => setClosingTimeline(parseInt(e.target.value))}>
                    <option value={7}>7 days</option>
                    <option value={14}>14 days</option>
                    <option value={21}>21 days</option>
                    <option value={30}>30 days</option>
                    <option value={45}>45 days</option>
                    <option value={60}>60 days</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Inspection Period
                </label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={inspectionPeriod} onChange={e => setInspectionPeriod(parseInt(e.target.value))}>
                    <option value={3}>3 days</option>
                    <option value={5}>5 days</option>
                    <option value={7}>7 days</option>
                    <option value={10}>10 days</option>
                    <option value={14}>14 days</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">
                Earnest Money
              </label>
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <div className="relative">
                    <Percent size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={earnestMoney} onChange={e => setEarnestMoney(parseFloat(e.target.value))}>
                      <option value={0.5}>0.5%</option>
                      <option value={1}>1%</option>
                      <option value={2}>2%</option>
                      <option value={3}>3%</option>
                      <option value={5}>5%</option>
                    </select>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50" value={formatCurrency(earnestMoneyAmount).replace('$', '')} disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Subject To Options */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Subject To Options
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked={subjectToOptions.inspection} onChange={e => handleSubjectToChange('inspection', e.target.checked)} />
                <span className="text-sm">Subject to inspection</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked={subjectToOptions.financing} onChange={e => handleSubjectToChange('financing', e.target.checked)} />
                <span className="text-sm">Subject to financing</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked={subjectToOptions.appraisal} onChange={e => handleSubjectToChange('appraisal', e.target.checked)} />
                <span className="text-sm">Subject to appraisal</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked={subjectToOptions.attorneyReview} onChange={e => handleSubjectToChange('attorneyReview', e.target.checked)} />
                <span className="text-sm">Subject to attorney review</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked={subjectToOptions.partnerApproval} onChange={e => handleSubjectToChange('partnerApproval', e.target.checked)} />
                <span className="text-sm">Subject to partner approval</span>
              </label>
            </div>
            <div className="mt-3">
              <label className="block text-xs text-gray-500 mb-1">
                Custom Subject To
              </label>
              <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter custom contingency" value={subjectToOptions.custom} onChange={e => handleSubjectToChange('custom', e.target.value)} />
            </div>
          </div>
          {/* Seller Financing Terms - Only show for Seller Financing template */}
          {selectedTemplate && selectedTemplate._id === 'seller-financing' && <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Seller Financing Terms
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Down Payment
                  </label>
                  <div className="relative">
                    <Percent size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="number" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={sellerFinancingTerms.downPayment} onChange={e => handleFinancingTermChange('downPayment', parseFloat(e.target.value))} min="0" max="100" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Interest Rate
                  </label>
                  <div className="relative">
                    <Percent size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="number" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={sellerFinancingTerms.interestRate} onChange={e => handleFinancingTermChange('interestRate', parseFloat(e.target.value))} step="0.1" min="0" />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Loan Term
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={sellerFinancingTerms.loanTerm} onChange={e => handleFinancingTermChange('loanTerm', parseInt(e.target.value))}>
                  <option value={5}>5 years</option>
                  <option value={10}>10 years</option>
                  <option value={15}>15 years</option>
                  <option value={20}>20 years</option>
                  <option value={25}>25 years</option>
                  <option value={30}>30 years</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked={sellerFinancingTerms.balloonPayment} onChange={e => handleFinancingTermChange('balloonPayment', e.target.checked)} />
                  <span className="text-sm">Include balloon payment</span>
                </label>
                {sellerFinancingTerms.balloonPayment && <div className="mt-2">
                    <label className="block text-xs text-gray-500 mb-1">
                      Balloon Term (years)
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={sellerFinancingTerms.balloonTerm} onChange={e => handleFinancingTermChange('balloonTerm', parseInt(e.target.value))}>
                      <option value={3}>3 years</option>
                      <option value={5}>5 years</option>
                      <option value={7}>7 years</option>
                      <option value={10}>10 years</option>
                    </select>
                  </div>}
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Monthly Payment:</div>
                  <div className="font-bold">
                    {formatCurrency(monthlyPayment)}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm">Down Payment:</div>
                  <div className="font-bold">
                    {formatCurrency(offerAmount * (sellerFinancingTerms.downPayment / 100))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm">Financed Amount:</div>
                  <div className="font-bold">
                    {formatCurrency(offerAmount * (1 - sellerFinancingTerms.downPayment / 100))}
                  </div>
                </div>
              </div>
            </div>}
          {/* Subject To Existing Mortgage Details - Only show for Subject To template */}
          {selectedTemplate && selectedTemplate._id === 'subject-to' && <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Subject To Existing Mortgage Details
              </h3>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Existing Mortgage Balance (Estimated)
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter estimated mortgage balance" value={Math.round(selectedProperty.price * 0.7).toString()} />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Typically 70-80% of property value for newer mortgages
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Mortgage Payment (Estimated)
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Monthly payment" value={Math.round(selectedProperty.price * 0.7 * 0.006).toString()} />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Estimated based on typical 30-year mortgage rates
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Cash to Seller (Equity Payment)
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Cash to seller" value={Math.round(offerAmount - selectedProperty.price * 0.7).toString()} />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Difference between offer price and mortgage balance
                </p>
              </div>
              <div className="bg-tertiary bg-opacity-10 rounded-lg p-3 mb-3">
                <div className="flex items-start">
                  <AlertTriangle size={16} className="text-tertiary-dark mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-700">
                      Subject-to deals require specialized legal documentation
                      to protect both parties. Consider consulting a real estate
                      attorney familiar with this strategy.
                    </p>
                  </div>
                </div>
              </div>
            </div>}
          {/* Hybrid Offer Terms - Only show for Hybrid template */}
          {selectedTemplate && selectedTemplate._id === 'hybrid' && <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Hybrid Financing Structure
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                <h4 className="text-xs font-medium text-gray-700 mb-2">
                  Purchase Structure
                </h4>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="text-xs text-gray-500">
                      Assumed Mortgage
                    </div>
                    <div className="font-medium text-sm">
                      {formatCurrency(hybridFinancingTerms.assumedLoanBalance)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round(hybridFinancingTerms.assumedLoanBalance / offerAmount * 100)}
                      % of offer
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="text-xs text-gray-500">
                      Seller Financing
                    </div>
                    <div className="font-medium text-sm">
                      {formatCurrency(hybridFinancingTerms.sellerFinanceAmount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round(hybridFinancingTerms.sellerFinanceAmount / offerAmount * 100)}
                      % of offer
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <div className="text-xs text-gray-500">Cash Down</div>
                    <div className="font-medium text-sm">
                      {formatCurrency(hybridFinancingTerms.downPayment)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round(hybridFinancingTerms.downPayment / offerAmount * 100)}
                      % of offer
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Assumed Loan Balance
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="number" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={hybridFinancingTerms.assumedLoanBalance} onChange={e => handleHybridTermChange('assumedLoanBalance', parseInt(e.target.value))} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Seller Financed Amount
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="number" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={hybridFinancingTerms.sellerFinanceAmount} onChange={e => handleHybridTermChange('sellerFinanceAmount', parseInt(e.target.value))} />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Cash Down Payment
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="number" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={hybridFinancingTerms.downPayment} onChange={e => handleHybridTermChange('downPayment', parseInt(e.target.value))} />
                </div>
              </div>
              <h4 className="text-sm font-medium text-gray-700 mt-4 mb-3">
                Seller Financing Terms
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Interest Rate
                  </label>
                  <div className="relative">
                    <Percent size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="number" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={hybridFinancingTerms.interestRate} onChange={e => handleHybridTermChange('interestRate', parseFloat(e.target.value))} step="0.1" min="0" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Loan Term
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={hybridFinancingTerms.loanTerm} onChange={e => handleHybridTermChange('loanTerm', parseInt(e.target.value))}>
                    <option value={3}>3 years</option>
                    <option value={5}>5 years</option>
                    <option value={7}>7 years</option>
                    <option value={10}>10 years</option>
                    <option value={15}>15 years</option>
                    <option value={20}>20 years</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked={hybridFinancingTerms.balloonPayment} onChange={e => handleHybridTermChange('balloonPayment', e.target.checked)} />
                  <span className="text-sm">Include balloon payment</span>
                </label>
                {hybridFinancingTerms.balloonPayment && <div className="mt-2">
                    <label className="block text-xs text-gray-500 mb-1">
                      Balloon Term (years)
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={hybridFinancingTerms.balloonTerm} onChange={e => handleHybridTermChange('balloonTerm', parseInt(e.target.value))}>
                      <option value={1}>1 year</option>
                      <option value={2}>2 years</option>
                      <option value={3}>3 years</option>
                      <option value={5}>5 years</option>
                    </select>
                  </div>}
              </div>
            </div>}
          <div className="p-4 text-center">
            <button className="text-gray-500 text-sm hover:text-primary" onClick={handleReset}>
              Reset Form
            </button>
          </div>
        </div>
      </div>
      {/* Right Panel - Live Preview (60%) */}
      <div className="w-full lg:w-3/5 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-medium text-lg">LOI Preview</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm flex items-center hover:bg-gray-50 transition-all" onClick={handleSaveCurrentAsTemplate}>
                <Save size={16} className="mr-1.5" />
                Save as Template
              </button>
              <button className="px-3 py-1.5 bg-dark text-white rounded-lg text-sm flex items-center hover:bg-gray-700 transition-all" onClick={handleDownloadPDF} disabled={isPdfGenerating}>
                {isPdfGenerating ? <>
                    <Loader size={16} className="mr-1.5 animate-spin" />
                    Generating...
                  </> : <>
                    <Download size={16} className="mr-1.5" />
                    Download PDF
                  </>}
              </button>
            </div>
          </div>
          <div className="p-6 bg-gray-50">
            <div ref={loiContentRef} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm max-w-4xl mx-auto">
              {/* Use template content if available, otherwise fall back to default */}
              {selectedTemplate.content ? (
                <div dangerouslySetInnerHTML={{ 
                  __html: replacePlaceholders(selectedTemplate.content).replace(/\n/g, '<br />') 
                }} />
              ) : (
                <>
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <div className="flex justify-between items-center">
                      <img src="/AcquireFlow_Logo_%281%29.svg" alt="AcquireFlow.AI" className="h-10 object-contain" />
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          AcquireFlow Real Estate
                        </p>
                        <p className="text-xs text-gray-500">
                          123 Business Ave, Suite 200
                        </p>
                        <p className="text-xs text-gray-500">Orlando, FL 32801</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">
                      LETTER OF INTENT TO PURCHASE REAL ESTATE
                    </h1>
                    <p className="text-gray-500">
                      {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="mb-3">
                        <strong>Property Address:</strong>{' '}
                        {selectedProperty.address}
                      </p>
                      <p className="mb-3">
                        <strong>Recipient:</strong> {selectedProperty.agent}
                      </p>
                      <p className="mb-3">
                        <strong>Agent Company:</strong>{' '}
                        {selectedProperty.agentCompany}
                      </p>
                      <p className="mb-3">
                        <strong>Subject:</strong> Letter of Intent to Purchase{' '}
                        {selectedProperty.address}
                      </p>
                    </div>
                    <div>
                      <p className="mb-3">Dear {selectedProperty.agent},</p>
                      <p className="mb-3">
                        I am writing to express my interest in purchasing the
                        property located at {selectedProperty.address}. After
                        careful consideration of the property's location, condition,
                        and potential, I would like to submit the following Letter
                        of Intent:
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                      <p className="mb-3">
                        <strong>Purchase Price:</strong>{' '}
                        {formatCurrency(offerAmount)}
                        {offerPercentage !== 100 && ` (${offerPercentage}% of asking price)`}
                      </p>
                      <p className="mb-3">
                        <strong>Earnest Money Deposit:</strong>{' '}
                        {formatCurrency(earnestMoneyAmount)} ({earnestMoney}% of
                        offer)
                      </p>
                      <p className="mb-3">
                        <strong>Closing Timeline:</strong> {closingTimeline} days
                        from acceptance
                      </p>
                      <p className="mb-3">
                        <strong>Inspection Period:</strong> {inspectionPeriod} days
                      </p>
                      {/* Standard Cash Offer Terms */}
                      {selectedTemplate._id === 'standard-cash' && <>
                          <p className="mb-3">
                            <strong>Financing:</strong> Cash offer with no financing
                            contingency
                          </p>
                          <p className="mb-3">
                            <strong>Proof of Funds:</strong> Available upon request
                          </p>
                          <p className="mb-3">
                            <strong>Contingencies:</strong>{' '}
                            {[subjectToOptions.inspection && 'Inspection', subjectToOptions.attorneyReview && 'Attorney Review', subjectToOptions.partnerApproval && 'Partner Approval', subjectToOptions.custom && subjectToOptions.custom].filter(Boolean).join(', ')}
                          </p>
                        </>}
                      {/* Subject To Terms */}
                      {selectedTemplate._id === 'subject-to' && <>
                          <p className="mb-3">
                            <strong>Contingencies:</strong>{' '}
                            {[subjectToOptions.inspection && 'Inspection', subjectToOptions.appraisal && 'Appraisal', subjectToOptions.attorneyReview && 'Attorney Review', subjectToOptions.partnerApproval && 'Partner Approval', subjectToOptions.custom && subjectToOptions.custom].filter(Boolean).join(', ')}
                          </p>
                          <p className="mb-3">
                            <strong>Subject To Existing Financing:</strong> This
                            offer is made subject to the existing financing on the
                            property. Buyer intends to take over the existing
                            mortgage payments while keeping the loan in the Seller's
                            name, with appropriate legal safeguards for both
                            parties.
                          </p>
                          <p className="mb-3">
                            <strong>Estimated Mortgage Balance:</strong>{' '}
                            {formatCurrency(Math.round(selectedProperty.price * 0.7))}
                          </p>
                          <p className="mb-3">
                            <strong>Cash to Seller at Closing:</strong>{' '}
                            {formatCurrency(Math.round(offerAmount - selectedProperty.price * 0.7))}
                          </p>
                        </>}
                      {/* Seller Financing Terms */}
                      {selectedTemplate._id === 'seller-financing' && <>
                          <p className="mb-3">
                            <strong>Contingencies:</strong>{' '}
                            {[subjectToOptions.inspection && 'Inspection', subjectToOptions.appraisal && 'Appraisal', subjectToOptions.attorneyReview && 'Attorney Review', subjectToOptions.partnerApproval && 'Partner Approval', subjectToOptions.custom && subjectToOptions.custom].filter(Boolean).join(', ')}
                          </p>
                          <p className="mb-3">
                            <strong>Seller Financing Terms:</strong>
                          </p>
                          <ul className="list-disc pl-5 mb-3 space-y-1">
                            <li>
                              Down Payment:{' '}
                              {formatCurrency(offerAmount * (sellerFinancingTerms.downPayment / 100))}{' '}
                              ({sellerFinancingTerms.downPayment}%)
                            </li>
                            <li>
                              Financed Amount:{' '}
                              {formatCurrency(offerAmount * (1 - sellerFinancingTerms.downPayment / 100))}
                            </li>
                            <li>
                              Interest Rate: {sellerFinancingTerms.interestRate}%
                            </li>
                            <li>
                              Loan Term: {sellerFinancingTerms.loanTerm} years
                            </li>
                            <li>
                              Monthly Payment: {formatCurrency(monthlyPayment)}
                            </li>
                            {sellerFinancingTerms.balloonPayment && <li>
                                Balloon Payment: Due after{' '}
                                {sellerFinancingTerms.balloonTerm} years
                              </li>}
                          </ul>
                        </>}
                      {/* Hybrid Terms */}
                      {selectedTemplate._id === 'hybrid' && <>
                          <p className="mb-3">
                            <strong>Contingencies:</strong>{' '}
                            {[subjectToOptions.inspection && 'Inspection', subjectToOptions.appraisal && 'Appraisal', subjectToOptions.attorneyReview && 'Attorney Review', subjectToOptions.partnerApproval && 'Partner Approval', subjectToOptions.custom && subjectToOptions.custom].filter(Boolean).join(', ')}
                          </p>
                          <p className="mb-3">
                            <strong>Hybrid Financing Structure:</strong>
                          </p>
                          <ul className="list-disc pl-5 mb-3 space-y-1">
                            <li>
                              Assumption of Existing Mortgage:{' '}
                              {formatCurrency(hybridFinancingTerms.assumedLoanBalance)}
                            </li>
                            <li>
                              Seller Financing:{' '}
                              {formatCurrency(hybridFinancingTerms.sellerFinanceAmount)}
                              <ul className="list-circle pl-5 mt-1 space-y-1 text-sm">
                                <li>
                                  Interest Rate: {hybridFinancingTerms.interestRate}
                                  %
                                </li>
                                <li>Term: {hybridFinancingTerms.loanTerm} years</li>
                                {hybridFinancingTerms.balloonPayment && <li>
                                    Balloon Payment: Due after{' '}
                                    {hybridFinancingTerms.balloonTerm} years
                                  </li>}
                              </ul>
                            </li>
                            <li>
                              Cash Down Payment:{' '}
                              {formatCurrency(hybridFinancingTerms.downPayment)}
                            </li>
                          </ul>
                        </>}
                    </div>
                    <div>
                      {/* Standard Cash Offer specific language */}
                      {selectedTemplate._id === 'standard-cash' && <p className="mb-3">
                          I am prepared to move forward quickly with this cash offer
                          and can provide proof of funds immediately upon request.
                          With no financing contingency, we can close in as little
                          as {closingTimeline} days, providing you with certainty
                          and a clean, efficient transaction.
                        </p>}
                      {/* Subject To specific language */}
                      {selectedTemplate._id === 'subject-to' && <p className="mb-3">
                          This "Subject-To" offer allows you to sell your property
                          without paying off your existing mortgage. I will take
                          over the responsibility of making the mortgage payments
                          while you receive the difference between your mortgage
                          balance and the purchase price in cash at closing. This
                          approach can be beneficial if you need to sell quickly
                          without waiting for traditional financing approval.
                        </p>}
                      {/* Seller Financing specific language */}
                      {selectedTemplate._id === 'seller-financing' && <p className="mb-3">
                          The seller financing structure outlined above provides you
                          with an immediate down payment plus ongoing monthly income
                          at an attractive interest rate. This arrangement can offer
                          tax advantages by spreading your capital gains over time
                          while providing a competitive return on your equity. All
                          terms will be secured with a promissory note and
                          mortgage/deed of trust on the property.
                        </p>}
                      {/* Hybrid specific language */}
                      {selectedTemplate._id === 'hybrid' && <p className="mb-3">
                          This hybrid structure combines the benefits of a
                          Subject-To transaction with seller financing. You'll
                          receive an immediate cash payment while also creating
                          ongoing monthly income from the seller-financed portion.
                          This creative approach maximizes flexibility for both
                          parties while allowing for a faster closing than
                          traditional financing would permit.
                        </p>}
                      <p className="mb-3">
                        My team and I have extensive experience in real estate
                        acquisitions in this area and are committed to a smooth
                        transaction process. I understand the unique considerations
                        involved in this type of transaction and will ensure all
                        necessary documentation is handled professionally.
                      </p>
                      <p className="mb-3">
                        Please consider this a formal expression of my interest in
                        the property. I look forward to your response and am
                        available to discuss any aspects of this offer at your
                        convenience.
                      </p>
                      <p className="mb-5">Sincerely,</p>
                      <p>
                        [Your Name]
                        <br />
                        AcquireFlow Real Estate
                        <br />
                        (555) 123-4567
                        <br />
                        investor@acquireflow.com
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="px-5 py-4 border-t border-gray-200 flex justify-between items-center">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm flex items-center hover:bg-gray-50 transition-all">
              <Save size={16} className="mr-1.5" />
              Save Template
            </button>
            <p className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
      {/* Template Editor Modal */}
      {showTemplateEditor && editingTemplate && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-auto">
            <TemplateEditor template={editingTemplate} onSave={handleSaveTemplate} onCancel={handleCancelTemplateEdit} isNew={isCreatingTemplate} />
          </div>
        </div>}
    </div>;
};
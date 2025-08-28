import React, { useEffect, useState } from 'react';
import { X, Edit2, Trash2, ExternalLink, Clock, Calendar, CheckCircle, Users, FileText, MessageSquare, Link2, Mail, Phone, DollarSign, Plus, Upload, PlusCircle } from 'lucide-react';
import { Deal, Task, Document, Communication } from './types';
type DealDetailModalProps = {
  deal: Deal;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (deal: Deal) => void;
  onDelete: (dealId: string) => void;
  isEditing?: boolean;
};
type TabType = 'overview' | 'tasks' | 'documents' | 'communications' | 'financials';
export const DealDetailModal = ({
  deal,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  isEditing = false
}: DealDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditMode, setIsEditMode] = useState(isEditing);
  const [editedDeal, setEditedDeal] = useState<Deal>(deal);
  // Modal states
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [showFinancialsModal, setShowFinancialsModal] = useState(false);
  // Form states
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false
  });
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    name: '',
    type: 'pdf',
    url: '#',
    size: 0
  });
  const [newCommunication, setNewCommunication] = useState<Partial<Communication>>({
    type: 'email',
    content: '',
    sender: 'You',
    recipient: deal.agent.name,
    date: new Date().toISOString().split('T')[0]
  });
  // Update edited deal when deal prop changes
  useEffect(() => {
    setEditedDeal(deal);
    setIsEditMode(isEditing);
  }, [deal, isEditing]);
  if (!isOpen) return null;
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, section?: string) => {
    const {
      name,
      value
    } = e.target;
    if (section) {
      setEditedDeal(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [name]: name === 'value' || name === 'potentialProfit' || name === 'purchasePrice' || name === 'closingCosts' || name === 'repairCosts' || name === 'arv' || name === 'monthlyRent' || name === 'monthlyCosts' ? parseFloat(value) : value
        }
      }));
    } else {
      setEditedDeal(prev => ({
        ...prev,
        [name]: name === 'value' || name === 'potentialProfit' ? parseFloat(value) : value
      }));
    }
  };
  // Handle save
  const handleSave = () => {
    onUpdate(editedDeal);
    setIsEditMode(false);
  };
  // Handle cancel
  const handleCancel = () => {
    setEditedDeal(deal);
    setIsEditMode(false);
  };
  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      onDelete(deal.id);
    }
  };
  // Handle add task
  const handleAddTask = () => {
    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title || '',
      description: newTask.description,
      dueDate: newTask.dueDate || new Date().toISOString(),
      completed: newTask.completed || false,
      assignedTo: newTask.assignedTo
    };
    setEditedDeal(prev => ({
      ...prev,
      tasks: [...prev.tasks, task]
    }));
    onUpdate({
      ...editedDeal,
      tasks: [...editedDeal.tasks, task]
    });
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      completed: false
    });
    setShowTaskModal(false);
  };
  // Handle update task
  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = editedDeal.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    // Update local state first
    setEditedDeal(prev => ({
      ...prev,
      tasks: updatedTasks
    }));
    // Use a separate function to update the parent component
    // without triggering a modal close or refresh
    setTimeout(() => {
      onUpdate({
        ...editedDeal,
        tasks: updatedTasks
      });
    }, 0);
  };
  // Handle delete task
  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = editedDeal.tasks.filter(task => task.id !== taskId);
    setEditedDeal(prev => ({
      ...prev,
      tasks: updatedTasks
    }));
    onUpdate({
      ...editedDeal,
      tasks: updatedTasks
    });
  };
  // Handle add document
  const handleAddDocument = () => {
    const document: Document = {
      id: `doc-${Date.now()}`,
      name: newDocument.name || 'Untitled Document',
      type: newDocument.type || 'pdf',
      url: newDocument.url || '#',
      uploadDate: new Date().toISOString(),
      size: newDocument.size || 1024 // Default 1KB
    };
    setEditedDeal(prev => ({
      ...prev,
      documents: [...prev.documents, document]
    }));
    onUpdate({
      ...editedDeal,
      documents: [...editedDeal.documents, document]
    });
    setNewDocument({
      name: '',
      type: 'pdf',
      url: '#',
      size: 0
    });
    setShowDocumentModal(false);
  };
  // Handle delete document
  const handleDeleteDocument = (documentId: string) => {
    const updatedDocuments = editedDeal.documents.filter(doc => doc.id !== documentId);
    setEditedDeal(prev => ({
      ...prev,
      documents: updatedDocuments
    }));
    onUpdate({
      ...editedDeal,
      documents: updatedDocuments
    });
  };
  // Handle add communication
  const handleAddCommunication = () => {
    const communication: Communication = {
      id: `comm-${Date.now()}`,
      type: newCommunication.type as 'email' | 'call' | 'meeting' | 'note',
      date: newCommunication.date || new Date().toISOString(),
      content: newCommunication.content || '',
      sender: newCommunication.sender || 'You',
      recipient: newCommunication.recipient
    };
    setEditedDeal(prev => ({
      ...prev,
      communications: [...prev.communications, communication]
    }));
    onUpdate({
      ...editedDeal,
      communications: [...editedDeal.communications, communication]
    });
    setNewCommunication({
      type: 'email',
      content: '',
      sender: 'You',
      recipient: deal.agent.name,
      date: new Date().toISOString().split('T')[0]
    });
    setShowCommunicationModal(false);
  };
  // Handle update financials
  const handleUpdateFinancials = () => {
    onUpdate(editedDeal);
    setShowFinancialsModal(false);
  };
  // Handle task template selection
  const handleApplyTaskTemplate = (template: string) => {
    let newTasks: Task[] = [];
    switch (template) {
      case 'due-diligence':
        newTasks = [{
          id: `task-dd-1-${Date.now()}`,
          title: 'Schedule property inspection',
          description: 'Contact inspector to schedule full property assessment',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-dd-2-${Date.now()}`,
          title: 'Review property disclosures',
          description: 'Analyze all seller disclosures for potential issues',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-dd-3-${Date.now()}`,
          title: 'Verify zoning and permits',
          description: 'Check with local municipality for zoning and permit history',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-dd-4-${Date.now()}`,
          title: 'Order title report',
          description: 'Contact title company to order preliminary title report',
          dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-dd-5-${Date.now()}`,
          title: 'Review HOA documents',
          description: 'Review HOA rules, financials, and meeting minutes',
          dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-dd-6-${Date.now()}`,
          title: 'Verify insurance options',
          description: 'Get insurance quotes for the property',
          dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-dd-7-${Date.now()}`,
          title: 'Check utility history',
          description: 'Request last 12 months of utility bills',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-dd-8-${Date.now()}`,
          title: 'Complete due diligence report',
          description: 'Compile findings into final due diligence report',
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }];
        break;
      case 'closing':
        newTasks = [{
          id: `task-cl-1-${Date.now()}`,
          title: 'Schedule final walkthrough',
          description: 'Coordinate final property walkthrough before closing',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-cl-2-${Date.now()}`,
          title: 'Review closing disclosure',
          description: 'Review and approve final closing disclosure',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-cl-3-${Date.now()}`,
          title: 'Wire closing funds',
          description: 'Transfer funds to escrow for closing',
          dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-cl-4-${Date.now()}`,
          title: 'Confirm closing appointment',
          description: 'Verify date, time, and location for closing',
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-cl-5-${Date.now()}`,
          title: 'Transfer utilities',
          description: 'Set up utility transfers effective on closing date',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-cl-6-${Date.now()}`,
          title: 'Obtain closing documents',
          description: 'Collect all signed closing documents',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }];
        break;
      case 'rehab':
        newTasks = [{
          id: `task-rh-1-${Date.now()}`,
          title: 'Create detailed scope of work',
          description: 'Document all renovations needed with specifications',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-2-${Date.now()}`,
          title: 'Obtain contractor bids',
          description: 'Get at least 3 bids for renovation work',
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-3-${Date.now()}`,
          title: 'Select contractors',
          description: 'Choose contractors and finalize contracts',
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-4-${Date.now()}`,
          title: 'Pull permits',
          description: 'Obtain necessary permits for renovation work',
          dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-5-${Date.now()}`,
          title: 'Schedule material deliveries',
          description: 'Order and schedule delivery of all materials',
          dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-6-${Date.now()}`,
          title: 'Begin demolition',
          description: 'Start demolition phase of renovation',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-7-${Date.now()}`,
          title: 'Rough-in inspections',
          description: 'Schedule and pass rough-in inspections',
          dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-8-${Date.now()}`,
          title: 'Install finishes',
          description: 'Complete all finish work (flooring, paint, fixtures)',
          dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-9-${Date.now()}`,
          title: 'Final inspections',
          description: 'Schedule and pass final inspections',
          dueDate: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-10-${Date.now()}`,
          title: 'Final walkthrough',
          description: 'Conduct final quality check of all work',
          dueDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-11-${Date.now()}`,
          title: 'Property staging',
          description: 'Stage property for photos and showings',
          dueDate: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }, {
          id: `task-rh-12-${Date.now()}`,
          title: 'List property',
          description: 'Prepare and publish property listing',
          dueDate: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }];
        break;
      default:
        return;
    }
    // Add tasks to deal
    setEditedDeal(prev => ({
      ...prev,
      tasks: [...prev.tasks, ...newTasks]
    }));
    onUpdate({
      ...editedDeal,
      tasks: [...editedDeal.tasks, ...newTasks]
    });
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-dark">
              {isEditMode ? 'Edit Deal' : deal.title}
            </h2>
            <span className={`ml-3 px-2 py-0.5 text-xs rounded-full font-medium ${deal.priority === 'High' ? 'bg-secondary bg-opacity-10 text-secondary' : deal.priority === 'Medium' ? 'bg-tertiary bg-opacity-10 text-tertiary-dark' : 'bg-primary bg-opacity-10 text-primary'}`}>
              {deal.priority} Priority
            </span>
            {deal.flagged && <span className="ml-3 px-2 py-0.5 text-xs rounded-full font-medium bg-secondary bg-opacity-10 text-secondary">
                Flagged
              </span>}
          </div>
          <div className="flex items-center">
            {!isEditMode && <>
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 mr-2" onClick={() => setIsEditMode(true)}>
                  <Edit2 size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 mr-2" onClick={handleDelete}>
                  <Trash2 size={20} />
                </button>
              </>}
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('overview')}>
            Overview
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'tasks' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('tasks')}>
            Tasks
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'documents' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('documents')}>
            Documents
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'communications' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('communications')}>
            Communications
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'financials' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('financials')}>
            Financials
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Overview Tab */}
          {activeTab === 'overview' && <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Property Details */}
              <div className="md:col-span-2">
                <h3 className="font-medium text-dark mb-3">Property Details</h3>
                {isEditMode ? <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deal Title
                      </label>
                      <input type="text" name="title" value={editedDeal.title} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stage
                        </label>
                        <select name="stage" value={editedDeal.stage} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg">
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
                        <select name="priority" value={editedDeal.priority} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg">
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Property Address
                      </label>
                      <input type="text" name="address" value={editedDeal.property.address} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input type="text" name="city" value={editedDeal.property.city} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input type="text" name="state" value={editedDeal.property.state} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP
                        </label>
                        <input type="text" name="zip" value={editedDeal.property.zip} onChange={e => handleInputChange(e, 'property')} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <input type="checkbox" id="flagged" name="flagged" checked={editedDeal.flagged || false} onChange={e => {
                  setEditedDeal(prev => ({
                    ...prev,
                    flagged: e.target.checked
                  }));
                }} className="mr-2" />
                      <label htmlFor="flagged" className="text-sm">
                        Flag this deal
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea name="notes" value={editedDeal.notes || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" rows={3} />
                    </div>
                  </div> : <div>
                    {deal.notes && <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Notes
                        </h4>
                        <p className="text-dark mt-1">{deal.notes}</p>
                      </div>}
                    <div className="relative mb-4 rounded-lg overflow-hidden h-48 bg-gray-200">
                      <img src={deal.property.image} alt={deal.property.address} className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Address
                        </h4>
                        <p className="text-dark">
                          {deal.property.address}, {deal.property.city},{' '}
                          {deal.property.state} {deal.property.zip}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Property Type
                        </h4>
                        <p className="text-dark">
                          {deal.property.type === 'SingleFamily' ? 'Single Family' : deal.property.type === 'MultiFamily' ? 'Multi-Family' : deal.property.type}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Details
                        </h4>
                        <p className="text-dark">
                          {deal.property.beds} beds, {deal.property.baths}{' '}
                          baths, {deal.property.sqft.toLocaleString()} sq ft
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Year Built
                        </h4>
                        <p className="text-dark">{deal.property.yearBuilt}</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Deal Timeline
                      </h4>
                      <div className="relative pl-10">
                        <div className="absolute top-0 bottom-0 left-3.5 w-px bg-gray-200"></div>
                        {deal.stageHistory.map((history, index) => <div key={index} className="mb-6 relative">
                            <div className="absolute left-[-22px] top-0 w-5 h-5 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                              <div className={`w-2 h-2 rounded-full ${history.stage === 'Prospecting' ? 'bg-blue-600' : history.stage === 'UnderContract' ? 'bg-tertiary' : history.stage === 'DueDiligence' ? 'bg-primary' : history.stage === 'Negotiations' ? 'bg-purple-600' : 'bg-secondary'}`}></div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">
                                {history.stage === 'UnderContract' ? 'Under Contract' : history.stage === 'DueDiligence' ? 'Due Diligence' : history.stage}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center mt-1">
                                <Calendar size={12} className="mr-1.5 flex-shrink-0" />
                                {formatDate(history.date)}
                                {history.daysInStage > 0 && <span className="ml-3 flex items-center">
                                    <Clock size={12} className="mr-1.5 flex-shrink-0" />
                                    {history.daysInStage} days
                                  </span>}
                              </div>
                            </div>
                          </div>)}
                        {deal.stage !== 'Closing' && <div className="mb-3 relative">
                            <div className="absolute left-[-22px] top-0 w-5 h-5 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center opacity-50">
                              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-400">
                                Closing
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                Estimated completion
                              </div>
                            </div>
                          </div>}
                      </div>
                    </div>
                  </div>}
              </div>
              {/* Right Column - Deal Details */}
              <div>
                <h3 className="font-medium text-dark mb-3">Deal Details</h3>
                {isEditMode ? <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deal Value
                      </label>
                      <input type="number" name="value" value={editedDeal.value} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Potential Profit
                      </label>
                      <input type="number" name="potentialProfit" value={editedDeal.potentialProfit} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Next Action
                      </label>
                      <input type="text" name="nextAction" value={editedDeal.nextAction || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Next Action Date
                      </label>
                      <input type="date" name="nextActionDate" value={editedDeal.nextActionDate ? new Date(editedDeal.nextActionDate).toISOString().split('T')[0] : ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="flex justify-between space-x-3 pt-4">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg flex-1" onClick={handleCancel}>
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg flex-1" onClick={handleSave}>
                        Save Changes
                      </button>
                    </div>
                  </div> : <div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-gray-700">
                            Deal Value
                          </h4>
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(deal.value)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-gray-700">
                            Potential Profit
                          </h4>
                          <span className="text-lg font-bold text-secondary">
                            {formatCurrency(deal.potentialProfit)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-gray-700">
                            ROI
                          </h4>
                          <span className="text-lg font-bold text-tertiary-dark">
                            {deal.value > 0 ? Math.round(deal.potentialProfit / deal.value * 100) : 0}
                            %
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            Days in current stage
                          </div>
                          <div className="text-sm font-medium">
                            {deal.daysInCurrentStage} days
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Agent Information
                        </h4>
                        <div className="mb-3">
                          <div className="font-medium">{deal.agent.name}</div>
                          <div className="text-xs text-gray-500">
                            {deal.agent.company}
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Mail size={14} className="text-gray-400 mr-2" />
                            <span>{deal.agent.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone size={14} className="text-gray-400 mr-2" />
                            <span>{deal.agent.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Next Action
                        </h4>
                        {deal.nextAction ? <div>
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-2">
                                <CheckCircle size={16} className="text-primary" />
                              </div>
                              <span className="font-medium">
                                {deal.nextAction}
                              </span>
                            </div>
                            {deal.nextActionDate && <div className="flex items-center text-sm text-gray-500">
                                <Calendar size={14} className="mr-1" />
                                <span>
                                  Due by {formatDate(deal.nextActionDate)}
                                </span>
                              </div>}
                          </div> : <div className="text-center py-3">
                            <div className="text-gray-400 mb-2">
                              No next action set
                            </div>
                            <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={() => setIsEditMode(true)}>
                              Set Next Action
                            </button>
                          </div>}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Quick Actions
                        </h4>
                        <div className="space-y-2">
                          <button className="w-full py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors" onClick={() => setShowTaskModal(true)}>
                            Schedule Follow-up
                          </button>
                          <button className="w-full py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-colors" onClick={() => setShowCommunicationModal(true)}>
                            Send Offer
                          </button>
                          <button className="w-full py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActiveTab('overview')}>
                            View Property Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>}
          {/* Tasks Tab */}
          {activeTab === 'tasks' && <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-dark">Tasks & Action Items</h3>
                <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={() => setShowTaskModal(true)}>
                  Add Task
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm font-medium">Active Tasks</div>
                    <div className="text-xs text-gray-500">
                      {editedDeal.tasks.filter(task => !task.completed).length}{' '}
                      pending,{' '}
                      {editedDeal.tasks.filter(task => task.completed).length}{' '}
                      completed
                    </div>
                  </div>
                  <div className="space-y-3">
                    {editedDeal.tasks.map(task => <div key={task.id} className={`p-3 rounded-lg border ${task.completed ? 'border-gray-200 bg-gray-50' : 'border-gray-200'}`}>
                        <div className="flex items-start">
                          <div className="pt-0.5">
                            <input type="checkbox" checked={task.completed} onChange={() => handleUpdateTask({
                        ...task,
                        completed: !task.completed
                      })} className="rounded border-gray-300 text-primary focus:ring-primary" />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-dark'}`}>
                              {task.title}
                            </div>
                            {task.description && <div className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                                {task.description}
                              </div>}
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <Calendar size={12} className="mr-1" />
                              <span>Due: {formatDate(task.dueDate)}</span>
                              {task.assignedTo && <span className="ml-3">
                                  Assigned to: {task.assignedTo}
                                </span>}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <button className="p-1.5 text-gray-400 hover:text-gray-600" onClick={() => handleDeleteTask(task.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>)}
                    {editedDeal.tasks.length === 0 && <div className="text-center py-8 text-gray-500">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <CheckCircle size={24} className="text-gray-400" />
                        </div>
                        <p>No tasks yet</p>
                        <p className="text-sm">
                          Add tasks to track your deal progress
                        </p>
                      </div>}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-medium text-dark mb-4">Task Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => handleApplyTaskTemplate('due-diligence')}>
                    <h4 className="font-medium mb-2">
                      Due Diligence Checklist
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Standard due diligence tasks for property acquisition
                    </p>
                    <div className="text-xs text-gray-500">8 tasks</div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => handleApplyTaskTemplate('closing')}>
                    <h4 className="font-medium mb-2">Closing Process</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Tasks to complete before and during closing
                    </p>
                    <div className="text-xs text-gray-500">6 tasks</div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => handleApplyTaskTemplate('rehab')}>
                    <h4 className="font-medium mb-2">Rehab Project</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Renovation and rehab tracking tasks
                    </p>
                    <div className="text-xs text-gray-500">12 tasks</div>
                  </div>
                </div>
              </div>
            </div>}
          {/* Documents Tab */}
          {activeTab === 'documents' && <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-dark">Documents</h3>
                <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={() => setShowDocumentModal(true)}>
                  Upload Document
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Deal Documents
                  </h4>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {editedDeal.documents.length > 0 ? <div className="divide-y divide-gray-100">
                        {editedDeal.documents.map(doc => <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                <FileText size={20} className="text-gray-500" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{doc.name}</div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span>{doc.type.toUpperCase()}</span>
                                  <span className="mx-1">•</span>
                                  <span>{doc.size / 1000} KB</span>
                                  <span className="mx-1">•</span>
                                  <span>
                                    Uploaded {formatDate(doc.uploadDate)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <button className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 mr-1">
                                  <ExternalLink size={14} />
                                </button>
                                <button className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200" onClick={() => handleDeleteDocument(doc.id)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>)}
                      </div> : <div className="text-center py-8 text-gray-500">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FileText size={24} className="text-gray-400" />
                        </div>
                        <p>No documents yet</p>
                        <p className="text-sm">
                          Upload documents to keep track of your deal
                        </p>
                      </div>}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Document Templates
                  </h4>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-100">
                      <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => {
                    setNewDocument({
                      name: 'Purchase Agreement',
                      type: 'pdf',
                      url: '#',
                      size: 2048
                    });
                    setShowDocumentModal(true);
                  }}>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mr-3">
                            <FileText size={20} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              Purchase Agreement
                            </div>
                            <div className="text-xs text-gray-500">
                              Standard real estate purchase contract
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => {
                    setNewDocument({
                      name: 'Due Diligence Checklist',
                      type: 'pdf',
                      url: '#',
                      size: 1536
                    });
                    setShowDocumentModal(true);
                  }}>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mr-3">
                            <FileText size={20} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              Due Diligence Checklist
                            </div>
                            <div className="text-xs text-gray-500">
                              Comprehensive property inspection list
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => {
                    setNewDocument({
                      name: 'Closing Disclosure',
                      type: 'pdf',
                      url: '#',
                      size: 3072
                    });
                    setShowDocumentModal(true);
                  }}>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mr-3">
                            <FileText size={20} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              Closing Disclosure
                            </div>
                            <div className="text-xs text-gray-500">
                              Final closing costs and terms
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Shared Links
                    </h4>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm">Property Documents Folder</div>
                        <button className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                          <Link2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">Virtual Tour</div>
                        <button className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                          <Link2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {/* Communications Tab */}
          {activeTab === 'communications' && <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-dark">Communication History</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={() => setShowCommunicationModal(true)}>
                    Log Communication
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg" onClick={() => {
                setNewCommunication({
                  ...newCommunication,
                  type: 'email',
                  content: `Hello ${deal.agent.name},\n\nI'm reaching out regarding the property at ${deal.property.address}. Could we schedule a time to discuss this further?\n\nBest regards,\nYou`
                });
                setShowCommunicationModal(true);
              }}>
                    Send Message
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {editedDeal.communications.length > 0 ? <div className="divide-y divide-gray-100">
                    {editedDeal.communications.map(comm => <div key={comm.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-3
                            ${comm.type === 'email' ? 'bg-primary bg-opacity-10' : comm.type === 'call' ? 'bg-tertiary bg-opacity-10' : comm.type === 'meeting' ? 'bg-secondary bg-opacity-10' : 'bg-gray-100'}
                          `}>
                            {comm.type === 'email' ? <Mail size={18} className="text-primary" /> : comm.type === 'call' ? <Phone size={18} className="text-tertiary-dark" /> : comm.type === 'meeting' ? <Users size={18} className="text-secondary" /> : <MessageSquare size={18} className="text-gray-500" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">
                                  {comm.type === 'email' ? 'Email' : comm.type === 'call' ? 'Phone Call' : comm.type === 'meeting' ? 'Meeting' : 'Note'}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {formatDate(comm.date)}
                                  <span className="mx-1">•</span>
                                  <span>{comm.sender}</span>
                                  {comm.recipient && <>
                                      <span className="mx-1">→</span>
                                      <span>{comm.recipient}</span>
                                    </>}
                                </p>
                              </div>
                              <button className="text-gray-400 hover:text-gray-600">
                                <Edit2 size={16} />
                              </button>
                            </div>
                            <p className="mt-2 text-sm">{comm.content}</p>
                          </div>
                        </div>
                      </div>)}
                  </div> : <div className="text-center py-8 text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageSquare size={24} className="text-gray-400" />
                    </div>
                    <p>No communication history yet</p>
                    <p className="text-sm">
                      Log your communications to keep track of your deal
                    </p>
                  </div>}
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Message Templates
                  </h4>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                    <div className="space-y-4">
                      <div className="cursor-pointer" onClick={() => {
                    setNewCommunication({
                      type: 'email',
                      content: `Hello ${deal.agent.name},\n\nI'm following up on our offer for ${deal.property.address}. Please let me know if you have any updates or feedback from the seller.\n\nBest regards,\nYou`,
                      sender: 'You',
                      recipient: deal.agent.name,
                      date: new Date().toISOString().split('T')[0]
                    });
                    setShowCommunicationModal(true);
                  }}>
                        <h5 className="font-medium">Initial Offer Follow-up</h5>
                        <p className="text-sm text-gray-500 mt-1">
                          Template for following up on initial offers
                        </p>
                      </div>
                      <div className="cursor-pointer" onClick={() => {
                    setNewCommunication({
                      type: 'email',
                      content: `Hello ${deal.agent.name},\n\nDue to some findings during our inspection process, we'd like to request an extension of our due diligence period for ${deal.property.address}. We're proposing an additional 7 days to complete our assessments.\n\nPlease let me know if this is acceptable.\n\nBest regards,\nYou`,
                      sender: 'You',
                      recipient: deal.agent.name,
                      date: new Date().toISOString().split('T')[0]
                    });
                    setShowCommunicationModal(true);
                  }}>
                        <h5 className="font-medium">
                          Due Diligence Extension Request
                        </h5>
                        <p className="text-sm text-gray-500 mt-1">
                          Request additional time for due diligence
                        </p>
                      </div>
                      <div className="cursor-pointer" onClick={() => {
                    setNewCommunication({
                      type: 'email',
                      content: `Hello ${deal.agent.name},\n\nI'm writing to confirm our closing details for ${deal.property.address}.\n\nClosing Date: [Date]\nTime: [Time]\nLocation: [Title Company Address]\n\nPlease let me know if you need any additional information from our side before closing.\n\nBest regards,\nYou`,
                      sender: 'You',
                      recipient: deal.agent.name,
                      date: new Date().toISOString().split('T')[0]
                    });
                    setShowCommunicationModal(true);
                  }}>
                        <h5 className="font-medium">Closing Confirmation</h5>
                        <p className="text-sm text-gray-500 mt-1">
                          Confirm closing details and requirements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Communication Schedule
                  </h4>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                    <div className="text-center py-4">
                      <p className="text-gray-500">
                        No scheduled communications
                      </p>
                      <button className="mt-2 px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={() => setShowTaskModal(true)}>
                        Schedule Follow-up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {/* Financials Tab */}
          {activeTab === 'financials' && <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-dark">Financial Analysis</h3>
                <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={() => setShowFinancialsModal(true)}>
                  Update Financials
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Purchase Details
                  </h4>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Purchase Price
                        </div>
                        <div className="font-medium">
                          {formatCurrency(editedDeal.financial.purchasePrice)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Closing Costs
                        </div>
                        <div className="font-medium">
                          {formatCurrency(editedDeal.financial.closingCosts)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Repair Costs
                        </div>
                        <div className="font-medium">
                          {formatCurrency(editedDeal.financial.repairCosts)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          After Repair Value (ARV)
                        </div>
                        <div className="font-medium">
                          {formatCurrency(editedDeal.financial.arv)}
                        </div>
                      </div>
                      <div className="pt-3 mt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium">
                            Total Investment
                          </div>
                          <div className="font-bold">
                            {formatCurrency(editedDeal.financial.purchasePrice + editedDeal.financial.closingCosts + editedDeal.financial.repairCosts)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-700 mt-6 mb-3">
                    Return Analysis
                  </h4>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Potential Profit
                        </div>
                        <div className="font-medium text-secondary">
                          {formatCurrency(editedDeal.potentialProfit)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">ROI</div>
                        <div className="font-medium">
                          {Math.round(editedDeal.potentialProfit / (editedDeal.financial.purchasePrice + editedDeal.financial.closingCosts + editedDeal.financial.repairCosts) * 100)}
                          %
                        </div>
                      </div>
                      {editedDeal.financial.capRate && <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">Cap Rate</div>
                          <div className="font-medium">
                            {editedDeal.financial.capRate}%
                          </div>
                        </div>}
                      {editedDeal.financial.cashOnCash && <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Cash on Cash Return
                          </div>
                          <div className="font-medium">
                            {editedDeal.financial.cashOnCash}%
                          </div>
                        </div>}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Monthly Cash Flow Analysis
                  </h4>
                  {editedDeal.financial.monthlyRent ? <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Monthly Rental Income
                          </div>
                          <div className="font-medium">
                            {formatCurrency(editedDeal.financial.monthlyRent)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Monthly Expenses
                          </div>
                          <div className="font-medium">
                            {formatCurrency(editedDeal.financial.monthlyCosts || 0)}
                          </div>
                        </div>
                        <div className="pt-3 mt-3 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">
                              Net Monthly Cash Flow
                            </div>
                            <div className="font-bold text-primary">
                              {formatCurrency((editedDeal.financial.monthlyRent || 0) - (editedDeal.financial.monthlyCosts || 0))}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Annual Cash Flow
                          </div>
                          <div className="font-medium">
                            {formatCurrency(((editedDeal.financial.monthlyRent || 0) - (editedDeal.financial.monthlyCosts || 0)) * 12)}
                          </div>
                        </div>
                      </div>
                    </div> : <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
                      <p className="text-gray-500 mb-2">
                        No rental analysis available
                      </p>
                      <button className="px-3 py-1.5 bg-tertiary text-dark text-sm rounded-lg" onClick={() => setShowFinancialsModal(true)}>
                        Add Rental Analysis
                      </button>
                    </div>}
                  <h4 className="text-sm font-medium text-gray-700 mt-6 mb-3">
                    Financing Details
                  </h4>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
                    <p className="text-gray-500 mb-2">
                      No financing details available
                    </p>
                    <button className="px-3 py-1.5 bg-tertiary text-dark text-sm rounded-lg" onClick={() => setShowFinancialsModal(true)}>
                      Add Financing Details
                    </button>
                  </div>
                  <div className="mt-6 bg-primary bg-opacity-10 rounded-xl p-4 border border-primary border-opacity-20">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                        <DollarSign size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">
                          Financial Recommendation
                        </h4>
                        <p className="text-sm text-gray-700 mt-1">
                          Based on the current numbers, this deal has a strong
                          ROI potential. Consider negotiating the purchase price
                          to improve returns even further.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>
      {/* Task Modal */}
      {showTaskModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Add New Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input type="text" value={newTask.title} onChange={e => setNewTask({
              ...newTask,
              title: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter task title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea value={newTask.description || ''} onChange={e => setNewTask({
              ...newTask,
              description: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-lg" rows={3} placeholder="Enter task description" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input type="date" value={newTask.dueDate?.toString().split('T')[0]} onChange={e => setNewTask({
              ...newTask,
              dueDate: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned To (Optional)
                </label>
                <input type="text" value={newTask.assignedTo || ''} onChange={e => setNewTask({
              ...newTask,
              assignedTo: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter assignee name" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="taskCompleted" checked={newTask.completed || false} onChange={e => setNewTask({
              ...newTask,
              completed: e.target.checked
            })} className="mr-2" />
                <label htmlFor="taskCompleted" className="text-sm">
                  Mark as completed
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg" onClick={() => setShowTaskModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg" onClick={handleAddTask} disabled={!newTask.title}>
                Add Task
              </button>
            </div>
          </div>
        </div>}
      {/* Document Modal */}
      {showDocumentModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Upload Document</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Name
                </label>
                <input type="text" value={newDocument.name} onChange={e => setNewDocument({
              ...newDocument,
              name: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter document name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Type
                </label>
                <select value={newDocument.type} onChange={e => setNewDocument({
              ...newDocument,
              type: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="pdf">PDF</option>
                  <option value="docx">Word Document</option>
                  <option value="jpg">Image</option>
                  <option value="xlsx">Excel Spreadsheet</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, Word, Excel, or Image files
                </p>
                <input type="file" className="hidden" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg" onClick={() => setShowDocumentModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg" onClick={handleAddDocument} disabled={!newDocument.name}>
                Upload Document
              </button>
            </div>
          </div>
        </div>}
      {/* Communication Modal */}
      {showCommunicationModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Log Communication</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Communication Type
                </label>
                <select value={newCommunication.type} onChange={e => setNewCommunication({
              ...newCommunication,
              type: e.target.value as 'email' | 'call' | 'meeting' | 'note'
            })} className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="email">Email</option>
                  <option value="call">Phone Call</option>
                  <option value="meeting">Meeting</option>
                  <option value="note">Note</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input type="date" value={newCommunication.date?.toString().split('T')[0]} onChange={e => setNewCommunication({
              ...newCommunication,
              date: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <input type="text" value={newCommunication.sender} onChange={e => setNewCommunication({
                ...newCommunication,
                sender: e.target.value
              })} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input type="text" value={newCommunication.recipient || ''} onChange={e => setNewCommunication({
                ...newCommunication,
                recipient: e.target.value
              })} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea value={newCommunication.content || ''} onChange={e => setNewCommunication({
              ...newCommunication,
              content: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-lg" rows={5} placeholder="Enter communication content" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg" onClick={() => setShowCommunicationModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg" onClick={handleAddCommunication} disabled={!newCommunication.content}>
                {newCommunication.type === 'email' ? 'Send Email' : 'Log Communication'}
              </button>
            </div>
          </div>
        </div>}
      {/* Financials Modal */}
      {showFinancialsModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
            <h3 className="text-lg font-medium mb-4">
              Update Financial Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-dark mb-3">
                  Purchase Information
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Purchase Price
                    </label>
                    <input type="number" name="purchasePrice" value={editedDeal.financial.purchasePrice} onChange={e => handleInputChange(e, 'financial')} className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Closing Costs
                    </label>
                    <input type="number" name="closingCosts" value={editedDeal.financial.closingCosts} onChange={e => handleInputChange(e, 'financial')} className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Repair Costs
                    </label>
                    <input type="number" name="repairCosts" value={editedDeal.financial.repairCosts} onChange={e => handleInputChange(e, 'financial')} className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      After Repair Value (ARV)
                    </label>
                    <input type="number" name="arv" value={editedDeal.financial.arv} onChange={e => handleInputChange(e, 'financial')} className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-dark mb-3">
                  Rental Information
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Rental Income
                    </label>
                    <input type="number" name="monthlyRent" value={editedDeal.financial.monthlyRent || 0} onChange={e => handleInputChange(e, 'financial')} className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Expenses
                    </label>
                    <input type="number" name="monthlyCosts" value={editedDeal.financial.monthlyCosts || 0} onChange={e => handleInputChange(e, 'financial')} className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cap Rate (%)
                    </label>
                    <input type="number" name="capRate" value={editedDeal.financial.capRate || 0} onChange={e => handleInputChange(e, 'financial')} className="w-full p-2 border border-gray-300 rounded-lg" step="0.01" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cash on Cash Return (%)
                    </label>
                    <input type="number" name="cashOnCash" value={editedDeal.financial.cashOnCash || 0} onChange={e => handleInputChange(e, 'financial')} className="w-full p-2 border border-gray-300 rounded-lg" step="0.01" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg" onClick={() => setShowFinancialsModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg" onClick={handleUpdateFinancials}>
                Update Financials
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
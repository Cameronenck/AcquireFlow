import React, { useState } from 'react';
import { X, Phone, Mail, MessageSquare, Calendar, Edit2, Trash2, Tag, Paperclip, Clock, User, MapPin, Building, Briefcase, Star, FileText, Link2, Download, Users, Plus, Check } from 'lucide-react';
import { Contact } from './ContactsPage';
type ContactDetailModalProps = {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
  allContacts: Contact[];
};
type Tab = 'profile' | 'activity' | 'deals' | 'notes';
export const ContactDetailModal = ({
  contact,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  allContacts
}: ContactDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState<Contact>(contact);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [newLink, setNewLink] = useState({
    name: '',
    url: ''
  });
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [isSchedulingFollowUp, setIsSchedulingFollowUp] = useState(false);
  const [followUpDate, setFollowUpDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [followUpTime, setFollowUpTime] = useState('09:00');
  const [followUpType, setFollowUpType] = useState('call');
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [isLoggingActivity, setIsLoggingActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'call',
    subject: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    duration: '15',
    notes: ''
  });
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    name: '',
    value: '',
    status: 'Prospecting',
    date: new Date().toISOString().split('T')[0]
  });
  if (!isOpen) return null;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setEditedContact(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSave = () => {
    onUpdate(editedContact);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedContact(contact);
    setIsEditing(false);
  };
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      onDelete(contact.id);
    }
  };
  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedContact = {
        ...contact,
        notes: [...(contact.notes ? contact.notes.split('\n\n') : []), newNote.trim()].join('\n\n')
      };
      onUpdate(updatedContact);
      setNewNote('');
      setIsAddingNote(false);
    }
  };
  const handleAddTag = () => {
    if (newTag.trim()) {
      const updatedContact = {
        ...contact,
        tags: [...(contact.tags || []), newTag.trim()]
      };
      onUpdate(updatedContact);
      setNewTag('');
      setIsAddingTag(false);
    }
  };
  const handleDeleteTag = (tagToDelete: string) => {
    const updatedContact = {
      ...contact,
      tags: (contact.tags || []).filter(tag => tag !== tagToDelete)
    };
    onUpdate(updatedContact);
  };
  const handleAddLink = () => {
    if (newLink.name.trim() && newLink.url.trim()) {
      // In a real app, you would update the contact with the new link
      // For now, we'll just close the dialog
      setNewLink({
        name: '',
        url: ''
      });
      setIsAddingLink(false);
    }
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFile(e.target.files[0]);
    }
  };
  const handleUploadFile = () => {
    if (newFile) {
      // In a real app, you would upload the file to a server
      // For now, we'll just close the dialog
      setNewFile(null);
      setIsUploadingFile(false);
    }
  };
  const handleScheduleFollowUp = () => {
    // In a real app, you would create a follow-up task
    // For now, we'll just close the dialog
    setIsSchedulingFollowUp(false);
    setFollowUpDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setFollowUpTime('09:00');
    setFollowUpType('call');
    setFollowUpNotes('');
  };
  const handleLogActivity = () => {
    // In a real app, you would log the activity
    // For now, we'll just close the dialog
    setIsLoggingActivity(false);
    setNewActivity({
      type: 'call',
      subject: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      duration: '15',
      notes: ''
    });
  };
  const handleAddDeal = () => {
    if (newDeal.name && newDeal.value) {
      const dealValue = parseFloat(newDeal.value.replace(/[^0-9.]/g, ''));
      if (isNaN(dealValue)) return;
      const newDealObj = {
        id: `deal-${Date.now()}`,
        name: newDeal.name,
        status: newDeal.status,
        value: dealValue,
        date: newDeal.date
      };
      const updatedContact = {
        ...contact,
        deals: [...(contact.deals || []), newDealObj]
      };
      onUpdate(updatedContact);
      setIsAddingDeal(false);
      setNewDeal({
        name: '',
        value: '',
        status: 'Prospecting',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };
  const handleCall = () => {
    // In a real app, this would initiate a call
    // For now, we'll just log it
    console.log(`Calling ${contact.name} at ${contact.phone}...`);
  };
  const handleEmail = () => {
    // In a real app, this would open an email client
    // For now, we'll just log it
    console.log(`Opening email to ${contact.name} at ${contact.email}...`);
    window.location.href = `mailto:${contact.email}?subject=Follow-up from AcquireFlow`;
  };
  const handleText = () => {
    // In a real app, this would open a text message
    // For now, we'll just log it
    console.log(`Opening text message to ${contact.name} at ${contact.phone}...`);
  };
  const handleSchedule = () => {
    // Open the scheduling dialog
    setIsSchedulingFollowUp(true);
  };
  // Get relationship strength color
  const getRelationshipColor = (strength: number) => {
    if (strength >= 80) return 'bg-primary';
    if (strength >= 60) return 'bg-tertiary';
    if (strength >= 40) return 'bg-orange-500';
    return 'bg-gray-400';
  };
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  // Get connected contacts
  const getConnectedContacts = () => {
    if (!contact.connections || contact.connections.length === 0) return [];
    return contact.connections.map(id => allContacts.find(c => c.id === id)).filter(Boolean) as Contact[];
  };
  const connectedContacts = getConnectedContacts();
  // Mock communication history
  const communicationHistory = [{
    id: 'c1',
    type: 'email',
    subject: 'Property Listing Update',
    date: '2023-07-15T10:30:00',
    content: 'Discussed new property listings in downtown Orlando.'
  }, {
    id: 'c2',
    type: 'call',
    duration: '15 min',
    date: '2023-07-01T14:45:00',
    content: 'Follow-up call about investment opportunities.'
  }, {
    id: 'c3',
    type: 'meeting',
    location: 'Coffee Shop',
    date: '2023-06-20T09:00:00',
    content: 'Initial meeting to discuss real estate goals.'
  }];
  // Mock notes
  const notes = contact.notes ? contact.notes.split('\n\n').map((content, index) => ({
    id: `n${index + 1}`,
    date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
    content
  })) : [{
    id: 'n1',
    date: '2023-07-10T11:00:00',
    content: 'Interested in multifamily properties in the downtown area. Budget range $2-5M.'
  }, {
    id: 'n2',
    date: '2023-06-25T15:30:00',
    content: 'Prefers email communication. Usually responds within 24 hours.'
  }];
  // Mock attachments
  const attachments = [{
    id: 'a1',
    name: 'Investment Criteria.pdf',
    size: '1.2 MB',
    date: '2023-07-02T10:15:00'
  }, {
    id: 'a2',
    name: 'Property Portfolio.xlsx',
    size: '3.5 MB',
    date: '2023-06-18T14:30:00'
  }];
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-dark">
            {isEditing ? 'Edit Contact' : contact.name}
          </h2>
          <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('profile')}>
            Profile
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'activity' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('activity')}>
            Activity
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'deals' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('deals')}>
            Deals
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'notes' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('notes')}>
            Notes & Files
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Profile Tab */}
          {activeTab === 'profile' && <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Basic Info */}
              <div className="md:col-span-2">
                {isEditing ? <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input type="text" name="name" value={editedContact.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input type="email" name="email" value={editedContact.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input type="text" name="phone" value={editedContact.phone} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input type="text" name="company" value={editedContact.company || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Position
                        </label>
                        <input type="text" name="position" value={editedContact.position || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Type
                      </label>
                      <select name="type" value={editedContact.type} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="Agent">Agent</option>
                        <option value="Investor">Investor</option>
                        <option value="Vendor">Vendor</option>
                        <option value="Owner">Owner</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Tenant">Tenant</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Communication Preference
                      </label>
                      <select name="communicationPreference" value={editedContact.communicationPreference || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">None</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="Text">Text</option>
                        <option value="In Person">In Person</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship Strength (1-100)
                      </label>
                      <input type="number" name="relationshipStrength" min="1" max="100" value={editedContact.relationshipStrength} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input type="text" name="location.address" value={editedContact.location?.address || ''} onChange={e => {
                  setEditedContact(prev => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      address: e.target.value
                    }
                  }));
                }} className="w-full p-2 border border-gray-300 rounded-lg mb-2" />
                      <div className="grid grid-cols-3 gap-2">
                        <input type="text" placeholder="City" name="location.city" value={editedContact.location?.city || ''} onChange={e => {
                    setEditedContact(prev => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        city: e.target.value
                      }
                    }));
                  }} className="w-full p-2 border border-gray-300 rounded-lg" />
                        <input type="text" placeholder="State" name="location.state" value={editedContact.location?.state || ''} onChange={e => {
                    setEditedContact(prev => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        state: e.target.value
                      }
                    }));
                  }} className="w-full p-2 border border-gray-300 rounded-lg" />
                        <input type="text" placeholder="ZIP" name="location.zip" value={editedContact.location?.zip || ''} onChange={e => {
                    setEditedContact(prev => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        zip: e.target.value
                      }
                    }));
                  }} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                  </div> : <div>
                    <div className="flex items-start mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {contact.photo ? <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
                            <User size={32} className="text-gray-400" />
                          </div>}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-medium text-dark">
                          {contact.name}
                        </h3>
                        <p className="text-gray-500">
                          {contact.position && contact.company ? `${contact.position}, ${contact.company}` : contact.company || contact.position || ''}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {contact.tags?.map((tag, index) => <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {tag}
                            </span>)}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                      <div className="flex items-center">
                        <Mail size={18} className="text-gray-400 mr-2" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={18} className="text-gray-400 mr-2" />
                        <span>{contact.phone}</span>
                      </div>
                      {contact.company && <div className="flex items-center">
                          <Building size={18} className="text-gray-400 mr-2" />
                          <span>{contact.company}</span>
                        </div>}
                      {contact.position && <div className="flex items-center">
                          <Briefcase size={18} className="text-gray-400 mr-2" />
                          <span>{contact.position}</span>
                        </div>}
                      {contact.location?.address && <div className="flex items-start md:col-span-2">
                          <MapPin size={18} className="text-gray-400 mr-2 mt-0.5" />
                          <span>
                            {contact.location.address}
                            {contact.location.city && `, ${contact.location.city}`}
                            {contact.location.state && `, ${contact.location.state}`}
                            {contact.location.zip && ` ${contact.location.zip}`}
                          </span>
                        </div>}
                      {contact.communicationPreference && <div className="flex items-center">
                          <Star size={18} className="text-gray-400 mr-2" />
                          <span>Prefers {contact.communicationPreference}</span>
                        </div>}
                    </div>
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">
                        Relationship Strength
                      </h4>
                      <div className="flex items-center">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${getRelationshipColor(contact.relationshipStrength)}`} style={{
                      width: `${contact.relationshipStrength}%`
                    }}></div>
                        </div>
                        <span className="ml-3 text-sm font-medium">
                          {contact.relationshipStrength}%
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {contact.relationshipStrength >= 80 ? 'Strong relationship with high engagement' : contact.relationshipStrength >= 60 ? 'Good relationship with regular interaction' : contact.relationshipStrength >= 40 ? 'Moderate relationship with occasional interaction' : 'New or developing relationship'}
                      </div>
                    </div>
                    {connectedContacts.length > 0 && <div className="mt-6">
                        <h4 className="font-medium mb-2">Connected Contacts</h4>
                        <div className="space-y-2">
                          {connectedContacts.map(connectedContact => <div key={connectedContact.id} className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                {connectedContact.photo ? <img src={connectedContact.photo} alt={connectedContact.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
                                    <User size={16} className="text-gray-400" />
                                  </div>}
                              </div>
                              <span className="ml-2 text-sm">
                                {connectedContact.name}
                              </span>
                              <span className="ml-2 text-xs text-gray-500">
                                {connectedContact.type}
                              </span>
                            </div>)}
                        </div>
                      </div>}
                  </div>}
              </div>
              {/* Right Column - Actions */}
              <div>
                {isEditing ? <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-primary text-white font-medium rounded-lg" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div> : <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg flex items-center justify-center" onClick={() => setIsEditing(true)}>
                      <Edit2 size={18} className="mr-2" />
                      Edit Contact
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg flex items-center justify-center" onClick={handleCall}>
                        <Phone size={18} className="mr-2" />
                        Call
                      </button>
                      <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg flex items-center justify-center" onClick={handleEmail}>
                        <Mail size={18} className="mr-2" />
                        Email
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg flex items-center justify-center" onClick={handleText}>
                        <MessageSquare size={18} className="mr-2" />
                        Text
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg flex items-center justify-center" onClick={handleSchedule}>
                        <Calendar size={18} className="mr-2" />
                        Schedule
                      </button>
                    </div>
                    <div className="pt-3 border-t border-gray-200 mt-4">
                      <button className="w-full px-4 py-2 bg-red-50 text-secondary font-medium rounded-lg flex items-center justify-center" onClick={handleDelete}>
                        <Trash2 size={18} className="mr-2" />
                        Delete Contact
                      </button>
                    </div>
                  </div>}
              </div>
            </div>}
          {/* Activity Tab */}
          {activeTab === 'activity' && <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Communication History</h3>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg" onClick={() => setIsLoggingActivity(true)}>
                  Log Activity
                </button>
              </div>
              <div className="space-y-4">
                {communicationHistory.map(item => <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                        ${item.type === 'email' ? 'bg-primary bg-opacity-10' : item.type === 'call' ? 'bg-tertiary bg-opacity-10' : 'bg-secondary bg-opacity-10'}
                      `}>
                        {item.type === 'email' ? <Mail size={18} className="text-primary" /> : item.type === 'call' ? <Phone size={18} className="text-tertiary-dark" /> : <Users size={18} className="text-secondary" />}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">
                              {item.type === 'email' ? 'Email' : item.type === 'call' ? 'Phone Call' : 'Meeting'}
                              {item.subject && `: ${item.subject}`}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {formatDate(item.date)}
                              {item.duration && ` • ${item.duration}`}
                              {item.location && ` • ${item.location}`}
                            </p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600" onClick={() => {
                      setIsLoggingActivity(true);
                      setNewActivity({
                        ...newActivity,
                        type: item.type,
                        subject: item.subject || ''
                      });
                    }}>
                            <Edit2 size={16} />
                          </button>
                        </div>
                        <p className="mt-2 text-sm">{item.content}</p>
                      </div>
                    </div>
                  </div>)}
                <div className="text-center py-4">
                  <button className="text-primary text-sm hover:underline" onClick={() => setActiveTab('activity')}>
                    View All Activity
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Upcoming Tasks</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500">No upcoming tasks</p>
                  <button className="mt-2 px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={() => setIsSchedulingFollowUp(true)}>
                    Schedule Follow-up
                  </button>
                </div>
              </div>
            </div>}
          {/* Deals Tab */}
          {activeTab === 'deals' && <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Deal History</h3>
                <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={() => setIsAddingDeal(true)}>
                  Add Deal
                </button>
              </div>
              {contact.deals && contact.deals.length > 0 ? <div className="space-y-4">
                  {contact.deals.map(deal => <div key={deal.id} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary" onClick={() => setActiveTab('deals')}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{deal.name}</h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(deal.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-primary">
                            ${deal.value.toLocaleString()}
                          </div>
                          <span className={`
                            text-xs px-2 py-0.5 rounded-full
                            ${deal.status === 'Closed' ? 'bg-primary bg-opacity-10 text-primary' : deal.status === 'In Progress' || deal.status === 'Negotiating' ? 'bg-tertiary bg-opacity-10 text-tertiary-dark' : 'bg-secondary bg-opacity-10 text-secondary'}
                          `}>
                            {deal.status}
                          </span>
                        </div>
                      </div>
                    </div>)}
                </div> : <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500">
                    No deals associated with this contact
                  </p>
                </div>}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">
                  Opportunity Pipeline
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">Investment Potential</h4>
                      <p className="text-sm text-gray-500">
                        Based on contact profile and history
                      </p>
                    </div>
                    <div className="bg-primary text-white px-2 py-1 rounded-lg text-sm font-medium">
                      {contact.relationshipStrength >= 80 ? 'High' : contact.relationshipStrength >= 60 ? 'Medium' : 'Low'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Deal Probability</span>
                      <span className="font-medium">
                        {contact.relationshipStrength >= 80 ? '75%' : contact.relationshipStrength >= 60 ? '50%' : '25%'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Deal Size</span>
                      <span className="font-medium">
                        {contact.deals && contact.deals.length > 0 ? `$${Math.round(contact.deals.reduce((sum, deal) => sum + deal.value, 0) / contact.deals.length).toLocaleString()}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Recommended Next Action</span>
                      <span className="text-primary hover:underline cursor-pointer" onClick={() => setIsSchedulingFollowUp(true)}>
                        Schedule Follow-up
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {/* Notes & Files Tab */}
          {activeTab === 'notes' && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Notes Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Notes</h3>
                  <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={() => setIsAddingNote(true)}>
                    Add Note
                  </button>
                </div>
                {isAddingNote && <div className="mb-4 border border-gray-200 rounded-lg p-4">
                    <textarea className="w-full p-2 border border-gray-300 rounded-lg mb-3 resize-none" rows={4} placeholder="Enter your note here..." value={newNote} onChange={e => setNewNote(e.target.value)}></textarea>
                    <div className="flex justify-end space-x-2">
                      <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg" onClick={() => {
                  setIsAddingNote(false);
                  setNewNote('');
                }}>
                        Cancel
                      </button>
                      <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={handleAddNote} disabled={!newNote.trim()}>
                        Save Note
                      </button>
                    </div>
                  </div>}
                {notes.length > 0 ? <div className="space-y-4">
                    {notes.map(note => <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <FileText size={16} className="text-gray-400 mt-0.5 mr-2" />
                            <div>
                              <p className="text-sm">{note.content}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(note.date)}
                              </p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600" onClick={() => {
                    setIsAddingNote(true);
                    setNewNote(note.content);
                  }}>
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </div>)}
                  </div> : <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-500">No notes yet</p>
                  </div>}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {contact.tags?.map((tag, index) => <div key={index} className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full">
                        <Tag size={14} className="mr-1" />
                        <span className="text-sm">{tag}</span>
                        <button className="ml-1 text-gray-400 hover:text-gray-600" onClick={() => handleDeleteTag(tag)}>
                          <X size={14} />
                        </button>
                      </div>)}
                    {isAddingTag ? <div className="flex items-center">
                        <input type="text" className="px-3 py-1.5 border border-gray-200 rounded-full text-sm" placeholder="New tag" value={newTag} onChange={e => setNewTag(e.target.value)} autoFocus />
                        <button className="ml-1 p-1 text-primary hover:text-primary-dark" onClick={handleAddTag}>
                          <Check size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600" onClick={() => {
                    setIsAddingTag(false);
                    setNewTag('');
                  }}>
                          <X size={16} />
                        </button>
                      </div> : <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full flex items-center" onClick={() => setIsAddingTag(true)}>
                        <Plus size={14} className="mr-1" />
                        <span className="text-sm">Add Tag</span>
                      </button>}
                  </div>
                </div>
              </div>
              {/* Attachments Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Files & Attachments</h3>
                  <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg flex items-center" onClick={() => setIsUploadingFile(true)}>
                    <Paperclip size={16} className="mr-1" />
                    Upload File
                  </button>
                </div>
                {isUploadingFile && <div className="mb-4 border border-gray-200 rounded-lg p-4">
                    <input type="file" className="w-full p-2 border border-gray-300 rounded-lg mb-3" onChange={handleFileUpload} />
                    <div className="flex justify-end space-x-2">
                      <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg" onClick={() => {
                  setIsUploadingFile(false);
                  setNewFile(null);
                }}>
                        Cancel
                      </button>
                      <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={handleUploadFile} disabled={!newFile}>
                        Upload
                      </button>
                    </div>
                  </div>}
                {attachments.length > 0 ? <div className="space-y-3">
                    {attachments.map(file => <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                            <FileText size={20} className="text-gray-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {file.size} • {formatDate(file.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button className="p-1.5 text-gray-400 hover:text-gray-600" onClick={() => console.log(`Downloading file: ${file.name}`)}>
                            <Download size={16} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-600" onClick={() => console.log(`Delete file: ${file.name}`)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>)}
                  </div> : <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-500">No files attached</p>
                  </div>}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Related Links</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <Link2 size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-primary hover:underline cursor-pointer" onClick={() => window.open('https://linkedin.com', '_blank')}>
                          LinkedIn Profile
                        </span>
                      </div>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600" onClick={() => setIsAddingLink(true)}>
                        <Edit2 size={16} />
                      </button>
                    </div>
                    {isAddingLink ? <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="mb-2">
                          <label className="block text-xs text-gray-500 mb-1">
                            Link Name
                          </label>
                          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., LinkedIn Profile" value={newLink.name} onChange={e => setNewLink({
                      ...newLink,
                      name: e.target.value
                    })} />
                        </div>
                        <div className="mb-3">
                          <label className="block text-xs text-gray-500 mb-1">
                            URL
                          </label>
                          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="https://..." value={newLink.url} onChange={e => setNewLink({
                      ...newLink,
                      url: e.target.value
                    })} />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg" onClick={() => {
                      setIsAddingLink(false);
                      setNewLink({
                        name: '',
                        url: ''
                      });
                    }}>
                            Cancel
                          </button>
                          <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg" onClick={handleAddLink} disabled={!newLink.name.trim() || !newLink.url.trim()}>
                            Save Link
                          </button>
                        </div>
                      </div> : <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center justify-center" onClick={() => setIsAddingLink(true)}>
                        <Link2 size={16} className="mr-1" />
                        Add Link
                      </button>}
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>
      {/* Log Activity Modal */}
      {isLoggingActivity && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Log Activity</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsLoggingActivity(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Type
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg" value={newActivity.type} onChange={e => setNewActivity({
              ...newActivity,
              type: e.target.value
            })}>
                  <option value="call">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="text">Text Message</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Follow-up call" value={newActivity.subject} onChange={e => setNewActivity({
              ...newActivity,
              subject: e.target.value
            })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" value={newActivity.date} onChange={e => setNewActivity({
                ...newActivity,
                date: e.target.value
              })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input type="time" className="w-full p-2 border border-gray-300 rounded-lg" value={newActivity.time} onChange={e => setNewActivity({
                ...newActivity,
                time: e.target.value
              })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg" value={newActivity.duration} onChange={e => setNewActivity({
              ...newActivity,
              duration: e.target.value
            })}>
                  <option value="5">5 min</option>
                  <option value="10">10 min</option>
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea className="w-full p-2 border border-gray-300 rounded-lg resize-none" rows={3} placeholder="Enter details about the activity..." value={newActivity.notes} onChange={e => setNewActivity({
              ...newActivity,
              notes: e.target.value
            })}></textarea>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg" onClick={() => setIsLoggingActivity(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg" onClick={handleLogActivity}>
                  Log Activity
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Schedule Follow-up Modal */}
      {isSchedulingFollowUp && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Schedule Follow-up</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsSchedulingFollowUp(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Follow-up Type
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg" value={followUpType} onChange={e => setFollowUpType(e.target.value)}>
                  <option value="call">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="text">Text Message</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" value={followUpDate} onChange={e => setFollowUpDate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input type="time" className="w-full p-2 border border-gray-300 rounded-lg" value={followUpTime} onChange={e => setFollowUpTime(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea className="w-full p-2 border border-gray-300 rounded-lg resize-none" rows={3} placeholder="Enter details about the follow-up..." value={followUpNotes} onChange={e => setFollowUpNotes(e.target.value)}></textarea>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg" onClick={() => setIsSchedulingFollowUp(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg" onClick={handleScheduleFollowUp}>
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Add Deal Modal */}
      {isAddingDeal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add Deal</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsAddingDeal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Name
                </label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Orlando Property Acquisition" value={newDeal.name} onChange={e => setNewDeal({
              ...newDeal,
              name: e.target.value
            })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    $
                  </span>
                  <input type="text" className="w-full pl-8 p-2 border border-gray-300 rounded-lg" placeholder="e.g., 350000" value={newDeal.value} onChange={e => setNewDeal({
                ...newDeal,
                value: e.target.value
              })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg" value={newDeal.status} onChange={e => setNewDeal({
              ...newDeal,
              status: e.target.value
            })}>
                  <option value="Prospecting">Prospecting</option>
                  <option value="Qualification">Qualification</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiating">Negotiating</option>
                  <option value="Due Diligence">Due Diligence</option>
                  <option value="Closed">Closed</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" value={newDeal.date} onChange={e => setNewDeal({
              ...newDeal,
              date: e.target.value
            })} />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg" onClick={() => setIsAddingDeal(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg" onClick={handleAddDeal} disabled={!newDeal.name || !newDeal.value}>
                  Add Deal
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
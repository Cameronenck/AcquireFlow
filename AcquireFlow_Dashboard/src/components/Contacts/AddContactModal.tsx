import React, { useState } from 'react';
import { X, User, Upload } from 'lucide-react';
import { Contact } from './ContactsPage';
import { contactTypes, communicationPreferences } from './mockData';
type AddContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (contact: Contact) => void;
};
export const AddContactModal = ({
  isOpen,
  onClose,
  onAdd
}: AddContactModalProps) => {
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: '',
    email: '',
    phone: '',
    type: 'Agent',
    relationshipStrength: 50,
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  if (!isOpen) return null;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setNewContact(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    setNewContact(prev => ({
      ...prev,
      tags: [...(prev.tags || []), tagInput.trim()]
    }));
    setTagInput('');
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setNewContact(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!newContact.name || !newContact.email || !newContact.phone) {
      alert('Please fill in all required fields');
      return;
    }
    onAdd(newContact as Contact);
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-dark">Add New Contact</h2>
          <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {/* Form */}
        <div className="flex-1 overflow-y-auto p-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:col-span-2 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden relative group">
                  <User size={36} className="text-gray-400" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" className="text-white flex items-center">
                      <Upload size={20} className="mr-1" />
                      <span className="text-sm">Upload</span>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-secondary">*</span>
                </label>
                <input type="text" name="name" required value={newContact.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Type
                </label>
                <select name="type" value={newContact.type} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg">
                  {contactTypes.map(type => <option key={type} value={type}>
                      {type}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-secondary">*</span>
                </label>
                <input type="email" name="email" required value={newContact.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-secondary">*</span>
                </label>
                <input type="text" name="phone" required value={newContact.phone} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input type="text" name="company" value={newContact.company || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input type="text" name="position" value={newContact.position || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Communication Preference
                </label>
                <select name="communicationPreference" value={newContact.communicationPreference || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="">None</option>
                  {communicationPreferences.map(pref => <option key={pref} value={pref}>
                      {pref}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship Strength
                </label>
                <div className="flex items-center">
                  <input type="range" name="relationshipStrength" min="1" max="100" value={newContact.relationshipStrength} onChange={handleInputChange} className="w-full" />
                  <span className="ml-2 text-sm font-medium">
                    {newContact.relationshipStrength}%
                  </span>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newContact.tags?.map(tag => <div key={tag} className="flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      <span className="text-sm">{tag}</span>
                      <button type="button" className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => handleRemoveTag(tag)}>
                        <X size={14} />
                      </button>
                    </div>)}
                </div>
                <div className="flex">
                  <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add a tag" className="flex-1 p-2 border border-gray-300 rounded-l-lg" onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }} />
                  <button type="button" className="px-3 py-2 bg-gray-100 text-gray-700 rounded-r-lg border border-gray-300 border-l-0" onClick={handleAddTag}>
                    Add
                  </button>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea name="notes" value={newContact.notes || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" rows={3} />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-primary text-white font-medium rounded-lg">
                Add Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
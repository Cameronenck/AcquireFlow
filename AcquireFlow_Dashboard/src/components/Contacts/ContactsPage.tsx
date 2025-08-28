import React, { useEffect, useState } from 'react';
import { ContactsHeader } from './ContactsHeader';
import { ContactsSearch } from './ContactsSearch';
import { ViewToggle } from './ViewToggle';
import { ContactsGrid } from './ContactsGrid';
import { ContactsList } from './ContactsList';
import { ContactsMap } from './ContactsMap';
import { ContactDetailModal } from './ContactDetailModal';
import { AddContactModal } from './AddContactModal';
import { ImportContactsModal } from './ImportContactsModal';
import { RelationshipMapModal } from './RelationshipMapModal';
import { CommunicationToolsPanel } from './CommunicationToolsPanel';
import { useDebounce } from '../../hooks/useDebounce';
import { mockContacts } from './mockData';
import { User } from 'lucide-react';
export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'Agent' | 'Investor' | 'Vendor' | 'Owner' | 'Buyer' | 'Tenant' | 'Other';
  company?: string;
  position?: string;
  relationshipStrength: number; // 1-100
  lastInteraction?: string;
  communicationPreference?: 'Email' | 'Phone' | 'Text' | 'In Person';
  location?: {
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  photo?: string;
  tags?: string[];
  notes?: string;
  deals?: {
    id: string;
    name: string;
    status: string;
    value: number;
    date: string;
  }[];
  connections?: string[]; // IDs of connected contacts
};
export type ViewMode = 'grid' | 'list' | 'map';
export const ContactsPage = () => {
  // State for contacts and UI
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list'); // Changed default to list view
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    types: [] as string[],
    relationshipStrength: [0, 100],
    tags: [] as string[],
    lastInteraction: ''
  });
  // Modals state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isRelationshipMapOpen, setIsRelationshipMapOpen] = useState(false);
  const [isCommunicationPanelOpen, setIsCommunicationPanelOpen] = useState(false);
  // Debounce search query to avoid excessive filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  // Filter contacts based on search query and filters
  useEffect(() => {
    let results = [...contacts];
    // Search query filtering
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      results = results.filter(contact => contact.name.toLowerCase().includes(query) || contact.email.toLowerCase().includes(query) || contact.phone.includes(query) || contact.company?.toLowerCase().includes(query) || contact.tags?.some(tag => tag.toLowerCase().includes(query)));
    }
    // Type filtering
    if (filters.types.length > 0) {
      results = results.filter(contact => filters.types.includes(contact.type));
    }
    // Relationship strength filtering
    results = results.filter(contact => contact.relationshipStrength >= filters.relationshipStrength[0] && contact.relationshipStrength <= filters.relationshipStrength[1]);
    // Tags filtering
    if (filters.tags.length > 0) {
      results = results.filter(contact => contact.tags?.some(tag => filters.tags.includes(tag)));
    }
    // Last interaction filtering
    if (filters.lastInteraction) {
      const now = new Date();
      const cutoffDate = new Date();
      switch (filters.lastInteraction) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      results = results.filter(contact => {
        if (!contact.lastInteraction) return false;
        const interactionDate = new Date(contact.lastInteraction);
        return interactionDate >= cutoffDate;
      });
    }
    setFilteredContacts(results);
  }, [contacts, debouncedSearchQuery, filters]);
  // Handle opening contact detail modal
  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailModalOpen(true);
  };
  // Handle adding a new contact
  const handleAddContact = (newContact: Contact) => {
    setContacts(prev => [...prev, {
      ...newContact,
      id: Date.now().toString()
    }]);
    setIsAddModalOpen(false);
  };
  // Handle importing contacts
  const handleImportContacts = (importedContacts: Contact[]) => {
    setContacts(prev => [...prev, ...importedContacts]);
    setIsImportModalOpen(false);
  };
  // Handle updating a contact
  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(prev => prev.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
    setSelectedContact(updatedContact);
  };
  // Handle deleting a contact
  const handleDeleteContact = (contactId: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
    setIsDetailModalOpen(false);
  };
  // Render the appropriate view based on viewMode
  const renderContactsView = () => {
    if (filteredContacts.length === 0) {
      return <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <User size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No contacts found
          </h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md">
            Try adjusting your search or filter criteria, or add new contacts to
            your network.
          </p>
          <button className="mt-4 px-4 py-2 bg-tertiary text-dark font-medium rounded-xl hover:bg-tertiary-dark transition-colors" onClick={() => setIsAddModalOpen(true)}>
            Add Your First Contact
          </button>
        </div>;
    }
    switch (viewMode) {
      case 'grid':
        return <ContactsGrid contacts={filteredContacts} onContactClick={handleContactClick} />;
      case 'list':
        return <ContactsList contacts={filteredContacts} onContactClick={handleContactClick} />;
      case 'map':
        return <ContactsMap contacts={filteredContacts} onContactClick={handleContactClick} />;
      default:
        return <ContactsList contacts={filteredContacts} onContactClick={handleContactClick} />;
    }
  };
  return <div className="flex flex-col h-full bg-gray-50">
      <ContactsHeader totalContacts={contacts.length} filteredCount={filteredContacts.length} onAddClick={() => setIsAddModalOpen(true)} onImportClick={() => setIsImportModalOpen(true)} onRelationshipMapClick={() => setIsRelationshipMapOpen(true)} onCommunicationToolsClick={() => setIsCommunicationPanelOpen(true)} />
      <div className="flex items-center justify-between px-6 py-4">
        <ContactsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} filters={filters} setFilters={setFilters} />
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className="flex-1 px-6 pb-6 overflow-auto">
        {renderContactsView()}
      </div>
      {/* Modals */}
      {isDetailModalOpen && selectedContact && <ContactDetailModal contact={selectedContact} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} onUpdate={handleUpdateContact} onDelete={handleDeleteContact} allContacts={contacts} />}
      {isAddModalOpen && <AddContactModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddContact} />}
      {isImportModalOpen && <ImportContactsModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} onImport={handleImportContacts} />}
      {isRelationshipMapOpen && <RelationshipMapModal isOpen={isRelationshipMapOpen} onClose={() => setIsRelationshipMapOpen(false)} contacts={contacts} selectedContactId={selectedContact?.id} onContactClick={handleContactClick} />}
      {isCommunicationPanelOpen && <CommunicationToolsPanel isOpen={isCommunicationPanelOpen} onClose={() => setIsCommunicationPanelOpen(false)} contacts={contacts} />}
    </div>;
};
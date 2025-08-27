import React, { useState } from 'react';
import { Contact } from './ContactsPage';
import { ContactRow } from './ContactRow';
import { ChevronDown, ChevronUp, Filter, ArrowUpDown } from 'lucide-react';
type ContactsListProps = {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
};
export const ContactsList = ({
  contacts,
  onContactClick
}: ContactsListProps) => {
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setShowSortMenu(false);
  };
  const sortedContacts = [...contacts].sort((a, b) => {
    let aValue, bValue;
    switch (sortField) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'company':
        aValue = a.company || '';
        bValue = b.company || '';
        break;
      case 'type':
        aValue = a.type;
        bValue = b.type;
        break;
      case 'relationship':
        aValue = a.relationshipStrength;
        bValue = b.relationshipStrength;
        break;
      case 'lastInteraction':
        aValue = a.lastInteraction ? new Date(a.lastInteraction).getTime() : 0;
        bValue = b.lastInteraction ? new Date(b.lastInteraction).getTime() : 0;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  if (contacts.length === 0) {
    return null; // Empty state is handled in the parent component
  }
  return <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="text-sm text-gray-600 font-medium">
          {contacts.length} contacts
        </div>
        <div className="relative">
          <button className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors" onClick={() => setShowSortMenu(!showSortMenu)}>
            <ArrowUpDown size={16} className="mr-2" />
            Sort by: {sortField.charAt(0).toUpperCase() + sortField.slice(1)}
            {showSortMenu ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
          </button>
          {showSortMenu && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 animate-fade-in-up">
              <button className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortField === 'name' ? 'text-primary font-medium' : 'text-gray-700'}`} onClick={() => handleSort('name')}>
                Name
              </button>
              <button className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortField === 'company' ? 'text-primary font-medium' : 'text-gray-700'}`} onClick={() => handleSort('company')}>
                Company
              </button>
              <button className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortField === 'type' ? 'text-primary font-medium' : 'text-gray-700'}`} onClick={() => handleSort('type')}>
                Contact Type
              </button>
              <button className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortField === 'relationship' ? 'text-primary font-medium' : 'text-gray-700'}`} onClick={() => handleSort('relationship')}>
                Relationship Strength
              </button>
              <button className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortField === 'lastInteraction' ? 'text-primary font-medium' : 'text-gray-700'}`} onClick={() => handleSort('lastInteraction')}>
                Last Interaction
              </button>
            </div>}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Relationship</th>
              <th className="px-6 py-3">Last Interaction</th>
              <th className="px-6 py-3">Communication</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedContacts.map(contact => <ContactRow key={contact.id} contact={contact} onClick={() => onContactClick(contact)} />)}
          </tbody>
        </table>
      </div>
    </div>;
};
import React from 'react';
import { UserPlus, Upload, Network, MessageSquare, Users } from 'lucide-react';
type ContactsHeaderProps = {
  totalContacts: number;
  filteredCount: number;
  onAddClick: () => void;
  onImportClick: () => void;
  onRelationshipMapClick: () => void;
  onCommunicationToolsClick: () => void;
};
export const ContactsHeader = ({
  totalContacts,
  filteredCount,
  onAddClick,
  onImportClick,
  onRelationshipMapClick,
  onCommunicationToolsClick
}: ContactsHeaderProps) => {
  return <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
              <Users size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dark">
                Contact Management
              </h1>
              <p className="text-gray-500 mt-1">
                {filteredCount === totalContacts ? `${totalContacts.toLocaleString()} total contacts` : `${filteredCount.toLocaleString()} of ${totalContacts.toLocaleString()} contacts`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button onClick={onAddClick} className="flex items-center px-4 py-2 bg-tertiary text-dark font-medium rounded-xl hover:bg-tertiary-dark transition-colors shadow-sm">
              <UserPlus size={18} className="mr-2" />
              Add Contact
            </button>
            <button onClick={onImportClick} className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-dark hover:bg-gray-50 transition-colors shadow-sm">
              <Upload size={18} className="mr-2" />
              Import
            </button>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          
          <button onClick={onCommunicationToolsClick} className="flex items-center text-sm text-primary hover:text-primary-dark transition-colors">
            <MessageSquare size={16} className="mr-1" />
            Communication Tools
          </button>
        </div>
      </div>
    </div>;
};
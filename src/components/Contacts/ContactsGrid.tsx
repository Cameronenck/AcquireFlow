import React from 'react';
import { Contact } from './ContactsPage';
import { ContactCard } from './ContactCard';
type ContactsGridProps = {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
};
export const ContactsGrid = ({
  contacts,
  onContactClick
}: ContactsGridProps) => {
  if (contacts.length === 0) {
    return <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No contacts found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>;
  }
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {contacts.map(contact => <ContactCard key={contact.id} contact={contact} onClick={() => onContactClick(contact)} />)}
    </div>;
};
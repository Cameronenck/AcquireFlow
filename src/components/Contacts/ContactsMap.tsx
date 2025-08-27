import React, { useState } from 'react';
import { Contact } from './ContactsPage';
import { User, MapPin } from 'lucide-react';
type ContactsMapProps = {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
};
export const ContactsMap = ({
  contacts,
  onContactClick
}: ContactsMapProps) => {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  // Filter contacts with coordinates
  const contactsWithLocation = contacts.filter(contact => contact.location?.coordinates?.lat && contact.location?.coordinates?.lng);
  if (contactsWithLocation.length === 0) {
    return <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <MapPin size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          No contacts with location data
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Add location information to your contacts to see them on the map
        </p>
      </div>;
  }
  // In a real implementation, this would use a mapping library like Leaflet or Google Maps
  // For this demo, we'll create a simple visual representation
  return <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm h-[calc(100vh-220px)]">
      <div className="relative w-full h-full bg-gray-100">
        {/* Placeholder for map - in a real app, this would be a map component */}
        <img src="https://source.unsplash.com/random/1200x800/?map,city" alt="Map" className="w-full h-full object-cover" />
        {/* Contact markers */}
        {contactsWithLocation.map(contact => {
        const {
          lat,
          lng
        } = contact.location!.coordinates!;
        // Convert lat/lng to relative positions (this is simplified)
        // In a real app, this would be handled by the mapping library
        const left = `${(lng + 180) / 360 * 100}%`;
        const top = `${(90 - lat) / 180 * 100}%`;
        return <div key={contact.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" style={{
          left,
          top
        }} onMouseEnter={() => setHoveredContact(contact.id)} onMouseLeave={() => setHoveredContact(null)} onClick={() => onContactClick(contact)}>
              <div className={`
                w-10 h-10 rounded-full border-2 
                ${hoveredContact === contact.id ? 'border-primary shadow-lg scale-110' : 'border-white shadow'}
                transition-all duration-200
              `}>
                {contact.photo ? <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover rounded-full" /> : <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                    <User size={20} className="text-gray-400" />
                  </div>}
              </div>
              {hoveredContact === contact.id && <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg z-10 w-48">
                  <div className="font-medium text-dark">{contact.name}</div>
                  <div className="text-xs text-gray-500">
                    {contact.position && contact.company ? `${contact.position}, ${contact.company}` : contact.company || contact.position || ''}
                  </div>
                  {contact.location?.address && <div className="text-xs text-gray-500 mt-1">
                      {contact.location.address}, {contact.location.city},{' '}
                      {contact.location.state}
                    </div>}
                </div>}
            </div>;
      })}
      </div>
    </div>;
};
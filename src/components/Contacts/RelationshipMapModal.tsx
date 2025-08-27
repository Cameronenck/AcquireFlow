import React, { useEffect, useState, useRef, Fragment } from 'react';
import { X, ZoomIn, ZoomOut, Filter, Download, User, Network } from 'lucide-react';
import { Contact } from './ContactsPage';
type RelationshipMapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  contacts: Contact[];
  selectedContactId?: string;
  onContactClick: (contact: Contact) => void;
};
export const RelationshipMapModal = ({
  isOpen,
  onClose,
  contacts,
  selectedContactId,
  onContactClick
}: RelationshipMapModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    types: [] as string[],
    minStrength: 0
  });
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };
  const handleTypeToggle = (type: string) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type) ? prev.types.filter(t => t !== type) : [...prev.types, type]
    }));
  };
  const handleStrengthChange = (value: number) => {
    setFilters(prev => ({
      ...prev,
      minStrength: value
    }));
  };
  // Filter contacts based on filters
  const filteredContacts = contacts.filter(contact => {
    if (filters.types.length > 0 && !filters.types.includes(contact.type)) {
      return false;
    }
    if (contact.relationshipStrength < filters.minStrength) {
      return false;
    }
    return true;
  });
  // Get the central contact (either selected or highest relationship strength)
  const getCentralContact = () => {
    if (selectedContactId) {
      const selected = contacts.find(c => c.id === selectedContactId);
      if (selected) return selected;
    }
    // Otherwise, find the contact with the most connections
    return [...contacts].sort((a, b) => (b.connections?.length || 0) - (a.connections?.length || 0))[0];
  };
  const centralContact = getCentralContact();
  // Get direct connections to the central contact
  const getDirectConnections = () => {
    if (!centralContact.connections || centralContact.connections.length === 0) {
      return [];
    }
    return centralContact.connections.map(id => contacts.find(c => c.id === id)).filter(Boolean) as Contact[];
  };
  const directConnections = getDirectConnections();
  // Get second-degree connections
  const getSecondDegreeConnections = () => {
    if (directConnections.length === 0) {
      return [];
    }
    const directIds = new Set(directConnections.map(c => c.id));
    const centralId = centralContact.id;
    const secondDegree: Contact[] = [];
    directConnections.forEach(contact => {
      if (!contact.connections) return;
      contact.connections.forEach(id => {
        // Skip if already a direct connection or is the central contact
        if (directIds.has(id) || id === centralId) return;
        const secondContact = contacts.find(c => c.id === id);
        if (secondContact && !secondDegree.some(c => c.id === id)) {
          secondDegree.push(secondContact);
        }
      });
    });
    return secondDegree;
  };
  const secondDegreeConnections = getSecondDegreeConnections();
  // Get type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Agent':
        return 'bg-blue-600 text-white';
      case 'Investor':
        return 'bg-primary text-white';
      case 'Vendor':
        return 'bg-tertiary text-dark';
      case 'Owner':
        return 'bg-purple-600 text-white';
      case 'Buyer':
        return 'bg-secondary text-white';
      case 'Tenant':
        return 'bg-teal-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-dark flex items-center">
            <Network size={24} className="mr-2 text-primary" />
            Relationship Map
          </h2>
          <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={handleZoomOut}>
              <ZoomOut size={18} />
            </button>
            <div className="text-sm font-medium">
              {Math.round(zoomLevel * 100)}%
            </div>
            <button className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={handleZoomIn}>
              <ZoomIn size={18} />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button className={`px-3 py-1.5 rounded-lg flex items-center text-sm ${showFilters ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} className="mr-1" />
              Filters
              {filters.types.length > 0 || filters.minStrength > 0 ? <span className="ml-1 bg-white text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {filters.types.length + (filters.minStrength > 0 ? 1 : 0)}
                </span> : null}
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center text-sm">
              <Download size={16} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        {/* Filters Panel */}
        {showFilters && <div className="p-3 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-3">
              <div>
                <div className="text-sm font-medium mb-1">Contact Type</div>
                <div className="flex flex-wrap gap-1">
                  {['Agent', 'Investor', 'Vendor', 'Owner', 'Buyer', 'Tenant', 'Other'].map(type => <button key={type} className={`px-2 py-1 text-xs rounded-full ${filters.types.includes(type) ? getTypeBadgeColor(type) : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handleTypeToggle(type)}>
                      {type}
                    </button>)}
                </div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium mb-1">
                  Min. Relationship Strength: {filters.minStrength}%
                </div>
                <input type="range" min="0" max="100" value={filters.minStrength} onChange={e => handleStrengthChange(parseInt(e.target.value))} className="w-48" />
              </div>
              {(filters.types.length > 0 || filters.minStrength > 0) && <button className="px-2 py-1 text-xs text-primary hover:underline self-end" onClick={() => setFilters({
            types: [],
            minStrength: 0
          })}>
                  Clear Filters
                </button>}
            </div>
          </div>}
        {/* Network Map */}
        <div className="flex-1 overflow-hidden bg-gray-50 relative">
          <div ref={canvasRef} className="w-full h-full overflow-auto">
            <div className="w-full h-full min-h-[800px] relative" style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out'
          }}>
              {/* This would normally use a proper graph visualization library like D3.js or react-force-graph */}
              {/* For this mockup, we'll create a simple radial layout */}
              {/* Central Contact */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-24 rounded-full bg-primary bg-opacity-10 border-4 border-primary flex flex-col items-center justify-center cursor-pointer" onMouseEnter={() => setHoveredContact(centralContact.id)} onMouseLeave={() => setHoveredContact(null)} onClick={() => onContactClick(centralContact)}>
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white">
                    {centralContact.photo ? <img src={centralContact.photo} alt={centralContact.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
                        <User size={32} className="text-gray-400" />
                      </div>}
                  </div>
                  <div className="mt-1 text-center">
                    <div className="text-xs font-medium truncate w-20">
                      {centralContact.name.split(' ')[0]}
                    </div>
                  </div>
                </div>
                {hoveredContact === centralContact.id && <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg z-10 w-48">
                    <div className="font-medium text-dark">
                      {centralContact.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {centralContact.position && centralContact.company ? `${centralContact.position}, ${centralContact.company}` : centralContact.company || centralContact.position || centralContact.type}
                    </div>
                    <div className="mt-1 flex items-center">
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getTypeBadgeColor(centralContact.type)}`}>
                        {centralContact.type}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {centralContact.connections?.length || 0} connections
                      </span>
                    </div>
                  </div>}
              </div>
              {/* First-degree Connections */}
              {directConnections.map((contact, index) => {
              const angle = 2 * Math.PI * index / directConnections.length;
              const x = Math.cos(angle) * 200 + 50; // Add offset to center
              const y = Math.sin(angle) * 200;
              return <Fragment key={contact.id}>
                    {/* Connection Line */}
                    <svg className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none" style={{
                  zIndex: 1
                }}>
                      <line x1="50%" y1="50%" x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} stroke="#3AB795" strokeWidth="2" strokeOpacity="0.6" />
                    </svg>
                    {/* Contact Node */}
                    <div className="absolute" style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2
                }}>
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-primary flex flex-col items-center justify-center cursor-pointer shadow-md" onMouseEnter={() => setHoveredContact(contact.id)} onMouseLeave={() => setHoveredContact(null)} onClick={() => onContactClick(contact)}>
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          {contact.photo ? <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <User size={24} className="text-gray-400" />
                            </div>}
                        </div>
                      </div>
                      <div className="mt-1 text-center">
                        <div className="text-xs font-medium truncate w-20">
                          {contact.name.split(' ')[0]}
                        </div>
                      </div>
                      {hoveredContact === contact.id && <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg z-10 w-48">
                          <div className="font-medium text-dark">
                            {contact.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {contact.position && contact.company ? `${contact.position}, ${contact.company}` : contact.company || contact.position || contact.type}
                          </div>
                          <div className="mt-1 flex items-center">
                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getTypeBadgeColor(contact.type)}`}>
                              {contact.type}
                            </span>
                          </div>
                        </div>}
                    </div>
                  </Fragment>;
            })}
              {/* Second-degree Connections */}
              {secondDegreeConnections.map((contact, index) => {
              const angle = 2 * Math.PI * index / secondDegreeConnections.length;
              const x = Math.cos(angle) * 350 + 50; // Add offset to center
              const y = Math.sin(angle) * 350;
              // Find which first-degree contact this is connected to
              const connectedToIndex = directConnections.findIndex(dc => dc.connections?.includes(contact.id));
              if (connectedToIndex === -1) return null;
              const connectedTo = directConnections[connectedToIndex];
              const connectedAngle = 2 * Math.PI * connectedToIndex / directConnections.length;
              const connectedX = Math.cos(connectedAngle) * 200 + 50;
              const connectedY = Math.sin(connectedAngle) * 200;
              return <Fragment key={contact.id}>
                    {/* Connection Line */}
                    <svg className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none" style={{
                  zIndex: 1
                }}>
                      <line x1={`calc(50% + ${connectedX}px)`} y1={`calc(50% + ${connectedY}px)`} x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} stroke="#3AB795" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4" />
                    </svg>
                    {/* Contact Node */}
                    <div className="absolute" style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2
                }}>
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-300 flex flex-col items-center justify-center cursor-pointer shadow-sm" onMouseEnter={() => setHoveredContact(contact.id)} onMouseLeave={() => setHoveredContact(null)} onClick={() => onContactClick(contact)}>
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          {contact.photo ? <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <User size={18} className="text-gray-400" />
                            </div>}
                        </div>
                      </div>
                      {hoveredContact === contact.id && <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg z-10 w-48">
                          <div className="font-medium text-dark">
                            {contact.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {contact.position && contact.company ? `${contact.position}, ${contact.company}` : contact.company || contact.position || contact.type}
                          </div>
                          <div className="mt-1 flex items-center">
                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getTypeBadgeColor(contact.type)}`}>
                              {contact.type}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            Connected through {connectedTo.name}
                          </div>
                        </div>}
                    </div>
                  </Fragment>;
            })}
            </div>
          </div>
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
            <div className="text-sm font-medium mb-2">Network Legend</div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border-4 border-primary bg-primary bg-opacity-10"></div>
                <span className="ml-2 text-xs">Central Contact</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border-2 border-primary bg-white"></div>
                <span className="ml-2 text-xs">Direct Connection</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border border-gray-300 bg-white"></div>
                <span className="ml-2 text-xs">Second-degree Connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
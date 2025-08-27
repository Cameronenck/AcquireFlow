import { Contact } from './ContactsPage';
// Generate a list of mock contacts for development
export const mockContacts: Contact[] = [{
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '(407) 555-1234',
  type: 'Agent',
  company: 'Keller Williams Realty',
  position: 'Senior Real Estate Agent',
  relationshipStrength: 85,
  lastInteraction: '2023-07-15T10:30:00',
  communicationPreference: 'Email',
  location: {
    address: '123 Main St',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
    coordinates: {
      lat: 28.5383,
      lng: -81.3792
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?woman,professional,1',
  tags: ['VIP', 'Residential', 'Orlando'],
  notes: 'Great relationship. Has access to off-market properties in downtown Orlando.',
  deals: [{
    id: 'd1',
    name: 'Lakefront Property',
    status: 'Closed',
    value: 450000,
    date: '2023-05-12'
  }, {
    id: 'd2',
    name: 'Downtown Condo',
    status: 'In Progress',
    value: 320000,
    date: '2023-07-01'
  }],
  connections: ['2', '5', '8']
}, {
  id: '2',
  name: 'Michael Rodriguez',
  email: 'michael.r@example.com',
  phone: '(407) 555-5678',
  type: 'Investor',
  company: 'MR Investments',
  position: 'Principal',
  relationshipStrength: 92,
  lastInteraction: '2023-07-20T14:00:00',
  communicationPreference: 'Phone',
  location: {
    address: '456 Oak Ave',
    city: 'Winter Park',
    state: 'FL',
    zip: '32789',
    coordinates: {
      lat: 28.5999,
      lng: -81.3392
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?man,professional,1',
  tags: ['VIP', 'Commercial', 'Multifamily'],
  notes: 'Looking for apartment complexes with 20+ units. Has capital ready to deploy.',
  deals: [{
    id: 'd3',
    name: 'Riverside Apartments',
    status: 'Closed',
    value: 2500000,
    date: '2023-03-15'
  }],
  connections: ['1', '3', '7']
}, {
  id: '3',
  name: 'Jennifer Smith',
  email: 'jennifer@example.com',
  phone: '(407) 555-9012',
  type: 'Owner',
  company: 'Smith Family Properties',
  position: 'Owner',
  relationshipStrength: 65,
  lastInteraction: '2023-06-05T11:15:00',
  communicationPreference: 'In Person',
  location: {
    address: '789 Pine Rd',
    city: 'Orlando',
    state: 'FL',
    zip: '32806',
    coordinates: {
      lat: 28.512,
      lng: -81.3571
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?woman,professional,2',
  tags: ['Seller', 'Residential'],
  notes: 'Owns multiple single-family homes. Considering selling portfolio.',
  deals: [],
  connections: ['2', '6']
}, {
  id: '4',
  name: 'David Wilson',
  email: 'david.wilson@example.com',
  phone: '(407) 555-3456',
  type: 'Agent',
  company: 'RE/MAX',
  position: 'Commercial Agent',
  relationshipStrength: 78,
  lastInteraction: '2023-07-10T09:00:00',
  communicationPreference: 'Email',
  location: {
    address: '321 Maple Dr',
    city: 'Orlando',
    state: 'FL',
    zip: '32803',
    coordinates: {
      lat: 28.553,
      lng: -81.33
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?man,professional,2',
  tags: ['Commercial', 'Office', 'Retail'],
  notes: 'Specializes in retail and office space. Good market knowledge.',
  deals: [{
    id: 'd4',
    name: 'Downtown Office Building',
    status: 'Negotiating',
    value: 1800000,
    date: '2023-06-28'
  }],
  connections: ['8', '10']
}, {
  id: '5',
  name: 'Amanda Brown',
  email: 'amanda.b@example.com',
  phone: '(407) 555-7890',
  type: 'Vendor',
  company: 'Brown & Associates',
  position: 'Property Inspector',
  relationshipStrength: 70,
  lastInteraction: '2023-05-25T13:45:00',
  communicationPreference: 'Text',
  location: {
    address: '567 Elm St',
    city: 'Kissimmee',
    state: 'FL',
    zip: '34741',
    coordinates: {
      lat: 28.2919,
      lng: -81.4076
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?woman,professional,3',
  tags: ['Inspection', 'Reliable'],
  notes: 'Thorough inspector, quick turnaround on reports.',
  deals: [],
  connections: ['1', '9']
}, {
  id: '6',
  name: 'Robert Garcia',
  email: 'robert.g@example.com',
  phone: '(407) 555-2345',
  type: 'Buyer',
  company: 'Garcia Enterprises',
  position: 'CEO',
  relationshipStrength: 88,
  lastInteraction: '2023-07-18T16:30:00',
  communicationPreference: 'Phone',
  location: {
    address: '890 Beach Blvd',
    city: 'Orlando',
    state: 'FL',
    zip: '32805',
    coordinates: {
      lat: 28.5218,
      lng: -81.3926
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?man,professional,3',
  tags: ['VIP', 'Commercial', 'Cash Buyer'],
  notes: 'Looking for commercial properties. Has liquid capital of $5M+.',
  deals: [{
    id: 'd5',
    name: 'Industrial Warehouse',
    status: 'Due Diligence',
    value: 3200000,
    date: '2023-07-05'
  }],
  connections: ['3', '8', '10']
}, {
  id: '7',
  name: 'Lisa Martinez',
  email: 'lisa.m@example.com',
  phone: '(407) 555-6789',
  type: 'Agent',
  company: 'Century 21',
  position: 'Luxury Home Specialist',
  relationshipStrength: 82,
  lastInteraction: '2023-06-30T10:00:00',
  communicationPreference: 'Email',
  location: {
    address: '432 Lake Dr',
    city: 'Windermere',
    state: 'FL',
    zip: '34786',
    coordinates: {
      lat: 28.4936,
      lng: -81.5352
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?woman,professional,4',
  tags: ['Luxury', 'Residential', 'Windermere'],
  notes: 'Specializes in luxury properties $1M+. Great network of high-net-worth clients.',
  deals: [{
    id: 'd6',
    name: 'Lakefront Mansion',
    status: 'Closed',
    value: 2800000,
    date: '2023-04-20'
  }],
  connections: ['2', '9']
}, {
  id: '8',
  name: 'Thomas Lee',
  email: 'thomas.l@example.com',
  phone: '(407) 555-0123',
  type: 'Vendor',
  company: 'Lee Legal Group',
  position: 'Real Estate Attorney',
  relationshipStrength: 75,
  lastInteraction: '2023-07-05T11:30:00',
  communicationPreference: 'Email',
  location: {
    address: '765 Court Ave',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
    coordinates: {
      lat: 28.5392,
      lng: -81.3824
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?man,professional,4',
  tags: ['Legal', 'Contracts'],
  notes: 'Expert in commercial real estate law. Quick contract turnaround.',
  deals: [],
  connections: ['1', '4', '6']
}, {
  id: '9',
  name: 'Samantha Taylor',
  email: 'samantha.t@example.com',
  phone: '(407) 555-4567',
  type: 'Investor',
  company: 'Taylor Investments',
  position: 'Managing Partner',
  relationshipStrength: 90,
  lastInteraction: '2023-07-12T15:45:00',
  communicationPreference: 'Phone',
  location: {
    address: '543 Palm Ave',
    city: 'Winter Garden',
    state: 'FL',
    zip: '34787',
    coordinates: {
      lat: 28.5652,
      lng: -81.5861
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?woman,professional,5',
  tags: ['VIP', 'Residential', 'Multifamily'],
  notes: 'Focuses on residential multifamily. Looking for properties with value-add opportunities.',
  deals: [{
    id: 'd7',
    name: 'Garden Apartments',
    status: 'Closed',
    value: 1750000,
    date: '2023-05-15'
  }],
  connections: ['5', '7']
}, {
  id: '10',
  name: 'James Wilson',
  email: 'james.w@example.com',
  phone: '(407) 555-8901',
  type: 'Vendor',
  company: 'Wilson Property Management',
  position: 'Owner',
  relationshipStrength: 68,
  lastInteraction: '2023-06-20T14:15:00',
  communicationPreference: 'In Person',
  location: {
    address: '876 Central Ave',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
    coordinates: {
      lat: 28.543,
      lng: -81.377
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?man,professional,5',
  tags: ['Property Management', 'Multifamily'],
  notes: 'Manages 500+ units across Central Florida. Good source for off-market deals.',
  deals: [],
  connections: ['4', '6']
}, {
  id: '11',
  name: 'Emily Davis',
  email: 'emily.d@example.com',
  phone: '(407) 555-2345',
  type: 'Agent',
  company: 'Coldwell Banker',
  position: 'Commercial Agent',
  relationshipStrength: 72,
  lastInteraction: '2023-06-15T10:30:00',
  communicationPreference: 'Email',
  location: {
    address: '234 Market St',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
    coordinates: {
      lat: 28.541,
      lng: -81.3831
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?woman,professional,6',
  tags: ['Commercial', 'Industrial'],
  notes: 'Specializes in industrial properties. Great market knowledge.',
  deals: [],
  connections: ['4', '8']
}, {
  id: '12',
  name: 'Daniel Kim',
  email: 'daniel.k@example.com',
  phone: '(407) 555-6789',
  type: 'Buyer',
  company: 'Kim Development',
  position: 'Director of Acquisitions',
  relationshipStrength: 80,
  lastInteraction: '2023-07-08T13:00:00',
  communicationPreference: 'Phone',
  location: {
    address: '567 Development Dr',
    city: 'Lake Mary',
    state: 'FL',
    zip: '32746',
    coordinates: {
      lat: 28.7522,
      lng: -81.3392
    }
  },
  photo: 'https://source.unsplash.com/random/300x300/?man,professional,6',
  tags: ['Developer', 'Commercial', 'Land'],
  notes: 'Looking for development opportunities. Prefers parcels 5+ acres.',
  deals: [{
    id: 'd8',
    name: 'Commercial Land',
    status: 'Under Contract',
    value: 950000,
    date: '2023-07-01'
  }],
  connections: ['6', '11']
}];
// Generate a list of all unique tags from the mock contacts
export const allTags = Array.from(new Set(mockContacts.flatMap(contact => contact.tags || [])));
// Generate contact types
export const contactTypes = ['Agent', 'Investor', 'Vendor', 'Owner', 'Buyer', 'Tenant', 'Other'];
// Generate communication preferences
export const communicationPreferences = ['Email', 'Phone', 'Text', 'In Person'];
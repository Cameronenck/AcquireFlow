import React, { useEffect, useState } from 'react';
import { CampaignHeader } from './CampaignHeader';
import { CampaignCard } from './CampaignCard';
import { CampaignDetail } from './CampaignDetail';
import { CreateCampaignModal } from './CreateCampaignModal';
import { Search, Filter, SlidersHorizontal, ArrowDownAZ, Inbox, MailCheck, Calendar, Users, Briefcase, Building, MapPin, ChevronDown, Plus } from 'lucide-react';
export const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  // Load campaigns from localStorage on mount
  useEffect(() => {
    // Check if we have any campaign data stored
    const storedCampaigns = localStorage.getItem('campaignData');
    if (storedCampaigns) {
      try {
        const parsedCampaigns = JSON.parse(storedCampaigns);
        setCampaigns(parsedCampaigns);
        applyFilters(parsedCampaigns, activeFilter, searchQuery, sortBy, sortOrder);
      } catch (error) {
        console.error('Error parsing stored campaigns:', error);
        generateSampleCampaigns();
      }
    } else {
      generateSampleCampaigns();
    }
    // Check if we need to select a specific campaign from localStorage
    const selectedCampaignId = localStorage.getItem('selectedCampaignId');
    if (selectedCampaignId) {
      const shouldViewDetails = localStorage.getItem('viewCampaignDetails') === 'true';
      const campaignFilterStatus = localStorage.getItem('campaignFilterStatus');
      if (campaignFilterStatus) {
        setActiveFilter(campaignFilterStatus);
      }
      // Clear these values after reading them
      localStorage.removeItem('selectedCampaignId');
      localStorage.removeItem('viewCampaignDetails');
      localStorage.removeItem('campaignFilterStatus');
    }
  }, []);
  // Generate sample campaign data for demonstration
  const generateSampleCampaigns = () => {
    const sampleCampaigns = [{
      id: 1,
      name: 'Orlando Single Family',
      targetArea: 'Orlando, FL',
      propertyCount: 87,
      startDate: '2023-04-15',
      endDate: '2023-05-15',
      propertyTypes: ['Single Family'],
      status: 'running',
      responseRate: '12.5',
      loisSent: 87,
      progress: 100,
      isHighPriority: true,
      connections: [2, 3]
    }, {
      id: 2,
      name: 'Miami Condos',
      targetArea: 'Miami, FL',
      propertyCount: 124,
      startDate: '2023-04-10',
      endDate: '2023-05-10',
      propertyTypes: ['Condos'],
      status: 'running',
      responseRate: '8.2',
      loisSent: 124,
      progress: 100,
      isHighPriority: false,
      connections: [1]
    }, {
      id: 3,
      name: 'Tampa Multi-Family',
      targetArea: 'Tampa, FL',
      propertyCount: 56,
      startDate: '2023-04-18',
      endDate: '2023-05-18',
      propertyTypes: ['Multi-Family'],
      status: 'running',
      responseRate: '15.3',
      loisSent: 42,
      progress: 75,
      isHighPriority: true,
      connections: [1, 5]
    }, {
      id: 4,
      name: 'Jacksonville Distressed',
      targetArea: 'Jacksonville, FL',
      propertyCount: 68,
      startDate: '2023-04-20',
      endDate: '2023-05-20',
      propertyTypes: ['Single Family', 'Distressed'],
      status: 'running',
      responseRate: '9.7',
      loisSent: 45,
      progress: 66,
      isHighPriority: false,
      connections: []
    }, {
      id: 5,
      name: 'Fort Lauderdale Waterfront',
      targetArea: 'Fort Lauderdale, FL',
      propertyCount: 93,
      startDate: '2023-04-25',
      endDate: '2023-05-25',
      propertyTypes: ['Luxury', 'Waterfront'],
      status: 'scheduled',
      responseRate: '0',
      loisSent: 0,
      progress: 0,
      isHighPriority: true,
      connections: [3]
    }, {
      id: 6,
      name: 'Naples Luxury Homes',
      targetArea: 'Naples, FL',
      propertyCount: 45,
      startDate: '2023-04-22',
      endDate: '2023-05-22',
      propertyTypes: ['Luxury'],
      status: 'scheduled',
      responseRate: '0',
      loisSent: 0,
      progress: 0,
      isHighPriority: false,
      connections: []
    }, {
      id: 7,
      name: 'Sarasota Beachfront',
      targetArea: 'Sarasota, FL',
      propertyCount: 78,
      startDate: '2023-03-19',
      endDate: '2023-04-19',
      propertyTypes: ['Beachfront'],
      status: 'completed',
      responseRate: '18.4',
      loisSent: 78,
      progress: 100,
      isHighPriority: false,
      connections: []
    }, {
      id: 8,
      name: 'Gainesville Student Housing',
      targetArea: 'Gainesville, FL',
      propertyCount: 112,
      startDate: '2023-03-17',
      endDate: '2023-04-17',
      propertyTypes: ['Multi-Family', 'Student Housing'],
      status: 'completed',
      responseRate: '21.3',
      loisSent: 112,
      progress: 100,
      isHighPriority: false,
      connections: []
    }];
    setCampaigns(sampleCampaigns);
    applyFilters(sampleCampaigns, activeFilter, searchQuery, sortBy, sortOrder);
    // Store in localStorage
    localStorage.setItem('campaignData', JSON.stringify(sampleCampaigns));
  };
  // Apply filters, search, and sorting
  const applyFilters = (campaignList, filter, search, sort, order) => {
    let filtered = [...campaignList];
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === filter);
    }
    // Apply search query
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(campaign => campaign.name.toLowerCase().includes(query) || campaign.targetArea.toLowerCase().includes(query) || campaign.propertyTypes.some(type => type.toLowerCase().includes(query)));
    }
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sort) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'response':
          comparison = parseFloat(a.responseRate) - parseFloat(b.responseRate);
          break;
        case 'properties':
          comparison = a.propertyCount - b.propertyCount;
          break;
        case 'date':
        default:
          comparison = new Date(a.startDate) - new Date(b.startDate);
          break;
      }
      return order === 'asc' ? comparison : -comparison;
    });
    setFilteredCampaigns(filtered);
  };
  // Handle filter change
  const handleFilterChange = filter => {
    setActiveFilter(filter);
    applyFilters(campaigns, filter, searchQuery, sortBy, sortOrder);
  };
  // Handle search input change
  const handleSearchChange = e => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(campaigns, activeFilter, query, sortBy, sortOrder);
  };
  // Handle sort change
  const handleSortChange = sort => {
    const newOrder = sort === sortBy && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(sort);
    setSortOrder(newOrder);
    applyFilters(campaigns, activeFilter, searchQuery, sort, newOrder);
  };
  // Handle viewing campaign details
  const handleViewCampaign = campaign => {
    setSelectedCampaign(campaign);
    setShowDetail(true);
  };
  // Handle closing detail view
  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedCampaign(null);
  };
  // Handle campaign operations
  const handlePauseCampaign = id => {
    const updatedCampaigns = campaigns.map(campaign => campaign.id === id ? {
      ...campaign,
      status: 'scheduled'
    } : campaign);
    setCampaigns(updatedCampaigns);
    applyFilters(updatedCampaigns, activeFilter, searchQuery, sortBy, sortOrder);
    localStorage.setItem('campaignData', JSON.stringify(updatedCampaigns));
  };
  const handlePlayCampaign = id => {
    const updatedCampaigns = campaigns.map(campaign => campaign.id === id ? {
      ...campaign,
      status: 'running'
    } : campaign);
    setCampaigns(updatedCampaigns);
    applyFilters(updatedCampaigns, activeFilter, searchQuery, sortBy, sortOrder);
    localStorage.setItem('campaignData', JSON.stringify(updatedCampaigns));
  };
  const handleEditCampaign = id => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      setSelectedCampaign(campaign);
      setShowCreateModal(true);
    }
  };
  const handleCopyCampaign = id => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      const newCampaign = {
        ...campaign,
        id: Date.now(),
        name: `Copy of ${campaign.name}`,
        status: 'scheduled',
        progress: 0,
        loisSent: 0,
        responseRate: '0',
        isHighPriority: false
      };
      const updatedCampaigns = [...campaigns, newCampaign];
      setCampaigns(updatedCampaigns);
      applyFilters(updatedCampaigns, activeFilter, searchQuery, sortBy, sortOrder);
      localStorage.setItem('campaignData', JSON.stringify(updatedCampaigns));
    }
  };
  const handleDeleteCampaign = id => {
    const updatedCampaigns = campaigns.filter(campaign => campaign.id !== id);
    setCampaigns(updatedCampaigns);
    applyFilters(updatedCampaigns, activeFilter, searchQuery, sortBy, sortOrder);
    localStorage.setItem('campaignData', JSON.stringify(updatedCampaigns));
  };
  // Handle creating a new campaign
  const handleCreateCampaign = campaignData => {
    const newCampaign = {
      ...campaignData,
      id: Date.now(),
      status: 'scheduled',
      progress: 0,
      loisSent: 0,
      responseRate: '0',
      connections: []
    };
    const updatedCampaigns = [...campaigns, newCampaign];
    setCampaigns(updatedCampaigns);
    applyFilters(updatedCampaigns, activeFilter, searchQuery, sortBy, sortOrder);
    localStorage.setItem('campaignData', JSON.stringify(updatedCampaigns));
    setShowCreateModal(false);
  };
  // Handle updating an existing campaign
  const handleUpdateCampaign = campaignData => {
    const updatedCampaigns = campaigns.map(campaign => campaign.id === campaignData.id ? {
      ...campaign,
      ...campaignData
    } : campaign);
    setCampaigns(updatedCampaigns);
    applyFilters(updatedCampaigns, activeFilter, searchQuery, sortBy, sortOrder);
    localStorage.setItem('campaignData', JSON.stringify(updatedCampaigns));
    setShowCreateModal(false);
    // If we're updating the currently selected campaign, update that too
    if (selectedCampaign && selectedCampaign.id === campaignData.id) {
      setSelectedCampaign({
        ...selectedCampaign,
        ...campaignData
      });
    }
  };
  return <div className="flex flex-col h-full bg-gray-50">
      <CampaignHeader onCreateCampaign={() => setShowCreateModal(true)} onStatusFilter={handleFilterChange} activeFilter={activeFilter} />
      {showDetail ? <CampaignDetail campaign={selectedCampaign} onBack={handleCloseDetail} onEdit={() => handleEditCampaign(selectedCampaign.id)} onDelete={() => {
      handleDeleteCampaign(selectedCampaign.id);
      handleCloseDetail();
    }} allCampaigns={campaigns} /> : <div className="flex-1 p-6 overflow-auto">
          {/* Search and filter bar */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-96">
              <input type="text" placeholder="Search campaigns..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" value={searchQuery} onChange={handleSearchChange} />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex space-x-3">
              <div className="relative">
                <button className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50" onClick={() => handleSortChange('date')}>
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span>Date</span>
                  <ChevronDown size={16} className="ml-2 text-gray-500" />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50" onClick={() => handleSortChange('name')}>
                  <ArrowDownAZ size={16} className="mr-2 text-gray-500" />
                  <span>Name</span>
                  <ChevronDown size={16} className="ml-2 text-gray-500" />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50" onClick={() => handleSortChange('response')}>
                  <MailCheck size={16} className="mr-2 text-gray-500" />
                  <span>Response Rate</span>
                  <ChevronDown size={16} className="ml-2 text-gray-500" />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50" onClick={() => handleSortChange('properties')}>
                  <Building size={16} className="mr-2 text-gray-500" />
                  <span>Properties</span>
                  <ChevronDown size={16} className="ml-2 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          {/* Campaign grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCampaigns.map(campaign => <CampaignCard key={campaign.id} campaign={campaign} onView={handleViewCampaign} onPause={handlePauseCampaign} onPlay={handlePlayCampaign} onEdit={handleEditCampaign} onCopy={handleCopyCampaign} onDelete={handleDeleteCampaign} />)}
            {filteredCampaigns.length === 0 && <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Inbox size={40} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No campaigns found
                </h3>
                <p className="text-gray-500 max-w-md mb-6">
                  {activeFilter !== 'all' ? `No ${activeFilter} campaigns match your search criteria.` : "You don't have any campaigns that match your search criteria."}
                </p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center" onClick={() => setShowCreateModal(true)}>
                  <Plus size={18} className="mr-2" />
                  Create New Campaign
                </button>
              </div>}
          </div>
        </div>}
      {/* Create/Edit Campaign Modal */}
      {showCreateModal && <CreateCampaignModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSave={selectedCampaign ? handleUpdateCampaign : handleCreateCampaign} campaign={selectedCampaign} isEditing={!!selectedCampaign} />}
    </div>;
};
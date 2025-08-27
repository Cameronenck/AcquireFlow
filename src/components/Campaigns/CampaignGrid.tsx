import React, { useEffect, useState } from 'react';
import { CampaignCard } from './CampaignCard';
import { Search, SlidersHorizontal } from 'lucide-react';
export const CampaignGrid = ({
  filterStatus,
  onViewCampaign,
  onPauseCampaign,
  onPlayCampaign,
  onEditCampaign,
  onCopyCampaign,
  onDeleteCampaign,
  campaigns: existingCampaigns,
  setCampaigns
}) => {
  const [campaigns, setCampaignsLocal] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(true);
  // Generate sample campaign data
  useEffect(() => {
    if (existingCampaigns && existingCampaigns.length > 0) {
      setCampaignsLocal(existingCampaigns);
      setIsLoading(false);
      return;
    }
    const generateCampaigns = () => {
      const statuses = ['running', 'scheduled', 'completed'];
      const areas = ['Miami-Dade County', 'Orlando Metro', 'Tampa Bay Area', 'Jacksonville', 'Fort Lauderdale', 'Naples', 'Palm Beach', 'Sarasota', 'Tallahassee', 'Gainesville'];
      const campaigns = [];
      for (let i = 1; i <= 30; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const area = areas[Math.floor(Math.random() * areas.length)];
        const propertyCount = Math.floor(Math.random() * 500) + 50;
        const responseRate = (Math.random() * 30).toFixed(1);
        const loisSent = Math.floor(propertyCount * (Math.random() * 0.7 + 0.1));
        const progress = Math.floor(Math.random() * 100);
        // Generate a random date within the last 30 days
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        campaigns.push({
          id: i,
          name: `${area} ${['Acquisition', 'Outreach', 'Investment', 'Development'][Math.floor(Math.random() * 4)]} Campaign`,
          targetArea: area,
          propertyCount,
          status,
          responseRate,
          loisSent,
          progress,
          date,
          propertyTypes: ['Single Family', 'Multi-Family', 'Commercial'].slice(0, Math.floor(Math.random() * 3) + 1),
          startDate: date,
          endDate: new Date(date.getTime() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
          isHighPriority: Math.random() > 0.8
        });
      }
      return campaigns;
    };
    setTimeout(() => {
      const generatedCampaigns = generateCampaigns();
      setCampaignsLocal(generatedCampaigns);
      if (setCampaigns) setCampaigns(generatedCampaigns);
      setIsLoading(false);
    }, 1000);
  }, [existingCampaigns, setCampaigns]);
  // Filter campaigns based on status and search term
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || campaign.targetArea.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.date - a.date;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'progress':
        return b.progress - a.progress;
      case 'response':
        return b.responseRate - a.responseRate;
      default:
        return 0;
    }
  });
  return <div>
      {/* Search and filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-80">
          <input type="text" placeholder="Search campaigns..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={16} className="mr-2" />
            <span>Filters & Sort</span>
          </button>
          {showFilters && <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="date">Date (Newest)</option>
                <option value="name">Name (A-Z)</option>
                <option value="progress">Progress</option>
                <option value="response">Response Rate</option>
              </select>
            </div>}
        </div>
      </div>
      {/* Campaign grid */}
      {isLoading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="bg-white rounded-xl h-64 animate-pulse">
              <div className="h-full p-5 space-y-4">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="flex justify-between">
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>)}
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCampaigns.map(campaign => <CampaignCard key={campaign.id} campaign={campaign} onView={() => onViewCampaign(campaign)} onPause={onPauseCampaign} onPlay={onPlayCampaign} onEdit={onEditCampaign} onCopy={onCopyCampaign} onDelete={onDeleteCampaign} />)}
          {sortedCampaigns.length === 0 && <div className="col-span-3 flex flex-col items-center justify-center p-10 bg-white rounded-xl border border-gray-200">
              <img src="https://illustrations.popsy.co/gray/taking-notes.svg" alt="No campaigns found" className="w-48 h-48 mb-6" />
              <h3 className="text-xl font-bold text-dark mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-500 text-center mb-6">
                {filterStatus !== 'all' ? `No ${filterStatus} campaigns match your search criteria.` : "We couldn't find any campaigns matching your search criteria."}
              </p>
              <button className="px-4 py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-all" onClick={() => {
          setSearchTerm('');
          setSortBy('date');
        }}>
                Clear Filters
              </button>
            </div>}
        </div>}
    </div>;
};
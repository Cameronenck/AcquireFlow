import React, { useEffect, useState, useRef, createElement } from 'react';
import { Calendar, MapPin, Home, Play, Clock, ChevronRight } from 'lucide-react';
export const UpcomingCampaigns = ({
  setActivePage
}) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [campaigns, setCampaigns] = useState([]);
  const [totalScheduledCampaigns, setTotalScheduledCampaigns] = useState(0);
  // Generate and store sample campaign data for testing
  const generateAndStoreSampleData = () => {
    // Create sample data if it doesn't exist
    const sampleCampaigns = [{
      id: 1,
      name: 'Palm Beach Outreach Campaign',
      targetArea: 'Palm Beach',
      propertyCount: 65,
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString(),
      propertyTypes: ['Condos'],
      status: 'scheduled',
      responseRate: '24.5',
      loisSent: 0,
      progress: 0
    }, {
      id: 2,
      name: 'Gainesville Student Housing',
      targetArea: 'Gainesville',
      propertyCount: 48,
      startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
      propertyTypes: ['Multi-family'],
      status: 'scheduled',
      responseRate: '0',
      loisSent: 0,
      progress: 0
    }, {
      id: 3,
      name: 'Tallahassee Investment Properties',
      targetArea: 'Tallahassee',
      propertyCount: 37,
      startDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 39 * 24 * 60 * 60 * 1000).toISOString(),
      propertyTypes: ['Single-family'],
      status: 'scheduled',
      responseRate: '0',
      loisSent: 0,
      progress: 0
    }, {
      id: 4,
      name: 'Daytona Beach Vacation Rentals',
      targetArea: 'Daytona Beach',
      propertyCount: 29,
      startDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString(),
      propertyTypes: ['Condos'],
      status: 'scheduled',
      responseRate: '0',
      loisSent: 0,
      progress: 0
    }, {
      id: 5,
      name: 'Naples Luxury Properties',
      targetArea: 'Naples',
      propertyCount: 42,
      startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      propertyTypes: ['Luxury'],
      status: 'scheduled',
      responseRate: '0',
      loisSent: 0,
      progress: 0
    }, {
      id: 6,
      name: 'Orlando Vacation Homes',
      targetArea: 'Orlando',
      propertyCount: 53,
      startDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 48 * 24 * 60 * 60 * 1000).toISOString(),
      propertyTypes: ['Single-family'],
      status: 'scheduled',
      responseRate: '0',
      loisSent: 0,
      progress: 0
    }, {
      id: 7,
      name: 'Tampa Bay Waterfront',
      targetArea: 'Tampa Bay',
      propertyCount: 31,
      startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 51 * 24 * 60 * 60 * 1000).toISOString(),
      propertyTypes: ['Luxury'],
      status: 'scheduled',
      responseRate: '0',
      loisSent: 0,
      progress: 0
    }, {
      id: 8,
      name: 'Jacksonville Commercial',
      targetArea: 'Jacksonville',
      propertyCount: 22,
      startDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000).toISOString(),
      propertyTypes: ['Commercial'],
      status: 'scheduled',
      responseRate: '0',
      loisSent: 0,
      progress: 0
    }];
    // Always set the sample data to ensure it's up to date
    localStorage.setItem('campaignData', JSON.stringify(sampleCampaigns));
    return sampleCampaigns;
  };
  // Fetch campaign data from localStorage
  useEffect(() => {
    const fetchCampaignData = () => {
      try {
        // Generate and store sample data to ensure we have consistent test data
        const sampleCampaigns = generateAndStoreSampleData();
        // Filter to only scheduled/upcoming campaigns
        const scheduledCampaigns = sampleCampaigns.filter(campaign => campaign.status === 'scheduled');
        // Store the total count of scheduled campaigns
        setTotalScheduledCampaigns(scheduledCampaigns.length);
        const upcomingCampaigns = scheduledCampaigns.map(campaign => {
          // Parse dates
          const startDate = new Date(campaign.startDate);
          const today = new Date();
          // Calculate days to launch
          const daysToLaunch = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
          return {
            id: campaign.id,
            name: campaign.name,
            area: campaign.targetArea || campaign.name.split(' ')[0],
            propertyCount: campaign.propertyCount || 0,
            launchDate: formatDate(campaign.startDate),
            propertyType: campaign.propertyTypes ? campaign.propertyTypes[0] : 'Single-family',
            status: daysToLaunch <= 5 ? 'Ready' : 'Preparing',
            daysToLaunch: daysToLaunch
          };
        })
        // Sort by closest launch date first
        .sort((a, b) => a.daysToLaunch - b.daysToLaunch)
        // Take only the first 4
        .slice(0, 4);
        setCampaigns(upcomingCampaigns);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
        // Fall back to generated data on error
        setCampaigns(generateFallbackData());
        setTotalScheduledCampaigns(4); // Fallback count
      }
    };
    fetchCampaignData();
  }, []);
  // Format date to Month DD, YYYY
  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  // Generate fallback data if no campaigns are available
  const generateFallbackData = () => {
    return [{
      id: 1,
      name: 'Palm Beach Outreach Campaign',
      area: 'Palm Beach',
      propertyCount: 65,
      launchDate: 'May 15, 2023',
      propertyType: 'Condos',
      status: 'Ready',
      daysToLaunch: 2
    }, {
      id: 2,
      name: 'Gainesville Student Housing',
      area: 'Gainesville',
      propertyCount: 48,
      launchDate: 'May 18, 2023',
      propertyType: 'Multi-family',
      status: 'Ready',
      daysToLaunch: 5
    }, {
      id: 3,
      name: 'Tallahassee Investment Properties',
      area: 'Tallahassee',
      propertyCount: 37,
      launchDate: 'May 22, 2023',
      propertyType: 'Single-family',
      status: 'Preparing',
      daysToLaunch: 9
    }, {
      id: 4,
      name: 'Daytona Beach Vacation Rentals',
      area: 'Daytona Beach',
      propertyCount: 29,
      launchDate: 'May 25, 2023',
      propertyType: 'Condos',
      status: 'Preparing',
      daysToLaunch: 12
    }];
  };
  // Handle campaign launch
  const handleLaunchCampaign = (campaign, e) => {
    // Stop event propagation to prevent card click from interfering
    if (e) {
      e.stopPropagation();
    }
    console.log('Launching campaign:', campaign.name, 'with ID:', campaign.id);
    // Store the campaign ID to be selected on the Campaigns page
    localStorage.setItem('selectedCampaignId', campaign.id.toString());
    // Also store that we want to view details for this campaign
    localStorage.setItem('viewCampaignDetails', 'true');
    // Set filter status to "scheduled" on the Campaigns page
    localStorage.setItem('campaignFilterStatus', 'scheduled');
    // Navigate to Campaigns page
    setActivePage('Campaigns');
  };
  // Navigate to Campaigns page with scheduled filter
  const viewAllScheduledCampaigns = () => {
    localStorage.setItem('campaignFilterStatus', 'scheduled');
    setActivePage('Campaigns');
  };
  // Add 3D card effect
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, campaigns.length);
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const multiplier = 15; // Adjust for more/less tilt
      const rotateY = x / multiplier;
      const rotateX = -y / multiplier;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    const handleMouseLeave = card => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    };
    cardRefs.current.forEach(card => {
      if (!card) return;
      card.addEventListener('mousemove', e => handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => handleMouseLeave(card));
    });
    return () => {
      cardRefs.current.forEach(card => {
        if (!card) return;
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [campaigns]);
  // Add ripple effect to button
  useEffect(() => {
    const button = document.querySelector('.view-all-btn');
    if (!button) return;
    const handleClick = e => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      button.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };
    button.addEventListener('click', handleClick);
    return () => {
      button.removeEventListener('click', handleClick);
    };
  }, []);
  return <div ref={containerRef} className="bg-white rounded-xl shadow-sm p-5 text-dark border border-gray-100 transition-colors duration-200 card-3d">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Upcoming Campaigns</h2>
        <div className="flex space-x-2">
          <span className="bg-gray-100 px-2 py-1 text-xs rounded-xl text-gray-700 flex items-center">
            <Calendar size={12} className="mr-1" />
            Next 30 days
          </span>
          {totalScheduledCampaigns > 4 && <span className="bg-primary bg-opacity-10 px-2 py-1 text-xs rounded-xl text-primary flex items-center">
              {totalScheduledCampaigns} total scheduled
            </span>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {campaigns.map((campaign, index) => <div key={campaign.id} ref={el => cardRefs.current[index] = el} className="p-4 border border-gray-200 bg-white rounded-xl hover:shadow-md transition-all duration-300 card-3d" style={{
        transformStyle: 'preserve-3d'
      }}>
            <div className="card-content">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-primary bg-opacity-10 px-2 py-1 rounded-lg text-xs font-medium text-primary">
                  {campaign.propertyCount} properties
                </div>
                {campaign.status === 'Ready' ? <div className="flex items-center bg-primary bg-opacity-10 px-2 py-0.5 rounded-full text-xs text-primary">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-1 status-orb"></div>
                    Ready
                  </div> : <div className="flex items-center bg-gray-200 px-2 py-0.5 rounded-full text-xs text-gray-600">
                    <Clock size={10} className="mr-1" />
                    Preparing
                  </div>}
              </div>
              <h3 className="font-medium text-base mb-1">{campaign.name}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-500 mb-3">
                <MapPin size={14} className="mr-1" />
                <span>{campaign.area}</span>
                <span className="mx-2">•</span>
                <Home size={14} className="mr-1" />
                <span>{campaign.propertyType}</span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center text-sm">
                  <Calendar size={14} className="mr-1 text-gray-500" />
                  <span>{campaign.launchDate}</span>
                  <span className="ml-2 text-xs bg-gray-100 px-1.5 py-0.5 rounded-lg">
                    {campaign.daysToLaunch} days
                  </span>
                </div>
                {campaign.status === 'Ready' && <button className="flex items-center px-2 py-1 bg-primary text-white rounded-lg text-xs font-medium ripple-container" onClick={e => handleLaunchCampaign(campaign, e)}>
                    <Play size={12} className="mr-1" />
                    Launch
                  </button>}
              </div>
            </div>
            {/* Glass reflection effect */}
            <div className="absolute inset-0 rounded-xl opacity-30 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)'
        }}></div>
          </div>)}
      </div>
      <div className="mt-5 pt-3 border-t border-gray-200 flex justify-end">
        <button className="flex items-center px-4 py-2 bg-dark text-white rounded-xl text-sm hover:bg-opacity-90 transition-colors ripple-container view-all-btn" onClick={viewAllScheduledCampaigns}>
          View All Scheduled Campaigns
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>;
};
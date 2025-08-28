import React, { useEffect, useState, useRef, createElement } from 'react';
import { Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
export const ActiveLOICampaigns = ({
  setActivePage
}) => {
  const tableRef = useRef(null);
  const rowRefs = useRef([]);
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const campaignsPerPage = 4;
  // Fetch campaign data from localStorage
  useEffect(() => {
    const fetchCampaignData = () => {
      try {
        // Check if we have campaign data in localStorage
        const storedCampaigns = localStorage.getItem('campaignData');
        if (storedCampaigns) {
          const parsedCampaigns = JSON.parse(storedCampaigns);
          // Filter to only active/running campaigns
          const activeCampaigns = parsedCampaigns.filter(campaign => campaign.status === 'running');
          // Set total campaigns count
          setTotalCampaigns(activeCampaigns.length > 0 ? activeCampaigns.length : 12);
          // Transform campaigns for display and paginate
          const paginatedCampaigns = activeCampaigns.slice(currentPage * campaignsPerPage, (currentPage + 1) * campaignsPerPage).map(campaign => ({
            id: campaign.id,
            name: campaign.name,
            status: 'Running',
            properties: campaign.propertyCount || 0,
            sent: Math.floor((campaign.propertyCount || 0) * (campaign.progress / 100)),
            delivered: Math.floor((campaign.propertyCount || 0) * (campaign.progress / 100) * 0.97),
            progress: campaign.progress || 0,
            startDate: formatDate(campaign.startDate),
            endDate: formatDate(campaign.endDate),
            progressColor: 'bg-primary'
          }));
          // If we have campaigns from localStorage, use them, otherwise use fallback
          if (paginatedCampaigns.length > 0) {
            setCampaigns(paginatedCampaigns);
          } else {
            // Fall back to generated data
            const fallbackData = generateFallbackData(currentPage);
            setCampaigns(fallbackData);
          }
        } else {
          // Fall back to generated data if no campaigns in storage
          const fallbackData = generateFallbackData(currentPage);
          setCampaigns(fallbackData);
          setTotalCampaigns(12); // Set total campaigns to 12 for fallback data
        }
      } catch (error) {
        console.error('Error fetching campaign data:', error);
        // Fall back to generated data on error
        const fallbackData = generateFallbackData(currentPage);
        setCampaigns(fallbackData);
        setTotalCampaigns(12); // Set total campaigns to 12 for fallback data
      }
    };
    fetchCampaignData();
    // Set up interval to periodically check for updated campaign data
    const intervalId = setInterval(fetchCampaignData, 30000); // Check every 30 seconds
    return () => clearInterval(intervalId);
  }, [currentPage]);
  // Format date to MM/DD/YYYY
  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };
  // Generate fallback data if no campaigns are available
  const generateFallbackData = (page = 0) => {
    const allFallbackData = [{
      id: 1,
      name: 'Orlando Single Family',
      status: 'Running',
      properties: 87,
      sent: 87,
      delivered: 85,
      progress: 100,
      startDate: '04/15/2023',
      endDate: '05/15/2023',
      progressColor: 'bg-primary'
    }, {
      id: 2,
      name: 'Miami Condos',
      status: 'Running',
      properties: 124,
      sent: 124,
      delivered: 120,
      progress: 100,
      startDate: '04/10/2023',
      endDate: '05/10/2023',
      progressColor: 'bg-primary'
    }, {
      id: 3,
      name: 'Tampa Multi-Family',
      status: 'Running',
      properties: 56,
      sent: 42,
      delivered: 42,
      progress: 75,
      startDate: '04/18/2023',
      endDate: '05/18/2023',
      progressColor: 'bg-primary'
    }, {
      id: 4,
      name: 'Jacksonville Distressed',
      status: 'Running',
      properties: 68,
      sent: 45,
      delivered: 43,
      progress: 66,
      startDate: '04/20/2023',
      endDate: '05/20/2023',
      progressColor: 'bg-gray-400'
    }, {
      id: 5,
      name: 'Fort Lauderdale Waterfront',
      status: 'Running',
      properties: 93,
      sent: 76,
      delivered: 74,
      progress: 82,
      startDate: '04/25/2023',
      endDate: '05/25/2023',
      progressColor: 'bg-primary'
    }, {
      id: 6,
      name: 'Naples Luxury Homes',
      status: 'Running',
      properties: 45,
      sent: 32,
      delivered: 31,
      progress: 71,
      startDate: '04/22/2023',
      endDate: '05/22/2023',
      progressColor: 'bg-primary'
    }, {
      id: 7,
      name: 'Sarasota Beachfront',
      status: 'Running',
      properties: 78,
      sent: 65,
      delivered: 63,
      progress: 83,
      startDate: '04/19/2023',
      endDate: '05/19/2023',
      progressColor: 'bg-primary'
    }, {
      id: 8,
      name: 'Gainesville Student Housing',
      status: 'Running',
      properties: 112,
      sent: 89,
      delivered: 86,
      progress: 79,
      startDate: '04/17/2023',
      endDate: '05/17/2023',
      progressColor: 'bg-primary'
    }, {
      id: 9,
      name: 'Tallahassee Investment',
      status: 'Running',
      properties: 64,
      sent: 51,
      delivered: 49,
      progress: 80,
      startDate: '04/21/2023',
      endDate: '05/21/2023',
      progressColor: 'bg-primary'
    }, {
      id: 10,
      name: 'Daytona Beach Vacation',
      status: 'Running',
      properties: 83,
      sent: 67,
      delivered: 65,
      progress: 81,
      startDate: '04/24/2023',
      endDate: '05/24/2023',
      progressColor: 'bg-primary'
    }, {
      id: 11,
      name: 'Palm Beach Estates',
      status: 'Running',
      properties: 55,
      sent: 40,
      delivered: 38,
      progress: 73,
      startDate: '04/23/2023',
      endDate: '05/23/2023',
      progressColor: 'bg-primary'
    }];
    // Return paginated data based on current page
    return allFallbackData.slice(page * campaignsPerPage, (page + 1) * campaignsPerPage);
  };
  // Add ripple effect to button
  useEffect(() => {
    const button = document.querySelector('.send-batch-btn');
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
  // Add holographic row effect
  useEffect(() => {
    if (!tableRef.current) return;
    const handleMouseMove = e => {
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        // Check if mouse is near the row
        const distance = Math.abs(mouseY - (rect.top + rect.height / 2));
        const maxDistance = 100; // Adjust based on how far you want the effect to reach
        if (distance < maxDistance) {
          const intensity = 1 - distance / maxDistance;
          row.style.transform = `translateZ(${intensity * 10}px)`;
          row.style.boxShadow = `0 ${intensity * 10}px ${intensity * 20}px rgba(0,0,0,${intensity * 0.1})`;
          row.style.background = `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${intensity * 0.1}) 50%, rgba(255,255,255,0) 100%)`;
        } else {
          row.style.transform = 'translateZ(0)';
          row.style.boxShadow = 'none';
          row.style.background = 'none';
        }
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [campaigns]);
  // Handle pagination
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };
  const handleNextPage = () => {
    setCurrentPage(prev => {
      const maxPage = Math.ceil(totalCampaigns / campaignsPerPage) - 1;
      return Math.min(maxPage, prev + 1);
    });
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'Running':
        return <div className="status-orb mr-2 w-3 h-3 bg-primary rounded-full animate-orb-pulse"></div>;
      case 'Scheduled':
        return <Clock size={16} className="text-gray-500 mr-1.5" />;
      case 'Completed':
        return <CheckCircle size={16} className="text-primary mr-1.5" />;
      case 'Error':
        return <AlertCircle size={16} className="text-secondary mr-1.5" />;
      default:
        return null;
    }
  };
  // Initialize row refs array
  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, campaigns.length);
  }, [campaigns]);
  // Handle row click to navigate to campaign details
  const handleRowClick = campaignId => {
    // Store the selected campaign ID in localStorage
    localStorage.setItem('selectedCampaignId', campaignId.toString());
    // Navigate to Campaigns page
    setActivePage('Campaigns');
  };
  return <div className="bg-white rounded-xl shadow-sm p-5 text-dark border border-gray-100 h-full transition-all duration-200 card-3d">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold">Active Campaigns</h2>
        <button className="flex items-center px-3 py-1.5 bg-dark text-white rounded-xl text-sm shadow-sm hover:shadow-md hover:translate-y-[-2px] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ripple-container send-batch-btn" onClick={() => setActivePage('Deal Finder')}>
          <Send size={14} className="mr-1" />
          Send New Batch
        </button>
      </div>
      <div className="overflow-x-auto -mx-5">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl">
                Campaign
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Properties
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sent/Delivered
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-xl">
                Date Range
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign, index) => <tr key={campaign.id} ref={el => rowRefs.current[index] = el} className="hover:bg-gray-50 cursor-pointer transition-all duration-200" style={{
            transformStyle: 'preserve-3d'
          }} onClick={() => handleRowClick(campaign.id)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{campaign.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(campaign.status)}
                    <span>{campaign.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.properties}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    {campaign.sent}/{campaign.delivered}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-100 rounded-full h-[6px] max-w-[120px] overflow-hidden">
                    <div className={`${campaign.progressColor} h-[6px] rounded-full liquid-progress`} style={{
                  width: `${campaign.progress}%`
                }}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {campaign.startDate} - {campaign.endDate}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex justify-between items-center text-sm">
        <div className="text-gray-500">
          Showing {Math.min(campaignsPerPage, campaigns.length)} of{' '}
          {totalCampaigns} campaigns
        </div>
        <div className="flex space-x-2">
          <button className={`px-3 py-1 border border-gray-300 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 active:scale-[0.98] ripple-container ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handlePrevPage} disabled={currentPage === 0}>
            Previous
          </button>
          <button className={`px-3 py-1 bg-primary text-white rounded-xl hover:shadow-md hover:translate-y-[-1px] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ripple-container ${currentPage >= Math.ceil(totalCampaigns / campaignsPerPage) - 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleNextPage} disabled={currentPage >= Math.ceil(totalCampaigns / campaignsPerPage) - 1}>
            Next
          </button>
        </div>
      </div>
    </div>;
};
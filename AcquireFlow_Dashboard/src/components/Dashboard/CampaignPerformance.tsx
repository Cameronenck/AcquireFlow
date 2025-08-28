import React, { useEffect, useState, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
export const CampaignPerformance = () => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [campaignData, setCampaignData] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  // Initialize campaign data in localStorage if it doesn't exist
  const initializeCampaignData = () => {
    // Check if we have campaign data in localStorage
    const storedCampaigns = localStorage.getItem('campaignData');
    if (!storedCampaigns) {
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
        responseRate: '19.2',
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
        responseRate: '22.1',
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
        responseRate: '17.8',
        loisSent: 0,
        progress: 0
      }, {
        id: 5,
        name: 'Orlando Single Family',
        targetArea: 'Orlando',
        propertyCount: 87,
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        propertyTypes: ['Single-family'],
        status: 'running',
        responseRate: '24.0',
        loisSent: 32,
        progress: 65
      }, {
        id: 6,
        name: 'Miami Condos',
        targetArea: 'Miami',
        propertyCount: 124,
        startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        propertyTypes: ['Condos'],
        status: 'running',
        responseRate: '19.8',
        loisSent: 45,
        progress: 78
      }];
      localStorage.setItem('campaignData', JSON.stringify(sampleCampaigns));
      return sampleCampaigns;
    }
    return JSON.parse(storedCampaigns);
  };
  // Fetch campaign data from localStorage or generate if not available
  useEffect(() => {
    // Try to get campaign data from localStorage (populated by Campaigns component)
    const fetchCampaignData = () => {
      try {
        // Initialize campaign data if needed
        const campaigns = initializeCampaignData();
        // Transform campaign data for the performance chart
        const transformedData = campaigns.filter(campaign => campaign.responseRate) // Filter out campaigns without response rate
        .slice(0, 5) // Get top 5 campaigns
        .map(campaign => ({
          area: campaign.targetArea || campaign.name.split(' ')[0],
          responseRate: parseFloat(campaign.responseRate),
          properties: campaign.propertyCount || 0,
          performance: getPerformanceCategory(parseFloat(campaign.responseRate))
        }));
        setCampaignData(transformedData.length > 0 ? transformedData : generateFallbackData());
        // Generate property type response rates
        const propertyTypes = generatePropertyTypeData(campaigns);
        setPropertyTypeData(propertyTypes);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
        // Fall back to generated data on error
        setCampaignData(generateFallbackData());
        setPropertyTypeData(generatePropertyTypeFallbackData());
      }
    };
    fetchCampaignData();
    // Set up interval to periodically check for updated campaign data
    const intervalId = setInterval(fetchCampaignData, 30000); // Check every 30 seconds
    return () => clearInterval(intervalId);
  }, []);
  // Helper function to categorize performance
  const getPerformanceCategory = responseRate => {
    if (responseRate >= 20) return 'excellent';
    if (responseRate >= 15) return 'good';
    return 'underperforming';
  };
  // Generate fallback data if no campaigns are available
  const generateFallbackData = () => [{
    area: 'Orlando',
    responseRate: 24,
    properties: 145,
    performance: 'excellent'
  }, {
    area: 'Miami',
    responseRate: 19,
    properties: 210,
    performance: 'good'
  }, {
    area: 'Tampa',
    responseRate: 22,
    properties: 178,
    performance: 'excellent'
  }, {
    area: 'Jacksonville',
    responseRate: 17,
    properties: 132,
    performance: 'good'
  }, {
    area: 'Fort Lauderdale',
    responseRate: 21,
    properties: 95,
    performance: 'good'
  }];
  // Generate property type data from campaigns
  const generatePropertyTypeData = campaigns => {
    // Count property types and calculate average response rates
    const typeMap = {};
    campaigns.forEach(campaign => {
      if (campaign.propertyTypes && campaign.responseRate) {
        campaign.propertyTypes.forEach(type => {
          if (!typeMap[type]) {
            typeMap[type] = {
              count: 0,
              totalResponseRate: 0
            };
          }
          typeMap[type].count++;
          typeMap[type].totalResponseRate += parseFloat(campaign.responseRate);
        });
      }
    });
    // Convert to array and calculate averages
    const result = Object.keys(typeMap).map(type => {
      const avgResponseRate = Math.round(typeMap[type].totalResponseRate / typeMap[type].count * 10) / 10;
      return {
        type,
        responseRate: avgResponseRate,
        color: avgResponseRate >= 15 ? '#3ab795' : '#e0e0e0'
      };
    });
    return result.length > 0 ? result : generatePropertyTypeFallbackData();
  };
  // Fallback property type data
  const generatePropertyTypeFallbackData = () => [{
    type: 'Single Family',
    responseRate: 22,
    color: '#3ab795'
  }, {
    type: 'Multi-Family',
    responseRate: 18,
    color: '#3ab795'
  }, {
    type: 'Condo',
    responseRate: 14,
    color: '#3ab795'
  }, {
    type: 'Vacant Land',
    responseRate: 9,
    color: '#e0e0e0'
  }, {
    type: 'Commercial',
    responseRate: 26,
    color: '#3ab795'
  }];
  // Add 3D hover effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Subtle 3D effect
      const multiplier = 25;
      const rotateY = x / multiplier;
      const rotateX = -y / multiplier;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    };
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  // Add ResizeObserver to ensure chart properly responds to container size changes
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (chartRef.current) {
        // Force recharts to re-render when container size changes
        const chart = chartRef.current;
        if (chart.container) {
          chart.forceUpdate();
        }
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);
  const getBarColor = performance => {
    switch (performance) {
      case 'excellent':
        return '#3ab795';
      case 'good':
        return '#3ab795';
      case 'underperforming':
        return '#e0e0e0';
      default:
        return '#3ab795';
    }
  };
  const CustomTooltip = ({
    active,
    payload,
    label
  }) => {
    if (active && payload && payload.length) {
      const performance = payload[0].payload.performance;
      const color = getBarColor(performance);
      return <div className="glassmorphism p-3 border border-gray-200 rounded-xl shadow-lg">
          <p className="font-medium">{label}</p>
          <p style={{
          color: '#3ab795'
        }}>
            <span className="font-medium">Response Rate:</span>{' '}
            {payload[0].value}%
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {payload[0].payload.properties} properties
          </p>
        </div>;
    }
    return null;
  };
  return <div ref={cardRef} className="bg-white rounded-xl shadow-sm p-5 text-dark border border-gray-100 h-full transition-all duration-200 hover:shadow-md card-3d" style={{
    transformStyle: 'preserve-3d'
  }}>
      <h2 className="text-lg font-bold mb-4">Campaign Performance</h2>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md font-medium">MLS Area Performance</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-xl text-dark">
            Response Rate %
          </span>
        </div>
        <div ref={containerRef} className="h-64 bg-white p-3 rounded-xl border border-gray-100">
          <div ref={chartRef} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignData} margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10
            }} barSize={30}>
                <XAxis dataKey="area" tick={{
                fill: '#9CA3AF',
                fontSize: 12
              }} axisLine={false} tickLine={false} />
                <YAxis tick={{
                fill: '#9CA3AF',
                fontSize: 12
              }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="responseRate" name="Response Rate (%)" radius={[4, 4, 0, 0]} className="animate-chart-bar-rise">
                  {campaignData.map((entry, index) => <Cell key={`cell-${index}`} fill={getBarColor(entry.performance)} fillOpacity={entry.performance === 'good' ? 0.7 : 1} className="liquid-progress" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3">
          Property Type Response Rates
        </h3>
        <div className="space-y-3">
          {propertyTypeData.map((item, index) => <div key={index} className="flex items-center">
              <div className="w-32 flex-shrink-0">
                <span className="text-sm">{item.type}</span>
              </div>
              <div className="flex-1 ml-4">
                <div className="flex items-center">
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full liquid-progress" style={{
                  width: `${item.responseRate * 3}%`,
                  backgroundColor: item.color,
                  opacity: item.type === 'Vacant Land' ? 0.5 : 1
                }}></div>
                  </div>
                  <span className="ml-3 text-sm font-medium variable-weight">
                    {item.responseRate}%
                  </span>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      {/* Glass reflection effect */}
      <div className="absolute inset-0 rounded-xl opacity-30 pointer-events-none" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)'
    }}></div>
    </div>;
};
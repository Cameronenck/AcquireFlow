import React from 'react';
export const TopCampaigns = () => {
  const campaigns = [{
    rank: 1,
    name: 'Orlando Cash Buyers',
    responseRate: '24.1%',
    cpl: '$11.5 CPL'
  }, {
    rank: 2,
    name: 'Miami Wholesalers',
    responseRate: '19.8%',
    cpl: '$13.2 CPL'
  }, {
    rank: 3,
    name: 'Tampa Fix & Flip',
    responseRate: '17.2%',
    cpl: '$15.8 CPL'
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 h-full transition-colors duration-200">
      <h2 className="text-lg font-bold mb-4">Top Campaigns</h2>
      <div className="space-y-4">
        {campaigns.map(campaign => <div key={campaign.rank} className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-[#BFF4F4] rounded-full flex items-center justify-center font-bold text-gray-800">
              #{campaign.rank}
            </div>
            <div className="ml-3">
              <h3 className="font-medium">{campaign.name}</h3>
              <div className="flex text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>{campaign.responseRate}</span>
                <span className="mx-2">•</span>
                <span>{campaign.cpl}</span>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};
import React from 'react';
import { InvestmentCommandCenter } from './InvestmentCommandCenter';
import { MetricsCards } from './MetricsCards';
import { CampaignPerformance } from './CampaignPerformance';
import { ActiveLOICampaigns } from './ActiveLOICampaigns';
import { PipelineSnapshot } from './PipelineSnapshot';
import { UpcomingCampaigns } from './UpcomingCampaigns';
import { ReferralPopup } from './ReferralPopup';
export const Dashboard = ({
  setActivePage
}) => {
  return <div className="space-y-6 px-6 py-6">
      {/* Header section */}
      <InvestmentCommandCenter setActivePage={setActivePage} />
      {/* Metrics overview */}
      <MetricsCards setActivePage={setActivePage} />
      {/* Pipeline Snapshot */}
      <div className="mt-8">
        <PipelineSnapshot setActivePage={setActivePage} />
      </div>
      {/* Performance and Campaigns section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        {/* Campaign Performance on left */}
        <div className="lg:col-span-4">
          <CampaignPerformance />
        </div>
        {/* Active LOI Campaigns on right */}
        <div className="lg:col-span-8">
          <ActiveLOICampaigns setActivePage={setActivePage} />
        </div>
      </div>
      {/* Upcoming Campaigns section */}
      <div className="mt-8">
        <UpcomingCampaigns setActivePage={setActivePage} />
      </div>
      {/* Referral Popup */}
      <ReferralPopup />
    </div>;
};
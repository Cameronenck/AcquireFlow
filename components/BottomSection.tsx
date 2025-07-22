'use client'

import PropertiesTable from './PropertiesTable'
import CampaignPerformance from './CampaignPerformance'

export default function BottomSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Recent Properties - Takes up 2 columns on large screens, full width on smaller screens */}
      <div className="lg:col-span-2">
        <PropertiesTable />
      </div>
      
      {/* Campaign Performance - Takes up 1 column on large screens, full width on smaller screens */}
      <div className="lg:col-span-1">
        <CampaignPerformance />
      </div>
    </div>
  )
} 
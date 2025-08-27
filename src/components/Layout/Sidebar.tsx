import React from 'react';
import { LayoutDashboard, Search, Megaphone, MessageSquare, LineChart, Users, PieChart, BarChart2, FileText, Settings } from 'lucide-react';
export const Sidebar = ({
  activePage = 'Dashboard',
  setActivePage
}) => {
  const generalItems = [{
    name: 'Dashboard',
    icon: <LayoutDashboard size={20} />
  }, {
    name: 'Deal Finder',
    icon: <Search size={20} />
  }, {
    name: 'Campaigns',
    icon: <Megaphone size={20} />
  }, {
    name: 'Inbox',
    icon: <MessageSquare size={20} />
  }, {
    name: 'Market Intelligence',
    icon: <LineChart size={20} />
  }];
  const managementItems = [{
    name: 'Pipeline',
    icon: <PieChart size={20} />
  }, {
    name: 'Contacts',
    icon: <Users size={20} />
  }, {
    name: 'Reports',
    icon: <BarChart2 size={20} />
  }, {
    name: 'LOI Generator',
    icon: <FileText size={20} />
  }, {
    name: 'Settings',
    icon: <Settings size={20} />
  }];
  const renderNavItem = (item, index) => <li key={index}>
      <a href="#" className={`flex items-center px-4 py-3.5 rounded-xl transition-colors ${item.name === activePage ? 'bg-dark text-white font-medium' : 'text-dark hover:bg-gray-100'}`} onClick={e => {
      e.preventDefault();
      setActivePage(item.name);
    }}>
        <span className={`mr-3.5 ${item.name === activePage ? 'text-white' : 'text-dark'}`}>
          {item.icon}
        </span>
        <span>{item.name}</span>
      </a>
    </li>;
  return <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <img src="/AcquireFlow_Logo_%281%29.svg" alt="AcquireFlow Logo" className="h-12 w-auto cursor-pointer" onClick={() => setActivePage('Dashboard')} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-5">
        <div className="px-4 mb-6">
          <ul className="space-y-1.5">{generalItems.map(renderNavItem)}</ul>
        </div>
        <div className="px-4 mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">
            Management
          </h2>
          <ul className="mt-2 space-y-1.5">
            {managementItems.map(renderNavItem)}
          </ul>
        </div>
      </div>
    </aside>;
};
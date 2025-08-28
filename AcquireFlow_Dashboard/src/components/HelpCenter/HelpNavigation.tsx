import React, { useState } from 'react';
import { BookOpen, Video, MessageSquare, GraduationCap, Award } from 'lucide-react';
export const HelpNavigation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navItems = [{
    id: 'home',
    name: 'Help Home',
    icon: <BookOpen size={18} />
  }, {
    id: 'knowledge',
    name: 'Knowledge Base',
    icon: <BookOpen size={18} />
  }, {
    id: 'interactive',
    name: 'Interactive Support',
    icon: <MessageSquare size={18} />
  }, {
    id: 'learning',
    name: 'Learning Center',
    icon: <GraduationCap size={18} />
  }, {
    id: 'tools',
    name: 'Self-Service Tools',
    icon: <div size={18} />
  }, {
    id: 'premium',
    name: 'Premium Support',
    icon: <Award size={18} />
  }];
  return <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex overflow-x-auto hide-scrollbar">
        {navItems.map(item => <button key={item.id} className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === item.id ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab(item.id)}>
            <span className="mr-2">{item.icon}</span>
            <span>{item.name}</span>
          </button>)}
      </div>
    </div>;
};
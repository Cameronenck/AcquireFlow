import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from '../components/Auth/AuthPage';
import { Dashboard } from '../components/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { Sidebar } from '../components/Layout/Sidebar';
import { Header } from '../components/Layout/Header';
import { DealFinder } from '../components/DealFinder/DealFinder';
import { Campaigns } from '../components/Campaigns/Campaigns';
import { MarketIntelligence } from '../components/MarketIntelligence/MarketIntelligence';
import { ContactsPage } from '../components/Contacts/ContactsPage';
import { PipelinePage } from '../components/Pipeline/PipelinePage';
import { ReportsPage } from '../components/Reports/ReportsPage';
import { AccountSettings } from '../components/Settings/AccountSettings';
import { LOIGeneratorPage } from '../components/LOIGenerator/LOIGeneratorPage';
import { HelpCenter } from '../components/HelpCenter/HelpCenter';
import { KnowledgeBase } from '../components/HelpCenter/KnowledgeBase';
import { InteractiveSupport } from '../components/HelpCenter/InteractiveSupport';
import { LearningCenter } from '../components/HelpCenter/LearningCenter';
import { SelfServiceTools } from '../components/HelpCenter/SelfServiceTools';
import { PremiumSupport } from '../components/HelpCenter/PremiumSupport';
import { ResetPasswordForm } from '../components/Auth/ResetPasswordForm';
import { Inbox } from '../components/Inbox/Inbox';

export const AppRoutes: React.FC = () => {
  // Initialize currentPage from localStorage or default to 'Dashboard'
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('acquireflow-current-page');
    return savedPage || 'Dashboard';
  });
  
  // Update localStorage whenever currentPage changes
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    localStorage.setItem('acquireflow-current-page', page);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard setActivePage={handlePageChange} />;
      case 'Deal Finder':
        return <DealFinder />;
      case 'Campaigns':
        return <Campaigns />;
      case 'Inbox':
        return <Inbox />;
      case 'Market Intelligence':
        return <MarketIntelligence />;
      case 'Contacts':
        return <ContactsPage />;
      case 'Pipeline':
        return <PipelinePage />;
      case 'Reports':
        return <ReportsPage />;
      case 'LOI Generator':
        return <LOIGeneratorPage />;
      case 'Settings':
        return <AccountSettings />;
      case 'Help Center':
        return <HelpCenter  />;
      case 'Knowledge Base':
        return <KnowledgeBase />;
      case 'Interactive Support':
        return <InteractiveSupport />;
      case 'Learning Center':
        return <LearningCenter />;
      case 'Self-Service Tools':
        return <SelfServiceTools />;
      case 'Premium Support':
        return <PremiumSupport />;
      default:
        return <Dashboard setActivePage={handlePageChange} />;
    }
  };
  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/reset" element={<AuthPage />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
           <div className="flex h-screen w-full bg-gray-50 text-dark overflow-hidden">
      <Sidebar activePage={currentPage} setActivePage={handlePageChange} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header setActivePage={handlePageChange} />
        <main className="flex-1 overflow-auto">{renderPage()}</main>
      </div>
    </div>;
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

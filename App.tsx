
import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import ReportPage from './pages/ReportPage';
import ChatPage from './pages/ChatPage';
import ResourcesPage from './pages/ResourcesPage';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Home');

  const renderPage = useCallback(() => {
    switch (activePage) {
      case 'Home':
        return <HomePage />;
      case 'News':
        return <NewsPage />;
      case 'Report':
        return <ReportPage />;
      case 'Chat':
        return <ChatPage />;
      case 'Resources':
        return <ResourcesPage />;
      default:
        return <HomePage />;
    }
  }, [activePage]);

  return (
    <div className="bg-slate-900 text-gray-300 min-h-screen flex flex-col">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;

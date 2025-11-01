
import React from 'react';
import { NAV_LINKS } from '../constants';
import { Page } from '../types';

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);


const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-blue-500/30 fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActivePage('Home')}>
             <ShieldIcon className="text-blue-400 h-8 w-8 neon-shadow" />
            <span className="text-xl font-bold text-blue-400 neon-shadow">CyberSec AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => setActivePage(link.name)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  activePage === link.name
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-gray-300 hover:bg-slate-700/50 hover:text-blue-300'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
           <div className="md:hidden">
             {/* Mobile menu could be implemented here */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

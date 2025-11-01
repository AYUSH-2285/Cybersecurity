
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-blue-500/30">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Cybersecurity Assistant. All Rights Reserved.</p>
        <p className="text-xs mt-1">A demonstration project using React and Gemini API.</p>
      </div>
    </footer>
  );
};

export default Footer;


import React, { useState, useEffect } from 'react';

const icons = {
    news: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16v14a2 2 0 0 1-2 2Zm-2-2a2 2 0 0 1 2-2h12"/></svg>,
    report: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
    chat: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    resources: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v-2H6.5A2.5 2.5 0 0 1 4 12.5v-1A2.5 2.5 0 0 1 6.5 9H20V7H6.5A2.5 2.5 0 0 1 4 4.5v-1A2.5 2.5 0 0 1 6.5 2H20"/></svg>
};

const features = [
    { title: "Latest Threat News", description: "Stay updated with real-time cybersecurity news powered by AI.", icon: icons.news },
    { title: "Incident Reporting", description: "Easily report cybercrime incidents and track their status.", icon: icons.report },
    { title: "AI Assistant Chat", description: "Get expert advice and analysis from our Gemini-powered chatbot.", icon: icons.chat },
    { title: "Curated Resources", description: "Access a verified list of helplines and educational guides.", icon: icons.resources }
];

const StatCard: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-500/30 text-center">
        <p className="text-4xl font-bold text-blue-400 neon-shadow">{value.toLocaleString()}</p>
        <p className="text-sm text-gray-400 mt-2">{label}</p>
    </div>
);

const HomePage: React.FC = () => {
  const [stats, setStats] = useState({ threats: 14736, breaches: 2891, advisories: 942 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        threats: prev.threats + Math.floor(Math.random() * 5),
        breaches: prev.breaches + Math.floor(Math.random() * 2),
        advisories: prev.advisories + 1
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center pt-16 pb-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          <span className="text-blue-400 neon-shadow">AI-Powered</span> Cybersecurity
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-400">
          Your intelligent partner in navigating the complex world of digital security. Real-time insights, expert analysis, and actionable guidance at your fingertips.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
            <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-blue-500/30 hover:border-blue-400 hover:neon-box-shadow transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-blue-400 mb-4 h-8 w-8">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
            </div>
        ))}
      </section>

      {/* Real-time Stats */}
      <section>
        <h2 className="text-3xl font-bold text-center text-white mb-8">Global Threat Monitor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard value={stats.threats} label="Threats Detected Today" />
            <StatCard value={stats.breaches} label="Data Breaches This Month" />
            <StatCard value={stats.advisories} label="Active Security Advisories" />
        </div>
      </section>
      
      {/* Quote Section */}
      <section className="text-center py-8">
        <blockquote className="max-w-4xl mx-auto italic text-lg text-gray-400 border-l-4 border-blue-500 pl-6">
          "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards - and even then I have my doubts."
        </blockquote>
        <cite className="block mt-4 not-italic text-gray-500">— Eugene H. Spafford</cite>
      </section>

    </div>
  );
};

export default HomePage;

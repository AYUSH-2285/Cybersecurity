
import React from 'react';
import { Resource } from '../types';
import { RESOURCES_DATA } from '../constants';

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block bg-slate-800/50 p-6 rounded-lg border border-blue-500/30 hover:border-blue-400 hover:neon-box-shadow transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start mb-2">
             <h3 className="text-xl font-bold text-white">{resource.title}</h3>
             <span className={`text-xs font-bold px-2 py-1 rounded-full ${resource.category === 'Helpline' ? 'bg-purple-500/20 text-purple-300' : 'bg-teal-500/20 text-teal-300'}`}>{resource.category}</span>
        </div>
        <p className="text-gray-400">{resource.description}</p>
        <div className="flex items-center mt-4 text-blue-400 text-sm">
            <span>Visit Resource</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </div>
    </a>
);


const ResourcesPage: React.FC = () => {
    const helplines = RESOURCES_DATA.filter(r => r.category === 'Helpline');
    const guides = RESOURCES_DATA.filter(r => r.category === 'Guide');

  return (
    <div className="space-y-12">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Cybersecurity Resources</h1>
            <p className="text-gray-400">A curated list of essential helplines and educational guides.</p>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-4">Helplines & Reporting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {helplines.map((resource, index) => <ResourceCard key={index} resource={resource} />)}
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-4">Educational Guides</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((resource, index) => <ResourceCard key={index} resource={resource} />)}
            </div>
        </div>
    </div>
  );
};

export default ResourcesPage;

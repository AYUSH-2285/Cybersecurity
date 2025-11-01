
import React, { useState, useEffect } from 'react';
import { Report } from '../types';

const ReportPage: React.FC = () => {
    const [reports, setReports] = useState<Report[]>(() => {
        const savedReports = localStorage.getItem('cybersec_reports');
        if (savedReports) {
            try {
                return JSON.parse(savedReports);
            } catch (error) {
                console.error("Error parsing reports from localStorage", error);
                return [];
            }
        }
        return [];
    });

    const [incidentType, setIncidentType] = useState('');
    const [description, setDescription] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        localStorage.setItem('cybersec_reports', JSON.stringify(reports));
    }, [reports]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!incidentType || !description) return;

        const newReport: Report = {
            id: `CYB-${Date.now()}`,
            incidentType,
            date: new Date().toISOString(),
            description,
            status: 'Submitted'
        };

        setReports(prev => [newReport, ...prev]);
        setIncidentType('');
        setDescription('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2">Report a Cybercrime Incident</h1>
                <p className="text-gray-400">Your report helps in tracking and combating cyber threats. All submissions are confidential.</p>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-lg border border-blue-500/30">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="incidentType" className="block text-sm font-medium text-blue-300 mb-2">Type of Incident</label>
                        <select
                            id="incidentType"
                            value={incidentType}
                            onChange={(e) => setIncidentType(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="" disabled>Select an incident type</option>
                            <option>Phishing</option>
                            <option>Malware/Ransomware</option>
                            <option>Data Breach</option>
                            <option>Denial of Service (DoS)</option>
                            <option>Identity Theft</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-blue-300 mb-2">Description of Incident</label>
                        <textarea
                            id="description"
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Provide a detailed account of the incident..."
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:bg-slate-600 disabled:shadow-none" disabled={!incidentType || !description}>
                            Submit Report
                        </button>
                    </div>
                </form>
                 {showSuccess && (
                    <div className="mt-4 text-center text-green-300 bg-green-500/20 p-3 rounded-md">
                        Report submitted successfully! Case ID: {reports[0]?.id}
                    </div>
                )}
            </div>
            
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">Submitted Reports</h2>
                {reports.length > 0 ? (
                    <div className="space-y-4">
                        {reports.map(report => (
                            <div key={report.id} className="bg-slate-800/30 p-4 rounded-md border border-slate-700">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-blue-400">{report.incidentType} - <span className="text-sm text-gray-400">{report.id}</span></p>
                                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">{report.status}</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2 truncate">{report.description}</p>
                                <p className="text-xs text-gray-500 mt-2">Reported on: {new Date(report.date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <p>No reports submitted yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportPage;
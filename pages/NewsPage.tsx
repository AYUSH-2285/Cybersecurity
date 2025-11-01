import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { NewsArticle } from '../types';
import Loader from '../components/Loader';

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
    const severityColors = {
        Low: 'bg-green-500/20 text-green-300 border-green-500/30',
        Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        High: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        Critical: 'bg-red-500/20 text-red-300 border-red-500/30',
    };

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-500/30 hover:border-blue-400 transition-colors duration-300">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-blue-400 uppercase">{article.category}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${severityColors[article.severity]}`}>{article.severity}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
            <p className="text-gray-400 mb-4">{article.summary}</p>
            <p className="text-xs text-gray-500">Published: {new Date(article.date).toLocaleDateString()}</p>
        </div>
    );
};

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSources([]);
    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const prompt = `Generate a list of 8 of the latest, real cybersecurity news articles from recent days. Use your search tool to find this information. For each article, provide a title, a short summary (2-3 sentences), a category (e.g., 'Data Breach', 'Vulnerability', 'Cyber Attack', 'Policy'), a publication date, and a severity level ('Low', 'Medium', 'High', 'Critical'). Respond with only a valid JSON array of objects, with no other text, markdown, or explanation. The JSON schema for each object should be: { "title": string, "summary": string, "category": string, "date": string (ISO 8601 format), "severity": "Low" | "Medium" | "High" | "Critical" }`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              tools: [{googleSearch: {}}],
            },
        });

        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        if (groundingMetadata?.groundingChunks) {
            setSources(groundingMetadata.groundingChunks);
        }

        const text = response.text.trim();
        const cleanedJson = text.startsWith('```json') ? text.slice(7, -3).trim() : text;
        
        const parsedNews = JSON.parse(cleanedJson);
        setNews(parsedNews);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch news. The AI may be busy, or there's a configuration issue. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Cybersecurity News Feed</h1>
        <p className="text-gray-400">AI-generated threat intelligence and news updates, grounded in real-time search.</p>
      </div>

      {loading && <Loader text="Fetching latest intelligence..."/>}
      {error && <div className="text-center text-red-400 bg-red-500/20 p-4 rounded-lg">{error}</div>}
      
      {!loading && !error && (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
                <NewsCard key={index} article={article} />
            ))}
            </div>
            {sources.length > 0 && (
                <div className="pt-8">
                <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Sources</h2>
                <div className="bg-slate-800/50 p-6 rounded-lg border border-blue-500/30">
                    <ul className="space-y-2 list-disc list-inside">
                    {sources.map((source, index) => (
                        source.web && (
                        <li key={index}>
                            <a 
                            href={source.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:text-blue-300 hover:underline"
                            >
                            {source.web.title || source.web.uri}
                            </a>
                        </li>
                        )
                    ))}
                    </ul>
                </div>
                </div>
            )}
        </>
      )}
    </div>
  );
};

export default NewsPage;

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatMessage } from '../types';

const Message: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isModel = message.role === 'model';
  return (
    <div className={`flex items-start gap-3 ${isModel ? 'justify-start' : 'justify-end'}`}>
      {isModel && (
        <div className="w-8 h-8 rounded-full bg-blue-500/50 flex items-center justify-center flex-shrink-0 text-blue-300 font-bold">
          AI
        </div>
      )}
      <div className={`max-w-lg p-3 rounded-lg ${isModel ? 'bg-slate-700 text-gray-300' : 'bg-blue-600 text-white'}`}>
        {message.text}
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'Hello! I am a cybersecurity assistant powered by Gemini. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatSession = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const initializeChat = useCallback(() => {
        try {
            if (!process.env.API_KEY) {
                throw new Error("API_KEY environment variable not set.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatSession.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'You are a friendly and helpful cybersecurity expert assistant. Provide clear, concise, and accurate information. If you provide code, use markdown. Do not refuse to answer questions, but provide safety warnings if the topic is dangerous.',
                },
            });
        } catch(e) {
            console.error(e)
            setError("Failed to initialize the AI chat session.");
        }
    }, []);

    useEffect(() => {
        initializeChat();
    }, [initializeChat]);

    const sendMessage = async () => {
        if (!input.trim() || loading || !chatSession.current) return;
        
        setLoading(true);
        setError(null);
        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            const result = await chatSession.current.sendMessage({ message: input });
            const modelMessage: ChatMessage = { role: 'model', text: result.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (e) {
            console.error(e);
            const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
            setError("Failed to get a response from the AI.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] max-w-3xl mx-auto bg-slate-800/50 rounded-lg border border-blue-500/30">
            <div className="p-4 border-b border-blue-500/30">
                <h1 className="text-xl font-bold text-white text-center">Cybersecurity AI Assistant</h1>
            </div>
            <div className="flex-grow p-4 space-y-4 overflow-y-auto scrollbar-thin-blue">
                {messages.map((msg, index) => <Message key={index} message={msg} />)}
                 {loading && <Message message={{role: 'model', text: 'Thinking...'}} />}
                <div ref={messagesEndRef} />
            </div>
            {error && <div className="p-2 text-center text-red-400 text-sm">{error}</div>}
            <div className="p-4 border-t border-blue-500/30">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask about vulnerabilities, best practices, or analyze a code snippet..."
                        className="flex-grow bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        disabled={loading}
                    />
                    <button onClick={sendMessage} disabled={loading || !input.trim()} className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;

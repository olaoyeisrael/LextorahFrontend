import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


import { apiClient } from '../utils/api';


const SupportChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm Ms. Lexi, your Lextorah AI Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Generate or retrieve anonymous session ID
    const sessionId = React.useMemo(() => {
        let storedId = sessionStorage.getItem('support_session_id');
        if (!storedId) {
            storedId = 'anon-' + Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('support_session_id', storedId);
        }
        return storedId;
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setLoading(true);

        try {

            const response = await apiClient('/support', {
                method: 'POST',

                body: JSON.stringify({
                    session_id: sessionId,
                    question: userMsg
                })
            });
            const data = await response.json();
            
            if (data.answer) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-80 md:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-100 z-50 flex flex-col overflow-hidden max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-[#82C325] p-5 flex items-center justify-between text-white rounded-t-3xl">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-white flex items-center justify-center flex-shrink-0">
                                    <img src="/images/Ms-Lexi-AI-Tutor.png" alt="Ms. Lexi" className="w-full h-full object-cover object-top scale-125 translate-y-[2px]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg leading-tight">Ms. Lexi</span>
                                    <span className="text-xs text-white/80">Lextorah AI Assistant</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white min-h-[350px] max-h-[450px]">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 mr-2">
                                            <img src="/images/Ms-Lexi-AI-Tutor.png" alt="Ms. Lexi" className="w-full h-full object-cover object-top scale-125 translate-y-[2px]" />
                                        </div>
                                    )}
                                    <div className={`
                                        max-w-[75%] p-3.5 rounded-2xl text-sm font-medium leading-relaxed
                                        ${msg.role === 'user' 
                                            ? 'bg-[#82C325] text-white rounded-tr-none shadow-sm' 
                                            : 'bg-[#F3F4F6] text-slate-800'}
                                    `}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex items-start justify-start">
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 mr-2">
                                        <img src="/images/Ms-Lexi-AI-Tutor.png" alt="Ms. Lexi" className="w-full h-full object-cover object-top scale-125 translate-y-[2px]" />
                                    </div>
                                    <div className="bg-[#F3F4F6] p-3.5 rounded-2xl text-slate-800 flex items-center">
                                        <Loader className="w-4 h-4 animate-spin text-[#82C325]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-5 bg-white border-t border-slate-100 rounded-b-3xl">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-5 py-3 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-[#82C325] focus:ring-2 focus:ring-[#82C325]/10 transition-all text-sm shadow-sm"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="w-12 h-12 flex items-center justify-center bg-[#82C325] hover:bg-[#72ad20] text-white rounded-full transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                                >
                                    <Send className="w-5 h-5 fill-current" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-[#82C325] hover:bg-[#72ad20] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 group flex items-center gap-2"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                <span className="font-bold hidden group-hover:block transition-all">Chat Support</span>
            </button>
        </>
    );
};

export default SupportChat;

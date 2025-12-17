import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SupportChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi there! How can I help you regarding Lextorah AI today?' }
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
            const response = await fetch('http://localhost:8000/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
                        className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 flex flex-col overflow-hidden max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-green-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <span className="font-bold">Lextorah Support</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 h-80">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`
                                        max-w-[80%] p-3 rounded-2xl text-sm
                                        ${msg.role === 'user' 
                                            ? 'bg-green-600 text-white rounded-br-none' 
                                            : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-sm'}
                                    `}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl border border-slate-200 rounded-bl-none shadow-sm">
                                        <Loader className="w-4 h-4 animate-spin text-green-600" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your question..."
                                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-sm"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 group flex items-center gap-2"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                <span className="font-bold hidden group-hover:block transition-all">Chat Support</span>
            </button>
        </>
    );
};

export default SupportChat;

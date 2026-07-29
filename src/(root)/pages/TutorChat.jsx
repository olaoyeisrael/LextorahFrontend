import React, { useEffect, useRef, useState } from 'react';
import { Mic, Send, Volume2, Bot, User, Loader, Play, Pause } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import msLexi from '../../assets/msLexi.png';
import { apiClient } from '../../utils/api';

const TUTOR_TEMPLATES = [
  { label: "📅 Lesson Plan", prompt: "Generate a detailed 60-minute lesson plan for [Topic]." },
  { label: "📝 Scheme of Work", prompt: "Outline a 6-week scheme of work for [Course/Topic]." },
  { label: "✍️ Generate Assessment", prompt: "Create 10 objective questions and 3 essay questions on [Topic]." },
  { label: "📚 Create Assignment", prompt: "Draft a homework assignment testing student comprehension of [Topic]." },
  { label: "🎯 Classroom Activity", prompt: "Suggest 3 interactive classroom exercises to teach [Topic]." },
  { label: "💬 Student Feedback", prompt: "Write constructive feedback for a student struggling with [Topic]." },
  { label: "📋 Rubric Design", prompt: "Create a 4-point grading rubric for an essay on [Topic]." },
  { label: "📖 Teaching Notes", prompt: "Generate comprehensive revision and teaching notes for [Topic]." },
  { label: "🔄 Adapt Level", prompt: "Adapt the explanation of [Topic] for a [Beginner/Intermediate] level student." }
];

const TutorChat = () => {
  const [userId, setUserId] = useState(null);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'server',
      text: "Hello! I'm Ms. Lexi, your AI Teaching Assistant. How can I help you with your lesson planning, schemes of work, or classroom activities today?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Audio Playback State
  const [playingState, setPlayingState] = useState({ id: null, isPlaying: false, loading: false });
  const audioRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const id = localStorage.getItem('user_id') || 'tutor';
    setUserId(id);
    // Load session messages if they exist
    const saved = sessionStorage.getItem('tutor_chat_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveMessages = (msgs) => {
    setMessages(msgs);
    sessionStorage.setItem('tutor_chat_messages', JSON.stringify(msgs));
  };

  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          const file = new File([blob], "recording.webm", { type: "audio/webm" });
          const formData = new FormData();
          formData.append("file", file);

          setLoading(true);
          try {
            const res = await apiClient('/transcribe', {
              method: 'POST',
              body: formData
            });
            const data = await res.json();
            if (data.text) {
              await handleSubmit(data.text);
            }
          } catch (err) {
            console.error("Transcription error", err);
          } finally {
            setLoading(false);
          }
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    }
  };

  const handleSubmit = async (overrideQuestion = null) => {
    const activeQuestion = overrideQuestion || question;
    if (!activeQuestion.trim() || loading) return;

    const userMessage = {
      id: 'msg-' + Date.now() + '-user',
      sender: 'user',
      text: activeQuestion
    };

    const newMsgs = [...messages, userMessage];
    saveMessages(newMsgs);
    setQuestion('');
    setLoading(true);

    try {
      const response = await apiClient('/tutor-assistant', {
        method: 'POST',
        body: JSON.stringify({
          session_id: userId || 'tutor-session',
          question: activeQuestion
        })
      });
      const data = await response.json();
      if (data.answer) {
        const assistantMessage = {
          id: 'msg-' + Date.now() + '-assistant',
          sender: 'server',
          text: data.answer
        };
        saveMessages([...newMsgs, assistantMessage]);
      }
    } catch (err) {
      console.error(err);
      const errorMessage = {
        id: 'msg-' + Date.now() + '-error',
        sender: 'server',
        text: "I'm sorry, I'm having trouble connecting right now. Please try again."
      };
      saveMessages([...newMsgs, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async (msgId, text) => {
    if (playingState.id === msgId && playingState.isPlaying) {
      audioRef.current.pause();
      setPlayingState({ id: null, isPlaying: false, loading: false });
      return;
    }

    setPlayingState({ id: msgId, isPlaying: false, loading: true });

    try {
      const res = await apiClient('/getAudio', {
        method: 'POST',
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (data.audioContent) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        const audioUrl = `data:audio/mp3;base64,${data.audioContent}`;
        const newAudio = new Audio(audioUrl);
        audioRef.current = newAudio;
        newAudio.play();
        setPlayingState({ id: msgId, isPlaying: true, loading: false });

        newAudio.onended = () => {
          setPlayingState({ id: null, isPlaying: false, loading: false });
        };
      }
    } catch (err) {
      console.error(err);
      setPlayingState({ id: null, isPlaying: false, loading: false });
    }
  };

  const clearConversation = () => {
    const resetMsgs = [
      {
        id: 'welcome',
        sender: 'server',
        text: "Hello! I'm Ms. Lexi, your AI Teaching Assistant. How can I help you with your lesson planning, schemes of work, or classroom activities today?"
      }
    ];
    saveMessages(resetMsgs);
  };

  return (
    <main className="flex-1 bg-slate-50 min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto flex flex-col h-[85vh] bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-50 border-2 border-emerald-500 flex items-center justify-center">
            <img src={msLexi} alt="Ms. Lexi" className="w-full h-full object-cover object-top scale-125 translate-y-[2px]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Ms. Lexi</h1>
            <p className="text-sm font-bold text-emerald-600">Your AI Teaching Assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-slate-100">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Icon */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble content */}
                <div className="flex flex-col gap-2">
                  <div className={`p-4 rounded-2xl shadow-sm leading-relaxed text-sm font-medium ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'}`}>
                    <div className="markdown-content">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="mb-0.5">{children}</li>,
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline font-bold hover:text-blue-700">
                              {children}
                            </a>
                          )
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Play Answer button for assistant messages */}
                  {msg.sender !== 'user' && msg.id !== 'welcome' && (
                    <button
                      onClick={() => handleSpeech(msg.id, msg.text)}
                      className="self-start flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-full text-xs font-bold transition-all shadow-sm"
                      disabled={playingState.loading && playingState.id === msg.id}
                    >
                      {playingState.loading && playingState.id === msg.id ? (
                        <>
                          <Loader className="w-3 h-3 animate-spin text-slate-500" />
                          <span>Generating Voice...</span>
                        </>
                      ) : playingState.isPlaying && playingState.id === msg.id ? (
                        <>
                          <Pause className="w-3 h-3 text-red-500" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Play Answer</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 rounded-bl-none shadow-sm flex items-center">
                  <Loader className="w-4 h-4 animate-spin text-emerald-600" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Library Drawer */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-thin scrollbar-thumb-slate-100 border-t border-slate-100 pt-4 mt-4">
          {TUTOR_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuestion(tmpl.prompt);
                const textarea = document.querySelector('textarea');
                if (textarea) {
                  textarea.value = tmpl.prompt;
                  textarea.style.height = 'auto';
                  textarea.style.height = `${textarea.scrollHeight}px`;
                }
              }}
              className="whitespace-nowrap px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full text-xs font-bold text-slate-700 transition-colors shadow-sm"
            >
              {tmpl.label}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="flex gap-2 items-center bg-slate-50 p-4 rounded-2xl border border-slate-150 shadow-inner">
          <button
            className={`p-3 rounded-full disabled:opacity-60 transition-all ${isRecording ? 'bg-red-500 animate-pulse text-white' : 'bg-emerald-600 text-white'}`}
            onClick={handleMicClick}
          >
            <Mic />
          </button>
          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder="Ask Ms. Lexi to generate lessons, schemas, rubrics..."
            className="flex-grow bg-transparent focus:ring-0 text-slate-700 placeholder:text-slate-400 text-lg resize-none overflow-hidden max-h-32 focus:outline-none"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            rows={1}
          />
          <button
            onClick={() => handleSubmit()}
            disabled={loading || !question.trim()}
            className="bg-emerald-600 text-white p-3 rounded-xl disabled:opacity-60 transition-all shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={clearConversation}
            className="ml-2 text-xs text-slate-500 bg-white hover:bg-slate-100 px-3 py-3 border border-slate-200 rounded-xl font-bold shadow-sm"
          >
            Clear
          </button>
        </div>

      </div>
    </main>
  );
};

export default TutorChat;

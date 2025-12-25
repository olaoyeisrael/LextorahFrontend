import React, { useEffect, useRef, useState } from 'react'
import {Mic, Send, Volume2, Bot, User, Loader, Play, Pause} from 'lucide-react'
import msLexi from '../../assets/msLexi.png'
const Ask = () => {
  const [userId, setUserId] = useState(null);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]); // { id, sender: 'user'|'server', text }
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
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transcribe`, {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (data.text) {
                    // Auto-send the transcribed text
                    await handleSubmit(null, data.text); 
                }
            } catch (err) {
                console.error("Transcription error", err);
            } finally {
                setLoading(false);
            }
            // Stop all tracks
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    }
  };



  useEffect(() => {
    let id = localStorage.getItem('user_id');
    setUserId(id);
  }, []);

  // fetch chat history
  console.log("User ID: ",userId)
   useEffect(() => {
        let ignore = false;
        
        const fetchHistory = async () => {
            if (!userId) return;
            
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat_history/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch history');
                
                const data = await response.json();
                console.log(data)
                
                if (ignore) return;

                if (data.History && Array.isArray(data.History)) {
                    const formattedMessages = data.History.map((msg, index) => ({
                      // id: `history-${index}-${Date.now()}`,
                        sender: msg.role === 'user' ? 'user' : 'ai',
                        text: msg.content
                    }));
                    setMessages(formattedMessages);
                }
            } catch (error) {
                if (ignore) return;
                console.error("Error loading chat history:", error);
                // Fallback initial message if fetch fails
                setMessages([{ role: 'ai', content: 'Hello! I am your AI Tutor. I could not load your history, but I am ready to help!' }]);
            }
        };

        fetchHistory();
        
        return () => {
            ignore = true;
        };
    }, [userId]);
    console.log(messages)


  const pushMessage = (msg) => setMessages((m) => [...m, msg]);

  const handleSubmit = async (e, textOverride = null) => {
  
    e?.preventDefault();
    const finalQuestion = textOverride || question;
    if (!finalQuestion?.trim() || !userId) return;
    
    const q = finalQuestion.trim();
    const userMsg = { id: 'u_' + Date.now() + Math.random(), sender: 'user', text: q };
    pushMessage(userMsg);
    setQuestion('');
    setLoading(true);
    const token = localStorage.getItem('token');
   
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/ask?chatid=${encodeURIComponent(userId)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
         },
        body: JSON.stringify({ question: q }),
      });

      if (!res.ok) {
        
        const text = await res.text();
        pushMessage({ id: 's_err_' + Date.now(), sender: 'Lextorah Ai', text: `Server error: ${res.status} ${text}` });
      } else {
        const data = await res.json();
        console.log("Data: ", data.answer)
        const answer = data?.answer ?? data?.text ?? JSON.stringify(data);
        pushMessage({ id: 's_' + Date.now(), sender: 'Lextorah Ai', text: answer });
      }
    } catch (err) {
      pushMessage({ id: 's_exc_' + Date.now(), sender: 'Lextorah Ai', text: `Request failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };
  const handlePlayAudio = async (text, msgId) => {
    // If clicking the same message
    if (playingState.id === msgId) {
        if (playingState.isPlaying) {
            audioRef.current?.pause();
            setPlayingState(prev => ({ ...prev, isPlaying: false }));
        } else {
            audioRef.current?.play();
            setPlayingState(prev => ({ ...prev, isPlaying: true }));
        }
        return;
    }

    // New message logic
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
    }

    setPlayingState({ id: msgId, isPlaying: false, loading: true });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getAudio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: text }), 
      });
      if (!res.ok) {
        throw new Error('Failed to fetch audio');
      }
      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
          setPlayingState(prev => ({ ...prev, isPlaying: false }));
      };
      
      audioRef.current = audio;
      await audio.play();
      setPlayingState({ id: msgId, isPlaying: true, loading: false });
      
    } catch (error) {
      console.error('Error playing audio:', error);
      setPlayingState({ id: null, isPlaying: false, loading: false });
    }
  };

  const clearConversation = async () => {
      try {
          // Clear backend
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat_history`, {
              method: 'DELETE',
              headers: { 
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
          });
          // Clear frontend
          setMessages([]);
      } catch (e) {
          console.error("Failed to clear chat history", e);
      }
  };

  return (
    <main className="md:px-6 px-2 ">
      <div className='md:text-3xl text-xl text-green-600 text-center my- font-MadaBold'>Ms Lexi - Ask Questions</div>
      {/* <div className="mb-3 text-sm text-gray-600">User id: <span className="font-mono">{userId ?? '...'}</span></div> */}

      <div className="space-y-3 md:max-w-3xl  mx-auto h-[calc(100vh-150px)] flex flex-col pb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500">No conversation yet. Ask a question below.</div>
        )}

        <div className="space-y-2 flex-grow overflow-y-auto md:px-4 ">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              <div className={`${m.sender === 'user' ? 'bg-green-600 text-white text-right' : 'bg-white text-left'} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 m-2`}>
                {m.sender === 'user' ? <User className="w-6 h-6" /> : <img src={msLexi} className="w-10 h-10 rounded-full" />}
              </div>
              <div className={`${m.sender === 'user' ? 'bg-green-600 text-white text-right rounded-tr-none' : 'bg-white text-left rounded-tl-none border border-green-100'} max-w-[80%] p-4 rounded-lg shadow-sm`}>
                <div className="text-sm">{m.text}</div>
                {/* <div className="text-xs text-gray-500 mt-1">{m.sender === 'user' ? 'You' : ' Ai Tutor'}</div> */}
                {
                  m.sender === 'Lextorah Ai' && (
                    <button
                      onClick={() => handlePlayAudio(m.text, m.id)}
                      className="mt-2 text-xs font-medium text-green-600 hover:text-green-700 disabled:opacity-50 flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-md transition-colors"
                      disabled={playingState.loading && playingState.id === m.id}
                    >
                      {playingState.loading && playingState.id === m.id ? (
                          <>
                            <Loader className="w-3.5 h-3.5 animate-spin" />
                            <span>Loading...</span>
                          </>
                      ) : playingState.id === m.id && playingState.isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause</span>
                          </>
                      ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Play Answer</span>
                          </>
                      )}
                    </button>
                  )
                }
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
          <div ref={messagesEndRef}/>
        </div>
        


          {/* Input section */}
        <div  className="flex gap-2 mt-4 items-center bg-white p-4 rounded-lg shadow-sm">
          <button className={`p-3 rounded-full disabled:opacity-60 transition-all ${isRecording ? 'bg-red-500 animate-pulse text-white' : 'bg-green-600 text-white'}`} onClick={handleMicClick}>
            <Mic />
          </button>
          <textarea
            value={question}
            onChange={(e) => {
                setQuestion(e.target.value);
                e.target.style.height = 'auto'; // Reset height
                e.target.style.height = `${e.target.scrollHeight}px`; // Set to scrollHeight
            }}
            placeholder="Type or speak a message..."
            className="flex-grow bg-transparent border rounded px-3 py-2 focus:ring-0 text-slate-700 placeholder:text-slate-400 text-lg resize-none overflow-hidden max-h-32"
            disabled={loading}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                }
            }}
            rows={1}
          />
          <button onClick={handleSubmit} disabled={loading} className="bg-green-600 text-white px-4 py-3 rounded disabled:opacity-60">
            <Send />
          </button>
          <button type="button" onClick={clearConversation} className="ml-2 text-sm text-gray-600 px-3 py-3 border rounded">
            Clear
          </button>
          
        </div>
      </div>
    </main>
  );
}

export default Ask
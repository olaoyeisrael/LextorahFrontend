import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const videos = [
  {
    title: "Getting Started",
    description: "Learn how to navigate the platform and set up your profile.",
    thumbnail: "🚀",
    url: "https://www.youtube.com/watch?v=lCI822sB8_c"
  },
  {
    title: "Taking a Test",
    description: "How to select a topic and take a test on the platform.",
    thumbnail: "📝",
    url: "https://www.youtube.com/watch?v=lCI822sB8_c"
  },
  {
    title: "Viewing Your Courses",
    description: "Browse your enrolled courses, modules, and transcripts.",
    thumbnail: "📚",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Submitting Assignments",
    description: "How to view assignments and submit your answers.",
    thumbnail: "📤",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Exam Preparation",
    description: "Practice questions and timed mock exams explained.",
    thumbnail: "🎓",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Live Classes",
    description: "How to join and participate in live classes.",
    thumbnail: "📹",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
];

function HowToUse() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">How to Use</h1>
        <p className="text-slate-500">Watch short guides on how to use each feature of the platform.</p>
      </header>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            onClick={() => setActiveVideo(video)}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
          >
            <div className="h-36 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center relative">
              <span className="text-5xl">{video.thumbnail}</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-5 h-5 text-green-600 ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900 mb-1">{video.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{video.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-slate-900">{activeVideo.title}</h3>
              <button onClick={() => setActiveVideo(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={activeVideo.url}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-slate-50">
              <p className="text-sm text-slate-600">{activeVideo.description}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default HowToUse;
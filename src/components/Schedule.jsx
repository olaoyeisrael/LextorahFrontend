import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, BookOpen, ChevronRight } from 'lucide-react';

const Schedule = ({ scheduleData, currentLevel }) => {
  // Assuming scheduleData is { "Week 1": ["Topic 1", "Topic 2"], ... }
  const weeks = Object.keys(scheduleData).sort();
  const [activeWeek, setActiveWeek] = useState(weeks[0]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-green-500" />
            Your Schedule
          </h2>
          <p className="text-slate-500">Course Level: <span className="font-semibold text-green-600">{currentLevel}</span></p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Weeks Navigation */}
        <div className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 md:w-1/4">
          {weeks.map((week) => (
            <button
              key={week}
              onClick={() => setActiveWeek(week)}
              className={`px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center justify-between whitespace-nowrap ${
                activeWeek === week 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {week}
              {activeWeek === week && <ChevronRight className="w-5 h-5" />}
            </button>
          ))}
        </div>

        {/* Topics List */}
        <div className="flex-1 space-y-4">
           <h3 className="text-xl font-bold text-slate-900 mb-4">{activeWeek} Topics</h3>
           {scheduleData[activeWeek] && scheduleData[activeWeek].map((topic, index) => (
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-green-200 hover:shadow-sm transition-all group cursor-pointer"
             >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center font-bold text-slate-400 group-hover:border-green-500 group-hover:text-green-500 transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors">{topic}</h4>
                    <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3" /> Approx. 2 hours
                    </p>
                  </div>
                   <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-600 transition-colors">
                        Start
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;

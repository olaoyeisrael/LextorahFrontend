import { BookOpen, Calendar, Clock, AlertCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SprintSyllabusForm from '../../components/SprintSyllabusForm'

function AssignTopic() {
    // Note: Assuming tutor's managed_sprints are loaded into Redux under user
    const user = useSelector((state) => state.user);
    const managedSprints = user?.managedSprints || user?.user?.managed_sprints || [];

    const [selectedSprintId, setSelectedSprintId] = useState('');
    
    // Find the currently selected sprint object
    const selectedSprint = managedSprints.find(s => s.id.toString() === selectedSprintId.toString());
    console.log(selectedSprint)

    return (
        <section className="max-w-6xl mx-auto space-y-6">
            <div className='flex justify-between items-start'>
                <div>
                    <h1 className="text-2xl font-InterBold">Assign Topics & Syllabus</h1>
                    <p className='text-[#65758B] font-Inter'>Manage your live sessions and set curriculum syllabus for your sprints.</p>
                </div>
            </div>

            {/* Sprint Selection Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E1E7EF]">
                <h2 className="text-lg font-InterBold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    Select a Sprint
                </h2>
                
                {managedSprints.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                        <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                        <p>No active sprints assigned to you at the moment.</p>
                    </div>
                ) : (
                    <div className="max-w-md">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Choose Sprint to Manage
                        </label>
                        <select 
                            value={selectedSprintId}
                            onChange={(e) => setSelectedSprintId(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="">-- Select a Sprint --</option>
                            {managedSprints.map((sprint) => (
                                <option key={sprint.id} value={sprint.id}>
                                    {sprint.name} ({sprint.course_code})
                                </option>
                            ))}
                        </select>

                        {/* Quick Summary of Selected Sprint */}
                        {selectedSprint && (
                            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100 flex flex-col gap-2">
                                <div className="text-sm flex items-center gap-2 text-green-800">
                                    <Calendar className="w-4 h-4" />
                                    <span className="font-semibold">Duration:</span> {selectedSprint.duration_weeks} Weeks
                                </div>
                                <div className="text-sm flex items-center gap-2 text-green-800">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-semibold">Schedule:</span> {selectedSprint.schedules?.length || 0} classes/week
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        
            {/* Syllabus Form renders only if a sprint is actively selected */}
            {selectedSprint && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <SprintSyllabusForm sprint={selectedSprint} />
                </div>
            )}
    
        </section>
    )
}

export default AssignTopic
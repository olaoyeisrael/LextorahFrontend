import { Calendar1, Clock, Clock4, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { apiClient } from "../../utils/api"

export const StudentDashboard = () => {
    const user = useSelector((state) => state.user);
    const { studentSprints } = user;

    // Allow user to pick which sprint's schedule to view
    const [selectedSprintId, setSelectedSprintId] = useState(
        studentSprints && studentSprints.length > 0 ? String(studentSprints[0].id) : null
    );

    const selectedSprint = studentSprints?.find(s => String(s.id) === selectedSprintId);

    const { data: syllabus = [], isLoading } = useQuery({
        queryKey: ['sprintSyllabus', selectedSprintId],
        queryFn: async () => {
            if (!selectedSprintId) return [];
            const response = await apiClient(`/curriculum/sprint/${selectedSprintId}`);
            if (response.ok) {
                const data = await response.json();
                return data.curriculum || [];
            }
            return [];
        },
        enabled: !!selectedSprintId,
    });

    // Group syllabus entries by week number for navigation
    const byWeek = syllabus.reduce((acc, entry) => {
        const key = `Week ${entry.week}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(entry);
        return acc;
    }, {});

    const weeks = Object.keys(byWeek).sort((a, b) => {
        const numA = parseInt(a.replace('Week ', ''));
        const numB = parseInt(b.replace('Week ', ''));
        return numA - numB;
    });

    const [activeWeek, setActiveWeek] = useState(null);
    const displayWeek = activeWeek || weeks[0] || null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            {/* Header */}
            <div className='flex gap-2 items-center mb-4'>
                <Calendar1 className="w-5 h-5 text-blue-500" />
                <h2 className="font-JakartaSemiBold">Upcoming Schedule</h2>
            </div>

            {/* Sprint selector (only shown if student has more than one sprint) */}
            {studentSprints && studentSprints.length > 1 && (
                <div className="mb-5 relative max-w-xs">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Sprint</label>
                    <div className="relative">
                        <select
                            value={selectedSprintId || ''}
                            onChange={(e) => {
                                setSelectedSprintId(e.target.value);
                                setActiveWeek(null); // reset week when sprint changes
                            }}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {studentSprints.map(s => (
                                <option key={s.id} value={String(s.id)}>
                                    {s.name || s.course_code || `Sprint ${s.id}`}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2 top-2.5 w-4 h-4 text-slate-400" />
                    </div>
                </div>
            )}

            {/* No sprints */}
            {(!studentSprints || studentSprints.length === 0) && (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No active sprints found.</p>
                    <p className="text-sm text-slate-400">Contact your tutor to be enrolled in a sprint.</p>
                </div>
            )}

            {/* Loading */}
            {selectedSprintId && isLoading && (
                <div className="text-center py-10">
                    <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-slate-400">Loading schedule...</p>
                </div>
            )}

            {/* Empty syllabus */}
            {selectedSprintId && !isLoading && syllabus.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No schedule assigned yet.</p>
                    <p className="text-sm text-slate-400">Check back later or explore other sections.</p>
                </div>
            )}

            {/* Week tabs + sessions */}
            {selectedSprintId && !isLoading && syllabus.length > 0 && (
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Week navigation */}
                    <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 md:w-1/4 shrink-0">
                        {weeks.map(week => (
                            <button
                                key={week}
                                onClick={() => setActiveWeek(week)}
                                className={`px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all text-left ${
                                    displayWeek === week
                                        ? 'bg-blue-500 text-white shadow'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {week}
                            </button>
                        ))}
                    </div>

                    {/* Sessions for the selected week */}
                    <div className="flex-1 space-y-3">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                            {displayWeek} — Sessions
                        </h3>
                        {displayWeek && byWeek[displayWeek]?.map((entry, index) => {
                            const topicStr = Array.isArray(entry.topic)
                                ? entry.topic.join(', ')
                                : (entry.topic || 'Untitled Topic');

                            return (
                                <div
                                    key={index}
                                    className="bg-[#F1F5F980] rounded-xl p-4 flex items-center justify-between"
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='bg-[#3C83F61A] p-2.5 w-fit rounded-xl'>
                                            <Clock4 className="w-5 h-5 text-[#3C83F6]" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium font-Inter">{topicStr}</h3>
                                            <p className="text-slate-500 text-xs mt-0.5">
                                                {entry.day} · {entry.session_date}
                                            </p>
                                            <p className="text-slate-400 text-xs">
                                                Session {entry.session_number}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;

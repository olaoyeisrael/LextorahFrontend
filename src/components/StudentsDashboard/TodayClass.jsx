import { Calendar1, Clock, Clock4 } from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { apiClient } from "../../utils/api"

export const TodaysClass = () => {
    const user = useSelector((state) => state.user);
    const { user_id, studentSprints } = user;

    // Build a comma-separated query param from the user's sprint IDs (stored in Redux
    // from the Laravel login response). The backend uses these to query the sprints
    // collection directly, since Python MongoDB doesn't have sprint membership synced.
    const sprintIdsParam = Array.isArray(studentSprints) && studentSprints.length > 0
        ? studentSprints.map(s => String(s.id)).join(',')
        : '';

    const { data: todayClasses = [], isLoading } = useQuery({
        queryKey: ['todayClasses', user_id, sprintIdsParam],
        queryFn: async () => {
            if (!user_id) return [];
            const url = sprintIdsParam
                ? `/curriculum/today/${user_id}?sprint_ids=${sprintIdsParam}`
                : `/curriculum/today/${user_id}`;
            const response = await apiClient(url);
            if (response.ok) {
                const data = await response.json();
                return data.classes || [];
            }
            return [];
        },
        enabled: !!user_id,
    });

    const mappedCourses = todayClasses.map(topic => {
        const topicStr = Array.isArray(topic.topic) ? topic.topic.join(', ') : (topic.topic || "Untitled Topic");
        return {
            title: topicStr,
            time: `${topic.day} - ${topic.session_date}`,
            tutor: `Week ${topic.week} - Session ${topic.session_number}`,
            sprintName: topic.sprint_name || "",
        };
    });


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className='flex gap-2 items-center mb-4'>
            <Calendar1 className="w-5 h-5 text-blue-500" />
            <div>
             <h2 className=" font-JakartaSemiBold ">Today's Classes</h2>
             </div>

        </div>
        
        {isLoading ? (
            <div className="text-center py-10">
                <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-slate-400">Loading today's schedule...</p>
            </div>
        ) : todayClasses.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No classes scheduled for today.</p>
                <p className="text-sm text-slate-400">Check back later or check my courses for available transcripts.</p>
                
                </div>) :
                ( 
                    mappedCourses.map((course, index) => (
                        <div key={index} className=" bg-[#F1F5F980] rounded-xl p-4 mb-4 flex items-center justify-between">
                            <div className='flex items-center gap-2'>
                                <div className='bg-[#3C83F61A] p-2.5 w-fit mb-1 rounded-xl'>
                                <Clock4 className="w-5 h-5 text-[#3C83F6] " />  
                                </div>
                                <div>
                                <h3 className="font-medium font-Inter ">{course.title}</h3>
                                <p className="text-slate-600 text-sm">{course.time}</p>
                                <p className="text-slate-600 text-sm">{course.tutor}</p>
                                {course.sprintName && (
                                    <p className="text-slate-400 text-xs mt-0.5">{course.sprintName}</p>
                                )}
                                </div>
                            </div>
                            <Link to="/learn" className="px-4 py-2 bg-[#3C83F6] hover:bg-[#2A6BCF] text-white rounded-lg text-sm font-bold transition-colors">
                                Join
                            </Link>
                        </div>
                    ))
                )
        }
    </div>
  )
}

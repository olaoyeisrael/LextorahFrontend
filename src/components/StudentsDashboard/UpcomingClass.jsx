import { Calendar1, Clock, Clock4 } from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { useMemo } from "react"

export const StudentDashboard = () => {
    const user = useSelector((state) => state.user);

    const {studentSprints } = user

    const activeSprintId = studentSprints && studentSprints.length > 0 ? studentSprints[0].id : null;

   const { data: topics = [], isLoading } = useQuery({
           queryKey: ['studentTopics', activeSprintId],
           queryFn: async () => {
               if (!activeSprintId) return [];
               const response = await apiClient(`/curriculum/sprint/${activeSprintId}`);
               if (response.ok) {
                   const data = await response.json();
                   return data.curriculum || [];
               }
               return [];
           },
           enabled: !!activeSprintId,
       });

    const mappedCourses = useMemo(() => {
            if (!topics || topics.length === 0) return [];
            return topics.slice(0, 3).map(topic => {
                const topicStr = Array.isArray(topic.topic) ? topic.topic.join(', ') : (topic.topic || "Untitled Topic");
                return {
                    title: topicStr,
                    time: `${new Date(topic.session_date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})} - ${topic.day}`,
                    tutor: `Week ${topic.week} - Session ${topic.session_number}`,
                };
            });
        }, [topics]);


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className='flex gap-2 items-center mb-4'>
            <Calendar1 className="w-5 h-5 text-blue-500" />
            <div>
             <h2 className=" font-JakartaSemiBold ">Upcoming Schedule</h2>
             </div>

        </div>
        
        { isLoading ? (
            <div className="text-center py-10">
                <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-slate-400">Loading Upcoming schedule...</p>
            </div>
        ) :
        topics.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No classes scheduled for today.</p>
                <p className="text-sm text-slate-400">Check back later or explore other sections.</p>
                
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
                                {/* <div className='flex  items-center justify-center'> */}
                                <p className="text-slate-600 text-sm">{course.time}</p>
                                <p className="text-slate-600 text-sm">{course.tutor}</p>
                                </div>
                                {/* </div> */}
                            </div>
                           
                        </div>
                    ))
                )
        }
        <Link to='/upcoming-schedule' className="py-2">
            <h1 className="text-[#3C83F6] text-sm font-Inter text-center">View Full Schedule</h1>

        </Link>
    </div>
  )
}

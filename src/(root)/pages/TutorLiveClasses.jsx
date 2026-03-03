import { Circle } from 'lucide-react'
import React from 'react'

const TutorLiveClass = [{
    course: "German",
    level: "A1",
    Date: "2026-02-28",
    Time: "10:00 AM",
    Topic: "Basic Greetings",
    status: "Live"
},
{
    course: "French",
    level: "A2",
    Date: "2026-06-20",
    Time: "2:00 PM",
    Topic: "Ordering Food",
    status: "Upcoming"
},
{
    course: "Spanish",
    level: "B1",
    Date: "2026-06-25",
    Time: "4:00 PM",
    Topic: "Travel Phrases",
    status: "Upcoming"
}
]

function TutorLiveClasses() {
  return (
    <section>
        <div className='mb-6'>
        <h1 className="text-2xl font-InterBold">Live Classes</h1>
        <p className='text-[#65758B] font-Inter'>Manage and join your live sessions</p>
        </div>
       
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E1E7EF]">
                <h2 className="text-xl font-InterBold mb-6">Upcoming Classes</h2>
                <table className="w-full table-auto">
                    <thead >
                        <tr className="text-left text-sm text-[#65758B] border-b border-[#E1E7EF] font-Inter">
                            <th className="py-3">Course</th>
                            <th className="py-3">Level</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Time</th>
                            <th className="py-3">Topic</th>
                            <th className="py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TutorLiveClass.map((cls, index) => (
                            <tr key={index} className="border-b border-[#E1E7EF] hover:bg-gray-50 transition-colors">
                                <td className="py-3">{cls.course}</td>
                                <td className="py-3">{cls.level}</td>
                                <td className="py-3">{cls.Date}</td>
                                <td className="py-3">{cls.Time} </td>
                                <td className="py-3">{cls.Topic}</td>
                                {cls.status === "Live" ? (
                                    <td className="py-3">
                                        <button className="px-2.5 py-0.5 bg-red-100 text-red-600 rounded-full transition-colors items-center flex gap-1 border border-[#DC282833]">
                                            <Circle className="w-3 h-3 bg-red-500 rounded-full inline-block animate-pulse" />
                                            {cls.status}
                                        </button>
                                    </td>
                                ) : (
                                    <td className="py-3 ">
                                        <div className='px-2.5 py-0.5 bg-yellow-100 text-sm text-[#F59F0A] border border-[#F59F0A33] w-fit rounded-full'>
                                              {cls.status}
                                        </div>
                                        
                                      
                                        </td>
                                )}
                                
                            </tr>
                        ))}
                        {/* Example row */}
                        {/* <tr className="border-b">
                            <td className="py-3">Algebra 101</td>
                            <td className="py-3">Beginner</td>
                            <td className="py-3">25</td>
                            <td className="py-3">2 Alerts</td>
                            <td className="py-3">
                                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors">
                                    Join Class
                                </button>
                            </td>
                        </tr>
                        More rows can be added here */}
                    </tbody>
                </table>
                
            </div>
  
    </section>
  )
}

export default TutorLiveClasses
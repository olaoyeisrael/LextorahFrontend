import { useEffect, useState } from "react"
import { Bot, ChevronDown, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { apiClient } from "../../utils/api";
import { isAdmin } from '../../utils/auth';
import { COURSE_CODES } from '../../utils/courseData';

const Aialert = () => {
    const { token, managedSprints: rawManagedSprints } = useSelector((state) => state.user);
    const managedSprints = rawManagedSprints || [];
    const isUserAdmin = isAdmin();
    const sprintCourseCodes = [...new Set(managedSprints.map(s => s.course_code || '').filter(Boolean))];
    
    // Fallback to COURSE_CODES for admins or if no tutor sprints are loaded
    const courseList = (!isUserAdmin && sprintCourseCodes.length > 0) 
        ? sprintCourseCodes 
        : COURSE_CODES;

    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!selectedCourse && courseList.length > 0) {
            setSelectedCourse(courseList[0]);
        }
    }, [courseList, selectedCourse]);

    useEffect(() => {
        const fetchAlerts = async () => {
            if (!selectedCourse) return;
            setLoading(true);
            setError("");
            try {
                // Fetch AI diagnostics and academic decline alerts in parallel
                const summaryRes = await apiClient(`/api/reports/course-summary/${selectedCourse}`)

                let summaryAlerts = [];
                let declineAlerts = [];

                if (summaryRes.ok) {
                    summaryAlerts = await summaryRes.json();
                }
               

                // Merge and remove duplicates by ID
                const merged = [...summaryAlerts, ...declineAlerts];
                const uniqueMap = new Map();
                merged.forEach(item => {
                    if (item && item.id) {
                        uniqueMap.set(item.id, item);
                    }
                });
                
                setAlerts(Array.from(uniqueMap.values()));
            } catch (err) {
                console.error("Failed to fetch AI alerts", err);
                setError("Failed to fetch alerts. Please try again.");
                setAlerts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAlerts();
    }, [selectedCourse, token]);

    const filteredAlerts = alerts.filter(alert => {
        if (selectedType === 'All') return true;
        return alert.type && alert.type.toLowerCase() === selectedType.toLowerCase();
    });

  return (
    <div className="max-w-6xl mx-auto py-8 lg:px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-8 h-8 text-blue-500" />
                    <h1 className="text-2xl font-bold text-slate-900">AI Alerts</h1>
                </div>
                <p className="text-slate-500">{filteredAlerts.length} alerts generated</p>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="relative">
                    <select 
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium cursor-pointer"
                    >
                        {courseList.map(code => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                
                <div className="relative">
                    <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium cursor-pointer"
                    >
                        <option value="All">All Types</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Warning">Warning</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
            {loading ? (
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center flex flex-col items-center justify-center text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                    <p className="font-medium">Analyzing student data and generating AI insights...</p>
                </div>
            ) : error ? (
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-red-500">
                    <p className="font-medium">{error}</p>
                </div>
            ) : filteredAlerts.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400">
                    <p className="font-medium">No alerts found for this course.</p>
                </div>
            ) : (
                filteredAlerts.map((alert) => (
                    <div key={alert.id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4 transition-shadow hover:shadow-sm">
                        <div className="flex-shrink-0">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                                alert.type === 'Urgent' 
                                    ? 'bg-red-50 text-red-500' 
                                    : 'bg-orange-50 text-orange-400'
                            }`}>
                                {alert.type}
                            </span>
                        </div>
                        
                        <div>
                            <p className="text-[#0F1729] font-Inter mb-1">{alert.message}</p>
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 font-Inter">
                                <span>{alert.reason || "Declining Trend"}</span>
                                {alert.class && (
                                    <>
                                        <span>•</span>
                                        <span>{alert.class}</span>
                                    </>
                                )}
                                {alert.date && (
                                    <>
                                        <span>•</span>
                                        <span>{alert.date}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  )
}

export default Aialert
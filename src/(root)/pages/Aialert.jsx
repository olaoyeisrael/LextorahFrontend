import { useState } from "react"
import { Bot, ChevronDown } from 'lucide-react';

const alertsData = [
  
];

const Aialert = () => {
    const [alerts, setAlerts] = useState(alertsData);
  return (
    <div className="max-w-6xl mx-auto py-8 lg:px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-8 h-8 text-blue-500" />
                    <h1 className="text-2xl font-bold text-slate-900">AI Alerts</h1>
                </div>
                <p className="text-slate-500">{alerts.length} alerts generated</p>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="relative">
                    <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium cursor-pointer">
                        <option>All Classes</option>
                        
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                
                <div className="relative">
                    <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium cursor-pointer">
                        <option>All</option>
                        <option>Urgent</option>
                        <option>Warning</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
            {alerts.map((alert) => (
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
                        <p className="text-slate-800 font-medium mb-1">{alert.message}</p>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                            <span>{alert.reason}</span>
                            <span>•</span>
                            <span>{alert.class}</span>
                            <span>•</span>
                            <span>{alert.date}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Aialert
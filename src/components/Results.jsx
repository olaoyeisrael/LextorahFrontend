import React from 'react'

const Result = [{title: "Test 1", score: "85%", date: "2024-06-01"}, {title: "Test 2", score: "92%", date: "2024-06-05"  }, {title: "Exam Prep 1", score: "78%", date: "2024-06-10"}]
function Results() {
  return (
    <div className='mt-6'>
       
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-600">Past Test Results</p>
            {Result.length > 0 ? Result.map((result, index) => (
                <div key={index} className="flex justify-between items-center mt-4 p-4 border border-slate-100 rounded-lg bg-[#F1F5F980]">
                    <div>
                        <p className="font-medium text-slate-900">{result.title}</p>
                        <p className="text-xs text-slate-500">{new Date(result.date).toLocaleDateString()}</p>
                    </div>
                    <span className="text-green-600 font-bold">{result.score}</span>
                </div>
            )) : <p className="text-slate-500 mt-4">No past results found.</p>}
        </div>
    </div>
  )
}

export default Results
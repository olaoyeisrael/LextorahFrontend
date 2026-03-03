import React from 'react'

// const Notications = [{
//     id: 1,  
//     title: "New Assignment Available",
//     description: "A new assignment has been posted for your Math class. Please check the course page for details.",
//     timestamp: "2024-06-01T10:30:00Z"
//   },
//   {
//     id: 2,
//     title: "Class Cancelled",
//     description: "The upcoming French class has been cancelled due to unforeseen circumstances.",
//     timestamp: "2024-06-01T09:15:00Z"
//   }
// ]
const Notications = []
function Notification() {
  return (
    <div  className='max-w-6xl mx-auto mt-6'>
        <h1 className="text-2xl font-bold">Notification Page</h1>
        { Notications.length === 0 ? (
            <p className="text-gray-600 mt-4">You have no notifications at the moment.</p>
        ) : (
            Notications.map((notification) => (
                <div key={notification.id} className="p-4 mb-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold">{notification.title}</h2>
                    <p className="text-gray-600 mt-1">{notification.description}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{new Date(notification.timestamp).toLocaleString()}</span>
                </div>
            )))
        }

    </div>
  )
}

export default Notification
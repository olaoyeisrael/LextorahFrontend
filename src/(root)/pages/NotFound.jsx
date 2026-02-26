import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='text-center p-5 text-4xl'>
      <h1 className="text-red-500">404 - Page Not Found</h1>
      <h2 className="text-black">The page you are looking for does not exist.</h2>
      <Link to="/" className="mt-4 inline-block px-5 py-2.5 bg-[#0D9488] hover:bg-green-700 text-white font-bold rounded-md transition-all shadow-md hover:shadow-lg">
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
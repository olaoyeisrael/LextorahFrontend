import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './(root)/Home'
import Ask from './(root)/pages/Ask'
import Learn from './(root)/pages/Learn'
import RootLayer from './(root)/RootLayer'
import Upload from './(root)/pages/Upload'
import Dashboard from './(root)/pages/Dashboard'
import Login from './(root)/pages/Login'
import Signup from './(root)/pages/Signup'
import DashboardLayout from './(root)/DashboardLayout'
import Course from './(root)/pages/Course'
import History from './(root)/pages/History'
import Settings from './(root)/pages/Settings'
import StudentPerformance from './(root)/pages/StudentPerformance'
import Curriculum from './(root)/pages/Curriculum'





import Test from './(root)/pages/Test'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
 

  return (
    <main>
      <Routes >
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Authenticated Routes */}
        <Route element={<ProtectedRoute/>}>
        <Route element={<DashboardLayout/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/upload' element={<Upload/>}/>
          <Route path="/ask" element={<Ask />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/test" element={<Test />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/student-performance" element={<StudentPerformance />} />
          <Route path="/curriculum" element={<Curriculum />} />


        </Route>
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </main>
  )
   
}

export default App

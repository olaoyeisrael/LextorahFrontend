import { useState, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
// import Home from './(root)/Home'
// import Ask from './(root)/pages/Ask'
// import Learn from './(root)/pages/Learn'
import RootLayer from './(root)/RootLayer'
// import LearnersPage from './(root)/pages/Learners'
// import TeachersPage from './(root)/pages/Teachers'
// import Upload from './(root)/pages/Upload'
// import Dashboard from './(root)/pages/Dashboard'
// import Login from './(root)/pages/Login'
// import Signup from './(root)/pages/Signup'
// import DashboardLayout from './(root)/DashboardLayout'
// import Course from './(root)/pages/Course'
// import History from './(root)/pages/History'
// import Settings from './(root)/pages/Settings'
// import StudentPerformance from './(root)/pages/StudentPerformance'
// import Curriculum from './(root)/pages/Curriculum'


const DashboardLayout = lazy(() => import('./(root)/DashboardLayout'))
const Home = lazy(() => import('./(root)/Home'))
const Ask = lazy(() => import('./(root)/pages/Ask'))
const Learn = lazy(() => import('./(root)/pages/Learn'))
const Upload = lazy(() => import('./(root)/pages/Upload'))
const Course = lazy(() => import('./(root)/pages/Course'))
const History = lazy(() => import('./(root)/pages/History'))
const Settings = lazy(() => import('./(root)/pages/Settings'))
const StudentPerformance = lazy(() => import('./(root)/pages/StudentPerformance'))
const Curriculum = lazy(() => import('./(root)/pages/Curriculum'))
const Dashboard = lazy(() => import('./(root)/pages/Dashboard'))
const Test = lazy(() => import('./(root)/pages/Test'))
const Login = lazy(() => import('./(root)/pages/Login'))
const Signup = lazy(() => import('./(root)/pages/Signup'))
const LiveClasses = lazy(() => import('./(root)/pages/LiveClasses'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))
const NotFound = lazy(() => import('./(root)/pages/NotFound'))
const ParentsPage = lazy(() => import('./(root)/pages/Parents'))
const TeachersPage = lazy(() => import('./(root)/pages/Teachers'))
const LearnersPage = lazy(() => import('./(root)/pages/Learners'))
const ContactPage = lazy(() => import('./(root)/pages/Contact'))
const AboutPage = lazy(() => import('./(root)/pages/About'))
const PrivacyPolicyPage = lazy(() => import('./(root)/pages/PrivacyPolicy'))
const TermsOfUsePage = lazy(() => import('./(root)/pages/Terms'))
const BasilSchoolsPage = lazy(() => import('./(root)/schools/basil'))
const ChrislandSchoolsPage = lazy(() => import('./(root)/schools/chrisland'))
const CoronaSchoolsPage = lazy(() => import('./(root)/schools/corona'))
const DansolSchoolsPage = lazy(() => import('./(root)/schools/dansol'))
const GrangeSchoolsPage = lazy(() => import('./(root)/schools/grange'))
const LagoonSchoolsPage = lazy(() => import('./(root)/schools/lagoon'))
const SupremeSchoolsPage = lazy(() => import('./(root)/schools/supreme'))
const UnilagSchoolsPage = lazy(() => import('./(root)/schools/unilag'))
const WhitesandsSchoolsPage = lazy(() => import('./(root)/schools/whitesands'))
const InstitutionPage = lazy(() => import('./(root)/pages/Institution'))
const StarterPack = lazy(()=> import('./(root)/pages/StarterPack'))
const Classroom2 = lazy(() => import('./classroom2'))







// import Test from './(root)/pages/Test'
// import ProtectedRoute from './components/ProtectedRoute'

// import LiveClasses from './(root)/pages/LiveClasses'

function App() {
 

  return (
    <main>

      <Suspense fallback={<div style={{minHeight: "100vh"}}/>}>
      <Routes >
      <Route element={<RootLayer/>}>
        <Route index path="/" element={<Home />} />
        <Route path="/learners" element={<LearnersPage />} />
        <Route path='/teachers' element={<TeachersPage/>} />
        <Route path="/parents" element={<ParentsPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        <Route path="/institution" element={<InstitutionPage />} />
        <Route path='/starter-pack-access-request' element={<StarterPack/>}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/basil-schools" element={<BasilSchoolsPage />} />
        <Route path="/chrisland-schools" element={<ChrislandSchoolsPage />} />
        <Route path="/corona-schools" element={<CoronaSchoolsPage />} />
        <Route path="/dansol-schools" element={<DansolSchoolsPage />} />
        <Route path="/grange-schools" element={<GrangeSchoolsPage />} />
        <Route path="/lagoon-schools" element={<LagoonSchoolsPage />} />
        <Route path="/supreme-schools" element={<SupremeSchoolsPage />} />
        <Route path="/unilag-schools" element={<UnilagSchoolsPage />} />
        <Route path="/whitesands-schools" element={<WhitesandsSchoolsPage />} />

        
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
          <Route path="/live-classes-admin" element={<LiveClasses />} />


        </Route>
        </Route>
        <Route path="/classroom" element={<Classroom2 />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    
    </main>
  )
   
}

export default App

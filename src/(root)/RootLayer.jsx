import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const RootLayer = () => {
  return (
    <div className='h-full'>
      <NavBar/>

        <section className=''>
            <Outlet/>
        </section>

      <Footer/>
    </div>
  )
}

export default RootLayer
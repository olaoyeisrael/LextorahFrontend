import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const RootLayer = () => {
  return (
    <div className='h-full'>
      <NavBar/>

        <section className='pt-20'>
            <Outlet/>
        </section>
    </div>
  )
}

export default RootLayer
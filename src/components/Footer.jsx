import React from 'react'
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 bg-linear-to-r from-[#0D9488] to-[#0F766E]">
        <div className="py-16 px-4 md:px-8 space-y-12">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'>
                <div className='space-y-8'>
                    <img src={logo} alt="" className='w-32' />
                    <h1 className='text-white font-Inter'>Empowering Learning. Guiding Progress Globally.</h1>
                    <div className='flex gap-4 '>
                        <Instagram className='text-white'/>
                        <Twitter className='text-white'/>
                        <Linkedin className='text-white'/>
                        <Facebook className='text-white'/>
                    </div>
                </div>

                <div className='space-y-8 '>
                    <h2 className='font-Inter text-white'>Explore Lextorah Programs.</h2>
                    {/* <ul className='space-y-3'>
                        <li className='text-sm font-Inter text-white'>AI Tutor</li>
                        <li className='text-sm font-Inter text-white'>Digital Learning Support</li>
                        <li className='text-sm font-Inter text-white'>For Students</li>
                        <li className='text-sm font-Inter text-white'>For Parents</li>
                       
                    </ul> */}
                </div>
                <div className='space-y-8 '>
                    {/* <h1 className='font-InterBold text-white'>Company</h1> */}
                    <ul className='space-y-3'>
                        <li>
                        <Link to="/about-us" className='text-sm font-Inter text-white'>About Us</Link> </li>
                        <li>    
                        <Link to="/contact-us" className='text-sm font-Inter text-[#FFFFFF] py-0.5'>Contact Us</Link> </li>   
                    </ul>
                </div>
                <div className='space-y-8 '>
                    {/* <h1 className='font-InterBold text-white'>Resources</h1> */}
                    <ul className='space-y-3'>
                        {/* <li className='text-sm font-Inter text-white'>Help Center</li> */}
                        <li>
                            
                            <Link to="/privacy-policy" className='text-sm font-Inter text-white'>Privacy Policy</Link></li>
                        <li >
                            <Link to="/terms-of-use" className='text-sm font-Inter text-white'>Terms of Service</Link></li>
                        {/* <li className='text-sm font-Inter text-white'>Cookie Policy</li> */}
                    </ul>
                </div>

            </div>
            <div className="border-t border-[#FFFFFF33] pt-8 ">
                <h1 className="text-white text-center ">© 2025 Lextorah.ai. All rights reserved.</h1>
            </div>


        </div>

       </footer>
   
            
  )
}

export default Footer
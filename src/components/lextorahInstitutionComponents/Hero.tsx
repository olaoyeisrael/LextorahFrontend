import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      {/* Background Image */}
      <div className='absolute inset-0'>
        <img
          src='/images/lextorah-institution-hero.png'
          alt='Lextorah Institution Hero'
          className='object-cover w-full h-full'
        />
        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black/60' />
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl text-center mr-auto px-4 sm:px-6 lg:px-20 flex items-center min-h-screen'>
        <div className='max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className='mb-6'
          >
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00C950] mb-6'>
              Lextorah AI
            </h1>
            <h2 className='text-2xl  sm:text-[28px] font-bold text-[#CCFBF1] mb-4'>
              The Academic Backbone for Schools & Universities
            </h2>
            <p className='text-lg sm:text-xl text-gray-200 max-w-4xl mb-36'>
              One platform. Three stakeholders. Measurable academic impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex flex-col justify-center sm:flex-row gap-4'
          >
            <Link to='/starter-pack-access-request'>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(255, 255, 255, 0.2)',
                  backgroundColor: '#f8fafc',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className='bg-white text-gray-900 font-semibold py-4 px-8 rounded-lg w-full sm:w-auto'
              >
                Access the Starter Pack
              </motion.button>
            </Link>

            <Link to='/book-demo'>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(20, 184, 166, 0.4)',
                  backgroundColor: 'rgb(var(--color-secondary-dark))',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className='bg-[#00C950] text-white font-semibold py-4 px-8 rounded-lg hover:bg-secondary-dark w-full sm:w-auto'
              >
                Request a 15-Minute Demo
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

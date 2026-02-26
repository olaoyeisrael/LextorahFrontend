import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, User, Users, Shield } from 'lucide-react';

const WhatLextorahDoes = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const stakeholders = [
    {
      id: 1,
      icon: User,
      title: 'For Students',
      features: [
        '24/7 academic support beyond classroom or lecture hours',
        'One explanation until guided practice',
        'Early identification of learning gaps',
        'Stronger exam readiness and confidence',
      ],
    },
    {
      id: 2,
      icon: Users,
      title: 'For Educators',
      features: [
        'Reduced repetitive academic support workload',
        'AI-assisted quizzes, practice questions, and revision materials',
        'Insight into student understanding and engagement',
        'Support for large classes and blended delivery',
      ],
    },
    {
      id: 3,
      icon: Shield,
      title: 'For Leadership',
      features: [
        'Real-time academic performance visibility',
        'Early-warning indicators for at-risk learners',
        'Evidence for quality assurance, audits, and accreditation',
        'Data-informed academic decision-making',
      ],
    },
  ];

  const languages = [
    {
      id: 1,
      name: 'English',
      level: 'Academic & Proficiency',
      image: '/icons/english.svg',
    },
    {
      id: 2,
      name: 'French',
      level: 'Curriculum Aligned',
      image: '/icons/other.svg',
    },
    {
      id: 3,
      name: 'German',
      level: 'International Pathways',
      image: '/icons/other.svg',
    },
    {
      id: 4,
      name: 'Chinese',
      level: 'Mandarin',
      image: '/icons/other.svg',
    },
    {
      id: 5,
      name: 'Spanish',
      level: 'Global Recognition',
      image: '/icons/other.svg',
    },
  ];

  return (
    <div className='bg-white'>
      {/* What Lextorah AI Does Section */}
      <section
        ref={sectionRef}
        className='py-20 px-4 sm:px-6 lg:px-8'
        style={{
          background: 'linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 100%)',
        }}
      >
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
              What Lextorah AI Does
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Supporting every stakeholder in the academic ecosystem
            </p>
          </motion.div>

          {/* Stakeholders Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='grid grid-cols-1 lg:grid-cols-3 gap-8'
          >
            {stakeholders.map((stakeholder, index) => {
              const Icon = stakeholder.icon;
              return (
                <motion.div
                  key={stakeholder.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  whileHover={{
                    y: -10,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  }}
                  className='p-8 rounded-2xl border border-primary-light transition-all duration-300'
                  style={{
                    background:
                      'linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 100%)',
                  }}
                >
                  {/* Icon */}
                  <div className='w-14 h-14 rounded-xl bg-teal-600 flex items-center justify-center mb-6'>
                    <Icon className='w-7 h-7 text-white' />
                  </div>

                  {/* Title */}
                  <h3 className='text-xl font-bold text-gray-900 mb-6'>
                    {stakeholder.title}
                  </h3>

                  {/* Features List */}
                  <ul className='space-y-4'>
                    {stakeholder.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: 20 }
                        }
                        transition={{
                          duration: 0.6,
                          delay: 0.4 + index * 0.15 + idx * 0.1,
                        }}
                        className='flex items-start gap-3'
                      >
                        <div className='w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                          <Check className='w-3 h-3 text-teal-600' />
                        </div>
                        <span className='text-sm text-gray-700 leading-relaxed'>
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Language Learning & Exam Preparation Section */}
      <section
        className='py-20 px-4 sm:px-6 lg:px-8 bg-white'
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDFA 100%)',
        }}
      >
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
              Language Learning & Exam Preparation
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              In addition to core academic subjects, Lextorah AI supports
              structured language learning and international exam preparation
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 1 }}
              className='relative w-full overflow-hidden'
              style={{ aspectRatio: '4 / 3' }}
            >
              <img
                src='/images/language-Learning.png'
                alt='Language Learning'
                className='object-cover w-full rounded-2xl'
                // sizes='(max-width: 768px) 100vw, 50vw'
              />
            </motion.div>

            {/* Supported Languages */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className='space-y-8'
            >
              <div>
                <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-6'>
                  Supported Languages
                </h3>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {languages.map((language, index) => (
                  <motion.div
                    key={language.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    }}
                    className='flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:bg-white transition-all'
                  >
                    <div className='w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center shrink-0'>
                      <img
                        src={language.image}
                        alt={language.name}
                        width={24}
                        height={24}
                        className='w-6 h-6'
                      />
                    </div>
                    <div className='min-w-0'>
                      <h4 className='font-semibold text-gray-900 text-sm'>
                        {language.name}
                      </h4>
                      <p className='text-xs text-gray-600'>{language.level}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className='text-sm text-gray-600 leading-relaxed'
              >
                These language courses are designed for home school and
                university use, supporting curriculum delivery, international
                pathways, and globally recognized examinations.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatLextorahDoes;

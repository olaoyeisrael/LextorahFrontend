
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, FlaskConical, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetStartedAndFAQ = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const getStartedOptions = [
    {
      id: 1,
      icon: FlaskConical,
      title: 'Option 1: Pilot Rollout',
      features: [
        'One class, cohort, faculty, or program',
        'Fixed, low-risk evaluation period',
        'Clear academic outcomes and reporting',
      ],
      gradient: 'linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 100%)',
      borderColor: 'border-primary-light',
      iconBg: 'bg-[#0D9488]',
      arrowBg: 'bg-[#0D9488]',
      arrowColor: 'text-white',
    },
    {
      id: 2,
      icon: Building2,
      title: 'Option 2: Institution-Wide Adoption',
      features: [
        'Broader deployment across departments or year groups',
        'Central oversight with local academic control',
      ],
      gradient: 'linear-gradient(180deg, #0D9488 0%, #0F766E 100%)',
      borderColor: 'border-teal-500',
      iconBg: 'bg-white',
      textColor: 'text-white',
      featureTextColor: 'text-white/90',
      arrowBg: 'bg-white',
      arrowColor: 'text-[#0D9488]',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How is pricing structured?',
      answer:
        'Pricing is based on student usage and institutional requirements. We offer flexible plans for pilot programs and institution-wide deployments with transparent, scalable pricing.',
    },
    {
      id: 2,
      question: 'Can we start with a pilot before full adoption?',
      answer:
        'Yes, we recommend starting with a pilot program. You can begin with one class, cohort, faculty, or program to evaluate outcomes before expanding institution-wide.',
    },
    {
      id: 3,
      question: 'How does Lextorah AI support academic integrity and ethics?',
      answer:
        'Lextorah AI is designed to support genuine learning rather than provide shortcuts. It focuses on explanations, practice, and understanding rather than completing assignments for students.',
    },
    {
      id: 4,
      question: 'How is student and institutional data handled?',
      answer:
        'We maintain strict data privacy and security standards. All student data is encrypted, and we comply with educational data protection regulations including FERPA and GDPR.',
    },
    {
      id: 5,
      question: 'Does Lextorah AI replace teachers or lecturers?',
      answer:
        'No, Lextorah AI is designed to support and enhance teaching, not replace it. It provides 24/7 academic support to reduce repetitive workload and free up educators for higher-value interactions.',
    },
    {
      id: 6,
      question: 'Can Lextorah AI integrate with our existing systems?',
      answer:
        'Yes, Lextorah AI is designed to integrate with existing LMS platforms, curricula, and teaching practices. We work with institutions to ensure seamless integration.',
    },
    {
      id: 7,
      question: 'Who uses Lextorah AI within the institution?',
      answer:
        'Lextorah AI is used by students for academic support, educators for teaching assistance, and administrators for oversight and analytics. Each stakeholder has appropriate access levels.',
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className='bg-white'>
      {/* How Institutions Get Started */}
      <section ref={sectionRef} className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
              How Institutions Get Started
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Most schools and universities begin in one of two ways
            </p>
          </motion.div>

          {/* Options Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {getStartedOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                  whileHover={{
                    y: -10,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  }}
                  className={`p-8 rounded-2xl border-2 ${option.borderColor} transition-all duration-300`}
                  style={{
                    background: option.gradient,
                  }}
                >
                  {/* Icon and Title - Inline */}
                  <div className='flex items-center gap-4 mb-6'>
                    <div
                      className={`w-14 h-14 rounded-xl ${option.iconBg} flex items-center justify-center shrink-0`}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          option.iconBg === 'bg-white'
                            ? 'text-teal-600'
                            : 'text-white'
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-xl font-bold ${
                        option.textColor || 'text-gray-900'
                      }`}
                    >
                      {option.title}
                    </h3>
                  </div>

                  {/* Features List */}
                  <ul className='space-y-4'>
                    {option.features.map((feature, idx) => (
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
                          delay: 0.3 + index * 0.2 + idx * 0.1,
                        }}
                        className='flex items-start gap-3'
                      >
                        <div
                          className={`w-5 h-5 rounded-full ${option.arrowBg} flex items-center justify-center shrink-0 mt-0.5`}
                        >
                          <ArrowRight
                            className={`w-3 h-3 ${option.arrowColor}`}
                          />
                        </div>
                        <span
                          className={`text-sm leading-relaxed ${
                            option.featureTextColor || 'text-gray-700'
                          }`}
                        >
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDFA 100%)',
        }}
      >
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-lg text-gray-600'>
              Everything you need to know about Lextorah AI
            </p>
          </motion.div>

          {/* FAQ List */}
          <div className='space-y-4'>
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className='bg-white rounded-xl border border-gray-200 overflow-hidden'
              >
                <motion.button
                  onClick={() => toggleFAQ(faq.id)}
                  className='w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors'
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className='font-semibold text-gray-900 pr-4'>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className='shrink-0'
                  >
                    <ChevronDown className='w-5 h-5 text-gray-500' />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden'
                    >
                      <div className='px-6 pb-5 text-sm text-gray-600 leading-relaxed'>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Take the Next Step Section */}
      <section
        className='py-16 px-4 sm:px-6 lg:px-8'
        style={{
          background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
        }}
      >
        <div className='max-w-4xl mx-auto text-center'>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6'
          >
            Take the Next Step
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed'
          >
            Whether you represent a secondary school or a university, Lextorah
            AI helps you strengthen learning outcomes with confidence and
            control.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <Link to='/starter-pack-access-request'>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className='bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-300 min-w-[200px]'
              >
                Access the Starter Pack
              </motion.button>
            </Link>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 min-w-[200px]'
            >
              Request a 15-Minute Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GetStartedAndFAQ;

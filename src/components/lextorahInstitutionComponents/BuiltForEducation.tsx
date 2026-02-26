
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { School, University, BookOpen, Globe, Check } from 'lucide-react';

const BuiltForEducation = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const educationTypes = [
    {
      id: 1,
      icon: School,
      title: 'Secondary Schools',
      description:
        'WAEC • NECO • JAMB • IGCSE • SAT • TOEFL • IELTS preparation and support',
    },
    {
      id: 2,
      icon: University,
      title: 'Universities',
      description:
        'Higher education institutions with comprehensive academic support systems',
    },
    {
      id: 3,
      icon: BookOpen,
      title: 'Foundation Programs',
      description:
        'Primary and first-year programs with structured academic guidance',
    },
    {
      id: 4,
      icon: Globe,
      title: 'Flexible Delivery',
      description:
        'Online, blended, and transitional delivery models supported',
    },
  ];

  const benefits = [
    'Scales academic support without increasing staff burden',
    'Improves consistency of learning outcomes',
    'Strengthens retention, progression, and completion',
    'Integrates with existing curricula, teaching practices, and LMS',
  ];

  return (
    <section
      ref={sectionRef}
      className='py-20 px-4 sm:px-6 lg:px-8'
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDFA 100%)',
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
            Built for Education
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            Lextorah AI is not a generic AI tool. It is built specifically for
            regulated education environments where academic quality, integrity,
            and accountability matter.
          </p>
        </motion.div>

        {/* Education Types Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20'
        >
          {educationTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                }}
                className='p-6 rounded-xl bg-white/60 hover:bg-white transition-all border border-gray-100 shadow-sm'
              >
                <div className='w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mb-4'>
                  <Icon className='w-6 h-8 text-[#0D9488]' />
                </div>
                <h3 className='text-lg font-bold text-gray-900 mb-3'>
                  {type.title}
                </h3>
                <p className='text-sm text-[#4B5563] leading-relaxed'>
                  {type.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Why Institutions Choose Section */}
        <div className='grid grid-cols-1 bg-white shadow-xl rounded-3xl lg:grid-cols-2 gap-12 items-center'>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='relative w-full rounded-l-3xl overflow-hidden shadow-xl'
            style={{ aspectRatio: '4 / 3' }}
          >
            <img
              src='/images/why-lextorah-institution.png'
              alt='Why Institutions Choose Lextorah AI'
              className='object-cover w-full h-full'
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='space-y-6'
          >
            <div>
              <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'>
                Why Institutions Choose Lextorah AI
              </h3>
              <p className='text-gray-600 mb-6'>
                Institutions adopt Lextorah AI as academic infrastructure, not
                just software.
              </p>
            </div>

            <div className='space-y-4'>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className='flex items-start gap-3'
                >
                  <div className='w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5'>
                    <Check className='w-4 h-4 text-teal-600' />
                  </div>
                  <p className='text-gray-700 text-sm leading-relaxed'>
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForEducation;

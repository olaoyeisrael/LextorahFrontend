
import { useForm } from '@tanstack/react-form';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Separator } from '../../components/ui/separator';
import { Check } from 'lucide-react';

const formSchema = z.object({
  institutionName: z.string().min(1, 'Institution name is required'),
  institutionType: z.string().min(1, 'Please select institution type'),
  country: z.string().min(1, 'Country is required'),
  website: z
    .string()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
  fullName: z.string().min(1, 'Full name is required'),
  role: z.string().min(1, 'Please select your role'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone/WhatsApp number is required'),
  curriculum: z
    .string()
    .min(
      10,
      'Please provide details about curriculum/programme (minimum 10 characters)',
    ),
  studentCount: z
    .string()
    .min(1, 'Please select approximate number of students'),
  interest: z
    .string()
    .min(1, 'Please select what best describes your interest'),
  startDate: z.string().min(1, 'Please select preferred start date'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must confirm that you represent the institution',
  }),
  marketing: z.boolean().optional(),
});

const StarterPackAccessRequest = () => {
  const form = useForm({
    defaultValues: {
      institutionName: '',
      institutionType: '',
      country: '',
      website: '',
      fullName: '',
      role: '',
      email: '',
      phone: '',
      curriculum: '',
      studentCount: '',
      interest: '',
      startDate: '',
      consent: false,
      marketing: false,
    },
    onSubmit: async ({ value }) => {
      try {
        const validatedData = formSchema.parse(value);
        console.log('Form submitted:', validatedData);
        alert('Form submitted successfully!');
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error('Validation errors:', error.issues);
        }
      }
    },
  });

  return (
    <div className='min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-212 mx-auto'>
        {/* Title and Subtitle outside container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-center mb-8'
        >
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Starter Pack Access Form
          </h1>
          <p style={{ color: '#374151', fontSize: '14px' }}>
            Schools & Universities
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='bg-white border border-[#E5E7EB] rounded-lg p-8'
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {/* Institution Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className='mb-8'
            >
              <h2
                className='text-xl font-bold mb-3'
                style={{ color: '#1F2937' }}
              >
                Institution Details
              </h2>
              <Separator className='mt-4 mb-6' />

              <div className='space-y-6'>
                <form.Field
                  name='institutionName'
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        formSchema.shape.institutionName.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        htmlFor={field.name}
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Name of School / University{' '}
                        <span className='text-red-500'>*</span>
                      </Label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder='Enter institution name'
                        className='mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-light focus:border-primary-light placeholder:text-[#9CA3AF]'
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name='institutionType'
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        formSchema.shape.institutionType.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Institution Type <span className='text-red-500'>*</span>
                      </Label>
                      <RadioGroup
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        className='mt-2'
                      >
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='secondary-school'
                            id='secondary-school'
                          />
                          <Label
                            htmlFor='secondary-school'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Secondary School
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='university' id='university' />
                          <Label
                            htmlFor='university'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            University / Higher Education Institution
                          </Label>
                        </div>
                      </RadioGroup>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name='country'
                  validators={{
                    onChange: ({ value }) => {
                      const result = formSchema.shape.country.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Country <span className='text-red-500'>*</span>
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger className='mt-2 w-full py-5'>
                          <SelectValue placeholder='Select Country' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='US'>United States</SelectItem>
                          <SelectItem value='UK'>United Kingdom</SelectItem>
                          <SelectItem value='CA'>Canada</SelectItem>
                          <SelectItem value='AU'>Australia</SelectItem>
                          <SelectItem value='DE'>Germany</SelectItem>
                          <SelectItem value='FR'>France</SelectItem>
                          <SelectItem value='NG'>Nigeria</SelectItem>
                          <SelectItem value='ZA'>South Africa</SelectItem>
                          <SelectItem value='IN'>India</SelectItem>
                          <SelectItem value='SG'>Singapore</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name='website'
                  validators={{
                    onChange: ({ value }) => {
                      if (value === '') return undefined;
                      const result = formSchema.shape.website.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        htmlFor={field.name}
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Website (optional)
                      </Label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder='https://yourschool.edu'
                        className='mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-teal-500 focus:border-teal-500'
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>
              </div>
            </motion.div>

            {/* Contact Person */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className='mb-8'
            >
              <h2
                className='text-2xl font-bold mb-6'
                style={{ color: '#1F2937' }}
              >
                Contact Person
              </h2>

              <div className='space-y-6'>
                <form.Field
                  name='fullName'
                  validators={{
                    onChange: ({ value }) => {
                      const result = formSchema.shape.fullName.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        htmlFor={field.name}
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Full Name <span className='text-red-500'>*</span>
                      </Label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder='First and Last name'
                        className='mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-teal-500 focus:border-teal-500'
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name='role'
                  validators={{
                    onChange: ({ value }) => {
                      const result = formSchema.shape.role.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Role / Title <span className='text-red-500'>*</span>
                      </Label>
                      <RadioGroup
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        className='mt-4 space-y-3'
                      >
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='school-owner'
                            id='school-owner'
                          />
                          <Label
                            htmlFor='school-owner'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            School Owner / Proprietor
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='principal-vice-principal'
                            id='principal-vice-principal'
                          />
                          <Label
                            htmlFor='principal-vice-principal'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Principal / Vice-Principal
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='vice-chancellor-provost'
                            id='vice-chancellor-provost'
                          />
                          <Label
                            htmlFor='vice-chancellor-provost'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Vice-Chancellor / Provost
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='dean-head-of-department'
                            id='dean-head-of-department'
                          />
                          <Label
                            htmlFor='dean-head-of-department'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Dean / Head of Department
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='academic-director-coordinator'
                            id='academic-director-coordinator'
                          />
                          <Label
                            htmlFor='academic-director-coordinator'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Academic Director / Coordinator
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='curriculum-developer'
                            id='curriculum-developer'
                          />
                          <Label
                            htmlFor='curriculum-developer'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            ICT / Digital Learning Lead
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='other' id='other' />
                          <Label
                            htmlFor='other'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Other
                          </Label>
                        </div>
                      </RadioGroup>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name='email'
                  validators={{
                    onChange: ({ value }) => {
                      const result = formSchema.shape.email.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        htmlFor={field.name}
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Official Email Address{' '}
                        <span className='text-red-500'>*</span>
                      </Label>
                      <input
                        id={field.name}
                        name={field.name}
                        type='email'
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder='yourname@institution.edu'
                        className='mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500'
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name='phone'
                  validators={{
                    onChange: ({ value }) => {
                      const result = formSchema.shape.phone.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        htmlFor={field.name}
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Phone / WhatsApp Number{' '}
                        <span className='text-red-500'>*</span>
                      </Label>
                      <input
                        id={field.name}
                        name={field.name}
                        type='tel'
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder='+1 (555) 123-4567'
                        className='mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500'
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>
              </div>
            </motion.div>

            <Separator className='my-8' />

            {/* Academic Context */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className='mb-8'
            >
              <h2
                className='text-xl font-bold mb-6'
                style={{ color: '#1F2937' }}
              >
                Academic Context
              </h2>

              <div className='space-y-6'>
                <form.Field
                  name='curriculum'
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        formSchema.shape.curriculum.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        htmlFor={field.name}
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Curriculum or Programmes Offered{' '}
                        <span className='text-red-500'>*</span>
                      </Label>
                      <p className='text-sm text-gray-600 mt-1 mb-2'>
                        For example: WAEC, NECO, IGCSE, Cambridge, A-Levels, IB,
                        Undergraduate, Postgraduate
                      </p>
                      <Textarea
                        id={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder='Describe your curriculum or programmes...'
                        rows={10}
                        className='mt-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 resize-none'
                      />
                      <p className='text-xs text-gray-500 mt-1 text-end'>
                        {field.state.value.length}/1000 characters
                      </p>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name='studentCount'
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        formSchema.shape.studentCount.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Approximate Number of Students{' '}
                        <span className='text-red-500'>*</span>
                      </Label>
                      <RadioGroup
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        className='mt-2 space-y-3'
                      >
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='under-50' id='under-50' />
                          <Label
                            htmlFor='under-50'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Under 50
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='50-100' id='50-100' />
                          <Label
                            htmlFor='50-100'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            50 - 100
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='100-500' id='100-500' />
                          <Label
                            htmlFor='100-500'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            100 - 500
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='500-1000' id='500-1000' />
                          <Label
                            htmlFor='500-1000'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            500 - 1,000
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='1000+' id='1000+' />
                          <Label
                            htmlFor='1000+'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            1,000+
                          </Label>
                        </div>
                      </RadioGroup>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>
              </div>
            </motion.div>

            {/* Interest & Intent */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className='mb-8'
            >
              <h2
                className='text-xl font-bold mb-3'
                style={{ color: '#1F2937' }}
              >
                Interest & Intent
              </h2>
              <Separator className='mt-4 mb-8' />

              <div className='space-y-6'>
                <form.Field
                  name='interest'
                  validators={{
                    onChange: ({ value }) => {
                      const result = formSchema.shape.interest.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold mb-3'
                      >
                        What best describes your interest in Lextorah AI?{' '}
                        <span className='text-red-500'>*</span>
                      </Label>
                      <RadioGroup
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        className='mt-2 space-y-3'
                      >
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='exploring-options'
                            id='exploring-options'
                          />
                          <Label
                            htmlFor='exploring-options'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Exploring options
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='planning-pilot-programme'
                            id='planning-pilot-programme'
                          />
                          <Label
                            htmlFor='planning-pilot-programme'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Planning a pilot programme
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='considering-full-rollout'
                            id='considering-full-rollout'
                          />
                          <Label
                            htmlFor='considering-full-rollout'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Considering full institutional adoption
                          </Label>
                        </div>
                      </RadioGroup>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name='startDate'
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        formSchema.shape.startDate.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <Label
                        style={{ color: '#374151', fontSize: '14px' }}
                        className='font-bold'
                      >
                        Preferred Next Step{' '}
                        <span className='text-red-500'>*</span>
                      </Label>
                      <RadioGroup
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        className='mt-2 space-y-3'
                      >
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='immediately'
                            id='immediately'
                          />
                          <Label
                            htmlFor='immediately'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Download Starter Pack only
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='next-3-months'
                            id='next-3-months'
                          />
                          <Label
                            htmlFor='next-3-months'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Request a short demo
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='next-6-months'
                            id='next-6-months'
                          />
                          <Label
                            htmlFor='next-6-months'
                            style={{ color: '#374151', fontSize: '14px' }}
                          >
                            Speak with an academic advisor
                          </Label>
                        </div>
                      </RadioGroup>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>
              </div>
            </motion.div>

            {/* Consent & Access */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className='mb-8'
            >
              <h2
                className='text-xl font-bold mb-3'
                style={{ color: '#1F2937' }}
              >
                Consent & Access
              </h2>
              <Separator className='mt-4 mb-8' />

              <div className='space-y-4'>
                <form.Field
                  name='consent'
                  validators={{
                    onChange: ({ value }) => {
                      const result = formSchema.shape.consent.safeParse(value);
                      return !result.success
                        ? result.error.issues[0]?.message
                        : undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <div className='flex items-start space-x-3'>
                        <Checkbox
                          id={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) => {
                            if (typeof checked === 'boolean') {
                              field.handleChange(checked);
                            }
                          }}
                          className='mt-0.5 size-5'
                        />
                        <Label
                          htmlFor={field.name}
                          className='text-sm leading-6'
                          style={{ color: '#374151', fontSize: '14px' }}
                        >
                          I confirm that I represent the institution named above{' '}
                          <span className='text-red-500'>*</span>
                        </Label>
                      </div>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className='text-red-600 text-sm mt-1'>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field name='marketing'>
                  {(field) => (
                    <div className='flex items-start space-x-3'>
                      <Checkbox
                        id={field.name}
                        checked={field.state.value}
                        onCheckedChange={(checked) => {
                          if (typeof checked === 'boolean') {
                            field.handleChange(checked);
                          }
                        }}
                        className='mt-0.5 size-5'
                      />
                      <Label
                        htmlFor={field.name}
                        className='text-sm leading-6'
                        style={{ color: '#374151', fontSize: '14px' }}
                      >
                        I agree to be contacted by Lextorah regarding this
                        request
                      </Label>
                    </div>
                  )}
                </form.Field>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className='pt-6'
            >
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type='submit'
                      disabled={!canSubmit || isSubmitting}
                      className='max-w-xs mx-auto  bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 flex rounded-lg h-14 px-10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl'
                    >
                      {isSubmitting ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className='flex items-center justify-center space-x-2'
                        >
                          <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                          <span>Processing...</span>
                        </motion.div>
                      ) : (
                        'Access Starter Pack'
                      )}
                    </Button>
                  </motion.div>
                )}
              </form.Subscribe>
            </motion.div>
          </form>
        </motion.div>

        {/* What Happens Next Section - Outside form container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className='mt-8 p-6 bg-gray-50 rounded-lg border border-[#E5E7EB]'
        >
          <h3
            className='text-lg font-semibold mb-4'
            style={{ color: '#1F2937' }}
          >
            What Happens Next
          </h3>
          <ul className='space-y-3 text-[13px]' style={{ color: '#374151' }}>
            <li className='flex items-start'>
              <span className='text-teal-600 mr-2'>
                <Check />
              </span>
              You will receive an email with a secure link to download the
              Starter Pack.
            </li>
            <li className='flex items-start'>
              <span className='text-teal-600 mr-2'>
                <Check />
              </span>
              A Lextorah representative may reach out if you request a demo or
              conversation.
            </li>
            <li className='flex items-start'>
              <span className='text-teal-600 mr-2'>
                <Check />
              </span>
              Your information will be handled confidentially and used only for
              institutional engagement.
            </li>
          </ul>{' '}
          <Separator className='my-8' />
          <p className='mt-4 text-xs text-gray-600 leading-relaxed'>
            Lextorah AI works with institutions through structured academic
            partnerships. This form helps ensure the right information is shared
            with the right decision-makers.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StarterPackAccessRequest;

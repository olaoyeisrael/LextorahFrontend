import { useState } from 'react';

import {
  BookOpen,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight
} from 'lucide-react';

interface FormData {
  institutionName: string;
  institutionType: string[];
  country: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  demoFocus: string[];
  learnerScale: string;
  demoFormat: string;
  consent: boolean;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    institutionName: '',
    institutionType: [],
    country: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    demoFocus: [],
    learnerScale: '',
    demoFormat: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCheckboxChange = (field: 'institutionType' | 'demoFocus', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // const { error } = await supabase.from('demo_bookings').insert({
      //   institution_name: formData.institutionName,
      //   institution_type: formData.institutionType,
      //   country: formData.country,
      //   full_name: formData.fullName,
      //   email: formData.email,
      //   phone_number: formData.phoneNumber,
      //   demo_focus: formData.demoFocus,
      //   learner_scale: formData.learnerScale,
      //   demo_format: formData.demoFormat,
      //   consent: formData.consent,
      // });

      // if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        institutionName: '',
        institutionType: [],
        country: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        demoFocus: [],
        learnerScale: '',
        demoFormat: '',
        consent: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-30">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-2xl mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Demo</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Institutional Demo Request
          </p>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl mx-auto">
            Request a quick demo of Ms. Lexi, Lextorah's AI tutoring platform for learner support,
            personalised learning, and academic performance.
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-6 bg-teal-50 border border-teal-200 text-teal-800 px-4 py-3 rounded-lg">
            Thank you! Your demo request has been submitted successfully.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            There was an error submitting your request. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-cyan-100 rounded-lg">
                <span className="text-cyan-600 font-semibold">1</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Institution</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  placeholder="Enter institution name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Institution Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['School', 'College/University', 'Training Centre', 'Organization', 'Other'].map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.institutionType.includes(type)}
                        onChange={() => handleCheckboxChange('institutionType', type)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Enter country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-cyan-100 rounded-lg">
                <span className="text-cyan-600 font-semibold">2</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Contact Person</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you.email@institution.edu"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-lg">
                <span className="text-teal-600 font-semibold">3</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Demo Focus</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select all that apply
              </label>
              <div className="space-y-3">
                {[
                  'AI Tutoring for Learners',
                  'Exam & Academic Support',
                  'Tutor / Teacher Augmentation',
                  'Learning Analytics'
                ].map((focus) => (
                  <label key={focus} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.demoFocus.includes(focus)}
                      onChange={() => handleCheckboxChange('demoFocus', focus)}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700">{focus}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-cyan-100 rounded-lg">
                <span className="text-cyan-600 font-semibold">4</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Learner Scale</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Approx. Number of Learners <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {['Under 100', '100-500', '500+'].map((scale) => (
                  <label key={scale} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="learnerScale"
                      required
                      value={scale}
                      checked={formData.learnerScale === scale}
                      onChange={(e) => setFormData({ ...formData, learnerScale: e.target.value })}
                      className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700">{scale}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-lg">
                <span className="text-teal-600 font-semibold">5</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Preferred Demo Format</h2>
            </div>

            <div className="space-y-3">
              {['Online', 'In-person (where available)'].map((format) => (
                <label key={format} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="demoFormat"
                    required
                    value={format}
                    checked={formData.demoFormat === format}
                    onChange={(e) => setFormData({ ...formData, demoFormat: e.target.value })}
                    className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">{format}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-lg">
                <span className="text-teal-600 font-semibold">6</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Consent</h2>
            </div>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 mt-0.5"
              />
              <span className="text-sm text-gray-700">
                I confirm that the information provided is accurate and consent to be contacted by Lextorah Education regarding
                this demo of Ms. Lexi.
              </span>
            </label>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-5 h-5" />
              <span>{isSubmitting ? 'Submitting...' : 'Book Demo'}</span>
            </button>
          </div>
        </form>
      </main>

     
    </div>
  );
}

export default App;

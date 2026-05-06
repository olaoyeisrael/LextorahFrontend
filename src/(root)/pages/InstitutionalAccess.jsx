import React from 'react';
import RequestAccessForm from '../../components/sections/RequestAccessForm/RequestAccessForm';
import { requestAccessData } from '../../data/accessData';

function InstitutionalAccess() {
  return (
    <div className="min-h-screen bg-white pb-20 pt-9">
      {/* Hero Banner matching the mockup */}
      <div className="bg-[#0b8d7c] py-16 px-4 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{requestAccessData.hero.title}</h1>
        <p className="text-sm md:text-base opacity-90 max-w-2xl mx-auto">{requestAccessData.hero.subtitle}</p>
      </div>
      
      {/* Form Section */}
      <RequestAccessForm 
        sections={requestAccessData.form.sections} 
        submitButton={requestAccessData.form.submitButton} 
      />
    </div>
  );
}

export default InstitutionalAccess;
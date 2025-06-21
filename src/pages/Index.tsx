
import React from 'react';
import HeroSection from '../components/HeroSection';
import CompanyInfo from '../components/CompanyInfo';
import RegistrationForm from '../components/RegistrationForm';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CompanyInfo />
      <RegistrationForm />
      <Footer />
    </div>
  );
};

export default Index;

import React from "react";
import HeroSection from "../components/HeroSection";
import CompanyInfo from "../components/CompanyInfo";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CompanyInfo />
      {/* RegistrationForm 제거됨 */}
      <Footer />
    </div>
  );
};

export default Index;

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const careers = () => {
  return (
    <div className="font-sans">
      <Header />
      <main>
        <HeroSection
          title="Lock It Lending"
          highlight="Community Outreach"
          highlightColor="gold"
          description="See how Lock It Lending supports communities through disaster relief, volunteer programs, charitable giving, and social responsibility efforts across Texas and beyond."
          image={`${process.env.PUBLIC_URL}/social-outreach-page.jpg`}
        />
      </main>
      <Footer />
    </div>
  );
};

export default careers;

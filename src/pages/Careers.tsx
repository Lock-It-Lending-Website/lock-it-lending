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
          title="Careers That Make an"
          highlight="Impact"
          highlightColor="gold"
          description="Join Lock It Lending and build a meaningful career in the mortgage industry. We're hiring professionals who are passionate about helping others, driving innovation, and growing with a purpose-driven team."
          image={`${process.env.PUBLIC_URL}/careers-page.jpg`}
        />
      </main>
      <Footer />
    </div>
  );
};

export default careers;

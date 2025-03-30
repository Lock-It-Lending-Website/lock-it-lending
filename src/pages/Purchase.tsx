import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const Purchase: React.FC = () => {
  return (
    <div className="home-page font-sans">
      <Header />

      <main className="main-content">
        <HeroSection
          title="Shop For Your New Home"
          highlight="With Confidence"
          description="Whether you are looking for your first home, your forever home, an investment property or a second home, we have all the options for you. Our client-first mentality puts the power in your hands."
          image={`${process.env.PUBLIC_URL}/Lock-It-Lending-buy-a-home.png`}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Purchase;
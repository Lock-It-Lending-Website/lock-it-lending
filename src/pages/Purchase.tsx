import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="home-page font-sans">
      <Header />

      <main className="main-content">
        <section id="hero" className="bg-white py-24 px-4">
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-5xl font-extrabold leading-tight mb-4 text-black">
                Shop For Your New Home <br />
                <span className="text-gold">With Confidence</span>
              </h1>
              <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0">
                Whether you are looking for your first home, your forever home, an investment
                property or a second home, we have all the options for you. Our client-first
                mentality puts the power in your hands.
              </p>
            </div>
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <img src="/hero.jpg" alt="Happy homeowners" className="w-full rounded-lg shadow-md" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const Home: React.FC = () => {
  return (
    <div className="home-page font-sans">
      <Header />

      <main className="main-content">
        <HeroSection
          title="Welcome to"
          highlight="Lock It Lending"
          description="Offering industry-leading expertise and aggressive pricing, ensuring the best solution for home buyers before the need ever arises"
          image={`${process.env.PUBLIC_URL}/banner-952x952px.jpg`}
          buttons={
            <>
              <Link
                to="/purchase"
                className="bg-gold text-white font-semibold px-5 py-2 rounded-full shadow"
              >
                Purchase
              </Link>
              <Link
                to="/refinance"
                className="border border-gold text-gold font-semibold px-5 py-2 rounded-full shadow"
              >
                Refinance
              </Link>
            </>
          }
        />

        {/* Reviews Section */}
        <section className="bg-gray-50 py-24 px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-2">Unlocking Homeownership Happiness</h2>
            <p className="text-lg text-gray-600 mb-6 font-semibold">
              Learn from Our reviews how lock it lending transformed lives with tailored mortgage
              solutions
            </p>
            <div className="flex justify-center items-center gap-2 mb-8">
              <span className="text-2xl">⭐⭐⭐⭐⭐</span>
              <span className="text-lg font-bold">457 Google Reviews</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-700 font-semibold mb-6">
                  I’d like to thank Ann and Ella who have been involved in the process of getting me
                  into my new home. This has been a seamless, pleasant and positive experience which
                  I attribute to the very professional team.
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gold">Bill</p>
                  <p className="text-sm text-gray-500">May 11, 2024</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-700 font-semibold mb-6">
                  My husband and I are first time home buyer and we had the pleasure of working with
                  Tiana, Lyn and Oliver. They are very professional, attentive and knowledgeable...
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gold">Thi</p>
                  <p className="text-sm text-gray-500">April 19, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-white py-24 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2">
              <img
                src={`${process.env.PUBLIC_URL}/Lock-It-Lending-Home1-1.jpg`}
                alt="Modern house"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-10 text-center md:text-left">
              <h2 className="text-3xl font-extrabold mb-4">Want to work with Lock It Lending</h2>
              <p className="text-gray-700 mb-6">
                If you’re either Purchasing or refinancing, have the confidence to know you are
                working with the right team. Click Apply to sign up...
              </p>
              <a
                href="/"
                className="inline-block bg-gold text-white px-6 py-2 rounded-full font-semibold shadow hover:opacity-90"
              >
                Apply ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

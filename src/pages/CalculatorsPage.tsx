import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CalculatorsPage() {
  return (
    <>
      <div className="bg-gray-50 font-sans min-h-screen">
        <Header />
        <main>
          <HeroSection
            title="Break Down Your"
            highlight="Mortgage Payment"
            highlightColor="gold"
            description="Estimate your monthly mortgage payments based on your purchase price, down payment, interest rate, and more."
            image="/loancalculator.jpg"
          />
          <section className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 py-20 md:py-28">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-10">
                Calculators & Tools
              </h2>
              <p className="text-center text-gray-600 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto my-12">
                Whether you're buying, refinancing, or tapping into the equity of your home, we've
                got you covered
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 my-10 sm:my-16">
              <Link
                to="/loan-calculator"
                className="w-full sm:w-auto text-center bg-[#cca249] text-white text-lg px-6 py-3 rounded-md font-semibold hover:opacity-90 transition duration-300"
              >
                Mortgage Calculator
              </Link>
              <Link
                to="/affordability-calculator"
                className="w-full sm:w-auto text-center bg-[#cca249] text-white text-lg px-6 py-3 rounded-md font-semibold hover:opacity-90 transition duration-300"
              >
                Affordability Calculator
              </Link>
            </div>
          </section>
          <h2 className="text-4xl text-center font-bold mb-10">Explore Your Options</h2>;
          <section className="max-w-6xl mx-auto px-6 py-24">
            <div className="space-y-20">
              {/* Purchasing a Home */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Purchasing a Home</h3>
                  <p className="text-gray-600 mt-2">
                    Get started with our resources for first-time homebuyers and experienced buyers
                    alike.
                  </p>
                  <Link to="/purchase">
                    <button className="bg-[#cca249] text-white text-lg px-6 py-3 rounded-md font-semibold mt-4 hover:opacity-90 transition duration-300">
                      Learn More
                    </button>
                  </Link>
                </div>

                {/* Image */}
                <img
                  src="/calculator-page/purchasing-a-home.jpg"
                  alt="Modern home exterior"
                  className="w-full md:w-64 h-40 object-cover rounded-md"
                />
              </div>

              {/* Loan Glossary */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Loan Glossary</h3>
                  <p className="text-gray-600 mt-2">
                    Understand common loan terms and concepts with our comprehensive glossary.
                  </p>
                  <Link to="/glossary">
                    <button className="bg-[#cca249] text-white text-lg px-6 py-3 rounded-md font-semibold mt-4 hover:opacity-90 transition duration-300">
                      View Glossary
                    </button>
                  </Link>
                </div>

                <img
                  src="/calculator-page/loan-glossary.jpg"
                  alt="Open book with graphs"
                  className="w-full md:w-64 h-40 object-cover rounded-md"
                />
              </div>

              {/* Work with Loan Officers */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Work with Loan Officers</h3>
                  <p className="text-gray-600 mt-2">
                    Connect with our experienced loan officers to find the best loan for your needs.
                  </p>
                  <Link to="/meet-lock-it-lending">
                    <button className="bg-[#cca249] text-white text-lg px-6 py-3 rounded-md font-semibold mt-4 hover:opacity-90 transition duration-300">
                      Find a Loan Officer
                    </button>
                  </Link>
                </div>

                <img
                  src="/calculator-page/loan-officer.jpg"
                  alt="Desk with lamp"
                  className="w-full md:w-64 h-40 object-cover rounded-md"
                />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

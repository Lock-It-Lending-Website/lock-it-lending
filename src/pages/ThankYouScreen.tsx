import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
        <section className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gold mb-6">
            THANK YOU FOR SUBMITTING YOUR QUOTE!
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 mb-4">
            <span role="img" aria-label="bell" className="mr-1">🔔</span>
            <strong className="text-gray-900">Stay tuned for a confirmation call from our mortgage team!</strong>
          </p>
          <p className="text-base sm:text-lg text-gray-700 mb-10">
            Once confirmed, your guaranteed written rate quote will be delivered within 1 hour.
          </p>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-lg space-y-6 max-w-4xl mx-auto text-left">
          <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
            At <span className="font-bold text-yellow-700">Lock It Lending</span>, we are committed to delivering a seamless and transparent mortgage experience. We don’t just provide a rate quote; we meticulously calculate your closing fees, recording costs, taxes, and title insurance, delivering everything to you in writing for clarity and peace of mind.
          </p>

          <p className="text-lg font-semibold text-gray-900 pt-2">
            Clear Quotes. Honest Terms. Lock It With Confidence.
          </p>

          <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
            We take pride in offering a better, more transparent service than the typical online rate calculators. Instead of leaving you guessing, we provide a clear, accurate breakdown of your full mortgage details, ensuring complete transparency from start to finish. You’ll receive everything in writing, including all associated costs — no surprises, just honest terms you can trust.
          </p>

          <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
            We proudly serve clients across 40+ states, and we take pride in making the process smooth and stress-free. No need to fumble with online calculators or guess at numbers — we do all the work for you.
          </p>
        </section>

        <div className="mt-12 text-center">
          <Link to="/" className="text-gold font-bold text-lg hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ThankYou: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow text-gray-800 px-4 py-12 md:px-8 lg:px-24 flex flex-col items-center">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thank You For Submitting Your Quote!
          </h1>
          <p className="text-yellow-600 font-medium text-base md:text-lg flex items-center justify-center gap-2">
            <span role="img" aria-label="bell">🔔</span>
            Stay tuned for a confirmation call from our mortgage team!
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 md:p-8 mt-8 max-w-3xl w-full text-base md:text-lg leading-relaxed">
          <p>
            Once confirmed, your guaranteed written rate quote will be delivered within 1 hour.
          </p>
          <br />
          <p>
            At Lock It Lending, we are committed to delivering a seamless and transparent mortgage experience.
            We don’t just provide a rate quote; we meticulously calculate your closing fees, recording costs, taxes,
            and title insurance, delivering everything to you in writing for clarity and peace of mind.
          </p>
          <br />
          <p className="font-semibold text-gray-900">
            Clear Quotes. Honest Terms. Lock It With Confidence.
          </p>
          <br />
          <p>
            We take pride in offering a better, more transparent service than the typical online rate calculators.
            Instead of leaving you guessing, we provide a clear, accurate breakdown of your full mortgage details,
            ensuring complete transparency from start to finish. You’ll receive everything in writing, including all
            associated costs — no surprises, just honest terms you can trust.
          </p>
          <br />
          <p>
            We proudly serve clients across 40+ states, and we take pride in making the process smooth and
            stress-free. No need to fumble with online calculators or guess at numbers — we do all the work for you.
          </p>
        </div>

        <Link
          to="/"
          className="mt-6 text-yellow-600 font-semibold text-base md:text-lg hover:underline transition-all"
        >
          Back to Home →
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;

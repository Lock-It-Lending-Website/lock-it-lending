import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ThankYou: React.FC = () => {
  return (
    <div className="home-page font-sans bg-gray-50 min-h-screen">
      <Header />
      <main className="main-content py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gold mb-6">
          Thank You for Your Submission!
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          At <span className="font-bold text-yellow-700">Lock It Lending</span>, we guarantee you
          never have to worry about incorrect settlement service charges again. Our expert team will
          review your request and provide a guaranteed written rate quote within 15 minutes.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <p>
            Online calculators can often lead to inaccurate quotes due to user error or
            unaccounted-for situations. This can result in delays, confusion, and refund scenarios
            for borrowers. But with Lock It Lending, we get it right the first time.
          </p>

          <p>
            We offer a better way. Once we quote it — we honor it. No games, no surprises. You’ll
            get a complete, accurate quote based on your exact situation, all calculated and
            reviewed by our experienced loan professionals.
          </p>

          <p>
            We don’t just quote rates. We calculate your closing fees, recording costs, taxes, and
            title insurance — and we give it to you in writing.
          </p>

          <p className="font-semibold">
            Why suffer through unnecessary disclosures or last-minute changes? Get it right the
            first time with Lock It Lending.
          </p>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="inline-block text-gold font-bold hover:underline">
            Back to Home →
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;

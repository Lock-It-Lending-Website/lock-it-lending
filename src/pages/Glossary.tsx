import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { glossaryData } from '../data/glossaryData';
import { Link } from 'react-router-dom';

export default function GlossaryPage() {
  return (
    <div className="font-sans bg-[#f7fbfd]">
      <Header />

      <HeroSection
        title="Mortgage terms for our"
        highlight="neighbors"
        highlightColor="gold"
        description="We don't expect you to know everything related to mortgages, so we want to make it easier. We’ve broken down the most common terms to help you get ahead, with easy to understand definitions and videos."
        image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Mortgage-term.png`}
      />

      <section className="flex justify-center px-4 py-16">
        <div className="bg-white shadow-sm rounded-md w-full max-w-xl divide-y divide-gray-200">
          {glossaryData.map(({ term, slug }) => (
            <Link
              key={slug}
              to={`/glossary/${slug}`}
              className="flex justify-between items-center px-6 py-4 text-base font-bold text-gray-800 hover:text-gold transition-colors"
            >
              {term} <ArrowRight className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { glossaryData } from '../data/glossaryData';
import { Link } from 'react-router-dom';

export default function GlossaryPage() {
  return (
    <div className="font-sans">
      <Header />

      <HeroSection
        title="Mortgage terms for our"
        highlight="neighbors"
        description="We don't expect you to know everything related to mortgages, so we want to make it easier. We’ve broken down the most common terms to help you get ahead, with easy to understand definitions and videos."
        image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Mortgage-term.png`}
      />

      <section className="max-w-4xl mx-auto px-4 py-16 flex flex-col gap-4">
        {glossaryData.map(({ term, slug }) => (
          <Link
            key={slug}
            to={`/glossary/${slug}`}
            className="flex justify-between items-center text-lg font-medium text-gray-800 hover:text-gold transition-colors border-b pb-2"
          >
            {term} <ArrowRight className="w-4 h-4" />
          </Link>
        ))}
      </section>

      <Footer />
    </div>
  );
}

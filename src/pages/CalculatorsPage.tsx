import React from 'react';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function CalculatorsPage() {
  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Header />
      <main>
        <HeroSection
          title="Break Down Your"
          highlight="Home Loan Payment"
          highlightColor="gold"
          description="Estimate your monthly mortgage payments based on your purchase price, down payment, interest, and more."
          image="/loancalculator.jpg"
        />
        <section className="max-w-[1600px] mx-auto px-10 py-28">
          <div className="space-y-4">
            <h2 className="text-4xl text-center font-bold mb-4">Calculators and Tools</h2>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

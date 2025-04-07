import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 flex justify-between items-center h-16 md:h-20">
        {/* Logo */}
        <a href="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Lock It Lending"
            className="h-8 md:h-10 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-2 font-medium text-gray-800 text-sm">
          <a href="/purchase" className="hover:text-gold px-4 py-1.5 rounded-full">
            Purchase
          </a>
          <a href="/refinance" className="hover:text-gold px-4 py-1.5 rounded-full">
            Refinance
          </a>
          <a href="/loan-programs" className="hover:text-gold px-4 py-1.5 rounded-full">
            Loan Programs
          </a>
          <a href="/meet-lock-it-lending" className="hover:text-gold px-4 py-1.5 rounded-full">
            Meet Lock It Lending
          </a>
          <a href="/reviews" className="hover:text-gold px-4 py-1.5 rounded-full">
            Reviews
          </a>
          <a href="/glossary" className="hover:text-gold px-4 py-1.5 rounded-full">
            Mortgage Terms
          </a>
          <a href="/resources" className="hover:text-gold px-4 py-1.5 rounded-full">
            Resources
          </a>
          <a
            href="/rates"
            className="ml-2 bg-gold text-white px-4 py-1.5 rounded-full font-semibold hover:opacity-90 transition"
          >
            Rates
          </a>
        </nav>

        {/* Mobile toggle button */}
        <button className="md:hidden ml-auto" onClick={toggleMenu}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 font-semibold text-gray-700 text-sm">
          <a href="/purchase" className="block">
            Purchase
          </a>
          <a href="/refinance" className="block">
            Refinance
          </a>
          <a href="/loan-programs" className="block">
            Loan Programs
          </a>
          <a href="/meet-lock-it-lending" className="block">
            Meet Lock It Lending
          </a>
          <a href="/reviews" className="block">
            Reviews
          </a>
          <a href="/glossary" className="block">
            Mortgage Terms
          </a>
          <a href="/resources" className="block">
            Resources
          </a>
          <a
            href="/rates"
            className="block bg-gold text-white px-6 py-2 rounded-full text-center mt-2"
          >
            Rates
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;

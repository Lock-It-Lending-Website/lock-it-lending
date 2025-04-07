import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 flex justify-between items-center h-16 md:h-20">
        {/* Logo */}
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Lock It Lending"
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-2 font-medium text-gray-800 text-sm">
          <Link to="/purchase" className="hover:text-gold px-4 py-1.5 rounded-full">
            Purchase
          </Link>
          <Link to="/refinance" className="hover:text-gold px-4 py-1.5 rounded-full">
            Refinance
          </Link>
          <Link to="/loan-programs" className="hover:text-gold px-4 py-1.5 rounded-full">
            Loan Programs
          </Link>
          <Link to="/meet-lock-it-lending" className="hover:text-gold px-4 py-1.5 rounded-full">
            Meet Lock It Lending
          </Link>
          <Link to="/reviews" className="hover:text-gold px-4 py-1.5 rounded-full">
            Reviews
          </Link>
          <Link to="/glossary" className="hover:text-gold px-4 py-1.5 rounded-full">
            Mortgage Terms
          </Link>
          <Link to="/resources" className="hover:text-gold px-4 py-1.5 rounded-full">
            Resources
          </Link>
          <Link
            to="/rates"
            className="ml-2 bg-gold text-white px-4 py-1.5 rounded-full font-semibold hover:opacity-90 transition"
          >
            Rates
          </Link>
        </nav>

        {/* Mobile toggle button */}
        <button className="md:hidden ml-auto" onClick={toggleMenu}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 font-semibold text-gray-700 text-sm">
          <Link to="/purchase" className="block">
            Purchase
          </Link>
          <Link to="/refinance" className="block">
            Refinance
          </Link>
          <Link to="/loan-programs" className="block">
            Loan Programs
          </Link>
          <Link to="/meet-lock-it-lending" className="block">
            Meet Lock It Lending
          </Link>
          <Link to="/reviews" className="block">
            Reviews
          </Link>
          <Link to="/glossary" className="block">
            Mortgage Terms
          </Link>
          <Link to="/resources" className="block">
            Resources
          </Link>
          <Link
            to="/rates"
            className="block bg-gold text-white px-6 py-2 rounded-full text-center mt-2"
          >
            Rates
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

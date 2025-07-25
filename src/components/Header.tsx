import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Left - Logo */}
        <div className="shrink-0">
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/logo.svg`}
              alt="Lock It Lending"
              className="h-12 md:h-13 w-auto"
            />
          </Link>
        </div>

        {/* Center - Nav */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-4 font-bold text-gray-800 text-base">
          <Link to="/purchase" className="nav-link px-4 py-1.5 rounded-full">
            <span className="nav-link-text">Purchase</span>
          </Link>
          <Link to="/refinance" className="nav-link px-4 py-1.5 rounded-full">
            <span className="nav-link-text">Refinance</span>
          </Link>
          <Link to="/loan-programs" className="nav-link px-4 py-1.5 rounded-full">
            <span className="nav-link-text">Loan Programs</span>
          </Link>
          <div className="relative group flex flex-col items-center">
            <Link
              to="/meet-lock-it-lending"
              className="nav-link px-4 py-1.5 rounded-full font-bold text-gray-800 text-base"
            >
              <span className="nav-link-text">Meet Lock It Lending</span>
            </Link>

            <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white text-sm border-t border-gray-200 rounded-b shadow-md hidden group-hover:flex flex-col z-50 transition-all duration-200">
              <Link
                to="/careers"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-center"
              >
                Careers
              </Link>
              <Link
                to="/reviews"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-center"
              >
                Reviews
              </Link>
              <Link
                to="/social-outreach"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-center"
              >
                Social Outreach
              </Link>
            </div>
          </div>
          {/*<Link to="/meet-lock-it-lending" className="nav-link px-4 py-1.5 rounded-full">
            <span className="nav-link-text">Meet Lock It Lending</span>
          </Link>*/}
          <Link to="/calculators-page" className="nav-link px-4 py-1.5 rounded-full">
            <span className="nav-link-text">Calculators</span>
          </Link>
          <Link to="/glossary" className="nav-link px-4 py-1.5 rounded-full">
            <span className="nav-link-text">Mortgage Terms</span>
          </Link>
          <Link to="/resources" className="nav-link px-4 py-1.5 rounded-full">
            <span className="nav-link-text">Resources</span>
          </Link>
        </nav>

        {/* Right - Rates + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            to="/rates"
            className="hidden md:inline-block bg-gold text-white px-4 py-1.5 rounded-full font-bold hover:opacity-90 transition"
          >
            Rates
          </Link>
          <button className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 font-bold text-gray-700 text-sm">
          <Link to="/purchase" className="block">
            Purchase
          </Link>
          <Link to="/refinance" className="block">
            Refinance
          </Link>
          <Link to="/loan-programs" className="block">
            Loan Programs
          </Link>

          {/* Meet Lock It Lending - Link + Dropdown */}
          <div>
            <div className="flex items-center justify-between w-full py-1">
              {/* Clickable Link (entire left side) */}
              <Link to="/meet-lock-it-lending" className="flex-1">
                Meet Lock It Lending
              </Link>

              {/* Divider + Dropdown Arrow */}
              <div className="flex items-center gap-3">
                <div className="w-px h-5 bg-gray-400" />
                <button onClick={toggleSubMenu} aria-label="Toggle Submenu">
                  <svg
                    className={`w-4 h-4 text-[#cca249] transition-transform duration-300 ${
                      subMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {subMenuOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link to="/careers" className="block">
                  Careers
                </Link>
                <Link to="/reviews" className="block">
                  Reviews
                </Link>
                <Link to="/social-outreach" className="block">
                  Social Outreach
                </Link>
              </div>
            )}
          </div>

          <Link to="/calculators-page" className="block">
            Calculators
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

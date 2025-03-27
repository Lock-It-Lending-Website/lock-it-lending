import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Logo" className="h-10 w-auto" />
        </a>
        <nav className="hidden md:flex space-x-6 font-medium text-gray-800">
          <a href="/purchase" className="hover:text-gold">
            Purchase
          </a>
          <a href="/refinance" className="hover:text-gold">
            Refinance
          </a>
          <a href="/loan-programs" className="hover:text-gold">
            Loan Programs
          </a>
          <a href="/meet-lock-it-lending" className="hover:text-gold">
            Meet Lock It Lending
          </a>
          <a href="/reviews" className="hover:text-gold">
            Reviews
          </a>
          <a href="/mortgage-terms" className="hover:text-gold">
            Mortgage Terms
          </a>
          <a href="/resources" className="hover:text-gold">
            Resources
          </a>
          <a
            href="/rates"
            className="ml-4 bg-gold text-white px-4 py-2 rounded-full hover:opacity-90"
          >
            Rates
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 py-16">
        {/* First Row: 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* PRODUCTS */}
          <div>
            <h3 className="font-bold text-black text-lg mb-4">PRODUCTS</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link to="/purchase" className="hover:underline">
                  Purchase
                </Link>
              </li>
              <li>
                <Link to="/refinance" className="hover:underline">
                  Refinance
                </Link>
              </li>
              <li>
                <Link to="/purchase" className="hover:underline">
                  30 Year Fixed Rate
                </Link>
              </li>
              <li>
                <Link to="/loan-programs" className="hover:underline">
                  FHA Loans
                </Link>
              </li>
              <li>
                <Link to="/loan-programs" className="hover:underline">
                  15 Year Fixed Rate
                </Link>
              </li>
              <li>
                <Link to="/loan-programs" className="hover:underline">
                  USDA Loans
                </Link>
              </li>
              <li>
                <Link to="/loan-programs" className="hover:underline">
                  VA Loans
                </Link>
              </li>
              <li>
                <Link to="/loan-programs" className="hover:underline">
                  Adjustable Rate
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-bold text-black text-lg mb-4">ABOUT</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link to="/meet-lock-it-lending" className="hover:underline">
                  Meet The Family
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:underline">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="font-bold text-black text-lg mb-4">LEGAL</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link
                  to="https://www.nmlsconsumeraccess.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  License Information
                </Link>
              </li>
              <li>
                <Link to="/email-policy" className="hover:underline">
                  Email Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.nmlsconsumeraccess.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NMLS Consumer Access
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h3 className="font-bold text-black text-lg mb-4">CONTACT US</h3>
            <div className="space-y-2 text-base">
              <p className="font-semibold">Lock It Lending Houston (Team All Stars)</p>
              <p>10515 Bellaire Blvd ste Z, Houston Tx, 77042</p>
              <p>
                <a href="tel:+18664006789" className="text-gold hover:underline">
                  (866) 400-6789
                </a>
              </p>
              <p>
                <a href="mailto:info@lockitlending.com" className="text-gold hover:underline">
                  info@lockitlending.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Second Row: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* MORTGAGE TERMS */}
          <div>
            <h3 className="font-bold text-black text-lg mb-4">MORTGAGE TERMS</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link to="/glossary/annual-percentage-rate-apr" className="hover:underline">
                  Annual Percentage Rate (APR)
                </Link>
              </li>
              <li>
                <Link to="/glossary/balancing" className="hover:underline">
                  Balancing
                </Link>
              </li>
              <li>
                <Link to="/glossary/buying-agent" className="hover:underline">
                  Buying Agent
                </Link>
              </li>
              <li>
                <Link to="/glossary/closing-costs" className="hover:underline">
                  Closing Costs
                </Link>
              </li>
              <li>
                <Link to="/glossary/collateral" className="hover:underline">
                  Collateral
                </Link>
              </li>
              <li>
                <Link to="/glossary/comparable-sales" className="hover:underline">
                  Comparable Sales
                </Link>
              </li>
              <li>
                <Link to="/glossary/conforming-mortgage" className="hover:underline">
                  Conforming Mortgage
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="font-bold text-black text-lg mb-4">RESOURCES</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link
                  to="/resources/what-are-2-1-temporary-rate-buydowns"
                  className="hover:underline"
                >
                  What are 2-1 Temporary Rate Buydowns?
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/conventional-1-down-making-homeownership-more-accessible"
                  className="hover:underline"
                >
                  Conventional 1% Down: Making Homeownership More Accessible
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/be-aware-of-predatory-lending-practices"
                  className="hover:underline"
                >
                  Be Aware of Predatory Lending Practices
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-10 text-center">
          <div className="flex flex-col items-center justify-center gap-6 mb-4">
            <div className="flex gap-6 items-center">
              <img
                src={`${process.env.PUBLIC_URL}/ratings.png`}
                alt="BBB Accredited"
                className="h-10"
              />
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="Lock It Lending"
                className="h-10"
              />
            </div>
            <div className="flex gap-6 text-2xl text-gray-700">
              <Link
                to="https://www.facebook.com/lockitlending"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </Link>
              <Link
                to="https://www.instagram.com/lockitlending/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                to="https://www.linkedin.com/company/lockitlending/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </Link>
            </div>

            <p className="text-gray-600 text-lg">
              © 2024 Powered by <span className="font-bold text-black">Swift Home Loans Inc.</span>{' '}
              <Link
                to="https://www.nmlsconsumeraccess.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600"
              >
                NMLS #2075228
              </Link>
            </p>
            <p className="text-gray-600 text-lg">
              Lock it Lending is an approved trade name of Swift Home Loans, Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

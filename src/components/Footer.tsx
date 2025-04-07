import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* First Row: 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* PRODUCTS */}
          <div>
            <h3 className="font-bold text-black mb-4">PRODUCTS</h3>
            <ul className="space-y-2">
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
            <h3 className="font-bold text-black mb-4">ABOUT</h3>
            <ul className="space-y-2">
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
            <h3 className="font-bold text-black mb-4">LEGAL</h3>
            <ul className="space-y-2">
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
            <h3 className="font-bold text-black mb-4">CONTACT US</h3>
            <div className="mb-4">
              <p className="font-semibold">Lock It Lending Dallas (Team Apex)</p>
              <p>3901 W Walnut St, Garland Tx, 75042</p>
              <p>(888) 870-5625</p>
              <p>teamapex@lockitlending.com</p>
            </div>
            <div>
              <p className="font-semibold">Lock It Lending Houston (Team All Stars)</p>
              <p>10515 Bellaire Blvd ste Z, Houston Tx, 77042</p>
              <p>(866) 400-6789</p>
              <p>info@lockitlending.com</p>
            </div>
          </div>
        </div>

        {/* Second Row: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* MORTGAGE TERMS */}
          <div>
            <h3 className="font-bold text-black mb-4">MORTGAGE TERMS</h3>
            <ul className="space-y-2">
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
            <h3 className="font-bold text-black mb-4">RESOURCES</h3>
            <ul className="space-y-2">
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
        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logos */}
          <div className="flex items-center gap-4">
            <img
              src={`${process.env.PUBLIC_URL}/ratings.png`}
              alt="BBB Accredited"
              className="h-8"
            />
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Lock It Lending" className="h-8" />
          </div>

          {/* Center: Social Icons */}
          <div className="flex gap-4 text-lg text-gray-700">
            <Link
              to="https://www.facebook.com/lockitlending"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
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
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right text-xs text-gray-600">
            © 2024 Powered by{' '}
            <span className="font-semibold text-black">Swift Home Loans Inc.</span>
            <br />
            <Link
              to="https://www.nmlsconsumeraccess.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              NMLS #2075228
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

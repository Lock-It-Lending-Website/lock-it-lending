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
              <li>
                <Link to="/socialoutreach" className="hover:underline">
                  Social Outreach
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:underline">
                  Careers
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
              <p className="font-semibold">Lock It Lending Houston</p>
              <p>10515 Bellaire Blvd Ste Z, Houston, TX 77072</p>
              <p>
                <a href="tel:+18664006789" className="text-gold hover:underline">
                  (866) 400-6789
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@lockitlending.com"
                  className="text-gold hover:underline break-all"
                >
                  info@lockitlending.com
                </a>
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/lockitlendingstars/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#cca249] transition-colors duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-6 h-6 fill-current"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/lockitlending/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#cca249] transition-colors duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-7 h-7 fill-current"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@lockitlendinghouston"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#cca249] transition-colors duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-6 h-6 fill-current"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
                  to="/resources/5%-down-payment-assistance-program-review"
                  className="hover:underline"
                >
                  5% Down Payment Assistance Program Review
                </Link>
              </li>
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
                  to="/resources/Unlock-Homeownership-with-Lock-It-Lendings-1-percent-Down-Program"
                  className="hover:underline"
                >
                  Unlock Homeownership with Lock It Lending's 1% Down Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-bold text-black text-lg mb-4">CALCULATORS</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link to="/loan-calculator" className="hover:underline">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link to="/affordability-calculator" className="hover:underline">
                  Affordability Calculator
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
                src={`${process.env.PUBLIC_URL}/logo.svg`}
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

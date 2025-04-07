import React from 'react';

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
                <a href="/purchase" className="hover:underline">
                  Purchase
                </a>
              </li>
              <li>
                <a href="/refinance" className="hover:underline">
                  Refinance
                </a>
              </li>
              <li>
                <a href="/purchase" className="hover:underline">
                  30 Year Fixed Rate
                </a>
              </li>
              <li>
                <a href="/loan-programs" className="hover:underline">
                  FHA Loans
                </a>
              </li>
              <li>
                <a href="/loan-programs" className="hover:underline">
                  15 Year Fixed Rate
                </a>
              </li>
              <li>
                <a href="/loan-programs" className="hover:underline">
                  USDA Loans
                </a>
              </li>
              <li>
                <a href="/loan-programs" className="hover:underline">
                  VA Loans
                </a>
              </li>
              <li>
                <a href="/loan-programs" className="hover:underline">
                  Adjustable Rate
                </a>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-bold text-black mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li>
                <a href="/meet-lock-it-lending" className="hover:underline">
                  Meet The Family
                </a>
              </li>
              <li>
                <a href="/reviews" className="hover:underline">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="font-bold text-black mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.nmlsconsumeraccess.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  License Information
                </a>
              </li>
              <li>
                <a href="/email-policy" className="hover:underline">
                  Email Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-use" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.nmlsconsumeraccess.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NMLS Consumer Access
                </a>
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
                <a href="/glossary/annual-percentage-rate-apr" className="hover:underline">
                  Annual Percentage Rate (APR)
                </a>
              </li>
              <li>
                <a href="/glossary/balancing" className="hover:underline">
                  Balancing
                </a>
              </li>
              <li>
                <a href="/glossary/buying-agent" className="hover:underline">
                  Buying Agent
                </a>
              </li>
              <li>
                <a href="/glossary/closing-costs" className="hover:underline">
                  Closing Costs
                </a>
              </li>
              <li>
                <a href="/glossary/collateral" className="hover:underline">
                  Collateral
                </a>
              </li>
              <li>
                <a href="/glossary/comparable-sales" className="hover:underline">
                  Comparable Sales
                </a>
              </li>
              <li>
                <a href="/glossary/conforming-mortgage" className="hover:underline">
                  Conforming Mortgage
                </a>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="font-bold text-black mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/resources/what-are-2-1-temporary-rate-buydowns"
                  className="hover:underline"
                >
                  What are 2-1 Temporary Rate Buydowns?
                </a>
              </li>
              <li>
                <a
                  href="/resources/conventional-1-down-making-homeownership-more-accessible"
                  className="hover:underline"
                >
                  Conventional 1% Down: Making Homeownership More Accessible
                </a>
              </li>
              <li>
                <a
                  href="/resources/be-aware-of-predatory-lending-practices"
                  className="hover:underline"
                >
                  Be Aware of Predatory Lending Practices
                </a>
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
            <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Lock It Lending" className="h-8" />
          </div>

          {/* Center: Social Icons */}
          <div className="flex gap-4 text-lg text-gray-700">
            <a
              href="https://www.facebook.com/lockitlending"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/lockitlending/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/lockitlending/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right text-xs text-gray-600">
            © 2024 Powered by{' '}
            <span className="font-semibold text-black">Swift Home Loans Inc.</span>
            <br />
            <a
              href="https://www.nmlsconsumeraccess.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              NMLS #2075228
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

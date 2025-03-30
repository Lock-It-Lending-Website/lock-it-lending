import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* First Row: 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* PRODUCTS */}
          <div>
            <h3 className="font-bold text-black mb-4">PRODUCTS ↗</h3>
            <ul className="space-y-2">
              <li>Purchase</li>
              <li>Refinance</li>
              <li>30 Year Fixed Rate</li>
              <li>FHA Loans</li>
              <li>15 Year Fixed Rate</li>
              <li>USDA Loans</li>
              <li>VA Loans</li>
              <li>Adjustable Rate</li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-bold text-black mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li>Meet The Family</li>
              <li>Reviews</li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="font-bold text-black mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li>License Information</li>
              <li>Email Policy</li>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>NMLS Consumer Access</li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h3 className="font-bold text-black mb-4">CONTACT US</h3>
            <div className="mb-4">
              <p className="font-semibold">Lock It Lending Dallas (Team Apex)</p>
              <p>3901 W Walnut St, Garland Tx, 75042</p>
              <p>📞 (888) 870-5625</p>
              <p>📧 teamapex@lockitlending.com</p>
            </div>
            <div>
              <p className="font-semibold">Lock It Lending Houston (Team All Stars)</p>
              <p>10515 Bellaire Blvd ste Z, Houston Tx, 77042</p>
              <p>📞 (866) 400-6789</p>
              <p>📧 info@lockitlending.com</p>
            </div>
          </div>
        </div>

        {/* Second Row: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* MORTGAGE TERMS */}
          <div>
            <h3 className="font-bold text-black mb-4">MORTGAGE TERMS ↗</h3>
            <ul className="space-y-2">
              <li>Annual Percentage Rate (APR)</li>
              <li>Balancing</li>
              <li>Buying Agent</li>
              <li>Closing Costs</li>
              <li>Collateral</li>
              <li>Comparable Sales</li>
              <li>Conforming Mortgage</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="font-bold text-black mb-4">RESOURCES ↗</h3>
            <ul className="space-y-2">
              <li>What are 2-1 Temporary Rate Buydowns?</li>
              <li>Conventional 1% Down: Making Homeownership More Accessible</li>
              <li>Be Aware of Predatory Lending Practices</li>
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
            <a href="/">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right text-xs text-gray-600">
            © 2024 Powered by{' '}
            <span className="font-semibold text-black">Swift Home Loans Inc.</span>
            <br />
            <a href="/" className="text-blue-600">
              NMLS #2075228
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
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

        {/* CONTACT */}
        <div>
          <h3 className="font-bold text-black mb-4">CONTACT US</h3>
          <p className="font-semibold">Lock It Lending Dallas (Team Apex)</p>
          <p>3901 W Walnut St, Garland Tx, 75042</p>
          <p>📞 (888) 870-5625</p>
          <p>📧 teamapex@lockitlending.com</p>
          <br />
          <p className="font-semibold">Lock It Lending Houston (Team All Stars)</p>
          <p>10515 Bellaire Blvd ste Z, Houston Tx, 77042</p>
          <p>📞 (866) 400-6789</p>
          <p>📧 info@lockitlending.com</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 text-center py-6 text-xs">
        <p>© 2025 Lockit Lending. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

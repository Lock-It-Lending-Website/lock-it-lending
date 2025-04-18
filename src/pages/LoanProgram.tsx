import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

function Accordion({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 font-semibold text-left"
      >
        {title}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <p className="pb-4 text-gray-600">{content}</p>}
    </div>
  );
}

export default function LoanPrograms() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, consent } = formData;
    if (!firstName || !lastName || !email || !phone || !consent) {
      alert('Please fill out all fields and agree to the consent checkbox.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'question' }),
      });

      if (response.ok) {
        navigate('/thank-you');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          consent: false,
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="font-sans">
      <Header />

      <main className="bg-white">
        <HeroSection
          title="What We"
          highlight="Offer"
          highlightColor="gold"
          description="It is important to find the program that matches your long term and short-term goals. Our team selects from a wide array of lenders to help find the best possible solution for you and your family. Check out some of our programs below."
          image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Loan-Programs.png`}
        />
        <section className="bg-gray-50 py-24 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
            {/* Accordion */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Accordion
                title="30 Year Fixed Rate"
                content="Be worry free with 30 years of security. This is the most common product for our first time homebuyers and our clients refinancing. Check to see if you qualify for 3 percent down on a new home purchase."
              />
              <Accordion
                title="15 Year Fixed Rate"
                content="With the lowest rates in the market, give yourself the opportunity to pay your house off in half the time."
              />
              <Accordion
                title="Adjustable Rate"
                content="For the times when long term interest rate security isn't a priority and you only need the guarantee of a lower rate for short time."
              />
              <Accordion
                title="FHA Loans"
                content="These are backed by the federal housing administration and give borrowers the potential to put 3.5 percent down while still obtaining competitive interest rates."
              />
              <Accordion
                title="VA Loans"
                content="These are designed for clients who are distinguished veterans, qualified service members and their spouses. This loan gives you the ability to put no money down on a purchase and to finance 100 percent on a refinance."
              />
              <Accordion
                title="USDA Loans"
                content="Be worry free with 30 years of security. This is the most common product for our first time homebuyers and our clients refinancing. Check to see if you qualify for 3 percent down on a new home purchase."
              />
              <Accordion
                title="Jumbo Loans"
                content="You may be out of conventional loan limits, we have a jumbo product where you can put 10 percent down and have no private mortgage insurance to get into your dream home."
              />
              <Accordion
                title="HELOC"
                content="Our home equity line of credit gives you the power to leverage your equity without all the fees."
              />
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Got Questions?</h2>
              <p className="text-center text-gray-600 mb-6">
                Let us help so that you can get one step closer to getting your home
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  placeholder="First Name"
                  className="w-full p-3 border rounded"
                  value={formData.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                />
                <input
                  placeholder="Last Name"
                  className="w-full p-3 border rounded"
                  value={formData.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                />
                <input
                  placeholder="lilwebsite@lockitlending.com"
                  className="w-full p-3 border rounded"
                  type="email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                />
                <input
                  placeholder="(866) 400-6789"
                  className="w-full p-3 border rounded"
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                />
                <div className="text-sm text-gray-600 flex gap-2 items-start">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={formData.consent}
                    onChange={e => handleChange('consent', e.target.checked)}
                  />
                  <p>
                    By pressing <strong>&quot;Submit&quot;</strong> you are agreeing to receive a
                    quote through the email provided and agreeing to Swift Home Loans Inc.&apos;s
                    Terms of Use, Privacy Policy, Email Policy, and provide consent to receive text
                    messages for important notifications. Message frequency varies. Message and data
                    rates may apply. You can opt-out at any time by replying &quot;STOP&quot;.
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-white py-3 rounded font-bold hover:opacity-90"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

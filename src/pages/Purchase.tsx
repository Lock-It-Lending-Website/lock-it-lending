import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import states from '../constants/states';
import { useNavigate } from 'react-router-dom';

import {
  Home,
  UserCheck,
  FileText,
  BadgeCheck,
  Building2,
  Goal,
  Languages,
  MessageCircleQuestion,
} from 'lucide-react';

const Purchase: React.FC = () => {
  const [formData, setFormData] = useState({
    firstTimeBuyer: '',
    militaryService: '',
    processStage: '',
    state: '',
    propertyType: '',
    occupancy: '',
    purchasePrice: '',
    downPayment: '',
    creditScore: '',
    hasAgent: '',
    preferredLanguage: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false,
  });

  const languageOptions = [
    { label: 'English', icon: <Languages /> },
    { label: 'Spanish', icon: <Languages /> },
    { label: 'Chinese', icon: <Languages /> },
    { label: 'Korean', icon: <Languages /> },
    { label: 'Tagalog', icon: <Languages /> },
    { label: 'Vietnamese', icon: <Languages /> },
    { label: 'Arabic', icon: <Languages /> },
    { label: 'Albanian', icon: <Languages /> },
    { label: 'Other', icon: <MessageCircleQuestion /> },
  ];

  const [submitted] = useState(false);
  type FormDataKey = keyof typeof formData;

  const handleChange = (field: FormDataKey, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof typeof formData)[] = [
      'firstTimeBuyer',
      'militaryService',
      'processStage',
      'state',
      'propertyType',
      'occupancy',
      'purchasePrice',
      'downPayment',
      'creditScore',
      'hasAgent',
      'preferredLanguage',
      'firstName',
      'lastName',
      'email',
      'phone',
    ];

    const missingFields = requiredFields.filter(
      field => formData[field] === '' || formData[field] === false
    );

    if (missingFields.length > 0) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    if (!formData.consent) {
      alert('Please agree to the communication policy before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'purchase' }),
      });

      if (response.ok) {
        navigate('/thank-you');
        setFormData({
          firstTimeBuyer: '',
          militaryService: '',
          processStage: '',
          state: '',
          propertyType: '',
          occupancy: '',
          purchasePrice: '',
          downPayment: '',
          creditScore: '',
          hasAgent: '',
          preferredLanguage: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          consent: false,
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const renderOption = (
    field: FormDataKey,
    value: string,
    label?: string,
    icon?: React.ReactNode
  ) => (
    <button
      key={value}
      type="button"
      onClick={() => handleChange(field, value)}
      className={`transition-all duration-200 px-4 py-3 rounded-xl border border-gray-300 w-full flex flex-col items-center text-center text-sm font-medium hover:border-yellow-600 hover:bg-yellow-50 ${formData[field] === value ? 'bg-yellow-100 border-yellow-600 shadow-md' : ''}`}
    >
      {icon && <div className="mb-1 text-yellow-600">{icon}</div>}
      <span>{label || value}</span>
    </button>
  );

  return (
    <div className="home-page font-sans bg-gray-50 min-h-screen">
      <Header />
      <main className="main-content">
        <HeroSection
          title="Shop For Your New Home"
          highlight="With Confidence"
          description="Whether you are looking for your first home, your forever home, an investment property or a second home, we have all the options for you. Our client-first mentality puts the power in your hands."
          image={`${process.env.PUBLIC_URL}/Lock-It-Lending-buy-a-home.png`}
        />

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto mt-10 px-6 pb-20">
          {!submitted ? (
            <div className="bg-white rounded-xl shadow-md border border-gray-300">
              <div className="p-8 border-b border-yellow-500">
                <h2 className="text-2xl font-bold text-gray-800">Purchase Qualification Form</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Fill out the information below so our loan experts can assist you better.
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Your first time buying?</p>
                  <div className="grid grid-cols-2 gap-4">
                    {renderOption('firstTimeBuyer', 'Yes', 'Yes', <Home />)}
                    {renderOption('firstTimeBuyer', 'No', 'No', <UserCheck />)}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Have you served with the military?</p>
                  <div className="grid grid-cols-2 gap-4">
                    {renderOption('militaryService', 'Yes', 'Yes', <BadgeCheck />)}
                    {renderOption('militaryService', 'No', 'No', <UserCheck />)}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Where are you in the process?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {renderOption('processStage', 'Just Researching', 'Just Researching', <Goal />)}
                    {renderOption(
                      'processStage',
                      'Buying In 2-6 Months',
                      'Buying In 2-6 Months',
                      <Home />
                    )}
                    {renderOption(
                      'processStage',
                      'Offer Pending / Found Property',
                      'Offer Pending / Found Property',
                      <FileText />
                    )}
                    {renderOption(
                      'processStage',
                      'Signed Purchase Agreement',
                      'Signed Purchase Agreement',
                      <FileText />
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Which state are you shopping in?</p>
                  <select
                    className="w-full border border-gray-300 rounded p-2 focus:ring-yellow-500"
                    value={formData.state}
                    onChange={e => handleChange('state', e.target.value)}
                  >
                    <option value="">Select option</option>
                    {states.map(state => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">What type of property?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {renderOption('propertyType', 'Single Family', 'Single Family', <Building2 />)}
                    {renderOption('propertyType', 'Multi Family', 'Multi Family', <Building2 />)}
                    {renderOption('propertyType', 'Condominium', 'Condominium', <Building2 />)}
                    {renderOption('propertyType', 'Townhouse', 'Townhouse', <Building2 />)}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Will this be your?</p>
                  <div className="grid grid-cols-3 gap-4">
                    {renderOption('occupancy', 'Primary Residence')}
                    {renderOption('occupancy', 'Secondary Home')}
                    {renderOption('occupancy', 'Investment Property')}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-lg font-semibold">What is the estimated purchase price?</p>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      className="w-full border rounded p-2 pl-7"
                      value={formData.purchasePrice}
                      onChange={e => handleChange('purchasePrice', e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-lg font-semibold">
                    Funds available for down payment, closing costs?
                  </p>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input
                      type="number"
                      className="w-full border rounded p-2 pl-7"
                      value={formData.downPayment}
                      onChange={e => handleChange('downPayment', e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Estimated credit score?</p>
                  <div className="grid grid-cols-3 gap-4">
                    {['740+', '700 - 739', '660 - 699', '600 - 659', 'Below 600'].map(opt =>
                      renderOption('creditScore', opt)
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">
                    Are you working with a real estate agent?
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {renderOption('hasAgent', 'Yes', 'Yes', <UserCheck />)}
                    {renderOption('hasAgent', 'No', 'No', <UserCheck />)}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Preferred Language</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {languageOptions.map(lang =>
                      renderOption('preferredLanguage', lang.label, lang.label, lang.icon)
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Contact Information</h2>
                  <p className="text-sm text-gray-600">
                    A loan officer will reach out to you shortly.
                  </p>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full border rounded p-2"
                    value={formData.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border rounded p-2"
                    value={formData.lastName}
                    onChange={e => handleChange('lastName', e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded p-2"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="(555) 555-5555"
                    className="w-full border rounded p-2"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                  />
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={e => handleChange('consent', e.target.checked)}
                    />
                    <p className="text-xs text-gray-600">
                      By pressing <strong>“Submit”</strong> you agree to receive phone calls, SMS
                      messages, and more in accordance with our policies.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="bg-yellow-600 text-white rounded-full px-6 py-2 hover:bg-yellow-700 mt-2"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow border space-y-4 text-center">
              <h2 className="text-2xl font-bold">Thank you!</h2>
              <p className="text-gray-700">
                We’ve received your information and will contact you shortly.
              </p>
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Purchase;

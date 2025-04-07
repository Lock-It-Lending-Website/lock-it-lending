import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import states from '../constants/states';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const yesNoIcons = {
  Yes: <ShieldCheck />,
  No: <ShieldOff />,
};

const RatesPage: React.FC = () => {
  const [formData, setFormData] = useState({
    state: '',
    firstTimeBuyer: '',
    residencyType: '',
    propertyType: '',
    homePrice: '',
    downPayment: '',
    creditScore: '',
    email: '',
  });

  type FormDataKey = keyof typeof formData;

  const handleChange = (field: FormDataKey, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof typeof formData)[] = [
      'state',
      'firstTimeBuyer',
      'residencyType',
      'propertyType',
      'homePrice',
      'downPayment',
      'creditScore',
      'email',
    ];

    const missingFields = requiredFields.filter(field => formData[field] === '');

    if (missingFields.length > 0) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'refinance' }),
      });

      if (response.ok) {
        navigate('/thank-you');
        setFormData({
          state: '',
          firstTimeBuyer: '',
          residencyType: '',
          propertyType: '',
          homePrice: '',
          downPayment: '',
          creditScore: '',
          email: '',
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('❌ Error:', err);
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
          title="Get your rate"
          highlight="without the call"
          description="Answer a few questions to help us understand your needs better."
          image={`${process.env.PUBLIC_URL}/form.png`}
        />

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto mt-10 px-6 pb-20">
          <div className="bg-white rounded-xl shadow-md border border-gray-300">
            <div className="p-8 border-b border-yellow-500">
              <h2 className="text-3xl font-extrabold text-gray-800">Refinance Form</h2>
              <p className="text-sm text-gray-500 mt-2">
                Just answer a few quick questions below, and we’ll match you with your best
                refinancing options.
              </p>
            </div>

            <div className="divide-y divide-gray-200">
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
                <p className="text-lg font-semibold mb-4">Are you a first time home-buyer?</p>
                <div className="grid grid-cols-2 gap-4">
                  {(['Yes', 'No'] as const).map(opt =>
                    renderOption('firstTimeBuyer', opt, opt, yesNoIcons[opt])
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">Will this be your...</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Primary Residence', 'Secondary Home', 'Investment Property'].map(opt =>
                    renderOption('residencyType', opt)
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">
                  What type of property are you looking at?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Single Family', 'Multi Family', 'Condominium', 'Townhouse'].map(opt =>
                    renderOption('propertyType', opt)
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-2">How much is the house?</p>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="text"
                    value={formData.homePrice}
                    onChange={e => handleChange('homePrice', e.target.value)}
                    className="w-full border border-gray-300 rounded pl-7 pr-3 py-2 focus:outline-none"
                    placeholder="100,000"
                  />
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-2">How much money are you putting down?</p>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="text"
                    value={formData.downPayment}
                    onChange={e => handleChange('downPayment', e.target.value)}
                    className="w-full border border-gray-300 rounded pl-7 pr-3 py-2 focus:outline-none"
                    placeholder="20,000"
                  />
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">Estimated credit score?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['740+', '700 - 739', '660 - 699', '600 - 659', 'Below 600'].map(opt =>
                    renderOption('creditScore', opt)
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-lg font-semibold">Email</p>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="ExampleEmail@gmail.com"
                  required
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="p-6">
                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:bg-yellow-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default RatesPage;

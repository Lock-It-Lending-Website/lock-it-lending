import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import states from '../constants/states';
import { useNavigate } from 'react-router-dom';

const RatesPage: React.FC = () => {
  const [formData, setFormData] = useState({
    goals: '',
    state: '',
    residencyType: '',
    propertyType: '',
    mortgageBalance: '',
    propertyValue: '',
    creditScore: '',
    keepYears: '',
    language: '',
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
      'goals',
      'state',
      'residencyType',
      'propertyType',
      'mortgageBalance',
      'propertyValue',
      'creditScore',
      'keepYears',
      'language',
      'email',
    ];

    const missingFields = requiredFields.filter(field => formData[field] === '');

    if (missingFields.length > 0) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    try {
      const response = await fetch('https://lock-it-lending.onrender.com/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'refinance' }),
      });

      if (response.ok) {
        navigate('/thank-you');
        setFormData({
          goals: '',
          state: '',
          residencyType: '',
          propertyType: '',
          mortgageBalance: '',
          propertyValue: '',
          creditScore: '',
          keepYears: '',
          language: '',
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
      onClick={() => handleChange(field, formData[field] === value ? '' : value)}
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
          title="Rate / Term Refinancing And"
          highlight="Cash Out"
          highlightColor="gold"
          description="If you are wondering about your mortgage loan and if you can get a better deal, you can remove all of the uncertainty in just a few moments by getting the facts from one of our loan experts."
          image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Refinance.png`}
        />
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto mt-10 px-6 pb-20">
          <div className="bg-white rounded-xl shadow-md border border-gray-300">
            <div className="p-8 border-b border-yellow-500">
              <h2 className="text-3xl font-extrabold text-gray-800">Refinance Form</h2>
              <p className="text-sm text-gray-500 mt-2">
                To ensure accuracy, a team member will contact you shortly to confirm your
                information. Once confirmed, we’ll provide your personalized and guaranteed written
                quote <strong>within 1 hour</strong>, including a detailed breakdown of loan costs,
                closing fees, taxes, and title insurance — tailored specifically to your situation.
                <br />
                We don’t believe in generic online calculators — we deliver clear, accurate, and
                fully transparent estimates, so you know exactly what to expect from start to
                finish.
                <br />
                Just answer a few quick questions below, and we’ll match you with your best
                refinancing options.
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              <div className="p-6">
                <p className="text-lg font-semibold mb-4">What are your goals?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Lower my payment', 'Take cash out', 'Shorter term'].map(opt =>
                    renderOption('goals', opt)
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
                <p className="text-lg font-semibold mb-4">How &apos;s this property used?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Primary Residence', 'Secondary Home', 'Investment Property'].map(opt =>
                    renderOption('residencyType', opt)
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">What type of property?</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Single Family', 'Multi Family', 'Condominium', 'Townhouse'].map(opt =>
                    renderOption('propertyType', opt)
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">Current mortgage balance?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    'Below 100K',
                    '100K – 174K',
                    '175K – 249K',
                    '250K – 349K',
                    '350K – 549K',
                    '550K – 999K',
                    '1M+',
                  ].map(opt => renderOption('mortgageBalance', opt))}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">Estimated value of your property?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    'Below 100K',
                    '100K – 174K',
                    '175K – 249K',
                    '250K – 349K',
                    '350K – 549K',
                    '550K – 999K',
                    '1M+',
                  ].map(opt => renderOption('propertyValue', opt))}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">Estimated credit score?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['740+', '700 – 739', '660 – 699', '600 – 659', 'Below 600'].map(opt =>
                    renderOption('creditScore', opt)
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">
                  How long do you plan on keeping the home?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Under a year', '1–2', '3–5', '6–9', '10+'].map(opt =>
                    renderOption('keepYears', opt)
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">What is your language preference?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    'English',
                    'Spanish',
                    'Chinese',
                    'Korean',
                    'Tagalog',
                    'Vietnamese',
                    'Arabic',
                    'Albanian',
                    'Other',
                  ].map(opt => renderOption('language', opt))}
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

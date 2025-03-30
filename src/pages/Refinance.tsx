import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import states from '../constants/states';
import {
  Home,
  UserX,
  UserCheck,
  MapPin,
  FileText,
  BadgeCheck,
  Building2,
  Goal,
  Languages,
  MessageCircleQuestion,
  ShieldCheck,
  ShieldOff
} from 'lucide-react';

const languageOptions = [
  { label: 'English', icon: <Languages /> },
  { label: 'Spanish', icon: <Languages /> },
  { label: 'Chinese', icon: <Languages /> },
  { label: 'Korean', icon: <Languages /> },
  { label: 'Tagalog', icon: <Languages /> },
  { label: 'Vietnamese', icon: <Languages /> },
  { label: 'Arabic', icon: <Languages /> },
  { label: 'Albanian', icon: <Languages /> },
  { label: 'Other', icon: <MessageCircleQuestion /> }
];

const yesNoIcons = {
  Yes: <ShieldCheck />,
  No: <ShieldOff />
};

const Refinance: React.FC = () => {
  const [formData, setFormData] = useState({
    state: '',
    occupancy: '',
    mortgageBalance: '',
    propertyValue: '',
    creditScore: '',
    retentionDuration: '',
    preferredLanguage: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false,
    goals: ''
  });

  const [submitted, setSubmitted] = useState(false);
  type FormDataKey = keyof typeof formData;

  const handleChange = (field: FormDataKey, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const renderOption = (field: FormDataKey, value: string, label?: string, icon?: React.ReactNode) => (
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
          title="Rate / Term Refinancing And"
          highlight="Cash Out"
          description="If you are wondering about your mortgage loan and if you can get a better deal, you can remove all of the uncertainty in just a few moments by getting the facts from one of our loan experts."
          image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Refinance.png`}
        />

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto mt-10 px-6 pb-20">
          {!submitted ? (
            <div className="bg-white rounded-xl shadow-md border border-gray-300">
              <div className="p-8 border-b border-yellow-500">
                <h2 className="text-3xl font-extrabold text-gray-800"> Refinance Application</h2>
                <p className="text-sm text-gray-500 mt-2">Tell us more to customize your refinance solution.</p>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">What are your goals?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Lower my payment', 'Take cash out', 'Shorter term'].map(opt => renderOption('goals', opt))}
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
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">How is this property used?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Primary Residence', 'Secondary Home', 'Investment Property'].map(opt => renderOption('occupancy', opt))}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Current mortgage balance?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {['Below 100K','100K - 174K','175K - 249K','250K - 349K','350K - 549K','550K - 999K','1M+'].map(opt => renderOption('mortgageBalance', opt))}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Estimated value of your property?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {['Below 100K','100K - 174K','175K - 249K','250K - 349K','350K - 549K','550K - 999K','1M+'].map(opt => renderOption('propertyValue', opt))}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Estimated credit score?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {['740+', '700 - 739', '660 - 699', '600 - 659', 'Below 600'].map(opt => renderOption('creditScore', opt))}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">How long do you plan on keeping the home?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {['Under a year', '1–2', '3–5', '6–9', '10+'].map(opt => renderOption('retentionDuration', opt))}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">Language preference</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {languageOptions.map(lang => renderOption('preferredLanguage', lang.label, lang.label, lang.icon))}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-lg font-semibold mb-4">Contact Info</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full border rounded p-2" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} />
                    <input type="text" placeholder="Last Name" className="w-full border rounded p-2" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} />
                  </div>
                  <input type="email" placeholder="Email" className="w-full border rounded p-2" value={formData.email} onChange={e => handleChange('email', e.target.value)} />
                  <input type="tel" placeholder="Phone Number" className="w-full border rounded p-2" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
                  <label className="flex items-start gap-2 text-sm text-gray-600">
                    <input type="checkbox" checked={formData.consent} onChange={e => handleChange('consent', e.target.checked)} />
                    I agree to receive communications per the privacy policy.
                  </label>
                </div>

                <div className="p-6">
                  <button type="submit" className="bg-yellow-600 text-white w-full py-3 rounded font-bold hover:bg-yellow-700">Submit</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow border space-y-4 text-center">
              <h2 className="text-2xl font-bold">Thank you!</h2>
              <p className="text-gray-700">We’ve received your information and will contact you shortly.</p>
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Refinance;

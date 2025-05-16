import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import states from '../constants/states';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { NumericFormat, PatternFormat } from 'react-number-format';

const yesNoIcons = {
  Yes: <ShieldCheck />,
  No: <ShieldOff />,
};

const RatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    borrowerName: '',
    state: '',
    zipcode: '',
    firstTimeBuyer: '',
    residencyType: '',
    propertyType: '',
    homePrice: '',
    downPayment: '',
    loanAmount: '',
    creditScore: '',
    email: '',
    phoneNumber: '',
    buydownType: '',
    loanType: '',
    prepaymentPenalty: '',
    loanPurpose: '',
    refinancePurpose: '',
    escrowWaiver: '',
    loanTerm: '',
    propertyValue: '',
    income: '',
    note: '',
  });

  type FormDataKey = keyof typeof formData;
  const formWithType = { ...formData, formType: 'rates' };

  const handleChange = (field: FormDataKey, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field] === value ? '' : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.borrowerName ||
      !formData.state ||
      !formData.loanPurpose ||
      !formData.creditScore ||
      !formData.email ||
      !formData.income ||
      !formData.phoneNumber
    ) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://lock-it-lending.onrender.com/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formWithType),
      });

      if (response.ok) {
        navigate('/thank-you');
        setFormData({
          borrowerName: '',
          state: '',
          zipcode: '',
          firstTimeBuyer: '',
          residencyType: '',
          propertyType: '',
          homePrice: '',
          downPayment: '',
          loanAmount: '',
          creditScore: '',
          email: '',
          phoneNumber: '',
          buydownType: '',
          loanType: '',
          prepaymentPenalty: '',
          loanPurpose: '',
          refinancePurpose: '',
          escrowWaiver: '',
          loanTerm: '',
          propertyValue: '',
          income: '',
          note: '',
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
        {/* <HeroSection
          title="Get your rate"
          highlight="without the call"
          description="We believe everyone should be treated as if they lived next door."
          image={`${process.env.PUBLIC_URL}/rates2.png`}
        /> */}

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto mt-10 px-6 pb-20">
          <div className="bg-white rounded-xl shadow-md border border-gray-300">
            <div className="p-8 border-b border-yellow-500">
              <h2 className="text-3xl font-extrabold text-gray-800"> Rate Quote Form</h2>
              <p className="text-sm text-gray-500 mt-2">
                To ensure accuracy, a team member will contact you shortly to confirm your
                information. Once confirmed, we’ll provide your personalized and guaranteed written
                quote <strong>within 1 business hour</strong>, including a detailed breakdown of
                loan costs, closing fees, taxes, and title insurance — tailored specifically to your
                situation.
                <br />
                We don’t believe in generic online calculators — we deliver clear, accurate, and
                fully transparent estimates, so you know exactly what to expect from start to
                finish.
                <br />
                Answer a few questions to help us understand your needs better.
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              <div className="p-6 space-y-4">
                <p className="text-lg font-semibold">Borrower Name *</p>
                <input
                  type="text"
                  value={formData.borrowerName}
                  onChange={e => handleChange('borrowerName', e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">
                  Which type of buydown are you interested in?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    'Seller Paid 1-0 Buydown',
                    'Lender Paid 1-0 Buydown',
                    'Seller Paid 1-1 Buydown',
                    'Lender Paid 1-1 Buydown',
                    'Seller Paid 2-1 Buydown',
                    'Lender Paid 2-1 Buydown',
                    'Seller Paid 3-2-1 Buydown',
                    'Lender Paid 3-2-1 Buydown',
                    'None',
                  ].map(opt => renderOption('buydownType', opt))}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">Which loan type are you applying for?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    'Conventional',
                    'Conventional ARM',
                    'FHA',
                    'FHA - ARM',
                    'VA',
                    'VA - ARM',
                    'USDA',
                    'HELOC / 2nd Mortgage',
                    'NON QM - No income check',
                  ].map(opt => renderOption('loanType', opt))}
                </div>
              </div>

              {/* <div className="p-6">
                <p className="text-lg font-semibold mb-4">Is there a prepayment penalty?</p>
                <div className="grid grid-cols-2 gap-4">
                  {(['Yes', 'No'] as Array<keyof typeof yesNoIcons>).map(opt =>
                    renderOption('prepaymentPenalty', opt, opt, yesNoIcons[opt])
                  )}
                </div>
              </div> */}

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">Are you a first time homebuyer?</p>
                <div className="grid grid-cols-2 gap-4">
                  {(['Yes', 'No'] as Array<keyof typeof yesNoIcons>).map(opt =>
                    renderOption('firstTimeBuyer', opt, opt, yesNoIcons[opt])
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">What is your annual income? *</p>
                <input
                  type="text"
                  value={formData.income}
                  onChange={e => handleChange('income', e.target.value)}
                  placeholder="Enter your annual income"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">What is the purpose of the loan? *</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Purchase Home',
                    'Refinance',
                    'Construction Purchase',
                    'Construction Refinance',
                  ].map(opt => renderOption('loanPurpose', opt))}
                </div>
              </div>

              {['Refinance', 'Construction Refinance'].includes(formData.loanPurpose) && (
                <div className="p-6">
                  <p className="text-lg font-semibold mb-4">
                    What is the purpose of your refinance?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Cash Out',
                      'Rate and Term - Conventional',
                      'Rate and Term - FHA',
                      'Streamline',
                    ].map(opt => renderOption('refinancePurpose', opt))}
                  </div>
                </div>
              )}

              {['Refinance', 'Construction Refinance'].includes(formData.loanPurpose) ? (
                <div className="p-6">
                  <p className="text-lg font-semibold mb-2">What is your current loan amount?</p>
                  <input
                    type="text"
                    value={formData.loanAmount}
                    onChange={e => handleChange('loanAmount', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="$300,000"
                  />
                  <p className="text-lg font-semibold mt-4 mb-2">
                    What is your estimated property value?
                  </p>
                  <input
                    type="text"
                    value={formData.propertyValue}
                    onChange={e => handleChange('propertyValue', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="$350,000"
                  />
                </div>
              ) : (
                <div className="p-6">
                  <p className="text-lg font-semibold mb-2">How much is the home?</p>
                  <NumericFormat
                    value={formData.homePrice}
                    onValueChange={values => handleChange('homePrice', values.value)}
                    thousandSeparator
                    prefix="$"
                    allowNegative={false}
                    placeholder="$400,000"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <p className="text-lg font-semibold mt-4 mb-2">How much are you putting down?</p>
                  <NumericFormat
                    value={formData.downPayment}
                    onValueChange={values => handleChange('downPayment', values.value)}
                    thousandSeparator
                    prefix="$"
                    allowNegative={false}
                    placeholder="$80,000"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              )}

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">
                  Will this be your primary residence, secondary home, or an investment property? *
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Primary Residence', 'Secondary Home', 'Investment Property'].map(opt =>
                    renderOption('residencyType', opt)
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">Estimated credit score *</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['740+', '700 - 739', '660 - 699', '600 - 659', 'Below 600'].map(opt =>
                    renderOption('creditScore', opt)
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">What type of property is this?</p>
                <select
                  className="w-full border border-gray-300 rounded p-2 focus:ring-yellow-500"
                  value={formData.propertyType}
                  onChange={e => handleChange('propertyType', e.target.value)}
                >
                  <option value="">Select property type</option>
                  {[
                    '2-4 Unit Dwelling',
                    'Condominium',
                    'Modular',
                    'Cooperative',
                    'Planned Unit Development',
                    'Single Family Residence',
                    'Site Condo',
                    'Manufactured Multi Wide',
                    'Manufactured Single Wide',
                    'Manufactured PUD Single Wide',
                    'Manufactured Condo Single Wide',
                    'Manufactured PUD Multi Wide',
                    'Manufactured Condo Multi Wide',
                  ].map(opt => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">
                  Would you like to waive any of the following from your escrow account?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'No Waiver',
                    'Waive Taxes Only',
                    'Waive Hazard Insurance Only',
                    'Waive Taxes & Hazard Insurance',
                  ].map(opt => renderOption('escrowWaiver', opt))}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">What loan term are you considering?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['30 Years', '25 Years', '20 Years', '15 Years', '10 Years'].map(opt =>
                    renderOption('loanTerm', opt)
                  )}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">Which state are you shopping in? *</p>
                <select
                  className="w-full border border-gray-300 rounded p-2 focus:ring-yellow-500"
                  value={formData.state}
                  required
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
                <p className="text-lg font-semibold mb-4">What is your ZIP code?</p>
                <input
                  type="text"
                  value={formData.zipcode}
                  onChange={e => handleChange('zipcode', e.target.value)}
                  placeholder="Enter your ZIP code"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="p-6 space-y-4">
                <p className="text-lg font-semibold">Email *</p>
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
                <p className="text-lg font-semibold mb-4">Phone Number *</p>
                <PatternFormat
                  format="(###) ###-####"
                  mask="_"
                  value={formData.phoneNumber}
                  onValueChange={values => handleChange('phoneNumber', values.value)}
                  placeholder="(123) 456-7890"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold mb-4">Note (Optional)</p>
                <textarea
                  value={formData.note}
                  onChange={e => handleChange('note', e.target.value)}
                  placeholder="Add any additional information or questions here"
                  className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none"
                />
              </div>

              <div className="p-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-bold ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
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

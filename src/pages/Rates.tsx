import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RatesPage() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionClick = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputStyle =
    'w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold';
  const sectionBox = 'bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto space-y-6';
  const labelStyle = 'block text-sm font-semibold text-gray-700 mb-2';

  const states = [
    '',
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  return (
    <div>
      <Header />
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-black mb-4">
            Get your rate <span className="text-gold">without</span> the call
          </h1>
          <p className="text-lg text-gray-700 font-semibold mb-1 max-w-xl mx-auto">
            We believe everyone should be treated as if they lived next door
          </p>
          <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
            Answer a few questions to help us understand your needs better
          </p>
          <img
            src={`${process.env.PUBLIC_URL}/form.png`}
            alt="Hero"
            className="w-full max-w-md mx-auto rounded-lg shadow-md"
          />
        </div>
      </section>

      <form onSubmit={handleSubmit} className="py-16 px-4">
        <div className={sectionBox}>
          <div>
            <label className={labelStyle}>Which state are you shopping in?</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={inputStyle}
            >
              {states.map(s => (
                <option key={s} value={s}>
                  {s || 'Select a state'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelStyle}>Are you a first time home-buyer?</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleOptionClick('firstTimeBuyer', 'Yes')}
                className={`flex-1 p-3 border rounded-md text-center ${formData.firstTimeBuyer === 'Yes' ? 'border-green-500 text-green-600 font-bold' : 'border-gray-300'}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleOptionClick('firstTimeBuyer', 'No')}
                className={`flex-1 p-3 border rounded-md text-center ${formData.firstTimeBuyer === 'No' ? 'border-red-500 text-red-500 font-bold' : 'border-gray-300'}`}
              >
                No
              </button>
            </div>
          </div>

          <div>
            <label className={labelStyle}>Will this be your:</label>
            <div className="flex flex-wrap gap-3">
              {['Primary Residence', 'Secondary Home', 'Investment Property'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleOptionClick('residencyType', type)}
                  className={`flex-1 px-4 py-2 border rounded-md ${formData.residencyType === type ? 'border-gold text-gold font-bold' : 'border-gray-300'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelStyle}>What type of property are you looking at?</label>
            <div className="grid grid-cols-2 gap-3">
              {['Single Family', 'Multi Family', 'Condominium', 'Townhouse'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleOptionClick('propertyType', type)}
                  className={`p-2 border rounded-md ${formData.propertyType === type ? 'border-gold text-gold font-bold' : 'border-gray-300'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelStyle}>How much is the house?</label>
            <input
              type="text"
              name="homePrice"
              value={formData.homePrice}
              onChange={handleChange}
              placeholder="$100,000"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>How much money are you putting down?</label>
            <input
              type="text"
              name="downPayment"
              value={formData.downPayment}
              onChange={handleChange}
              placeholder="$20,000"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Estimated credit score?</label>
            <div className="grid grid-cols-2 gap-3">
              {['740+', '700 - 739', '660 - 699', '600 - 659', 'Below 600'].map(score => (
                <button
                  key={score}
                  type="button"
                  onClick={() => handleOptionClick('creditScore', score)}
                  className={`p-2 border rounded-md ${formData.creditScore === score ? 'border-gold text-gold font-bold' : 'border-gray-300'}`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ExampleEmail@gmail.com"
              className={inputStyle}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-white py-3 rounded-lg font-bold mt-4"
          >
            Submit
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

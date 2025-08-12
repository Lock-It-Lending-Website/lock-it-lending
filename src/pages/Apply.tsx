import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ApplyForm = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const officer = params.get('applyTo') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ssn: '',
    officer,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response: Response = await fetch(
        'https://lock-it-lending-backend.onrender.com/api/send-secure-app',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) alert('Application submitted successfully.');
      else alert('Failed to send. Please try again.');
    } catch (err: unknown) {
      alert(`Error sending application: ${err}`);
    }
  };

  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-8 bg-white shadow rounded my-20">
        <h1 className="text-3xl font-bold mb-4">Apply with {officer}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            name="ssn"
            placeholder="SSN (Secure Input)"
            required
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <button type="submit" className="bg-gold text-white px-6 py-2 rounded">
            Submit Application
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4">
          Note: This form is temporary and uses encrypted email transmission (HTTPS).
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default ApplyForm;

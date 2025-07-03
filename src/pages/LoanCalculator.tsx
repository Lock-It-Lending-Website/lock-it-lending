import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export type CreditScoreRange =
  | '620-639'
  | '640-659'
  | '660-679'
  | '680-699'
  | '700-719'
  | '720-739'
  | '740-759'
  | '760+';

// Define score rates with LTV brackets
const scoreRates: Record<CreditScoreRange, Record<string, number>> = {
  '620-639': { '<85': 0.007, '85-90': 0.011, '90-95': 0.014, '>95': 0.018 },
  '640-659': { '<85': 0.006, '85-90': 0.0095, '90-95': 0.0125, '>95': 0.0165 },
  '660-679': { '<85': 0.0055, '85-90': 0.0085, '90-95': 0.011, '>95': 0.015 },
  '680-699': { '<85': 0.005, '85-90': 0.0075, '90-95': 0.0095, '>95': 0.0135 },
  '700-719': { '<85': 0.0045, '85-90': 0.0068, '90-95': 0.0085, '>95': 0.0125 },
  '720-739': { '<85': 0.0038, '85-90': 0.006, '90-95': 0.0075, '>95': 0.0115 },
  '740-759': { '<85': 0.0032, '85-90': 0.005, '90-95': 0.0065, '>95': 0.01 },
  '760+': { '<85': 0.0025, '85-90': 0.004, '90-95': 0.0055, '>95': 0.009 },
};

const getPmiRate = (ltv: number, creditScoreRange: CreditScoreRange) => {
  if (ltv <= 80) return 0;
  const bracket = ltv <= 85 ? '<85' : ltv <= 90 ? '85-90' : ltv <= 95 ? '90-95' : '>95';
  return scoreRates[creditScoreRange][bracket];
};

const LoanCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<string>('250000');
  const [downPayment, setDownPayment] = useState<string>('50000');
  const [interestRate, setInterestRate] = useState<string>('7.25');
  const [termYears, setTermYears] = useState(30);
  const [propertyTaxDollars, setPropertyTaxDollars] = useState<string>('6750');
  const [propertyTaxPercent, setPropertyTaxPercent] = useState<string>('2.7');
  const [insuranceAnnual, setInsuranceAnnual] = useState<string>('1600'); // annual insurance
  const [hoaAnnual, setHOAAnnual] = useState<string>('350'); // annual HOA
  const [monthlyincome, setMonthlyIncome] = useState<string>('0');
  const [monthlydebt, setMonthlydebt] = useState<string>('0');
  const [mortgageinsurance, setMortgageInsurance] = useState<string>('0');
  const [creditScoreRange, setCreditScoreRange] = useState<string>('760+');

  const [lastEdited, setLastEdited] = useState<'dollars' | 'percent' | null>(null);

  // Parsers
  const purchasePriceNumber = parseFloat(purchasePrice) || 0;
  const downPaymentNumber = parseFloat(downPayment) || 0;
  const loanAmount = purchasePriceNumber - downPaymentNumber;
  const monthlyInterestRate = (parseFloat(interestRate) || 0) / 100 / 12;
  const propertyTaxDollarsNumber = parseFloat(propertyTaxDollars) || 0;
  const parsedPropertyTaxPercent = parseFloat(propertyTaxPercent) || 0;
  const insuranceAnnualNumber = parseFloat(insuranceAnnual) || 0;
  const hoaAnnualNumber = parseFloat(hoaAnnual) || 0;
  const monthlyDebtNumber = parseFloat(monthlydebt) || 0;
  const mortgageInsNumber = parseFloat(mortgageinsurance) || 0;
  const monthlyIncomeNumber = parseFloat(monthlyincome) || 0;

  // Formatting for forms

  const formatNumberWithCommas = (value: string) => {
    const number = value.replace(/,/g, ''); // Remove commas
    if (!number) return '';
    return parseFloat(number).toLocaleString();
  };

  useEffect(() => {
    const purchasePriceNumber = parseFloat(purchasePrice) || 0;
    const propertyTaxDollarsNumber = parseFloat(propertyTaxDollars) || 0;

    if (lastEdited === 'dollars' && purchasePriceNumber > 0) {
      const percent = (propertyTaxDollarsNumber / purchasePriceNumber) * 100;
      setPropertyTaxPercent(percent.toFixed(2)); // percent stays a string
    }
  }, [propertyTaxDollars, purchasePrice, lastEdited]);

  useEffect(() => {
    const purchasePriceNumber = parseFloat(purchasePrice) || 0;

    if (lastEdited === 'percent' && purchasePriceNumber > 0) {
      const isValid = /^\d*\.?\d*$/.test(propertyTaxPercent);
      if (isValid) {
        const parsedPercent = parseFloat(propertyTaxPercent);
        if (!isNaN(parsedPercent)) {
          const dollars = (purchasePriceNumber * parsedPercent) / 100;
          setPropertyTaxDollars(Math.round(dollars).toString()); // convert result back to string
        }
      }
    }
  }, [propertyTaxPercent, purchasePrice, lastEdited]);
  const [loanType, setLoanType] = useState<'mortgage' | 'affordability'>('mortgage');

  // Calculations
  // Years × 12 months = 360
  const totalPayments = termYears * 12;

  // Formula for fixed-rate loan amortization
  let monthlyPrincipalAndInterest = 0;
  if (loanAmount > 0 && monthlyInterestRate > 0) {
    const numerator =
      loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
    monthlyPrincipalAndInterest = numerator / denominator;
  } else if (loanAmount > 0 && monthlyInterestRate === 0) {
    monthlyPrincipalAndInterest = loanAmount / totalPayments;
  }

  const annualPropertyTax =
    propertyTaxDollarsNumber > 0
      ? propertyTaxDollarsNumber
      : purchasePriceNumber * (parsedPropertyTaxPercent / 100);

  // Monthly fees
  const monthlyPropertyTax = annualPropertyTax / 12;
  const monthlyHomeInsurance = insuranceAnnualNumber / 12;
  const monthlyHOAFees = hoaAnnualNumber / 12;

  // Monthly mortgage insurance

  const ltv = purchasePriceNumber > 0 ? (loanAmount / purchasePriceNumber) * 100 : 0;
  const pmiRate = getPmiRate(ltv, creditScoreRange as CreditScoreRange);

  const monthlyMortgageInsurance = loanAmount > 0 ? (loanAmount * pmiRate) / 12 : 0;

  // Total monthly payment
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest +
    monthlyPropertyTax +
    monthlyHomeInsurance +
    monthlyHOAFees +
    monthlyMortgageInsurance;
  const totalMonthly = totalMonthlyPayment.toFixed(2);

  // Mortgage only
  const totalMonthlyMortgageCost =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyHOAFees;

  // DTI calculations
  // Sum up your mortgage payment + other debts
  const totalMonthlyDebt = totalMonthlyPayment + monthlyDebtNumber;

  // Calculate the DTI
  const totalDTI = monthlyIncomeNumber > 0 ? (totalMonthlyDebt / monthlyIncomeNumber) * 100 : 0;

  // Total income needed

  const totalIncomeNeeded = totalMonthlyDebt * 2;
  const annualIncomeNeeded = totalIncomeNeeded * 12;

  // Pie chart data
  const pieData = [
    { name: 'Principal & Interest', value: monthlyPrincipalAndInterest },
    { name: 'Taxes', value: monthlyPropertyTax },
    { name: 'Insurance', value: monthlyHomeInsurance },
    { name: 'HOA', value: monthlyHOAFees },
    { name: 'Mortgage Insurance', value: monthlyMortgageInsurance },
  ].filter(item => item.value > 0); // remove zero-value items

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <HeroSection
          title="Loan Calculator"
          highlight="PITIA Breakdown"
          description="Estimate your monthly mortgage payments based on your purchase price, down payment, interest, and more."
          image="/loancalculator.jpg"
        />

        <section className="max-w-7xl mx-auto p-10 pt-20 pb=30 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Input Form */}
          <div className="bg-white p-5 rounded shadow space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              {loanType === 'mortgage' ? 'Loan Calculator' : 'Affordability Calculator'}
            </h2>

            {/* Loan Type Buttons */}
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setLoanType('mortgage')}
                className={`px-4 py-2 rounded font-medium ${
                  loanType === 'mortgage' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                Mortgage
              </button>
              <button
                type="button"
                onClick={() => setLoanType('affordability')}
                className={`px-4 py-2 rounded font-medium ${
                  loanType === 'affordability' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                Affordability
              </button>
            </div>

            {loanType === 'mortgage' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    Purchase Price:
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                        $
                      </span>
                      <input
                        type="text"
                        value={purchasePrice ? formatNumberWithCommas(purchasePrice) : ''}
                        onChange={e => {
                          const raw = e.target.value.replace(/,/g, '');
                          if (/^\d*$/.test(raw) || raw === '') {
                            setPurchasePrice(raw);
                          }
                        }}
                        className="pl-8 w-full border p-2 rounded"
                        placeholder="0"
                      />
                    </div>
                  </label>

                  <label className="block">
                    Down Payment:
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                        $
                      </span>
                      <input
                        type="text"
                        value={downPayment ? formatNumberWithCommas(downPayment) : ''}
                        onChange={e => {
                          const raw = e.target.value.replace(/,/g, '');
                          if (/^\d*$/.test(raw) || raw === '') {
                            setDownPayment(raw);
                          }
                        }}
                        className="pl-8 w-full border p-2 rounded"
                        placeholder="0"
                      />
                    </div>
                  </label>
                </div>

                <p className="text-sm text-gray-600">
                  <strong>Loan Amount:</strong> ${loanAmount.toLocaleString()}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    Interest Rate:
                    <div className="relative mt-1">
                      <input
                        type="text"
                        value={interestRate}
                        onChange={e => {
                          const raw = e.target.value;
                          if (/^\d*\.?\d*$/.test(raw) || raw === '') {
                            setInterestRate(raw);
                          }
                        }}
                        className="pr-8 w-full border p-2 rounded"
                        placeholder="0"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                        %
                      </span>
                    </div>
                  </label>

                  <label className="block">
                    Loan Term:
                    <select
                      value={termYears}
                      onChange={e => setTermYears(Number(e.target.value))}
                      className="mt-1 w-full border p-2 rounded"
                    >
                      <option value={15}>15 Years</option>
                      <option value={30}>30 Years</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  Yearly Property Tax:
                  <div className="flex gap-4 mt-1">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                        $
                      </span>
                      <input
                        type="text"
                        value={propertyTaxDollars ? formatNumberWithCommas(propertyTaxDollars) : ''}
                        onChange={e => {
                          const raw = e.target.value.replace(/,/g, '');
                          if (/^\d*$/.test(raw) || raw === '') {
                            setPropertyTaxDollars(raw);
                            setLastEdited('dollars');
                          }
                        }}
                        className="pl-8 w-full border p-2 rounded"
                        placeholder="0"
                      />
                    </div>

                    <p>or</p>

                    <div className="relative w-32">
                      <input
                        type="text"
                        value={propertyTaxPercent}
                        onChange={e => {
                          const raw = e.target.value;
                          if (/^\d*\.?\d*$/.test(raw) || raw === '') {
                            setPropertyTaxPercent(raw);
                            setLastEdited('percent');
                          }
                        }}
                        className="pr-8 w-full border p-2 rounded"
                        placeholder="%"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                        %
                      </span>
                    </div>
                  </div>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    Yearly Homeowner&apos;s Insurance:
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                        $
                      </span>
                      <input
                        type="text"
                        value={formatNumberWithCommas(insuranceAnnual)}
                        onChange={e => {
                          const raw = e.target.value.replace(/,/g, '');
                          if (/^\d*$/.test(raw) || raw === '') {
                            setInsuranceAnnual(raw);
                          }
                        }}
                        className="pl-8 w-full border p-2 rounded"
                        placeholder="0"
                      />
                    </div>
                  </label>

                  <label className="block">
                    Yearly HOA Dues:
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                        $
                      </span>
                      <input
                        type="text"
                        value={formatNumberWithCommas(hoaAnnual)}
                        onChange={e => {
                          const raw = e.target.value.replace(/,/g, '');
                          if (/^\d*$/.test(raw) || raw === '') {
                            setHOAAnnual(raw);
                          }
                        }}
                        className="pl-8 w-full border p-2 rounded"
                        placeholder="0"
                      />
                    </div>
                  </label>
                </div>
              </>
            )}

            {loanType === 'affordability' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  Monthly Income:
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                      $
                    </span>
                    <input
                      type="text"
                      value={formatNumberWithCommas(monthlyincome)}
                      onChange={e => {
                        const raw = e.target.value.replace(/,/g, '');
                        if (/^\d*$/.test(raw) || raw === '') {
                          setMonthlyIncome(raw);
                        }
                      }}
                      className="pl-8 w-full border p-2 rounded"
                      placeholder="0"
                    />
                  </div>
                </label>
                <label className="block">
                  Monthly Debts:
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                      $
                    </span>
                    <input
                      type="text"
                      value={formatNumberWithCommas(monthlydebt)}
                      onChange={e => {
                        const raw = e.target.value.replace(/,/g, '');
                        if (/^\d*$/.test(raw) || raw === '') {
                          setMonthlydebt(raw);
                        }
                      }}
                      className="pl-8 w-full border p-2 rounded"
                      placeholder="0"
                    />
                  </div>
                </label>

                <label className="block">
                  Credit Score:
                  <select
                    value={creditScoreRange}
                    onChange={e => setCreditScoreRange(e.target.value)}
                    className="mt-1 w-full border p-2 rounded"
                  >
                    <option value="620-639">620-639</option>
                    <option value="640-659">640-659</option>
                    <option value="660-679">660-679</option>
                    <option value="680-699">680-699</option>
                    <option value="700-719">700-719</option>
                    <option value="720-739">720-739</option>
                    <option value="740-759">740-759</option>
                    <option value="760+">760+</option>
                  </select>
                </label>

                <label className="block">
                  Mortgage Insurance:
                  <input
                    type="text"
                    value={`$${monthlyMortgageInsurance.toFixed(2)}`} // insert your calculated value here
                    readOnly
                    className="mt-1 w-full border p-2 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                    placeholder="Automatically calculated"
                  />
                </label>
              </div>
            )}
          </div>

          {/* RIGHT: Pie Chart shown only in mortgage mode */}
          {loanType === 'mortgage' && (
            <div className="bg-white p-5 rounded shadow w-full p-5">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Total Monthly Payment: ${totalMonthly}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Pie Chart */}
                <div className="w-full flex justify-center">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
                      <Pie
                        dataKey="value"
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ percent }) => `${((percent ?? 0) * 100).toFixed(1)}%`}
                      >
                        {pieData.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
                        labelFormatter={() => ''}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col justify-center space-y-3">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium">{item.name}:</span>
                      <span>${item.value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* RIGHT: Chart shown only in affordability mode */}
          {loanType === 'affordability' && (
            <div className="bg-white p-5 rounded shadow w-full">
              <h2 className="text-2xl font-bold mb-6 text-center break-words whitespace-normal leading-snug">
                Total Monthly Debt:
                <br />
                <span className="inline-block">
                  $
                  {totalMonthlyDebt.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="bg-blue-500 text-white rounded-lg p-4 text-center">
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2">Monthly Mortgage Payment</p>
                  <p className="text-base sm:text-xl md:text-2xl font-bold break-words whitespace-normal leading-snug">
                    $
                    <span className="inline-block">
                      {totalMonthlyPayment.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>

                <div className="bg-blue-500 text-white rounded-lg p-4 text-center">
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2">Loan Amount</p>
                  <p className="text-base sm:text-xl md:text-2xl font-bold break-words whitespace-normal leading-snug">
                    $
                    <span className="inline-block">
                      {loanAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>

                <div className="bg-blue-500 text-white rounded-lg p-4 text-center">
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2">Total Monthly Income Needed</p>
                  <p className="text-base sm:text-xl md:text-2xl font-bold break-words whitespace-normal leading-snug">
                    $
                    <span className="inline-block">
                      {totalIncomeNeeded.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>

                <div className="bg-blue-500 text-white rounded-lg p-4 text-center">
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2">Total Yearly Income Needed</p>
                  <p className="text-base sm:text-xl md:text-2xl font-bold break-words whitespace-normal leading-snug">
                    $
                    <span className="inline-block">
                      {annualIncomeNeeded.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>

                <div className="bg-blue-500 text-white rounded-lg p-4 text-center">
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2">Debt to Income Ratio</p>
                  <p className="text-base sm:text-xl md:text-2xl font-bold break-words whitespace-normal leading-snug">
                    <span className="inline-block">{totalDTI.toFixed(2)}%</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="relative mt-1 p-4">
            <p className="text-xs text-gray-500">
              This calculator is provided by Lock it Lending for educational and informational
              purposes only. It does not constitute financial advice, nor does it represent any loan
              offer or guarantee of loan terms. The calculations are estimates based solely on the
              information you enter and may not reflect actual mortgage rates, terms, or payments.
              Your actual loan eligibility, interest rates, and terms will vary depending on your
              financial profile and the lender’s criteria. For personalized advice and accurate loan
              information, please consult a licensed mortgage professional.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LoanCalculator;

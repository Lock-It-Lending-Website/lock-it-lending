import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// PMI Calculations for the monthly mortgage
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

// Declaring variables
const LoanCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<string>('250000');
  const [downPayment, setDownPayment] = useState<string>('50000');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('20');
  const [interestRate, setInterestRate] = useState<string>('7.25');
  const [termYears, setTermYears] = useState(30);
  const [propertyTaxDollars, setPropertyTaxDollars] = useState<string>('6750');
  const [propertyTaxPercent, setPropertyTaxPercent] = useState<string>('2.7');
  const [insuranceAnnual, setInsuranceAnnual] = useState<string>('1600'); // annual insurance
  const [hoaAnnual, setHOAAnnual] = useState<string>('350'); // annual HOA
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [monthlyStudentdebt, setMonthlyStudentdebt] = useState<string>('');
  const [monthlyAutodebt, setMonthlyAutodebt] = useState<string>('');
  const [monthlyCreditcarddebt, setMonthlyCredit] = useState<string>('');
  const [affordabilityInfo, setAfordabilityInfo] = useState<string>('');
  const [mortgageInsurance, setMortgageInsurance] = useState<string>('0');
  const [creditScoreRange, setCreditScoreRange] = useState<string>('760+');

  // States
  const [lastEdited, setLastEdited] = useState<'dollars' | 'percent' | null>(null);
  const [showInfo, setShowAffordabilityInfo] = useState(false);
  const [lastEditedDownPayment, setLastEditedDownPayment] = useState<'dollars' | 'percent' | null>(
    null
  );
  //const [showStudentInfo, setShowStudentInfo] = useState(false);
  //const [showAutoInfo, setShowAutoInfo] = useState(false);
  //const [showCreditInfo, setCreditInfo] = useState(false);

  // Parsers
  const purchasePriceNumber = parseFloat(purchasePrice) || 0;
  const downPaymentNumber = parseFloat(downPayment) || 0;
  const loanAmount = purchasePriceNumber - downPaymentNumber;
  const monthlyInterestRate = (parseFloat(interestRate) || 0) / 100 / 12;
  const propertyTaxDollarsNumber = parseFloat(propertyTaxDollars) || 0;
  const parsedPropertyTaxPercent = parseFloat(propertyTaxPercent) || 0;
  const insuranceAnnualNumber = parseFloat(insuranceAnnual) || 0;
  const hoaAnnualNumber = parseFloat(hoaAnnual) || 0;
  const mortgageInsNumber = parseFloat(mortgageInsurance) || 0;
  const monthlyIncomeNumber = parseFloat(monthlyIncome) || 0;
  const monthlyAuto = parseFloat(monthlyAutodebt) || 0;
  const monthlyStudent = parseFloat(monthlyStudentdebt) || 0;
  const monthlyCreditCard = parseFloat(monthlyCreditcarddebt) || 0;

  // Formatting for forms
  const formatNumberWithCommas = (value: string) => {
    const number = value.replace(/,/g, '');
    if (!number) return '';
    return parseFloat(number).toLocaleString();
  };

  // Saves the state of the interest rate
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

  useEffect(() => {
    const purchasePriceNumber = parseFloat(purchasePrice) || 0;
    const downPaymentNumber = parseFloat(downPayment) || 0;

    if (lastEditedDownPayment === 'dollars' && purchasePriceNumber > 0) {
      const percent = (downPaymentNumber / purchasePriceNumber) * 100;
      setDownPaymentPercent(percent.toFixed(2)); // percent stays a string
    }
  }, [downPayment, purchasePrice, lastEditedDownPayment]);

  useEffect(() => {
    const purchasePriceNumber = parseFloat(purchasePrice) || 0;

    if (lastEditedDownPayment === 'percent' && purchasePriceNumber > 0) {
      const isValid = /^\d*\.?\d*$/.test(downPaymentPercent);
      if (isValid) {
        const parsedPercent = parseFloat(downPaymentPercent);
        if (!isNaN(parsedPercent)) {
          const dollars = (purchasePriceNumber * parsedPercent) / 100;
          setDownPayment(Math.round(dollars).toString()); // convert result back to string
        }
      }
    }
  }, [downPaymentPercent, purchasePrice, lastEditedDownPayment]);

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
  // Yearly property tax
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

  const formattedPMI = monthlyMortgageInsurance.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
  // To add total monthly payments of principal + auto + student loans + creditcard
  const totalMonthlyDebt = totalMonthlyPayment + monthlyStudent + monthlyAuto + monthlyCreditCard;

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
    { name: 'PMI', value: monthlyMortgageInsurance },
  ].filter(item => item.value > 0); // remove zero-value items

  return (
    <>
      <div className="font-sans">
        <Header />
        <main className="bg-gray-50 py-20 min-h-screen">
          <h2 className="text-5xl text-center font-bold mb-10">Calculate your mortgage</h2>
          {/*User input*/}
          <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
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
                      if (/^\d*$/.test(raw) || raw === '') setPurchasePrice(raw);
                    }}
                    className="pl-8 w-full border p-2 rounded"
                    placeholder="0"
                  />
                </div>
              </label>

              <label className="block">
                Down Payment:
                <div className="flex items-center mt-1 border rounded overflow-hidden">
                  {/* Dollar Input */}
                  <div className="relative flex-1">
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
                          setLastEditedDownPayment('dollars');
                        }
                      }}
                      className="pl-8 w-full  p-2 rounded"
                      placeholder="0"
                    />
                  </div>

                  {/* Vertical Divider */}
                  <div className="h-full w-px bg-gray-500"></div>

                  {/* Percentage Input */}
                  <div className="relative w-24">
                    <input
                      type="text"
                      value={downPaymentPercent}
                      onChange={e => {
                        const raw = e.target.value;
                        if (/^\d*\.?\d*$/.test(raw) || raw === '') {
                          setDownPaymentPercent(raw);
                          setLastEditedDownPayment('percent');
                        }
                      }}
                      className="pr-8 w-full border-none p-2"
                      placeholder="0"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                      %
                    </span>
                  </div>
                </div>
              </label>

              <label className="block">
                Interest Rate:
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={interestRate}
                    onChange={e => {
                      const raw = e.target.value;
                      if (/^\d*\.?\d*$/.test(raw) || raw === '') setInterestRate(raw);
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
                      if (/^\d*$/.test(raw) || raw === '') setInsuranceAnnual(raw);
                    }}
                    className="pl-8 w-full border p-2 rounded"
                    placeholder="0"
                  />
                </div>
              </label>

              <label className="block">
                Yearly Property Tax:
                <div className="flex items-center mt-1 border rounded overflow-hidden">
                  {/* Dollar Input */}
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
                      className="pl-8 w-full p-2 rounded"
                      placeholder="0"
                    />
                  </div>

                  {/* Vertical Divider */}
                  <div className="h-full w-px bg-gray-500"></div>

                  {/* Percentage Input */}
                  <div className="relative w-24">
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
                      className="pr-8 w-full border-none p-2"
                      placeholder="0"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                      %
                    </span>
                  </div>
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
                      if (/^\d*$/.test(raw) || raw === '') setHOAAnnual(raw);
                    }}
                    className="pl-8 w-full p-2 rounded"
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
            </div>

            {/* The right side*/}
            <div className="lg:col-span-3 bg-white flex flex-col items-center mx-auto p-5 rounded shadow w-full">
              <h2 className="text-2xl mb-6 text-center">Total Monthly Payment: </h2>
              <h1 className="text-5xl font-bold text-center">
                ${formatNumberWithCommas(totalMonthly)}
              </h1>
              <div className="w-full flex flex-col items-center gap-8 pb-8 max-w-full sm:max-w-[500px] md:max-w-[600px]">
                {/* Chart */}
                <div className="w-full flex flex-col items-center space-y-4">
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

                {/* Color Keys */}
                <div className="w-full flex flex-col justify-center items-center space-y-4 pb-8">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex justify-between gap-3 w-64">
                      <div className="flex items-center gap-2 min-w-[160px] justify-start">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{item.name}:</span>
                        <span>${formatNumberWithCommas(item.value.toFixed(2).toString())}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {/*<div className="bg-blue-500 text-white rounded-lg p-4 text-center">
                <p className="text-xs sm:text-sm mb-1 sm:mb-2">Monthly Mortgage Payment (PITIA)</p>
                <p className="text-base sm:text-xl md:text-2xl font-bold break-words whitespace-normal leading-snug">
                  $
                  <span className="inline-block">
                    {totalMonthlyMortgageCost.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
              </div>*/}

                <div className="bg-[#cca249] text-white rounded-lg p-4 text-center">
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2">Loan Amount</p>
                  <p className="sm:text-xl md:text-2xl font-bold break-words whitespace-normal leading-snug">
                    $
                    <span className="inline-block">
                      {loanAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>
                <div className="bg-[#cca249] text-white rounded-lg p-4 text-center">
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2">Monthly PMI</p>
                  <p className="sm:text-xl md:text-2xl font-bold break-words whitespace-normal leading-snug">
                    $<span className="inline-block">{formattedPMI}</span>
                  </p>
                </div>
              </div>
            </div>
            {/* Disclaimer for compliance*/}
            <div className="relative mt-1 col-span-full w-full">
              <p className="text-sm font-bold text-black mb-6">
                Disclaimer:<br></br>
              </p>
              <p className="text-xs text-gray-500">
                This calculator is provided by Lock it Lending for educational and informational
                purposes only. It does not constitute financial advice, nor does it represent any
                loan offer or guarantee of loan terms. The calculations are estimates based solely
                on the information you enter and may not reflect actual mortgage rates, terms, or
                payments. Your actual loan eligibility, interest rates, and terms will vary
                depending on your financial profile and the lender’s criteria. For personalized
                advice and accurate loan information, please consult a licensed mortgage
                professional.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LoanCalculator;

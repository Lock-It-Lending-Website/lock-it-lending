import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// Pie chart colors
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
  '760+': { '<85': 0.0025, '85-90': 0.004, '90-95': 0.0055, '>95': 0.00992 },
};

const getPmiRate = (ltv: number, creditScoreRange: CreditScoreRange) => {
  if (ltv <= 80) return 0;
  const bracket = ltv <= 85 ? '<85' : ltv <= 90 ? '85-90' : ltv <= 95 ? '90-95' : '>95';
  return scoreRates[creditScoreRange][bracket];
};

// Bands for buying power

type Bands = {
  affordable: { min: number; max: number };
  stretch: { min: number; max: number };
  difficult: { min: number; max: number };
};

export function getBuyingPowerBands(
  affordableMax: number, // your solved maxAffordableHomePrice
  stretchFactor = 1.13, // +13%
  difficultFactor = 1.26 // +26%
): Bands {
  const A = Math.max(0, Math.floor(affordableMax));

  const stretchMax = Math.floor(A * stretchFactor);
  const difficultMax = Math.floor(A * difficultFactor);

  return {
    affordable: { min: 0, max: A },
    stretch: { min: A + 1, max: stretchMax },
    difficult: { min: stretchMax + 1, max: difficultMax },
  };
}

// Declaring variables and states
const AffordabilityCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<string>('250000');
  const [downPayment, setDownPayment] = useState<string>('50000');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('7.250');
  const [termYears, setTermYears] = useState(30);
  const [propertyTaxDollars, setPropertyTaxDollars] = useState<string>('');
  const [propertyTaxPercent, setPropertyTaxPercent] = useState<string>('2.7');
  const [insuranceAnnual, setInsuranceAnnual] = useState<string>('1600'); // annual insurance
  const [hoaAnnual, setHOAAnnual] = useState<string>('350'); // annual HOA
  const [monthlyIncome, setMonthlyIncome] = useState<string>('10000');
  const [monthlyStudentdebt, setMonthlyStudentdebt] = useState<string>('');
  const [monthlyAutodebt, setMonthlyAutodebt] = useState<string>('');
  const [monthlyCreditcarddebt, setMonthlyCredit] = useState<string>('');
  const [creditScoreRange, setCreditScoreRange] = useState<string>('760+');
  const [lastEdited, setLastEdited] = useState<'dollars' | 'percent' | null>(null);
  const [showInfo, setShowAffordabilityInfo] = useState(false);
  const [dtiPercent, setDtiPercent] = useState<string>('50'); // default 36 %
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastEditedDownPayment, setLastEditedDownPayment] = useState<'dollars' | 'percent' | null>(
    null
  );

  // Parsers
  const purchasePriceNumber = parseFloat(purchasePrice) || 0;
  const downPaymentNumber = parseFloat(downPayment) || 0;
  const loanAmount = purchasePriceNumber - downPaymentNumber;
  const monthlyInterestRate = (parseFloat(interestRate) || 0) / 100 / 12;
  const propertyTaxDollarsNumber = parseFloat(propertyTaxDollars) || 0;
  const parsedPropertyTaxPercent = parseFloat(propertyTaxPercent) || 0;
  const insuranceAnnualNumber = parseFloat(insuranceAnnual) || 0;
  const hoaAnnualNumber = parseFloat(hoaAnnual) || 0;
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

  // ───────────── Calculations ─────────────

  // Basic loan params
  const totalPayments = termYears * 12;
  const r = monthlyInterestRate; // already APR/12
  const pow = Math.pow(1 + r, totalPayments);
  const amortFactor = r > 0 ? (r * pow) / (pow - 1) : 1 / totalPayments;

  // Monthly fixed charges that do NOT scale with price
  const monthlyHomeInsurance = insuranceAnnualNumber / 12;
  const monthlyHOAFees = hoaAnnualNumber / 12;

  // Budget from DTI
  const MAX_DTI = (parseFloat(dtiPercent) || 0) / 100;
  const otherDebts = monthlyAuto + monthlyStudent + monthlyCreditCard;
  const maxHousingBudget = monthlyIncomeNumber * MAX_DTI - otherDebts;

  // Helper: monthly PMI from LTV & score
  function monthlyPMI(loanAmt: number, price: number, score: CreditScoreRange) {
    if (price <= 0 || loanAmt <= 0) return 0;
    const ltvPct = (loanAmt / price) * 100;
    if (ltvPct <= 80) return 0;
    const bracket = ltvPct < 85 ? '<85' : ltvPct <= 90 ? '85-90' : ltvPct <= 95 ? '90-95' : '>95';
    const annualRate = scoreRates[score][bracket]; // e.g., 0.0065 for 0.65%/yr
    return (loanAmt * annualRate) / 12;
  }

  // Helper: monthly taxes for a given price (prefer $ amount if present)
  function monthlyTaxesFor(price: number) {
    const pct = (parsedPropertyTaxPercent || 0) / 100;
    if (pct > 0) return (price * pct) / 12;

    // Fallback to fixed $/yr only if no percent is given.
    if (propertyTaxDollarsNumber > 0) return propertyTaxDollarsNumber / 12;

    return 0;
  }

  // Binary-search the price so that: PI + tax + ins + HOA + PMI <= maxHousingBudget
  const downPaymentDollars = downPaymentNumber || 0;
  let lo = Math.max(downPaymentDollars + 1, 1);
  let hi = 2_000_000; // generous cap; adjust if desired

  for (let i = 0; i < 50; i++) {
    const midPrice = (lo + hi) / 2;
    const loanAmt = Math.max(midPrice - downPaymentDollars, 0);

    const PI = loanAmt * amortFactor;
    const tax = monthlyTaxesFor(midPrice);
    const PMI = monthlyPMI(loanAmt, midPrice, creditScoreRange as CreditScoreRange);
    const total = PI + tax + monthlyHomeInsurance + monthlyHOAFees + PMI;

    if (total > maxHousingBudget) {
      hi = midPrice;
    } else {
      lo = midPrice;
    }
  }

  // Solved price & recomputed breakdown
  const maxAffordableHomePrice = Math.floor(lo);
  const loanAmountSolved = Math.max(maxAffordableHomePrice - downPaymentDollars, 0);

  //Buying power calculation
  const { affordable, stretch, difficult } = getBuyingPowerBands(
    maxAffordableHomePrice,
    1.13, // tweak here if you want different bands
    1.26
  );

  const currency0 = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  // Monthly components at solved price
  const monthlyPropertyTax = monthlyTaxesFor(maxAffordableHomePrice);
  const monthlyPrincipalAndInterest = loanAmountSolved * amortFactor;
  const monthlyMI = monthlyPMI(
    loanAmountSolved,
    maxAffordableHomePrice,
    creditScoreRange as CreditScoreRange
  );

  // LTV & bracket (at solved price)
  const ltv = maxAffordableHomePrice > 0 ? (loanAmountSolved / maxAffordableHomePrice) * 100 : 0;

  // Totals
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest +
    monthlyPropertyTax +
    monthlyHomeInsurance +
    monthlyHOAFees +
    monthlyMI;

  const totalMonthlyDebt = totalMonthlyPayment + monthlyStudent + monthlyAuto + monthlyCreditCard;

  // Income needed for this solved scenario
  const totalIncomeNeeded = totalMonthlyDebt / MAX_DTI; // monthly gross needed to support this debt at given DTI
  const annualIncomeNeeded = totalIncomeNeeded * 12;

  // (Optional) Also keep these around if you still use them elsewhere:
  const taxRateMonthly = (parsedPropertyTaxPercent || 0) / 1200; // only used if you display it
  const principalPct = maxAffordableHomePrice > 0 ? loanAmountSolved / maxAffordableHomePrice : 1;
  // const variableCostPerDollar ... (no longer used because PMI requires iteration)

  // Pie chart data
  const pieData = [
    { name: 'Principal & Interest', value: monthlyPrincipalAndInterest },
    { name: 'Taxes', value: monthlyPropertyTax },
    { name: 'Insurance', value: monthlyHomeInsurance },
    { name: 'HOA', value: monthlyHOAFees },
    { name: 'PMI', value: monthlyMI },
  ].filter(item => item.value > 0); // remove zero-value items

  return (
    <>
      <div className="font-sans text-base">
        <Header />
        <main className="bg-gray-50 py-20 min-h-screen">
          <Link
            to="/loan-calculator"
            className="relative block bg-[#cca249] text-white rounded-lg border-4 border-[#cca249] p-4 my-6
                 w-64 mx-auto cursor-pointer transition-colors duration-300 hover:opacity-90 transition hover:text-white"
            aria-label="Check your affordability"
          >
            <p className="text-xs sm:text-sm mb-0 text-center">Mortgage Breakdown </p>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="w-4 h-4 text-white group-hover:text-white"
              />
            </span>
          </Link>
          <h2 className="text-5xl text-center font-bold mb-10">Calculate Your Affordability </h2>
          {/*User input*/}
          <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {/* Simple view */}
              <label className="block">
                <div className="flex items-center gap-2">
                  Monthly Income:
                  <div className="relative group">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="w-4 h-4 text-[#cca249] hover:text-[#a7812f] cursor-pointer"
                    />
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-64 bg-white border border-gray-300 shadow-lg p-2 text-sm text-gray-700 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-50">
                      Enter your total monthly earnings before taxes or other deductions are
                      withheld.
                      <br />
                      Example: If you make $75,000/year, enter <strong>6250</strong>.
                    </div>
                  </div>
                </div>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                    $
                  </span>
                  <input
                    type="text"
                    value={formatNumberWithCommas(monthlyIncome)}
                    onChange={e => {
                      const raw = e.target.value.replace(/,/g, '');
                      if (/^\d*$/.test(raw) || raw === '') setMonthlyIncome(raw);
                    }}
                    className="pl-8 w-full border p-2 rounded"
                    placeholder="0"
                  />
                </div>
              </label>
              <label className="block pd-3">
                <div className="flex items-center gap-2">
                  Monthly Student Loan Debt:
                  <div className="relative group">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="w-4 h-4 text-[#cca249] hover:text-[#a7812f] cursor-pointer"
                    />
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-64 bg-white border border-gray-300 shadow-lg p-2 text-sm text-gray-700 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-50">
                      Enter your monthly student loans.
                    </div>
                  </div>
                </div>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                    $
                  </span>
                  <input
                    type="text"
                    value={formatNumberWithCommas(monthlyStudentdebt)}
                    onChange={e => {
                      const raw = e.target.value.replace(/,/g, '');
                      if (/^\d*$/.test(raw) || raw === '') setMonthlyStudentdebt(raw);
                    }}
                    className="pl-8 w-full border p-2 rounded"
                    placeholder="0"
                  />
                </div>
              </label>

              <label className="block">
                <div className="flex items-center gap-2">
                  Monthly Auto Debt:
                  <div className="relative group">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="w-4 h-4 text-[#cca249] hover:text-[#a7812f] cursor-pointer"
                    />
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-64 bg-white border border-gray-300 shadow-lg p-2 text-sm text-gray-700 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-50">
                      Enter your monthly car payment amount.
                      <br></br>Example: If your balance is $35,000 and monthly payment is $500,
                      enter <strong>500</strong>.
                    </div>
                  </div>
                </div>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                    $
                  </span>
                  <input
                    type="text"
                    value={formatNumberWithCommas(monthlyAutodebt)}
                    onChange={e => {
                      const raw = e.target.value.replace(/,/g, '');
                      if (/^\d*$/.test(raw) || raw === '') setMonthlyAutodebt(raw);
                    }}
                    className="pl-8 w-full border p-2 rounded"
                    placeholder="0"
                  />
                </div>
              </label>
              <label className="block">
                <div className="flex items-center gap-2">
                  Monthly Credit Card Debt:
                  <div className="relative group">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="w-4 h-4 text-[#cca249] hover:text-[#a7812f] cursor-pointer"
                    />
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-64 bg-white border border-gray-300 shadow-lg p-2 text-sm text-gray-700 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-50">
                      Enter your minimum monthly credit card payments.
                      <br />
                      Example: If your minimum payment is $35 (even if you pay $500), enter{' '}
                      <strong>35</strong>.
                    </div>
                  </div>
                </div>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                    $
                  </span>
                  <input
                    type="text"
                    value={formatNumberWithCommas(monthlyCreditcarddebt)}
                    onChange={e => {
                      const raw = e.target.value.replace(/,/g, '');
                      if (/^\d*$/.test(raw) || raw === '') setMonthlyCredit(raw);
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
                      className="pl-8 w-full p-2 rounded"
                      placeholder="0"
                    />
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
              <div className="space-y-4">
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
                  Debt-to-Income (DTI):
                  <div className="relative mt-1">
                    <input
                      type="text"
                      value={dtiPercent || '50'}
                      readOnly
                      className="pr-8 w-full border p-2 rounded text-black cursor-not-allowed"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                      %
                    </span>
                  </div>
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
                      className="pl-8 w-full border p-2 rounded"
                      placeholder="0"
                    />
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/*<label className="block">
                  Private Mortgage Insurance (PMI):
                  <input
                    type="text"
                    value={`$${monthlyMortgageInsurance.toFixed(2)}`}
                    readOnly
                    className="mt-1 w-full border p-2 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                    placeholder="Automatically calculated"
                  />
                </label>*/}
              </div>
            </div>

            {/* The right side*/}
            <div className="lg:col-span-3 bg-white flex flex-col items-center mx-auto p-5 rounded shadow w-full">
              <p className="text-2xl mb-6 text-center">Your Buying Power</p>
              <h1 className="text-5xl font-bold text-center">
                $
                {maxAffordableHomePrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
              <div className="w-full flex flex-col items-center gap-8 pb-8 max-w-full sm:max-w-[500px] md:max-w-[600px]">
                {/* Chart */}
                <div className="w-full flex flex-col items-center space-y-4">
                  <ResponsiveContainer width="100%" aspect={4 / 3}>
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
                <div className="w-full flex flex-col items-center space-y-3 pb-8">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex w-full max-w-md items-center justify-between">
                      {/* Left: color chip + label (no wrap) */}
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{item.name}:</span>
                      </div>

                      {/* Right: value (no wrap, aligned right) */}
                      <span className="whitespace-nowrap tabular-nums">
                        ${formatNumberWithCommas(item.value.toFixed(2).toString())}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/*
              <div className="w-full mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  <div className="shadow border text-white rounded-lg p-4 text-center">
                    <div className="p-4 flex flex-col items-start">
                      <div className="inline-flex items-center justify-center w-full py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm mb-1 sm:mb-2">
                        Affordable
                      </div>
                      <p className="inline-flex items-center justify-center w-full py-1 text-lg font-bold text-black">
                        {currency0(affordable.min)} - {currency0(affordable.max)}
                      </p>
                    </div>
                  </div>
                  <div className="shadow border text-white rounded-lg p-4 text-center">
                    <div className="rounded-xl p-4 flex flex-col items-start">
                      <div className="inline-flex items-center justify-center w-full py-1 rounded-full bg-green-300 text-green-800 text-xs sm:text-sm mb-1 sm:mb-2">
                        Stretch
                      </div>
                      <p className="inline-flex items-center justify-center w-full py-1 text-lg font-bold text-black">
                        {currency0(stretch.min)} - {currency0(stretch.max)}
                      </p>
                    </div>
                  </div>
                  <div className="shadow border text-white rounded-lg p-4 text-center">
                    <div className="rounded-xl p-4 flex flex-col items-start">
                      <div className="inline-flex items-center justify-center w-full py-1 rounded-full bg-green-500 text-green-800 text-xs sm:text-sm mb-1 sm:mb-2">
                        Difficult
                      </div>
                      <p className="inline-flex items-center justify-center w-full py-1 text-lg font-bold text-black">
                        {currency0(difficult.min)} - {currency0(difficult.max)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>*/}
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

export default AffordabilityCalculator;

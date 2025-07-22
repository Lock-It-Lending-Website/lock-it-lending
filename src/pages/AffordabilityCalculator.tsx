import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// Pie chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Declaring variables and states
const AffordabilityCalculator: React.FC = () => {
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
  const [creditScoreRange, setCreditScoreRange] = useState<string>('760+');
  const [lastEdited, setLastEdited] = useState<'dollars' | 'percent' | null>(null);
  const [showInfo, setShowAffordabilityInfo] = useState(false);
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
  const fixedCharges = monthlyHomeInsurance + monthlyHOAFees;

  // Monthly mortgage insurance

  const ltv = purchasePriceNumber > 0 ? (loanAmount / purchasePriceNumber) * 100 : 0;

  // Total monthly payment
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyHOAFees;
  const totalMonthly = totalMonthlyPayment.toFixed(2);

  // Mortgage only
  const totalMonthlyMortgageCost =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyHOAFees;

  // DTI calculations

  const MAX_DTI = 0.45;

  //Mortgage debts + other debts
  const totalMonthlyDebt = totalMonthlyPayment + monthlyStudent + monthlyAuto + monthlyCreditCard;

  //Other debts
  const otherDebts = monthlyAuto + monthlyStudent + monthlyCreditCard;

  // Affordability calculation
  const maxHousingBudget = monthlyIncomeNumber * MAX_DTI - otherDebts;

  // Total income needed
  const totalIncomeNeeded = totalMonthlyDebt * 2;
  const annualIncomeNeeded = totalIncomeNeeded * 12;

  //     Part of PITIA that *does* vary with price: P&I + Taxes.
  //     ▸ Taxes:  P × (tax %) / 12
  //     ▸ P&I :   classic amortization formula on the financed amount.
  const taxRateMonthly = parsedPropertyTaxPercent / 1200; // e.g. 2.7 % ⇒ 0.00225
  const dpPct = downPaymentPercent
    ? parseFloat(downPaymentPercent) / 100
    : purchasePriceNumber > 0
      ? downPaymentNumber / purchasePriceNumber
      : 0;
  const principalPct = 1 - dpPct;

  // Amortization factor (mortgage-payment multiplier per $1 loan)
  const pow = Math.pow(1 + monthlyInterestRate, totalPayments);
  const amortFactor =
    monthlyInterestRate > 0 ? (monthlyInterestRate * pow) / (pow - 1) : 1 / totalPayments;

  const variableCostPerDollar = principalPct * amortFactor + taxRateMonthly;

  const budgetForVariable = maxHousingBudget - fixedCharges;

  const maxAffordableHomePrice =
    budgetForVariable > 0 && variableCostPerDollar > 0
      ? budgetForVariable / variableCostPerDollar
      : 0;

  const maxLoanAmount = maxAffordableHomePrice * principalPct;
  const maxMortgagePayment = maxLoanAmount * amortFactor;

  // Pie chart data
  const pieData = [
    { name: 'Principal & Interest', value: monthlyPrincipalAndInterest },
    { name: 'Taxes', value: monthlyPropertyTax },
    { name: 'Insurance', value: monthlyHomeInsurance },
    { name: 'HOA', value: monthlyHOAFees },
  ].filter(item => item.value > 0); // remove zero-value items

  return (
    <>
      <div className="font-sans">
        <Header />
        <main className="bg-gray-50 py-20 min-h-screen">
          <h2 className="text-4xl text-center font-bold mb-10">Calculate your affordability</h2>
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
                      enter <strong>500</strong>
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

              {/*Advanced view*/}
              <div className="flex items-center gap-2 py-5">
                <button
                  type="button"
                  className="text-black font-bold hover:text-[#cca249]"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  aria-label="Toggle Advanced Options"
                >
                  Show Advanced
                </button>
              </div>
              {showAdvanced && (
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
                          value={
                            propertyTaxDollars ? formatNumberWithCommas(propertyTaxDollars) : ''
                          }
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
              )}

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
            <div className="lg:col-span-3 bg-white p-5 rounded shadow w-full">
              <p className="text-2xl mb-6 text-center">Max Home Purchase Price</p>
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
                <div className="bg-blue-500 text-white rounded-lg p-4 text-center">
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

                <div className="bg-blue-500 text-white rounded-lg p-4 text-center">
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2">Total Monthly Income Needed</p>
                  <p className="sm:text-xl md:text-2xl font-bold break-words whitespace-normal leading-snug">
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
                  <p className="sm:text-xl md:text-2xl font-bold break-words whitespace-normal leading-snug">
                    $
                    <span className="inline-block">
                      {annualIncomeNeeded.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
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
      </div>
      <Footer />
    </>
  );
};

export default AffordabilityCalculator;

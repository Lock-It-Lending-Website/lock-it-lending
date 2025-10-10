import React, { useMemo, useState } from 'react';

type ViewMode = 'month' | 'year';

interface Props {
  loanAmount: number;
  annualRatePct: number;
  termYears: number;
}

type MonthRow = { idx: number; interest: number; principal: number; remaining: number };
type YearRow = { idx: number; interest: number; principal: number; remaining: number };

function currency(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}
function money(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function AmortizationSchedule({ loanAmount, annualRatePct, termYears }: Props) {
  const [view, setView] = useState<ViewMode>('month');

  // clamp to 30 years
  const years = Math.min(Math.max(1, Math.round(termYears || 0)), 30);
  const totalMonths = years * 12;
  const r = (annualRatePct || 0) / 100 / 12;

  // Fixed payment (handles r = 0)
  const monthlyPayment = useMemo(() => {
    if (!loanAmount || loanAmount <= 0) return 0;
    if (r === 0) return loanAmount / totalMonths;
    const pow = Math.pow(1 + r, totalMonths);
    return (loanAmount * r * pow) / (pow - 1);
  }, [loanAmount, r, totalMonths]);

  // Monthly rows
  const monthRows: MonthRow[] = useMemo(() => {
    const rows: MonthRow[] = [];
    let balance = loanAmount;
    for (let i = 1; i <= totalMonths; i++) {
      const interest = r === 0 ? 0 : balance * r;
      const principal = Math.min(monthlyPayment - interest, balance);
      balance = Math.max(0, balance - principal);
      rows.push({ idx: i, interest, principal, remaining: balance });
    }
    return rows;
  }, [loanAmount, r, totalMonths, monthlyPayment]);

  // Yearly rows (rollups)
  const yearRows: YearRow[] = useMemo(() => {
    const rows: YearRow[] = [];
    for (let y = 0; y < years; y++) {
      const slice = monthRows.slice(y * 12, y * 12 + 12);
      if (!slice.length) break;
      rows.push({
        idx: y + 1,
        interest: slice.reduce((s, m) => s + m.interest, 0),
        principal: slice.reduce((s, m) => s + m.principal, 0),
        remaining: slice[slice.length - 1].remaining,
      });
    }
    return rows;
  }, [monthRows, years]);

  const rows = view === 'month' ? monthRows : yearRows;

  // Totals for summary
  const totalPrincipal = rows.reduce(
    (s, r) => s + (view === 'month' ? (r as MonthRow).principal : (r as YearRow).principal),
    0
  );
  const totalInterest = rows.reduce(
    (s, r) => s + (view === 'month' ? (r as MonthRow).interest : (r as YearRow).interest),
    0
  );

  return (
    <section className="w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
      {/* Summary + view toggle */}
      <div className="mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm text-black">
          <span className="font-semibold">Total principal payments:</span> ${money(totalPrincipal)}
          <br />
          <span className="font-semibold">Total interest payments:</span> ${money(totalInterest)}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-3">
        <div className="inline-flex rounded-lg overflow-hidden border">
          <button
            className={`px-3 py-1.5 text-xs sm:text-sm ${view === 'month' ? 'bg-[#cca249] text-white' : 'bg-white'}`}
            onClick={() => setView('month')}
            aria-pressed={view === 'month'}
          >
            By month
          </button>
          <button
            className={`px-3 py-1.5 text-xs sm:text-sm ${view === 'year' ? 'bg-[#cca249] text-white' : 'bg-white'}`}
            onClick={() => setView('year')}
            aria-pressed={view === 'year'}
          >
            By year
          </button>
        </div>
      </div>

      {/* Scrollable table */}
      <div className="rounded-lg shadow bg-white overflow-hidden">
        {/* horizontal scroll for small screens */}
        <div className="overflow-x-auto">
          {/* vertical scroll with sticky header */}
          <div className="max-h-[320px] sm:max-h-[420px] md:max-h-[560px] overflow-y-auto">
            <table className="min-w-[640px] w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr className="text-left text-[11px] sm:text-xs text-gray-600">
                  <th className="px-3 sm:px-4 py-2 sm:py-3">
                    {view === 'month' ? 'Month' : 'Year'}
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">Interest</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">Principal</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3">Principal remaining</th>
                </tr>
              </thead>
              <tbody className="text-[11px] sm:text-xs md:text-sm tabular-nums">
                {rows.map(r => (
                  <tr key={r.idx} className="odd:bg-white even:bg-gray-50">
                    <td className="px-3 sm:px-4 py-2">{r.idx}</td>
                    <td className="px-3 sm:px-4 py-2">${currency((r as any).interest)}</td>
                    <td className="px-3 sm:px-4 py-2">${currency((r as any).principal)}</td>
                    <td className="px-3 sm:px-4 py-2">${currency((r as any).remaining)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* No pagination; users scroll instead */}
    </section>
  );
}

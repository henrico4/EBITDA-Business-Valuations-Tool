import React, { useState } from 'react';
import { Calculator, Info, Download, Send } from 'lucide-react';
import { FinancialInputs } from './FinancialInputs';
import { ResultsPanel } from './ResultsPanel';
import { IndustryReference } from './IndustryReference';
import { industryMultiples, currencies } from '../data/constants';

interface EBITDACalculatorProps {
  user: {
    name: string;
    email: string;
  };
}

function EBITDACalculator({ user }: EBITDACalculatorProps) {
  const [financials, setFinancials] = useState({
    revenue: 0,
    cogs: 0,
    operatingExpenses: 0,
    depreciation: 0,
    amortization: 0
  });
  const [selectedIndustry, setSelectedIndustry] = useState("Software & Tech");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showInfo, setShowInfo] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const grossProfit = financials.revenue - financials.cogs;
  const operatingIncome = grossProfit - financials.operatingExpenses;
  const ebitda = operatingIncome + financials.depreciation + financials.amortization;
  
  const selectedMultipleRange = industryMultiples.find(i => i.industry === selectedIndustry)?.multipleRange;
  const valuationRange = {
    min: ebitda * (selectedMultipleRange?.min || 0),
    max: ebitda * (selectedMultipleRange?.max || 0)
  };

  const handleFinancialChange = (field: string, value: number) => {
    setFinancials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDownload = () => {
    const results = {
      user,
      financials,
      results: {
        grossProfit,
        operatingIncome,
        ebitda,
        valuationRange,
        industry: selectedIndustry,
        currency: selectedCurrency
      }
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ebitda-calculation.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEmailResults = () => {
    // In a real application, this would make an API call to your backend
    // For now, we'll just simulate the email being sent
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">EBITDA Calculator</h1>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.symbol}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Info className="w-6 h-6" />
              </button>
            </div>
          </div>

          {showInfo && (
            <div className="bg-indigo-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
              <p>EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is a measure of a company's overall financial performance. It's used as a proxy for cash flow and the company's ability to generate earnings from operations.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <FinancialInputs
              financials={financials}
              onFinancialChange={handleFinancialChange}
              selectedCurrency={selectedCurrency}
            />
            <ResultsPanel
              grossProfit={grossProfit}
              operatingIncome={operatingIncome}
              ebitda={ebitda}
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
              valuationRange={valuationRange}
              selectedMultipleRange={selectedMultipleRange}
              selectedCurrency={selectedCurrency}
            />
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Results
            </button>
            <button
              onClick={handleEmailResults}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Send className="w-4 h-4 mr-2" />
              {emailSent ? 'Email Sent!' : 'Email Results'}
            </button>
          </div>
        </div>

        <IndustryReference />
      </div>
    </div>
  );
}

export default EBITDACalculator;
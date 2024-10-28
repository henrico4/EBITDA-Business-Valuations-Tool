import React from 'react';
import { formatCurrency } from '../utils/formatters';

interface FinancialInputsProps {
  financials: {
    revenue: number;
    cogs: number;
    operatingExpenses: number;
    depreciation: number;
    amortization: number;
  };
  onFinancialChange: (field: string, value: number) => void;
  selectedCurrency: string;
}

export function FinancialInputs({ financials, onFinancialChange, selectedCurrency }: FinancialInputsProps) {
  const inputs = [
    { label: 'Revenue', field: 'revenue' },
    { label: 'Cost of Goods Sold (COGS)', field: 'cogs' },
    { label: 'Operating Expenses', field: 'operatingExpenses' },
    { label: 'Depreciation', field: 'depreciation' },
    { label: 'Amortization', field: 'amortization' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Financial Inputs</h2>
      
      <div className="space-y-4">
        {inputs.map(({ label, field }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type="number"
              value={financials[field as keyof typeof financials]}
              onChange={(e) => onFinancialChange(field, Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
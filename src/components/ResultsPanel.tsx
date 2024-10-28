import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { industryMultiples } from '../data/constants';

interface ResultsPanelProps {
  grossProfit: number;
  operatingIncome: number;
  ebitda: number;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  valuationRange: { min: number; max: number };
  selectedMultipleRange: { min: number; max: number } | undefined;
  selectedCurrency: string;
}

export function ResultsPanel({
  grossProfit,
  operatingIncome,
  ebitda,
  selectedIndustry,
  setSelectedIndustry,
  valuationRange,
  selectedMultipleRange,
  selectedCurrency
}: ResultsPanelProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Results & Valuation</h2>
      
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-600">Gross Profit</p>
          <p className="text-lg font-semibold text-gray-800">
            {formatCurrency(grossProfit, selectedCurrency)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Operating Income</p>
          <p className="text-lg font-semibold text-gray-800">
            {formatCurrency(operatingIncome, selectedCurrency)}
          </p>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">EBITDA</p>
          <p className="text-2xl font-bold text-indigo-600">
            {formatCurrency(ebitda, selectedCurrency)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Industry Valuation</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Industry
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {industryMultiples.map((ind) => (
              <option key={ind.industry} value={ind.industry}>
                {ind.industry}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-indigo-50 rounded-xl p-6">
          <p className="text-sm text-gray-600 mb-2">Estimated Valuation Range</p>
          <p className="text-lg font-semibold text-gray-800">
            {formatCurrency(valuationRange.min, selectedCurrency)} - {formatCurrency(valuationRange.max, selectedCurrency)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Based on industry multiple: {selectedMultipleRange?.min}x - {selectedMultipleRange?.max}x
          </p>
        </div>
      </div>
    </div>
  );
}
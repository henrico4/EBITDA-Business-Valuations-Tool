import React from 'react';
import { Building2 } from 'lucide-react';
import { industryMultiples } from '../data/constants';

export function IndustryReference() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Industry Multiples Reference</h2>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {industryMultiples.map((ind) => (
          <div key={ind.industry} className="p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
            <h3 className="font-semibold text-gray-800 mb-2">{ind.industry}</h3>
            <p className="text-gray-600">
              Multiple Range: {ind.multipleRange.min}x - {ind.multipleRange.max}x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
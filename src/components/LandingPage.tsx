import React, { useState } from 'react';
import { Calculator, CheckCircle, ArrowRight, Mail } from 'lucide-react';

interface LandingPageProps {
  onSignup: (user: { name: string; email: string }) => void;
}

export default function LandingPage({ onSignup }: LandingPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    onSignup({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-lg mb-6">
            <Calculator className="h-6 w-6 text-indigo-600" />
            <span className="ml-3 text-indigo-600 font-medium">Business Valuation Tools</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Calculate Your</span>
            <span className="block text-indigo-600">Company's EBITDA</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
            Get instant access to our professional-grade EBITDA calculator. Make informed decisions about your business valuation with industry-specific multiples and detailed analysis.
          </p>
          
          <div className="mt-8 space-y-4">
            {[
              'Industry-specific valuation multiples',
              'Detailed financial breakdown',
              'Downloadable reports',
              'Multi-currency support'
            ].map((feature) => (
              <div key={feature} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6">
          <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-2xl sm:overflow-hidden shadow-xl">
            <div className="px-4 py-8 sm:px-10">
              <div className="mb-6 text-center">
                <Mail className="mx-auto h-12 w-12 text-indigo-500" />
                <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Get Free Access</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your details below to access the EBITDA calculator
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="text-red-500 text-sm text-center">{error}</div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="john@company.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Access Calculator
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>

              <div className="mt-6">
                <p className="text-xs text-center text-gray-500">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                  We'll send you valuable insights about business valuation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
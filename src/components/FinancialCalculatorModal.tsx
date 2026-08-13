import React, { useState } from 'react';
import { X, Calculator, ArrowRight } from 'lucide-react';

interface FinancialCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinancialCalculatorModal: React.FC<FinancialCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'gst' | 'emi'>('gst');

  // GST State
  const [amount, setAmount] = useState<number>(100000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState<boolean>(false);

  // EMI State
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  if (!isOpen) return null;

  // GST Calculation
  let gstAmount = 0;
  let netAmount = 0;
  let grossAmount = 0;

  if (isInclusive) {
    grossAmount = amount;
    netAmount = amount / (1 + gstRate / 100);
    gstAmount = grossAmount - netAmount;
  } else {
    netAmount = amount;
    gstAmount = amount * (gstRate / 100);
    grossAmount = amount + gstAmount;
  }

  // EMI Calculation
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount / totalMonths;

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden flex flex-col my-auto text-left">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#36050B] via-[#580B14] to-[#4A0810] text-white p-6 flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#36050B] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-xl text-white">
                Vitta Vidhi Financial Calculator
              </h3>
              <div className="text-xs text-[#E4BF52]">Instant GST & Loan EMI Estimation</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setTab('gst')}
            className={`flex-1 py-3 text-center text-sm font-bold transition-colors ${
              tab === 'gst'
                ? 'bg-white text-[#580B14] border-b-2 border-[#580B14]'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            GST Calculator
          </button>
          <button
            onClick={() => setTab('emi')}
            className={`flex-1 py-3 text-center text-sm font-bold transition-colors ${
              tab === 'emi'
                ? 'bg-white text-[#580B14] border-b-2 border-[#580B14]'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Bank Loan EMI Calculator
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {tab === 'gst' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">GST Rate (%)</label>
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14]"
                  >
                    <option value={5}>5% (Essential Goods)</option>
                    <option value={12}>12% (Standard Services)</option>
                    <option value={18}>18% (Commercial Services / Goods)</option>
                    <option value={28}>28% (Luxury Items)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs font-semibold text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gstType"
                    checked={!isInclusive}
                    onChange={() => setIsInclusive(false)}
                    className="text-[#580B14] focus:ring-[#580B14]"
                  />
                  <span>GST Exclusive (Add GST)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gstType"
                    checked={isInclusive}
                    onChange={() => setIsInclusive(true)}
                    className="text-[#580B14] focus:ring-[#580B14]"
                  />
                  <span>GST Inclusive (Remove GST)</span>
                </label>
              </div>

              {/* GST Calculation Output Card */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 space-y-3">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Net Amount:</span>
                  <span className="font-bold text-gray-800">₹{netAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>CGST ({(gstRate / 2)}%):</span>
                  <span className="font-bold text-gray-800">₹{(gstAmount / 2).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>SGST ({(gstRate / 2)}%):</span>
                  <span className="font-bold text-gray-800">₹{(gstAmount / 2).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-2 border-t border-gray-300 flex justify-between text-base font-bold text-[#580B14]">
                  <span>Total Gross Amount:</span>
                  <span>₹{grossAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Interest Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tenure (Years)</label>
                  <input
                    type="number"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14]"
                  />
                </div>
              </div>

              {/* EMI Calculation Output Card */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 space-y-3">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Monthly EMI:</span>
                  <span className="font-extrabold text-base text-[#580B14]">₹{Math.round(emi).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Principal Amount:</span>
                  <span className="font-bold text-gray-800">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Total Payable Interest:</span>
                  <span className="font-bold text-gray-800">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-gray-300 flex justify-between text-sm font-bold text-gray-900">
                  <span>Total Loan Payment:</span>
                  <span>₹{Math.round(totalPayment).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Need an official Project Report or CMA Data for bank loan approval?
          </div>
          <button
            onClick={() => {
              onClose();
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2 rounded-full bg-gold-gradient text-[#36050B] text-xs font-bold shadow flex items-center space-x-1.5"
          >
            <span>Request Bank DPR</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#36050B]" />
          </button>
        </div>

      </div>
    </div>
  );
};

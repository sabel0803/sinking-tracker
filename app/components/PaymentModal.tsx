'use client';

import { X, CreditCard, PieChart } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'loan' | 'contribution';
}

export default function PaymentModal({ isOpen, onClose, type }: ModalProps) {
  if (!isOpen) return null;

  const isLoan = type === 'loan';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-page">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className={`p-8 ${isLoan ? 'bg-blue-600' : 'bg-[#582C8B]'} text-white flex justify-between items-center`}>
          <div className="flex items-center gap-3">
            {isLoan ? <CreditCard size={24} /> : <PieChart size={24} />}
            <h2 className="text-xl font-bold tracking-tight">
              {isLoan ? 'New Loan Payment' : 'New Contribution'}
            </h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form className="p-10 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Member Name</label>
              <input type="text" placeholder="Search member..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none font-medium" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Amount (₱)</label>
              <input type="number" placeholder="0.00" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none font-medium" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Date</label>
              <input type="date" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none font-medium text-slate-500" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Reference / Receipt Link</label>
            <input type="text" placeholder="G-Cash Ref # or Drive Link" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none font-medium" />
          </div>

          <button 
            type="submit" 
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-transform active:scale-95 ${isLoan ? 'bg-blue-600 shadow-blue-100' : 'bg-[#582C8B] shadow-purple-100'}`}
          >
            Confirm Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
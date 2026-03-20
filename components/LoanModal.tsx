"use client";
import { X, Landmark } from "lucide-react";

export default function LoanModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-page">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="p-8 bg-blue-600 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Landmark size={24} />
            <h2 className="text-xl font-bold tracking-tight">
              New Loan Application
            </h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="p-10 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Member Name
              </label>
              <input
                type="text"
                placeholder="Select member..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Principal Amount
              </label>
              <div className="relative group">
                {" "}
                {/* Added group for hover effects */}
                {/* The Peso Sign */}
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400 z-10 pointer-events-none transition-colors group-focus-within:text-blue-500">
                  ₱
                </span>
                {/* The Input with pl-12 to prevent overlap */}
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl 
                 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none 
                 transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                placeholder="5"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Duration (Months)
              </label>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400">
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Co-Maker / Guarantor
            </label>
            <div className="relative group">
              {/* Icon on the left */}
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none group-focus-within:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>

              {/* The Select Dropdown */}
              <select
                className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl 
                 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none 
                 transition-all font-semibold text-slate-700 appearance-none cursor-pointer"
              >
                <option value="" disabled selected>
                  Select a co-maker
                </option>
                <option value="1">Arcebel Pro</option>
                <option value="2">Benson Akinyemi</option>
                <option value="3">John Doe</option>
                <option value="4">Jane Smith</option>
              </select>

              {/* Custom Arrow on the right */}
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="flex justify-between items-center text-sm font-bold text-blue-700">
              <span>Estimated Monthly:</span>
              <span>₱0.00</span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all transform active:scale-95"
          >
            Submit Loan Application
          </button>
        </form>
      </div>
    </div>
  );
}

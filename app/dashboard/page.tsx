"use client";
import { useState } from "react";
import PaymentModal from "../components/PaymentModal";

export default function Dashboard() {
  // 1. Added the missing state to track which modal is open
  const [modalType, setModalType] = useState<"loan" | "contribution" | null>(
    null,
  );
  const Payments = [
    { name: "John Doe", type: "Loan", amount: "50,000", status: "Pending" },
    { name: "Sarah Jen", type: "Loan", amount: "15,000", status: "Completed" },
    { name: "Mike Ross", type: "Loan", amount: "25,000", status: "Pending" },
    { name: "Mike Ross", type: "Loan", amount: "25,000", status: "Pending" },
    { name: "Mike Ross", type: "Loan", amount: "25,000", status: "Pending" },
    { name: "Mike Ross", type: "Loan", amount: "25,000", status: "Pending" },
    { name: "Mike Ross", type: "Loan", amount: "25,000", status: "Pending" },
    { name: "Mike Ross", type: "Loan", amount: "25,000", status: "Pending" },
  ];
  return (
    <div className="p-10 w-full bg-[#F8F9FA] min-h-screen font-sans">
      {/* Unified Header */}
      <header className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, Arcebel
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Fri, 20 Mar 10:11 AM • Here's your tracker summary
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Action Buttons with state triggers */}
          <div className="flex gap-3 mr-4">
            <button
              onClick={() => setModalType("contribution")}
              className="px-6 py-3 bg-[#582C8B] text-white rounded-2xl font-bold shadow-lg shadow-purple-100 hover:bg-[#45226d] transition-all transform active:scale-95"
            >
              + Add Contribution
            </button>
            <button
              onClick={() => setModalType("loan")}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all transform active:scale-95"
            >
              + Loan Payment
            </button>
          </div>

          <button className="p-3 bg-white rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-xl">
            🔔
          </button>
          <button className="p-3 bg-white rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-xl">
            ⚙️
          </button>
        </div>
      </header>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard
          title="Total Contributions"
          amount="₱1.25m"
          percentage="+40%"
          color="bg-purple-100"
        />
        <StatCard
          title="Total Loans"
          amount="₱230k"
          percentage="+40%"
          color="bg-indigo-100"
        />
        <StatCard
          title="Available Balance"
          amount="₱1.02m"
          percentage="+40%"
          color="bg-slate-100"
        />
      </div>

      {/* The Big White Payments Container */}
      {/* 1. Wrapper with fixed height and scroll */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Recent Payments</h2>
          {/* ... filter/sort buttons ... */}
        </div>

        {/* 2. The scrollable container */}
        <div className="max-h-[370px] overflow-y-auto pr-2 custom-scrollbar">
          <table className="w-full text-left table-fixed border-separate border-spacing-0">
            <thead className="text-slate-400 text-xs uppercase tracking-wider sticky top-0 bg-white z-10">
              <tr>
                {/* 3. Each column has exactly 1/4 width (w-1/4) */}
                <th className="pb-5 font-semibold w-1/4 border-b border-slate-50">
                  Name
                </th>
                <th className="pb-5 font-semibold w-1/4 border-b border-slate-50">
                  Type
                </th>
                <th className="pb-5 font-semibold w-1/4 border-b border-slate-50">
                  Amount
                </th>
                <th className="pb-5 font-semibold w-1/4 border-b border-slate-50">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {Payments.map((payment, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                >
                  <td className="py-4 text-slate-500 font-medium truncate pr-4">
                    {payment.name}
                  </td>
                  <td className="py-4 font-bold text-slate-800 truncate pr-4">
                    {payment.type}
                  </td>
                  <td className="py-4 font-semibold text-slate-700">
                    ₱{payment.amount}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase inline-block whitespace-nowrap ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Added the Modal Component at the end of the JSX */}
      <PaymentModal
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        type={modalType || "contribution"}
      />
    </div>
  );
}

function StatCard({ title, amount, percentage, color }: any) {
  return (
    <div
      className={`p-8 rounded-[2rem] ${color} relative overflow-hidden flex flex-col justify-between h-40 shadow-sm border border-white/50`}
    >
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
        {title}
      </p>
      <div className="flex items-end gap-3">
        <h3 className="text-3xl font-black text-slate-900">{amount}</h3>
        <span className="text-sm font-bold text-green-600 mb-1">
          ↑ {percentage}
        </span>
      </div>
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-4 border-white/30"></div>
    </div>
  );
}

// app/dashboard/loans/page.js
"use client";
import LoanModal from "@/components/LoanModal";
import { useState } from "react";

export default function LoanHistory() {
  const loans = [
    {
      id: "L-001",
      member: "John Doe",
      principal: "50,000",
      interest: "5,000",
      paid: "20,000",
      status: "Active",
    },
    {
      id: "L-002",
      member: "Sarah Jen",
      principal: "15,000",
      interest: "1,500",
      paid: "16,500",
      status: "Completed",
    },
    {
      id: "L-003",
      member: "Mike Ross",
      principal: "25,000",
      interest: "2,500",
      paid: "0",
      status: "Overdue",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-10 bg-[#F8F9FA] min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Loan Management
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Track disbursements and repayment progress
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all transform active:scale-95"
        >
          + Apply Loan
        </button>
      </header>

      {/* Loan Specific Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
            Total Outstanding
          </p>
          <h3 className="text-3xl font-black text-slate-900">₱145,000</h3>
        </div>
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
            Active Loans
          </p>
          <h3 className="text-3xl font-black text-purple-600">12 Members</h3>
        </div>
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
            Total Interest Earned
          </p>
          <h3 className="text-3xl font-black text-green-600">₱12,400</h3>
        </div>
      </div>

      {/* Main Loan Table */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
        <table className="w-full text-left">
          <thead className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-50">
            <tr>
              <th className="pb-5 font-semibold">Loan ID</th>
              <th className="pb-5 font-semibold">Member</th>
              <th className="pb-5 font-semibold">Principal</th>
              <th className="pb-5 font-semibold">Balance</th>
              <th className="pb-5 font-semibold">Status</th>
              <th className="pb-5 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loans.map((loan) => (
              <tr
                key={loan.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-6 text-slate-400 font-medium">{loan.id}</td>
                <td className="py-6 font-bold text-slate-800">{loan.member}</td>
                <td className="py-6 font-semibold text-slate-700">
                  ₱{loan.principal}
                </td>
                <td className="py-6 text-slate-500">
                  {/* Calculate remaining balance */}₱
                  {(
                    Number(loan.principal.replace(",", "")) +
                    Number(loan.interest.replace(",", "")) -
                    Number(loan.paid.replace(",", ""))
                  ).toLocaleString()}
                </td>
                <td className="py-6">
                  <span
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                      loan.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : loan.status === "Overdue"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>
                <td className="py-6 text-right">
                  <button className="text-slate-400 hover:text-slate-900 font-bold text-lg">
                    •••
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <LoanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

"use client";
import { getContributions, getPendingContributions } from "@/app/service/Contribution.service";
import { Check, X, ExternalLink, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function ApprovalsPage() {
 const [pendingPayments, setPendingPayments] = useState<any[]>([]);
 const loadPayments = async () => {
    const data = await getPendingContributions();
    console.log("Loaded contributions:", data); // Debug log --- IGNORE ---
    setPendingPayments(data);
  };

  const pendingRequests = [
    {
      id: "REQ-001",
      name: "Arcebel Pro",
      type: "Contribution",
      amount: "5,000",
      date: "20/03/2026",
      receipt: "#",
    },
    {
      id: "REQ-002",
      name: "Benson Ak",
      type: "Loan Payment",
      amount: "12,000",
      date: "19/03/2026",
      receipt: "#",
    },
  ];

  return (
    <div className="p-10 bg-[#F8F9FA] min-h-screen font-sans animate-page">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Review Queue
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Verify receipts and approve pending transactions
        </p>
      </header>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-50">
              <th className="pb-5 font-bold w-[30%]">Member & Date</th>
              <th className="pb-5 font-bold w-[20%] text-center">Type</th>
              <th className="pb-5 font-bold w-[20%] text-center">Amount</th>
              <th className="pb-5 font-bold w-[15%] text-center">Receipt</th>
              <th className="pb-5 font-bold w-[15%] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {pendingPayments.map((req) => (
              <tr
                key={req.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="py-6">
                  <p className="font-bold text-slate-800">{req.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {req.date} • {req.id}
                  </p>
                </td>
                <td className="py-6 text-center">
                  <span
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                      req.type === "Contribution"
                        ? "bg-purple-50 text-purple-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {req.type}
                  </span>
                </td>
                <td className="py-6 text-center font-black text-slate-900">
                  ₱{req.amount}
                </td>
                <td className="py-6 text-center">
                  <button className="inline-flex items-center gap-2 text-[#582C8B] font-bold text-xs hover:underline">
                    <ImageIcon size={14} /> View
                  </button>
                </td>
                <td className="py-6">
                  <div className="flex justify-end gap-2">
                    {/* Reject Button */}
                    <button className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm shadow-red-100">
                      <X size={18} />
                    </button>
                    {/* Approve Button */}
                    <button className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm shadow-green-100">
                      <Check size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pendingRequests.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium italic">
              Everything is caught up! No pending reviews.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

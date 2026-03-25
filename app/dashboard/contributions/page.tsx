// app/dashboard/contributions/page.js
"use client";
import { getContributions } from "@/app/service/Contribution.service";
import { useEffect, useState } from "react";

export default function ContributionsPage() {
  const [contributionsTotal, setContributionsTotal] = useState(0);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [contributions, setContributions] = useState<any[]>([]);
  useEffect(() => {
    const unsubscribe = getContributions((data, total) => {
      setContributions(data);
      setContributionsTotal(total);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);
  return (
    <div className="p-10 bg-[#F8F9FA] min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contribution History
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Manage and verify member uploads
        </p>
      </header>
      {/* Loan Specific Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
            Total Contributions
          </p>
          <h3 className="text-3xl font-black text-slate-900">
            ₱{" "}
            {Number(contributionsTotal).toLocaleString("en-PH", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
        </div>
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
            Active Members
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
      {/* Table Container - matching the 'Bento' style */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Recent Payments</h2>
          {/* ... filter/sort buttons ... */}
        </div>
        <div className="max-h-[370px] overflow-y-auto pr-2 custom-scrollbar">
          <table className="w-full text-left table-fixed border-separate border-spacing-0">
            <thead className="text-slate-400 text-xs uppercase tracking-wider sticky top-0 bg-white z-10">
              <tr>
                <th className="pb-5 font-semibold w-1/4 border-b border-slate-50">
                  ID
                </th>
                <th className="pb-5 font-semibold w-1/4 border-b border-slate-50">
                  Member
                </th>

                <th className="pb-5 font-semibold w-1/4 border-b border-slate-50">
                  Amount
                </th>
                <th className="pb-5 font-semibold w-1/4 border-b border-slate-50">
                  Date
                </th>
                <th className="pb-5 font-semibold w-1/4 border-b border-slate-50 text-center">
                  Receipt
                </th>
                <th className="pb-5 font-semibold w-1/4 border-b border-slate-50 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {contributions.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                >
                  <td className="py-4 text-slate-500 font-medium truncate pr-4">
                    {item.id}
                  </td>
                  <td className="py-4 font-bold text-slate-800 truncate pr-4">
                    {item.name}
                  </td>
                  <td className="py-4 font-semibold text-slate-700">
                    ₱{item.amount}
                  </td>
                  <td className="py-4 text-slate-500">{"DATE"}</td>
                  <td className="py-4 text-center">
                    <a
                      href="#"
                      className="text-purple-600 hover:text-purple-800 font-bold text-xs underline decoration-2 underline-offset-4"
                    >
                      View File
                    </a>
                  </td>
                  <td className="py-6 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[10px]  font-black uppercase tracking-wider ${
                        item.status === "Paid" || item.status === "Verified"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// app/dashboard/interest/page.js

export default function InterestHistory() {
  const interestRecords = [
    { id: "INT-101", loanId: "L-001", member: "John Doe", amount: "5,000", date: "20/03/2026", type: "Fixed 10%" },
    { id: "INT-102", loanId: "L-005", member: "Sarah Jen", amount: "1,500", date: "18/03/2026", type: "Fixed 10%" },
    { id: "INT-103", loanId: "L-009", member: "Mike Ross", amount: "2,500", date: "15/03/2026", type: "Compounded" },
  ];

  return (
    <div className="p-10 bg-[#F8F9FA] min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Interest Earnings</h1>
        <p className="text-slate-500 font-medium mt-1">Summary of income generated from loan interests</p>
      </header>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-8 rounded-[2rem] bg-indigo-900 text-white shadow-lg relative overflow-hidden">
          <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">Total Interest Earned</p>
          <h3 className="text-3xl font-black">₱245,600</h3>
          {/* Subtle decorative circle */}
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
        </div>
        
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Collected This Month</p>
          <h3 className="text-3xl font-black text-green-600">₱12,450</h3>
        </div>

        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Pending Collections</p>
          <h3 className="text-3xl font-black text-amber-500">₱8,900</h3>
        </div>
      </div>

      {/* Interest Log Table */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-800">Interest Log</h2>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">Download Report ↓</button>
        </div>

        <table className="w-full text-left">
          <thead className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-50">
            <tr>
              <th className="pb-5 font-semibold">Transaction</th>
              <th className="pb-5 font-semibold">Member</th>
              <th className="pb-5 font-semibold">Loan Reference</th>
              <th className="pb-5 font-semibold">Rate Type</th>
              <th className="pb-5 font-semibold">Amount</th>
              <th className="pb-5 font-semibold text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {interestRecords.map((record) => (
              <tr key={record.id} className="hover:bg-indigo-50/30 transition-colors group">
                <td className="py-6 text-slate-400 font-medium">{record.id}</td>
                <td className="py-6 font-bold text-slate-800">{record.member}</td>
                <td className="py-6 text-slate-500 font-mono text-xs">{record.loanId}</td>
                <td className="py-6">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold">
                    {record.type}
                  </span>
                </td>
                <td className="py-6 font-black text-green-600">+₱{record.amount}</td>
                <td className="py-6 text-right text-slate-500 font-medium">{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
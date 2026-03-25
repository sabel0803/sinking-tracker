"use client"; // Required for usePathname

import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to get current URL
import { LayoutDashboard, Receipt, FileText, LifeBuoy } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname(); // This gets the current path (e.g., /dashboard/loans)

  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    console.log("Loaded user from localStorage:", storedUser); // Debug log
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Contribution History",
      path: "/dashboard/contributions",
      icon: <Receipt size={20} />,
    },
    {
      name: "Loan Management",
      path: "/dashboard/loans",
      icon: <Receipt size={20} />,
    },
    {
      name: "Interest History",
      path: "/dashboard/interest",
      icon: <FileText size={20} />,
    },
    {
      name: "Approvals",
      path: "/dashboard/approvals",
      icon: <FileText size={20} />,
    },
  ];

  return (
    <div className="w-72 bg-[#582C8B] text-white flex flex-col p-6 min-h-screen sticky top-0 h-screen">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center font-bold">
          S
        </div>
        <span className="text-xl font-bold tracking-tight">
          Sinking Tracker
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {menu.map((item) => {
          // Check if the current path matches the item path
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out transform ${
                isActive
                  ? "bg-white text-[#582C8B] font-bold shadow-md scale-105" // Grows slightly when active
                  : "hover:bg-white/10 text-white/80 hover:translate-x-1" // Slides right slightly on hover
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-4 pt-10 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-2 text-white/70 hover:text-white cursor-pointer transition-colors">
          <LifeBuoy size={20} /> <span className="text-sm">Support</span>
        </div>

        <div className="flex items-center gap-3 mt-4 p-2 bg-white/10 rounded-2xl">
          <div className="w-10 h-10 bg-slate-400 rounded-full"></div>
          <div className="text-xs">
            <p className="font-bold">Admin User</p>
            <p className="opacity-60 text-[10px]">{user?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

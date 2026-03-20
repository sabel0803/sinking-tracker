"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react"; // Import icons
import { addDoc, collection } from "firebase/firestore";
import { db } from "./config/firebase";
import { checklogin, getUsers } from "./service/User.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for visibility
  const router = useRouter();

  async function addUser() {
    // const adduser = await addDoc(collection(db, "users"), {
    //   name: "Juvy Boiser",
    //   email: "juvy.boiser@gmail.com",
    //   age: 25,
    //   createdAt: new Date(),
    //   password: "123456",
    //   role: "member",
    // });
    // try {
    //   const docRef = await addDoc(collection(db, "users"), {
    //     name: "John Doe",
    //     email: "john@example.com",
    //     age: 25,
    //     createdAt: new Date(),
    //   });

    //   console.log("Document written with ID:", docRef.id);
    // } catch (error) {
    //   console.error("Error adding document:", error);
    // }
    const data = await getUsers();

    console.log(data);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await checklogin({ email, password });

    if (user) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md animate-page">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#582C8B] rounded-2xl flex items-center justify-center shadow-lg mb-4 transform -rotate-6 transition-transform hover:rotate-0 cursor-default">
            <span className="text-white text-3xl font-black">A</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Agoy Finance
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Sinking Fund Tracker
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#582C8B] focus:bg-white outline-none transition-all font-medium text-slate-700"
              />
            </div>

            <div className="relative">
              {" "}
              {/* Relative container for the icon */}
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Dynamic type
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-4 pr-12 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#582C8B] focus:bg-white outline-none transition-all font-medium text-slate-700"
                />
                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#582C8B] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              className="w-full bg-[#582C8B] hover:bg-[#45226d] text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transition-all transform active:scale-95 flex justify-center items-center gap-2 mt-4"
              onClick={() => addUser()}
            >
              Sign In to Dashboard
            </button>
            {/* </form> */}

            <div className="mt-8 text-center">
              <p className="text-xs text-slate-400 font-medium">
                Forgot password?{" "}
                <span className="text-[#582C8B] cursor-pointer hover:underline font-bold">
                  Contact Admin
                </span>
              </p>
            </div>
          </form>
        </div>

        <p className="text-center mt-10 text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">
          Powered by Sinking-Tracker v1.0
        </p>
      </div>
    </main>
  );
}

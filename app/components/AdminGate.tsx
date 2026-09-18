"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const AUTHORIZED_EMAIL = "ezraakush@gmail.com";
const PASSCODE = "Dev#101";
const STORAGE_KEY = "admin_auth";

export default function AdminGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(STORAGE_KEY) === "true";
    }
    return false;
  });
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email.toLowerCase().trim() !== AUTHORIZED_EMAIL) {
      setError("Invalid email");
      return;
    }

    if (passcode !== PASSCODE) {
      setError("Invalid passcode");
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setEmail("");
    setPasscode("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="border border-[#262626] bg-[#111111] p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 border border-[#a3e635]/30 flex items-center justify-center">
                <Lock size={18} className="text-[#a3e635]" />
              </div>
              <div>
                <h2 className="font-mono text-sm text-white">ADMIN_ACCESS</h2>
                <p className="font-mono text-[10px] text-[#737373] tracking-widest">
                  AUTHORIZED_PERSONNEL_ONLY
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                  EMAIL:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#a3e635] transition-colors"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#737373] tracking-widest block mb-2">
                  PASSCODE:
                </label>
                <div className="relative">
                  <input
                    type={showPasscode ? "text" : "password"}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#262626] text-white font-mono text-sm px-4 py-3 pr-12 focus:outline-none focus:border-[#a3e635] transition-colors"
                    placeholder="Enter passcode"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-white transition-colors"
                  >
                    {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 border border-red-500/30 bg-red-500/5">
                  <span className="font-mono text-[10px] text-red-400 tracking-widest">
                    {error.toUpperCase()}
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#a3e635] text-[#0a0a0a] font-mono text-xs tracking-widest py-3 hover:bg-[#bef264] transition-colors"
              >
                AUTHENTICATE( )
              </button>
            </form>
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="font-mono text-[10px] text-[#737373] hover:text-[#a3e635] transition-colors tracking-widest"
            >
              {'<- BACK_TO_SITE( )'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Logout button */}
      <div className="fixed top-20 right-6 lg:right-12 z-50">
        <button
          onClick={handleLogout}
          className="font-mono text-[10px] text-[#737373] hover:text-[#a3e635] transition-colors tracking-widest border border-[#262626] px-3 py-1.5 bg-[#0a0a0a]/90 backdrop-blur-sm"
        >
          LOGOUT( )
        </button>
      </div>
      {children}
    </div>
  );
}

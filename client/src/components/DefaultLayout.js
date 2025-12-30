import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import Footer from "./footer/Footer";
import { Menu as MenuIcon, X } from "lucide-react";

function DefaultLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = user ? "/login" : "/adminlogin";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 bg-zinc-950 font-sans selection:bg-yellow-500 selection:text-black">

      {/* Floating Island Navbar */}
      <header className="fixed top-4 md:top-6 left-0 right-0 mx-auto w-[95%] md:w-[92%] max-w-7xl z-50">
        <div className="glass-panel rounded-full px-4 md:px-6 py-3 flex justify-between items-center shadow-2xl transition-all duration-300 hover:border-yellow-500/30">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.5)] group-hover:scale-110 transition-transform">
              <span className="text-black font-black text-lg">B</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-['Outfit']">
              Ride<span className="text-yellow-500">X</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 bg-white/5 px-8 py-2 rounded-full border border-white/5">
            {[
              { name: "Home", path: "/" },
              user && { name: "Bookings", path: "/userbookings" },
              user && { name: "Profile", path: "/profile" },
              admin && { name: "Admin", path: "/admin" },
            ]
              .filter(Boolean)
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-all ${isActive(item.path)
                    ? "text-yellow-500 shadow-[0_10px_20px_-10px_rgba(234,179,8,0.5)] scale-105"
                    : "text-zinc-400 hover:text-white"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* User/Login */}
            {(user || admin) ? (
              <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
                <div className="text-right hidden lg:block">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Signed in</p>
                  <p className="text-xs font-bold text-zinc-100 max-w-[80px] truncate">
                    {user ? user.username : admin.username}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="px-5 py-2 rounded-full bg-white text-zinc-900 text-xs font-bold hover:scale-105 transition-transform shadow-lg">
                  LOGIN
                </button>
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-zinc-100"
            >
              {menuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="mt-4 glass-panel rounded-3xl p-6 md:hidden animate-fade-up border border-white/10 mx-2">
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-zinc-100">Home</Link>
              {user && <Link to="/userbookings" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-zinc-100">My Bookings</Link>}
              {user && <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-zinc-100">My Profile</Link>}
              {admin && <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-zinc-100">Admin Panel</Link>}
              <div className="h-px bg-zinc-800 my-2"></div>
              {(user || admin) ? (
                <button onClick={handleLogout} className="w-full py-3 bg-red-500 text-white rounded-xl font-bold">LOGOUT</button>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full py-3 bg-white text-zinc-900 rounded-xl font-bold text-center">LOGIN</Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-0 relative z-10">
        {children}
      </main>

      {/* Simplified Footer */}
      <footer className="py-8 bg-zinc-900/50 border-t border-zinc-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© 2024 RideX Rental System. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default DefaultLayout;

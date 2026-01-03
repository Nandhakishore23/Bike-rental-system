// import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../redux/actions/adminActions";
import { Link, useHistory } from "react-router-dom"; // Added useHistory
import Spinner from "../components/Spinner";
import { FaUserAlt, FaLock } from "react-icons/fa";

function AdminLogin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(e) {
    e.preventDefault();
    const values = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    dispatch(adminLogin(values));
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">

      {/* Background Animated Blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {loading && <Spinner />}

      {/* Glassmorphic Admin Login Card */}
      <form
        onSubmit={onFinish}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl shadow-2xl 
                   backdrop-blur-2xl bg-white/10 border border-white/20
                   transition-transform hover:scale-[1.01]"
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-white mb-2 tracking-wide">
          Admin Login
        </h1>
        <p className="text-center text-gray-300 mb-8 text-sm">
          Login to manage the rides 🚴
        </p>

        {/* Username */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Username
          </label>
          <div className="flex items-center px-4 py-3 rounded-xl bg-white/20 text-white 
                          border border-white/30 focus-within:ring-2 focus-within:ring-orange-500">
            <FaUserAlt className="mr-3 text-gray-300" />
            <input
              type="text"
              name="username"
              required
              className="w-full bg-transparent outline-none placeholder-gray-300 text-white"
              placeholder="Enter username"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Password
          </label>
          <div className="flex items-center px-4 py-3 rounded-xl bg-white/20 text-white 
                          border border-white/30 focus-within:ring-2 focus-within:ring-red-500">
            <FaLock className="mr-3 text-gray-300" />
            <input
              type="password"
              name="password"
              required
              className="w-full bg-transparent outline-none placeholder-gray-300 text-white"
              placeholder="Enter password"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 
                     text-white font-semibold shadow-lg hover:from-orange-600 hover:to-red-700 
                     transition-transform transform hover:scale-105"
        >
          Login
        </button>

        {/* Links */}
        <div className="text-center mt-6 space-y-2">
          <Link
            to="/adminregister"
            className="block text-sm text-purple-300 hover:text-orange-600 transition"
          >
            Admin Register
          </Link>
          <Link
            to="/login"
            className="block text-sm text-pink-300 hover:text-orange-600 transition"
          >
            User Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;

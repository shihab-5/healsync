"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { HeartFill } from "@gravity-ui/icons";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate an API call for JWT Authentication
      // Replace this block with your actual fetch/axios call to your auth endpoint
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (formData.email === "test@example.com" && formData.password === "password123") {
            resolve({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulated_token" });
          } else {
            reject(new Error("Invalid email or password."));
          }
        }, 1000);
      });

      // Handle Success (e.g., save JWT to localStorage/cookies and redirect)
      console.log("Login successful! JWT Received.");
      // localStorage.setItem("token", response.token);
      // router.push("/dashboard");

    } catch (err) {
      // Handle Error
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      
      {/* Background Layer (Matches Register Page) */}
      <div className="absolute inset-0 z-0 bg-[#dcfce7]">
        {/* Medical Image */}
        <div 
          className="absolute top-0 left-0 right-0 h-[65vh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/group-diverse-healthcare-professionals-including-doctors-nurses-medical-assistants-are-working-together-modern-clinic-demonstrating-teamwork-collaboration-medical-field_520881-2122.jpg')" }}
        >
          {/* Gradient overlay to fade the image into the background color */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-[#dcfce7]/60 to-[#dcfce7]"></div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 mt-8 mb-8">
        
        {/* Header & Logo */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-3 cursor-pointer group select-none mb-8">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400 shadow-sm transition-all duration-500">
              <span className="text-white flex items-center justify-center">
                <HeartFill size={14} />
              </span>
            </div>
            <div className="flex items-center font-black text-xl tracking-tight">
              <span className="text-teal-800">H</span>
              <span className="text-teal-700">e</span>
              <span className="text-teal-600">a</span>
              <span className="text-teal-600">l</span>
              <span className="text-teal-500">S</span>
              <span className="text-teal-500">y</span>
              <span className="text-teal-400">n</span>
              <span className="text-teal-400">c</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2 text-center sm:text-left w-full">Welcome back</h2>
          <p className="text-gray-500 text-sm text-center sm:text-left w-full">Securely access your medical portal.</p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-gray-900">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-teal-600 hover:text-teal-500 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-600 focus:outline-none transition-colors"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            variant="solid" 
            isLoading={isLoading}
            className="w-full bg-teal-600/90 text-white font-semibold py-6 rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

        </form>

        {/* Divider */}
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
            <span className="px-3 bg-white text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* Google Auth Button */}
        <div className="mt-6">
          <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>

        {/* Footer Register Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-teal-600 hover:text-teal-500 hover:underline">
            Register now
          </Link>
        </p>
      </div>

      {/* Optional Footer Text mimicking your screenshot */}
      <div className="relative z-10 pb-6 text-xs text-teal-800/60 font-medium">
        © 2026 HealSync. Compassionate care, delivered digitally.
      </div>
      
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { HeartFill } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function Register() {
  const router = useRouter();
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoType: "upload", // 'upload' or 'url'
    photoFile: null,
    photoUrl: "",
    role: "patient", // default starting role selection
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photoFile: e.target.files[0] }));
    }
  };

  // Helper function to transform a file upload into a Base64 string for better-auth payload compatibility
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Strong Password Validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 6 characters and include one number and one special character.");
      return;
    }

    if (!formData.name || !formData.email) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      let imagePayload = "";

      // Handle photo formatting based on active layout type selection
      if (formData.photoType === "upload" && formData.photoFile) {
        imagePayload = await convertFileToBase64(formData.photoFile);
      } else if (formData.photoType === "url" && formData.photoUrl) {
        imagePayload = formData.photoUrl;
      }

      // Execute better-auth client signup
    const { data: res, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: imagePayload,
        role: formData.role, // Pass the role straight to better-auth
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Registration failed.");
      }

      toast.success("Account created successfully! Redirecting...");
      
      // Reset form controls
 // Reset form controls
      setFormData({
        name: "",
        email: "",
        password: "",
        photoType: "upload",
        photoFile: null,
        photoUrl: "",
        role: "patient", 
      });

      // Navigate straight to homepage or dashboard workspace
      router.push("/");

    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-[#dcfce7] /* Light mint/teal base */">
        {/* Medical Image */}
        <div 
          className="absolute top-0 left-0 right-0 h-[65vh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/group-diverse-healthcare-professionals-including-doctors-nurses-medical-assistants-are-working-together-modern-clinic-demonstrating-teamwork-collaboration-medical-field_520881-2122.jpg')" }}
        >
          {/* Gradient overlay to fade the image into the background color */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-[#dcfce7]/60 to-[#dcfce7]"></div>
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="relative z-10 max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 mt-8 mb-8">
        
        {/* Header, Logo & Role Toggle */}
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center gap-3 cursor-pointer group select-none mb-6">
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

          {/* Role Selection Tabs */}
          <div className="w-full flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, role: "patient" }))}
              className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition-all ${
                formData.role === "patient"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign up as Patient
            </button>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, role: "doctor" }))}
              className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition-all ${
                formData.role === "doctor"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign up as Doctor
            </button>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Create Account</h2>
          <p className="text-gray-500 text-sm capitalize">Join HealSync as a {formData.role}</p>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Email</label>
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
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Profile Photo (Toggle between Upload and URL) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-gray-900">Profile Photo <span className="text-gray-400 font-normal">(Optional)</span></label>
              
              <div className="flex bg-gray-100 rounded-md p-0.5">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, photoType: "upload" }))}
                  className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${formData.photoType === "upload" ? "bg-white shadow-sm text-teal-700" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, photoType: "url" }))}
                  className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${formData.photoType === "url" ? "bg-white shadow-sm text-teal-700" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Link
                </button>
              </div>
            </div>

            {formData.photoType === "upload" ? (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:bg-gray-50 transition-colors cursor-pointer relative">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none">
                      <span>Click to upload photo</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                  </div>
                  {formData.photoFile && <p className="text-xs text-teal-600 font-medium">{formData.photoFile.name}</p>}
                </div>
              </div>
            ) : (
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input
                  name="photoUrl"
                  type="url"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
                  placeholder="https://example.com/your-photo.jpg"
                />
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Password</label>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-gray-500">Must be 6+ characters, with at least 1 number and 1 special character.</p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            variant="solid" 
            isLoading={isLoading}
            className="w-full bg-teal-600/90 text-white font-semibold py-6 rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
          >
            Create Account
          </Button>

        </form>

        {/* Divider */}
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">Or continue with</span>
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
            Continue with Google
          </button>
        </div>

        {/* Footer Login Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-teal-600 hover:text-teal-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      
    </div>
  );
}

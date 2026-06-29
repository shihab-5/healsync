"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Chip } from "@heroui/react";
import { HeartFill } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoType: "upload", // 'upload' or 'url'
    photoFile: null,
    photoUrl: "",
    role: "patient", // 'patient' or 'doctor'
    
    // Doctor Specific Fields
    specialization: "",
    qualifications: "",
    experience: "",
    consultationFee: "",
    hospitalName: "",
    availableDays: [], // e.g., ['Monday', 'Wednesday']
    availableSlots: [], // e.g., ['09:00 AM', '11:00 AM']
  });

  const DAYS_OPTIONS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const TIME_OPTIONS = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photoFile: e.target.files[0] }));
    }
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handleSlotToggle = (slot) => {
    setFormData((prev) => ({
      ...prev,
      availableSlots: prev.availableSlots.includes(slot)
        ? prev.availableSlots.filter((s) => s !== slot)
        : [...prev.availableSlots, slot],
    }));
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const validateStep1 = () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (!formData.name || !formData.email) {
      toast.error("Please fill out all required fields.");
      return false;
    }
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 6 characters and include one number and one special character.");
      return false;
    }
    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Determine image payload
    let imagePayload = "";
    if (formData.photoType === "upload" && formData.photoFile) {
      imagePayload = await convertFileToBase64(formData.photoFile);
    } else if (formData.photoType === "url" && formData.photoUrl) {
      imagePayload = formData.photoUrl;
    }

    // 1. Create Auth Account (Both Roles)
    // CRITICAL: We pass disableRedirect: true so the browser doesn't leave the page yet
    const { data: authRes, error: authError } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: imagePayload,
      role: formData.role, 
      callbackURL: "/",
      disableRedirect: true, // <-- Prevents the auth library from cutting off execution
    });

    if (authError) {
      throw new Error(authError.message || "Authentication registration failed.");
    }

    // 2. If the user is a Doctor, sync their professional details to the Express backend
    if (formData.role === "doctor") {
      const docResponse = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: authRes?.user?.id, // Optional: Best practice to link via unique Auth ID if available
          email: formData.email.toLowerCase(),
          doctorName: formData.name,
          specialization: formData.specialization,
          qualifications: formData.qualifications,
          experience: Number(formData.experience),
          consultationFee: Number(formData.consultationFee),
          hospitalName: formData.hospitalName,
          profileImage: imagePayload,
          availableDays: formData.availableDays,
          availableSlots: formData.availableSlots,
          verificationStatus: "pending",
        }),
      });

      if (!docResponse.ok) {
        const docErr = await docResponse.json();
        throw new Error(docErr.message || "Auth user created, but failed saving doctor profile registries.");
      }
    }

    // 3. Success! Show message and manually route home since both records are secure
    toast.success("Account created successfully! Redirecting...");
    router.push("/");
    router.refresh(); // Refreshes the server session state context

  } catch (err) {
    console.error("Registration flow aborted:", err);
    toast.error(err.message || "An unexpected error occurred during setup.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-[#dcfce7]">
        <div 
          className="absolute top-0 left-0 right-0 h-[65vh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/group-diverse-healthcare-professionals-including-doctors-nurses-medical-assistants-are-working-together-modern-clinic-demonstrating-teamwork-collaboration-medical-field_520881-2122.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-[#dcfce7]/60 to-[#dcfce7]"></div>
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="relative z-10 max-w-md w-full space-y-6 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 mt-8 mb-8">
        
        {/* Header Block */}
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center gap-3 cursor-pointer group select-none mb-4">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400 shadow-sm">
              <span className="text-white flex items-center justify-center">
                <HeartFill size={14} />
              </span>
            </div>
            <div className="flex items-center font-black text-xl tracking-tight">
              <span className="text-teal-800">HealSync</span>
            </div>
          </div>

          {/* Step Indicator Bullets */}
          <div className="flex items-center gap-2 mb-4 w-full">
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? "bg-teal-600" : "bg-gray-200"}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? "bg-teal-600" : "bg-gray-200"}`} />
            {formData.role === "doctor" && (
              <div className={`h-1.5 flex-1 rounded-full transition-all ${step === 3 ? "bg-teal-600" : "bg-gray-200"}`} />
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {step === 1 && "Create Account"}
            {step === 2 && "Profile Photo"}
            {step === 3 && "Professional Details"}
          </h2>
          <p className="text-gray-500 text-xs mt-1 capitalize">Step {step} • Account as {formData.role}</p>
        </div>

        {/* Dynamic Multi-Step Form Layout Container */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* ================= STEP 1: CREDENTIALS ================= */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              {/* Role Selection Tabs */}
              <div className="w-full flex bg-gray-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, role: "patient" }))}
                  className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition-all ${formData.role === "patient" ? "bg-white text-teal-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Patient Role
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, role: "doctor" }))}
                  className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition-all ${formData.role === "doctor" ? "bg-white text-teal-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Doctor Role
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <Button
                type="button"
                className="w-full bg-teal-600 text-white font-semibold py-6 rounded-xl mt-2"
                onClick={() => validateStep1() && setStep(2)}
              >
                Continue Setup
              </Button>
            </div>
          )}

          {/* ================= STEP 2: PROFILE PICTURE ================= */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-900">Profile Image Source</label>
                <div className="flex bg-gray-100 rounded-md p-0.5">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, photoType: "upload" }))}
                    className={`px-3 py-1 text-xs font-medium rounded-sm ${formData.photoType === "upload" ? "bg-white shadow-sm text-teal-700" : "text-gray-500"}`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, photoType: "url" }))}
                    className={`px-3 py-1 text-xs font-medium rounded-sm ${formData.photoType === "url" ? "bg-white shadow-sm text-teal-700" : "text-gray-500"}`}
                  >
                    Web URL
                  </button>
                </div>
              </div>

              {formData.photoType === "upload" ? (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:bg-gray-50 relative">
                  <div className="space-y-1 text-center">
                    <label htmlFor="file-upload" className="cursor-pointer font-medium text-teal-600 hover:text-teal-500">
                      <span>Click to upload image asset</span>
                      <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                    {formData.photoFile && <p className="text-xs text-teal-600 mt-2 font-semibold">{formData.photoFile.name}</p>}
                  </div>
                </div>
              ) : (
                <input
                  name="photoUrl"
                  type="url"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 focus:outline-none"
                  placeholder="https://example.com/photo.jpg"
                />
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="flat" className="flex-1 font-semibold" onClick={() => setStep(1)}>
                  Back
                </Button>
                
                {formData.role === "patient" ? (
                  <Button isLoading={isLoading} className="flex-1 bg-teal-600 text-white font-semibold" onClick={handleSubmit}>
                    Complete Signup
                  </Button>
                ) : (
                  <Button className="flex-1 bg-teal-600 text-white font-semibold" onClick={() => setStep(3)}>
                    Professional Details
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* ================= STEP 3: DOCTOR SPECIFIC DETAILS ================= */}
          {step === 3 && formData.role === "doctor" && (
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 animate-fadeIn">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Medical Specialization</label>
                <input
                  name="specialization"
                  type="text"
                  required
                  value={formData.specialization}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. Cardiology, Pediatrics"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Qualifications</label>
                <input
                  name="qualifications"
                  type="text"
                  required
                  value={formData.qualifications}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. MD, MBBS, Ph.D"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">Years Experience</label>
                  <input
                    name="experience"
                    type="number"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 focus:outline-none"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">Consultation Fee ($)</label>
                  <input
                    name="consultationFee"
                    type="number"
                    required
                    value={formData.consultationFee}
                    onChange={handleChange}
                    className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 focus:outline-none"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Hospital Affiliation</label>
                <input
                  name="hospitalName"
                  type="text"
                  required
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 focus:outline-none"
                  placeholder="City General Hospital"
                />
              </div>

              {/* Day Availability Grid */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Available Days</label>
                <div className="flex flex-wrap gap-1.5">
                  {DAYS_OPTIONS.map((day) => {
                    const isSelected = formData.availableDays.includes(day);
                    return (
                      <Chip
                        key={day}
                        variant={isSelected ? "solid" : "flat"}
                        className={`cursor-pointer text-xs font-semibold ${isSelected ? "bg-teal-600 text-white" : "text-gray-600 bg-gray-100"}`}
                        onClick={() => handleDayToggle(day)}
                      >
                        {day.slice(0, 3)}
                      </Chip>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Availability Grid */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Available Time Slots</label>
                <div className="flex flex-wrap gap-1.5">
                  {TIME_OPTIONS.map((slot) => {
                    const isSelected = formData.availableSlots.includes(slot);
                    return (
                      <Chip
                        key={slot}
                        variant={isSelected ? "solid" : "flat"}
                        className={`cursor-pointer text-xs font-semibold ${isSelected ? "bg-teal-600 text-white" : "text-gray-600 bg-gray-100"}`}
                        onClick={() => handleSlotToggle(slot)}
                      >
                        {slot}
                      </Chip>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="flat" className="flex-1 font-semibold" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button isLoading={isLoading} className="flex-1 bg-teal-600 text-white font-semibold" onClick={handleSubmit}>
                  Register Doctor
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Form Global Divider & Social Element Layout */}
        {step === 1 && (
          <>
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              {/* <button 
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
              </button> */}
            </div>
          </>
        )}

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
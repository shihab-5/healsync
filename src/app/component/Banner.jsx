import Image from "next/image";
import { Button } from "@heroui/react";

export default function Banner() {
  return (
    <section className="relative w-full bg-gradient-to-br from-teal-600 via-teal-500 to-teal-700 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text Content & CTAs */}
        <div className="flex flex-col items-start z-10">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-400/30 bg-teal-500/20 text-teal-50 text-sm font-medium mb-8 backdrop-blur-sm">
            <svg className="w-4 h-4 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Trusted by 1,284+ Patients
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Your Health, <br />
            <span className="text-teal-300">Our Priority</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-teal-100/90 mb-10 max-w-lg leading-relaxed">
            Connect with top-rated doctors, book appointments instantly, and manage your healthcare journey — all from one platform.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-white text-teal-800 font-bold px-8 py-6 rounded-xl shadow-xl shadow-teal-900/50 hover:shadow-teal-900/70 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              Find a Doctor
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>

            <Button 
              size="lg"
              className="w-full sm:w-auto bg-transparent border-2 border-teal-400 text-white font-bold px-8 py-6 rounded-xl hover:bg-teal-700/50 transition-all duration-300"
            >
              Get Started Free
            </Button>
          </div>
        </div>

        {/* Right Column: Image & Floating Badges */}
        <div className="relative w-full h-[450px] lg:h-[550px] z-10 mt-10 lg:mt-0 flex items-center justify-center">
          
          {/* Main Healthcare Illustration (Next.js Image Component) */}
          <div className="relative w-full h-full rounded-3xl bg-emerald-100 p-4">
            <Image 
  src="/Online Doctor-amico (1).png" // Points to public/hero-illustration.png
  alt="Digital Healthcare Platform Illustration" 
  fill
  priority
  sizes="(max-width: 1024px) 80vw, 40vw"
  className="object-cover rounded-3xl shadow-2xl shadow-teal-900/40"
/>
          </div>

          {/* Top Right Badge: Average Rating */}
          <div className="absolute -top-6 -right-4 lg:-right-8 bg-teal-500 text-white rounded-2xl p-4 shadow-xl flex flex-col items-center justify-center min-w-[100px] transform hover:scale-105 transition-transform duration-300 z-20">
            <div className="flex items-center text-2xl font-black mb-1">
              4.9
              <svg className="w-5 h-5 ml-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-teal-50">Avg Rating</span>
          </div>

          {/* Bottom Left Badge: Verified Doctors */}
          <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 transform hover:scale-105 transition-transform duration-300 z-20">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col pr-2">
              <span className="text-xs font-medium text-gray-400">Verified Doctors</span>
              <span className="text-lg font-black text-gray-900 tracking-tight">48+ Specialists</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-teal-900/40 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
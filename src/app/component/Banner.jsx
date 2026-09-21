import Image from "next/image";
import { Button } from "@heroui/react";

export default function Banner() {
  return (
    <section className="relative w-full min-h-[70vh] bg-gradient-to-br from-teal-800 via-teal-600 to-teal-400 text-white py-12 lg:py-16 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        
        {/* Left Column: Text Content & CTAs */}
        <div className="flex flex-col items-start z-10">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-teal-950/40 text-teal-100 text-sm font-medium mb-8 backdrop-blur-md shadow-sm">
            <svg className="w-4 h-4 text-teal-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Trusted by 1,284+ Patients
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            Your Health, <br />
            <span className="text-teal-100 drop-shadow-md">
              Our Priority
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-teal-50 mb-10 max-w-lg leading-relaxed font-normal">
            Connect with top-rated doctors, book appointments instantly, and manage your healthcare journey — all from one platform.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button 
              size="lg"
              className="w-full sm:w-auto text-slate-950 hover:bg-teal-400  bg-white font-bold px-8 py-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-teal-500/30"
            >
              Find a Doctor
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>

            <Button 
              size="lg"
              className="w-full sm:w-auto bg-teal-900/40 hover:bg-teal-900/60 border border-white/30 text-white font-bold px-8 py-6 rounded-xl transition-all duration-300 backdrop-blur-md"
            >
              Get Started Free
            </Button>
          </div>
        </div>

        {/* Right Column: Image & Floating Badges */}
        <div className="relative w-full h-[350px] lg:h-[450px] z-10 mt-10 lg:mt-0 flex items-center justify-center">
          
          {/* Main Healthcare Illustration Slot */}
          <div className="relative w-full h-full rounded-3xl bg-teal-950/30 border border-white/20 p-4 shadow-2xl backdrop-blur-md overflow-hidden">
            <Image 
              src="/image (2).png" 
              alt="Digital Healthcare Platform Illustration" 
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-contain rounded-3xl"
            />
          </div>

          {/* Top Right Badge: Average Rating */}
          <div className="absolute -top-6 -right-4 lg:-right-8 bg-teal-950/80 border border-white/20 text-white rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-col items-center justify-center min-w-[100px] transform hover:scale-105 transition-transform duration-300 z-20">
            <div className="flex items-center text-2xl font-black mb-1 text-teal-300">
              4.9
              <svg className="w-5 h-5 ml-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-teal-100">Avg Rating</span>
          </div>

          {/* Bottom Left Badge: Verified Doctors */}
          <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-teal-950/80 border border-white/20 rounded-2xl p-4 shadow-xl backdrop-blur-md flex items-center gap-4 transform hover:scale-105 transition-transform duration-300 z-20">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-300 flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-teal-950" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col pr-2">
              <span className="text-xs font-medium text-teal-200">Verified Doctors</span>
              <span className="text-lg font-black text-white tracking-tight">48+ Specialists</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Decorative Blur Ambient Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-teal-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-teal-900/40 rounded-full blur-3xl pointer-events-none -z-10" />
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import {
  ShieldCheck,
  Calendar,
  ChevronRight,
  Heart,
  Person,
  Magnifier,
} from "@gravity-ui/icons";

export default function Banner() {
  return (
    <section className="relative w-full max-h-[80vh] h-[75vh]  text-slate-900 py-5 lg:py-8 overflow-hidden flex items-center bg-[#f2faf9]">
      {/* 1. Full-bleed Background Image */}
      <Image
        src="/banner2.png"
        alt="Healthcare banner background"
        fill
        priority
        className="object-cover object-right lg:object-center"
      />

      {/* 2. Soft Gradient Overlay to blend seamlessly on the left */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#eef9f8] via-[#eef9f8]/80 to-transparent w-full lg:w-[50%] pointer-events-none" />

      {/* 3. Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Text Content, CTAs & Features */}
        <div className="lg:col-span-6 flex flex-col items-start max-w-xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d8f3ef] text-teal-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Heart className="w-4 h-4 text-teal-600 fill-teal-600" />
            <span>Trusted by 1,284+ Patients</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12] mb-6 tracking-tight">
            Your Health, <br />
            <span className="bg-gradient-to-br from-teal-800 via-teal-600 to-teal-400 bg-clip-text text-transparent">Our Priority</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed font-normal max-w-lg">
            Book appointments with verified doctors, pay securely, consult from anywhere, and manage your health — all in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
            <Link href="/findDoctors" className="w-full sm:w-auto">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-br from-teal-800 via-teal-600 to-teal-400 hover:bg-[#0b7a70] text-white font-semibold px-8 py-6 rounded-full shadow-lg shadow-teal-700/20 transition-all duration-200 flex items-center justify-center gap-2 text-base"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>

            <Button 
              size="lg"
              variant="bordered"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border-slate-300 font-semibold px-7 py-6 rounded-full shadow-sm transition-all duration-200 flex items-center justify-center gap-2 text-base"
            >
              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 fill-slate-800 ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              Watch How It Works
            </Button>
          </div>

        </div>

        {/* Right Column: Floating Overlay Cards & Phone Interface Alignment */}
        <div className="lg:col-span-6 relative w-full h-[450px] lg:h-[520px] hidden sm:block">
          
          {/* Card 1: Top Left - Book Appointment */}
          <div className="absolute top-6 left-2 lg:left-12 bg-white/90 backdrop-blur-md border border-white/80 p-3 px-4 rounded-2xl shadow-xl shadow-teal-900/5 flex items-center gap-3 min-w-[200px] z-20">
            <div className="w-9 h-9 rounded-xl bg-teal-100/80 border border-teal-200/60 flex items-center justify-center text-teal-700">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-600">Book Appointment</p>
              <p className="text-[10px] text-slate-500">Choose your favorite doctor</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
          </div>

          {/* Card 2: Top Right - Secure Payment */}
          <div className="absolute top-2 right-0 lg:right-8 bg-white/90 backdrop-blur-md border border-white/80 p-3 px-4 rounded-2xl shadow-xl shadow-teal-900/5 flex items-center gap-3 min-w-[200px] z-20">
            <div className="w-9 h-9 rounded-xl bg-teal-100/80 border border-teal-200/60 flex items-center justify-center text-teal-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-600">Secure Payment</p>
              <p className="text-[10px] text-slate-500">Multiple payment methods</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
          </div>

          {/* Card 3: Middle Right - Verified Doctors */}
          <div className="absolute top-36 -right-2 lg:-right-4 bg-white/90 backdrop-blur-md border border-white/80 p-3 px-4 rounded-2xl shadow-xl shadow-teal-900/5 flex items-center gap-3 min-w-[190px] z-20">
            <div className="w-9 h-9 rounded-xl bg-teal-100/80 border border-teal-200/60 flex items-center justify-center text-teal-700">
              <Person className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-600">Verified Doctors</p>
              <p className="text-[10px] text-slate-500">Top specialists</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
          </div>

        

        </div>

      </div>
    </section>
  );
}
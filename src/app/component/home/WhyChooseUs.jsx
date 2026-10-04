import React from "react";
import {
  Calendar,
  ShieldCheck,
  Person,
  Video,
  Persons,
} from "@gravity-ui/icons";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Find and book your preferred doctor in just a few clicks.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "Multiple payment options with 100% security.",
    },
    {
      icon: Person,
      title: "Verified Doctors",
      description: "Consult only with verified and trusted professionals.",
    },
    {
      icon: Video,
      title: "Online Consultation",
      description: "Get expert advice from the comfort of your home.",
    },
    {
      icon: Persons,
      title: "Role-Based Access",
      description: "Separate dashboards for patients, doctors and admins.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Section Tagline */}
        <p className="text-xs sm:text-sm font-bold tracking-wider text-[#0d9488] uppercase mb-3">
          WHY CHOOSE HEALSYNC
        </p>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Everything You Need for Better Healthcare
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mb-12 sm:mb-16 leading-relaxed">
          From finding the right doctor to managing your appointments, we make healthcare simple, secure and convenient.
        </p>

        {/* 5-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#f2faf9] hover:bg-[#ebf8f6] transition-all duration-200 rounded-2xl p-6 flex flex-col items-start text-left border border-teal-100/50"
              >
                {/* Circular Icon Container */}
                <div className="w-12 h-12 rounded-full bg-[#c8f0ea] flex items-center justify-center text-[#0d9488] mb-6">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Card Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
                  {feature.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
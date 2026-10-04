
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Specialization data — preserved from your original code
const SPECIALIZATIONS = [
  {
    title: "Cardiology",
    count: 8,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Neurology",
    count: 6,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Orthopedics",
    count: 10,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1" />
      </svg>
    ),
  },
  {
    title: "Pediatrics",
    count: 12,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Dermatology",
    count: 7,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Gynecology",
    count: 9,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Psychiatry",
    count: 5,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Ophthalmology",
    count: 6,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

const Specializations = () => {
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-teal-50/50 to-white px-4 py-20 font-sans sm:py-24">
      {/* Decorative teal background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-teal-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Browse by Category
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Medical{" "}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Specializations
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
            Find the right specialist for your health needs from our wide
            range of medical departments.
          </p>
        </motion.div>

        {/* Responsive specialization grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SPECIALIZATIONS.map((item) => (
            <motion.div
              key={item.title}
              variants={elementVariants}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Link
                href={`/doctors?specialization=${encodeURIComponent(item.title)}`}
                aria-label={`Explore ${item.title} doctors`}
                className="group relative flex h-full min-h-52 flex-col overflow-hidden rounded-2xl border border-teal-100/80 bg-white/90 p-6 shadow-[0_4px_24px_rgba(15,118,110,0.04)] transition-all duration-300 hover:border-teal-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(15,118,110,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4"
              >
                {/* Top hover accent */}
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-teal-500 to-emerald-400 transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex items-start justify-between">
                  {/* Consistent teal icon container */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-emerald-100/70 text-teal-700 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                    {item.icon}
                  </div>

                  {/* Arrow icon */}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 text-slate-400 transition-all duration-300 group-hover:border-teal-600 group-hover:bg-teal-600 group-hover:text-white">
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17 17 7M7 7h10v10"
                      />
                    </svg>
                  </span>
                </div>

                {/* Specialty details */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-teal-700">
                    {item.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <p className="text-sm font-medium text-slate-500">
                      {item.count} doctors available
                    </p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <span className="text-sm font-semibold text-teal-700">
                    Explore specialists
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all doctors */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/findDoctors"
            className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-6 py-3 text-sm font-bold text-teal-700 shadow-sm transition-all duration-300 hover:border-teal-600 hover:bg-teal-600 hover:text-white hover:shadow-lg hover:shadow-teal-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            View All Doctors
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Specializations;
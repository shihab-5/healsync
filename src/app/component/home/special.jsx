"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Specialized dataset extracted directly from Screenshot 2026-06-28 073716.png
const SPECIALIZATIONS = [
    {
        title: "Cardiology",
        count: 8,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        color: "bg-rose-50 text-rose-600"
    },
    {
        title: "Neurology",
        count: 6,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        color: "bg-purple-50 text-purple-600"
    },
    {
        title: "Orthopedics",
        count: 10,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1" />
            </svg>
        ),
        color: "bg-slate-100 text-slate-700"
    },
    {
        title: "Pediatrics",
        count: 12,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: "bg-amber-50 text-amber-600"
    },
    {
        title: "Dermatology",
        count: 7,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        color: "bg-teal-50 text-teal-600"
    },
    {
        title: "Gynecology",
        count: 9,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        color: "bg-pink-50 text-pink-600"
    },
    {
        title: "Psychiatry",
        count: 5,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        color: "bg-indigo-50 text-indigo-600"
    },
    {
        title: "Ophthalmology",
        count: 6,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
        color: "bg-sky-50 text-sky-600"
    }
];

const Specializations = () => {
    // Framer Motion Entrance Orchestrations
    const gridVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const elementVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
    };

    return (
        <section className="py-20 px-4 max-w-7xl mx-auto font-sans bg-transparent">
            {/* Header Text Block Area */}
            <div className="text-center mb-14">
                <span className="text-teal-700 font-bold text-xs uppercase tracking-widest block mb-2">
                    Browse by Category
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
                    Medical Specializations
                </h2>
                <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed font-medium">
                    Find the right specialist for your health needs from our wide range of medical departments.
                </p>
            </div>

            {/* Responsive 4-Column Balanced Item Grid layout */}
            <motion.div 
                variants={gridVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {SPECIALIZATIONS.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={elementVariants}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="group bg-white rounded-2xl border border-gray-100/90 p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/[0.03] hover:border-teal-600/20"
                    >
                        {/* Premium Soft-Tinted Icon Frame Wrapper */}
                        <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                            {item.icon}
                        </div>

                        {/* Title Character Block */}
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-teal-700 transition-colors tracking-tight mb-1">
                            {item.title}
                        </h3>

                        {/* Real-time Counter Field Data */}
                        <span className="text-gray-400 text-xs font-semibold tracking-wide">
                            {item.count} Doctors available
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Specializations;
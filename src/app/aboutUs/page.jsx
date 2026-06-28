"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    // Framer Motion Animation Variants for Staggered Load-In Loops
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
    };

    return (
        <main className="min-h-screen bg-gray-50/60 font-sans text-gray-800 overflow-x-hidden">
            
            {/* SECTION 1: Brand Hero Narrative */}
            <section className="relative bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 text-white py-20 px-4">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block bg-teal-800/60 backdrop-blur-sm border border-teal-700/50 text-teal-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                    >
                        Redefining Healthcare Management
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black tracking-tight mb-6"
                    >
                        Bridging the Gap Between <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                            Patients & Providers
                        </span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-teal-100/80 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        MediCare Connect is a modern healthcare ecosystem built to digitize medical appointments, eliminate traditional clinical waiting barriers, and secure medical data records seamlessly under one centralized platform.
                    </motion.p>
                </div>
            </section>

            {/* SECTION 2: Dynamic Core Platform Statistics */}
            <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xl shadow-teal-950/5"
                >
                    {[
                        { count: "150+", label: "Verified Specialists", sub: "Across 12+ domains" },
                        { count: "25k+", label: "Active Patients", sub: "Trusted health profiles" },
                        { count: "85k+", label: "Appointments Booked", sub: "Fully digital processing" },
                        { count: "4.9", label: "Average Patient Rating", sub: "Based on 12,000+ reviews" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center flex flex-col justify-center border-r last:border-r-0 border-gray-100 px-2">
                            <span className="text-3xl md:text-4xl font-black text-teal-700 block tracking-tight mb-1">{stat.count}</span>
                            <span className="text-gray-900 font-bold text-sm mb-0.5">{stat.label}</span>
                            <span className="text-gray-400 text-xs font-medium">{stat.sub}</span>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* SECTION 3: The Mission & Structural Challenges We Resolve */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">Why MediCare Connect Matters</h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">Breaking away from legacy medical systems to build a friction-free healthcare framework.</p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {[
                        {
                            title: "Zero Waiting Times",
                            text: "We completely cut down manual paperwork and phone arrays by letting patients choose their slot layout instantly from their home dashboard.",
                            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        },
                        {
                            title: "Secure Health Repository",
                            text: "Medical diagnosis history, lab summaries, and active dynamic prescriptions are cryptographically locked and safe from unauthorized routing.",
                            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        },
                        {
                            title: "Stripe Micro-Payments",
                            text: "Avoid processing layout failures. Confirm your appointment slots instantly with highly protected automated card integrations directly on checkout.",
                            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        }
                    ].map((pillar, index) => (
                        <motion.div 
                            key={index}
                            variants={itemVariants}
                            className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col equal-height-card"
                        >
                            <div className="w-12 h-12 bg-teal-50 text-teal-700 flex items-center justify-center rounded-xl mb-6 shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {pillar.icon}
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{pillar.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-medium">{pillar.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* SECTION 4: Our Integrated Three-Way Ecosystem Roles */}
            <section className="bg-teal-50/50 border-y border-teal-100/40 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-teal-700 font-bold text-xs uppercase tracking-wider block mb-2">Role-Based System Layout</span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">One Platform. Three Distinct Experiences.</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Patient Architecture Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
                        >
                            <div>
                                <div className="text-xs font-black text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md inline-block mb-4">Patient Portal</div>
                                <p className="text-gray-500 text-sm font-medium mb-6">Designed entirely for friction-free public personal medical navigation operations.</p>
                                <ul className="space-y-3 text-sm font-semibold text-gray-700">
                                    {["Advanced Doctor Filters & Searches", "Instant Digital Appointment Bookings", "Dynamic Review & Rating Adjustments", "Stripe Fee Settlement Histories"].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Doctor Management Interface Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md flex flex-col justify-between relative ring-2 ring-teal-700/10"
                        >
                            <div>
                                <div className="text-xs font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-md inline-block mb-4">Doctor Dashboard</div>
                                <p className="text-gray-500 text-sm font-medium mb-6">Empowers clinical specialists with granular authority over their operational days.</p>
                                <ul className="space-y-3 text-sm font-semibold text-gray-700">
                                    {["Interactive Profile Presentation Setups", "Live Appointment Action Handles (Accept/Reject)", "Digital Prescription Management Logic", "Dynamic Time-Slot Adjustments"].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Admin Ecosystem Oversight Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
                        >
                            <div>
                                <div className="text-xs font-black text-slate-700 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-md inline-block mb-4">Admin Command</div>
                                <p className="text-gray-500 text-sm font-medium mb-6">Total visibility controls ensuring secure ecosystem standard operations.</p>
                                <ul className="space-y-3 text-sm font-semibold text-gray-700">
                                    {["Comprehensive Multi-Role User Controls", "Manual Doctor Validation Sign-offs", "Recharts Analytical Ecosystem Performance", "Complete Audit Trail Monitoring"].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: Quality, Architectural Standards, & JWT Integrity Block */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute right-0 bottom-0 w-96 h-96 bg-teal-700/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-2xl md:text-4xl font-black mb-4 tracking-tight">Our Uncompromising Security Pillars</h2>
                        <p className="text-slate-400 text-sm md:text-base mb-8 font-medium leading-relaxed">
                            Every request running across MediCare Connect is fully protected via **JSON Web Tokens (JWT)** and rigorous backend route authorization layers. Rest authenticated, rest protected.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700/40">
                                <span className="text-emerald-400 font-bold text-lg">✓</span>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-100">CORS Compliant Pipelines</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">Fluid cross-origin operations optimized for active delivery networks.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700/40">
                                <span className="text-emerald-400 font-bold text-lg">✓</span>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-100">Persistent Session States</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">Session profiles remain intact across browser environment reloads.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
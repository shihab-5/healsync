"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
    // Form submission state management
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Mocking API pipeline transition - replace with your Express route when ready
        setTimeout(() => {
            alert("Message sent successfully! Our healthcare team will review it shortly.");
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1200);
    };

    // Animation Layout Configurations
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <main className="min-h-screen bg-gray-50/60 font-sans text-gray-800 pb-20">
            
            {/* SECTION 1: Dynamic Brand Banner Header */}
            <section className="bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black tracking-tight mb-3"
                    >
                        Contact Our Support Team
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-teal-200/80 text-sm md:text-base max-w-lg mx-auto font-medium"
                    >
                        Have questions about appointment booking, hospital verifications, or secure records? Reach out to us anytime.
                    </motion.p>
                </div>
            </section>

            {/* SECTION 2: Responsive Workspace Layout Split */}
            <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: Strategic Contact Information Cards (5-Cols) */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-5 grid grid-cols-1 gap-4"
                    >
                        {/* Support Mailbox Card Component */}
                        <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 bg-teal-50 text-teal-700 flex items-center justify-center rounded-xl shrink-0 shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 tracking-tight text-base mb-1">Email Correspondence</h3>
                                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">General & Support Desk</p>
                                <a href="mailto:shihabuli364@gmail.com" className="text-teal-700 font-bold text-sm hover:underline tracking-wide">
                                    shihabuli364@gmail.com
                                </a>
                            </div>
                        </motion.div>

                        {/* Emergency Hotline Details Card */}
                        <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-50 text-red-600 flex items-center justify-center rounded-xl shrink-0 shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72.59.59 0 00.54.44h2.5a.59.59 0 00.54-.44 1 1 0 01.94-.72H18a2 2 0 012 2v15a2 2 0 01-2 2h-3.28a1 1 0 01-.94-.72l-.54-.43a1.93 1.93 0 00-2.5 0l-.54.43a1 1 0 01-.94.72H5a2 2 0 01-2-2V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 tracking-tight text-base mb-1">Emergency Hotline</h3>
                                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Available 24/7 Mon-Sun</p>
                                <span className="text-red-600 font-extrabold text-lg tracking-wider">
                                    1-800-MED-CONN
                                </span>
                            </div>
                        </motion.div>

                        {/* Administrative Operational Hours Card */}
                        <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 bg-slate-100 text-slate-700 flex items-center justify-center rounded-xl shrink-0 shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 tracking-tight text-base mb-1">Platform Operations</h3>
                                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Admin Validation Approvals</p>
                                <p className="text-gray-600 font-medium text-sm">Monday – Friday: 9:00 AM – 6:00 PM</p>
                                <p className="text-gray-400 text-xs font-medium mt-1">Automated features like payments remain online 24/7.</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT COLUMN: Interactive Input Contact Form Section (7-Cols) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
                        className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-teal-950/5"
                    >
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Send an Instant Message</h2>
                        <p className="text-gray-500 text-xs md:text-sm font-medium mb-6">Fill out the layout below and our cross-functional team will address your request.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-bold text-xs uppercase tracking-wide mb-2">Your Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-200/80 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold text-xs uppercase tracking-wide mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="johndoe@example.com"
                                        className="w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-200/80 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold text-xs uppercase tracking-wide mb-2">Subject Title</label>
                                <input 
                                    type="text" 
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Account validation problem / Doctor account verification inquiry"
                                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-200/80 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold text-xs uppercase tracking-wide mb-2">Message Content</label>
                                <textarea 
                                    name="message"
                                    required
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Describe your inquiry or problem block thoroughly here..."
                                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-200/80 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all resize-none"
                                />
                            </div>

                            <div className="pt-2">
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-teal-700 hover:bg-teal-600 active:scale-98 text-white font-bold text-sm py-4 px-6 rounded-xl transition-all shadow-md shadow-teal-700/10 flex items-center justify-center gap-2 ${
                                        isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Processing Transmission...
                                        </>
                                    ) : (
                                        "Dispatch Message"
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default ContactUs;
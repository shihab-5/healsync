"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Hardcoded categories list from your layout design
const CATEGORIES = [
    "All", "Cardiology", "Neurology", "Orthopedics", 
    "Pediatrics", "Dermatology", "Gynecology", "Psychiatry", "Ophthalmology"
];

const FindDoctors = () => {
    // State management for data, filtering, and UI interaction
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Highest Rating");

    // Fetch dynamic doctor lists from your live Express Backend server instance
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors`, {
                    cache: "no-store" 
                });
                if (res.ok) {
                    const data = await res.json();
                    setDoctors(data);
                    setFilteredDoctors(data);
                }
            } catch (error) {
                console.error("Error retrieving doctor collection rows:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    // Interactive Search, Filter, and Sort Execution Loop
    useEffect(() => {
        let result = [...doctors];

        // 1. Text Search Filtering Logic (Name or Specialization match)
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter(doc => 
                doc.doctorName.toLowerCase().includes(query) ||
                doc.specialization.toLowerCase().includes(query)
            );
        }

        // 2. Specialty Category Pill Filter
        if (selectedCategory !== "All") {
            result = result.filter(doc => 
                doc.specialization.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // 3. Dropdown Sorting Computations
        if (sortBy === "Highest Rating") {
            result.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
        } else if (sortBy === "Experience") {
            result.sort((a, b) => b.experience - a.experience);
        } else if (sortBy === "Price: Low to High") {
            result.sort((a, b) => a.consultationFee - b.consultationFee);
        } else if (sortBy === "Price: High to Low") {
            result.sort((a, b) => b.consultationFee - a.consultationFee);
        }

        setFilteredDoctors(result);
    }, [searchQuery, selectedCategory, sortBy, doctors]);

    // Framer Motion Grid Item Configurations
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <main className="min-h-screen bg-gray-50/50 pb-20 font-sans">
            {/* 1. Header Banner Block - Enhanced with your premium brand layout styles */}
            <section className="bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-5xl font-black tracking-tight mb-3"
                    >
                        Find Your Doctor
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-teal-200/80 text-sm md:text-base max-w-xl mb-8 font-medium"
                    >
                        Search from our network of verified healthcare specialists and book real-time consultations instantly.
                    </motion.p>

                    {/* Search & Sort Input Controls Wrapper Row */}
                    <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
                        <div className="relative flex-1">
                            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name or specialization..."
                                className="w-full pl-12 pr-4 py-3.5 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner font-medium text-sm transition-all"
                            />
                        </div>
                        
                        <div className="relative min-w-[200px]">
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full appearance-none px-4 py-3.5 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold text-sm cursor-pointer shadow-sm pr-10"
                            >
                                <option value="Highest Rating">Sort: Highest Rating</option>
                                <option value="Experience">Sort: Experience</option>
                                <option value="Price: Low to High">Price: Low to High</option>
                                <option value="Price: High to Low">Price: High to Low</option>
                            </select>
                            <span className="absolute inset-y-0 right-4 flex items-center text-gray-500 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Filters & Listings Layout Container */}
            <section className="max-w-7xl mx-auto px-4 mt-10">
                {/* 2. Scrollable Specialty Filtering Pills Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mask-image">
                    {CATEGORIES.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-xs tracking-wide transition-all ${
                                    isActive 
                                        ? "bg-teal-700 text-white shadow-md shadow-teal-700/20" 
                                        : "bg-white text-gray-600 border border-gray-200/80 hover:border-gray-300 hover:text-gray-900"
                                }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* 3. Real-Time Counter Label */}
                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider my-6">
                    Showing <span className="text-gray-900 font-black">{filteredDoctors.length}</span> of {doctors.length} doctors
                </div>

                {/* Loading Status Indicator */}
                {loading && (
                    <div className="text-center py-20 text-gray-400 font-bold text-sm animate-pulse">
                        Loading available doctor records...
                    </div>
                )}

                {/* Empty State Result Container */}
                {!loading && filteredDoctors.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-center bg-white border border-gray-100 rounded-2xl py-20 px-4 shadow-sm text-gray-400 font-medium"
                    >
                        No healthcare providers matched your current search parameters.
                    </motion.div>
                )}

                {/* 4. RESTORED: Larger 3-Column Responsive Grid with Framer Motion Layout handling */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredDoctors.map((doctor) => {
                            const displayName = doctor.doctorName.startsWith("Dr.") 
                                ? doctor.doctorName 
                                : `Dr. ${doctor.doctorName}`;

                            return (
                                <motion.div 
                                    key={doctor._id.toString()}
                                    variants={cardVariants}
                                    layout
                                    exit="exit"
                                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                >
                                    {/* Large Card Image Frame Wrap Container */}
                                    <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                                        <Image 
                                            src={doctor.profileImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d"} 
                                            alt={displayName}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                        
                                        {/* Status Pill Badge */}
                                        <div 
                                            className={`absolute top-4 right-4 z-10 flex items-center gap-1 backdrop-blur-md text-xs font-bold px-2.5 py-1 rounded-full shadow-sm text-white transition-colors ${
                                                doctor.verificationStatus === "verified" 
                                                    ? "bg-teal-700/95" 
                                                    : "bg-amber-500/95"
                                            }`}
                                        >
                                            {doctor.verificationStatus === "verified" && (
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                            <span className="capitalize tracking-wide">
                                                {doctor.verificationStatus || "pending"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Informational Core Area */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-1 group-hover:text-teal-700 transition-colors line-clamp-1">
                                            {displayName}
                                        </h3>
                                        
                                        <p className="text-gray-400 text-sm font-semibold mb-4 tracking-wide uppercase">
                                            {doctor.specialization}
                                        </p>

                                        {/* Rating & Experience Row Metadata */}
                                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-6">
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-gray-900 font-bold">{doctor.rating || "4.5"}</span>
                                                <span className="text-gray-400 font-normal">({doctor.reviewCount || "0"})</span>
                                            </div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                            <div className="text-gray-600 font-medium">
                                                {doctor.experience} years experience
                                            </div>
                                        </div>

                                        {/* Fee Summary & Action Book Button Section */}
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div>
                                                <span className="text-2xl font-black text-teal-700">${doctor.consultationFee}</span>
                                                <span className="text-gray-400 text-xs font-bold tracking-wider uppercase ml-1">/ visit</span>
                                            </div>
                                            
                                            <Link href={`/findDoctors/${doctor._id}`} className="bg-teal-700 hover:bg-teal-600 active:scale-95 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-sm shadow-teal-700/5">
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </section>
        </main>
    );
};

export default FindDoctors;
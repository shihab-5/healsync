"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const DetailsCard = ({ value }) => {
    // Interactive states for booking selection layout
    const [selectedDay, setSelectedDay] = useState(value.availableDays?.[0] || '');
    const [selectedSlot, setSelectedSlot] = useState(value.availableSlots?.[0] || '');

    // Normalize display naming configurations
    const displayName = value.doctorName?.startsWith("Dr.") ? value.doctorName : `Dr. ${value.doctorName}`;
    
    // Safely parse credentials pills (Handles array strings or standard arrays)
    const qualificationsList = Array.isArray(value.qualifications)
        ? value.qualifications
        : value.qualifications?.split(',').map(q => q.trim()) || ["MBBS", "MD"];

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 font-sans text-gray-800">
            {/* Split Grid Layout Engine matching Screenshot 2026-06-28 080434.png */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* ================= LEFT MAIN PANEL (8 Columns) ================= */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* 1. Header Banner & Identity Card Block */}
                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                        {/* Premium Cover Frame */}
                        <div className="h-44 bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 relative" />
                        
                        {/* Profile Meta Frame content segment */}
                        <div className="px-6 pb-6 relative pt-16 sm:pt-0 sm:pl-44 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            {/* Overlapping Profile Image View Frame */}
                            <div className="absolute -top-16 left-6 w-32 h-32 rounded-2xl border-4 border-white bg-white shadow-md overflow-hidden">
                                <Image 
                                    src={value.profileImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d"}
                                    alt={displayName}
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>

                            {/* Identity Text Rows */}
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">{displayName}</h1>
                                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${
                                        value.verificationStatus === "verified" 
                                            ? "bg-teal-50 text-teal-700 border border-teal-200/50" 
                                            : "bg-amber-50 text-amber-600 border border-amber-200/50"
                                    }`}>
                                        ✓ {value.verificationStatus || "Pending"}
                                    </span>
                                </div>
                                <p className="text-teal-700 font-bold text-sm tracking-wide mt-0.5">{value.specialization}</p>
                                <p className="text-gray-400 text-xs font-semibold flex items-center gap-1 mt-1">
                                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    {value.hospitalName || "General Healthcare Institute"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Platform Tri-Stat Layout Block */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { 
                                value: `${value.experience || '10+'}+ yrs`, 
                                label: "Experience", 
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            },
                            { 
                                value: `${value.rating || '4.9'} / 5`, 
                                label: "Rating", 
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            },
                            { 
                                value: value.reviewCount || "98", 
                                label: "Reviews", 
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 text-center flex flex-col items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-teal-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {stat.icon}
                                </svg>
                                <span className="text-base font-black text-gray-900 tracking-tight block">{stat.value}</span>
                                <span className="text-gray-400 text-xxs font-bold uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* 3. Biography About Section Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-black text-gray-900 tracking-tight mb-3">About</h2>
                        <p className="text-gray-500 text-sm leading-relaxed font-medium">
                            {value.bio || `${displayName} is an esteemed specialist operating inside our dynamic clinical facilities. Focused on continuous modern treatment approaches, provider operations, and highly empathetic personalized recovery pipelines.`}
                        </p>
                    </div>

                    {/* 4. Qualifications Pill Block Array */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-black text-gray-900 tracking-tight mb-4">Qualifications</h2>
                        <div className="flex flex-wrap gap-2.5">
                            {qualificationsList.map((qual, index) => (
                                <span 
                                    key={index} 
                                    className="bg-teal-50/60 text-teal-800 font-extrabold text-xs px-4 py-2 border border-teal-100/60 rounded-xl shadow-xs"
                                >
                                    {qual}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 5. Patient Reviews Module Container */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-black text-gray-900 tracking-tight mb-6">
                            Patient Reviews ({value.reviewCount || "1"})
                        </h2>
                        
                        {/* Static Placeholder matching layout rules perfectly */}
                        <div className="flex items-start gap-4 border-t border-gray-100 pt-5">
                            <div className="w-10 h-10 rounded-full relative overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                                <Image 
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" 
                                    alt="Reviewer" 
                                    fill 
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                                    <h4 className="font-bold text-sm text-gray-900">Jessica Brown</h4>
                                    <span className="text-gray-400 text-xs font-semibold">2026-06-08</span>
                                </div>
                                
                                {/* Amber Star Rows */}
                                <div className="flex items-center gap-0.5 text-amber-500 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
                                    {displayName} is amazing! Diagnosed my condition quickly and the treatment worked wonders. Highly recommend.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT BOOKING PANEL (4 Columns) ================= */}
                <div className="lg:col-span-4 space-y-4">
                    
                    {/* Consultation Fee Box */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block">Consultation Fee</span>
                            <span className="text-2xl font-black text-teal-700 tracking-tight">${value.consultationFee || "150"}</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                            $
                        </div>
                    </div>

                    {/* Primary Booking Panel Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <svg className="w-4 h-4 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="font-black text-gray-900 tracking-tight text-base">Book Appointment</h3>
                        </div>

                        {/* A. Select Day Pills Row */}
                        <div className="mb-5">
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Select Day</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(value.availableDays || ["Tuesday", "Thursday", "Saturday"]).map((day) => {
                                    const isSelected = selectedDay === day;
                                    return (
                                        <button
                                            type="button"
                                            key={day}
                                            onClick={() => setSelectedDay(day)}
                                            className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all text-center ${
                                                isSelected 
                                                    ? 'bg-teal-700 text-white border-teal-700 shadow-sm' 
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* B. Select Time Slot Pills Row */}
                        <div className="mb-6">
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Select Time Slot</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(value.availableSlots || ["10:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"]).map((slot) => {
                                    const isSelected = selectedSlot === slot;
                                    return (
                                        <button
                                            type="button"
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                                                isSelected 
                                                    ? 'bg-teal-700 text-white border-teal-700 shadow-sm' 
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            {slot}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Action CTA Submission Button Trigger */}
                        <button 
                            type="button"
                            className="w-full bg-teal-700 hover:bg-teal-600 active:scale-98 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-sm shadow-teal-700/10 mb-3"
                        >
                            Proceed to Payment
                        </button>

                        <div className="text-center">
                            <span className="text-gray-400 text-xxs font-medium block">
                                Authentication required to finalize reservation loops.
                            </span>
                        </div>
                    </div>

                    {/* Bottom Working Days Informational Row Card */}
                    <div className="bg-teal-50/50 p-4 border border-teal-100/50 rounded-xl">
                        <span className="text-teal-800 text-xs font-bold block mb-1">📅 Operational Window</span>
                        <p className="text-teal-900/80 font-semibold text-xxs tracking-wide leading-relaxed">
                            {value.availableDays?.join(', ') || "Tuesday, Thursday, Saturday"}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DetailsCard;
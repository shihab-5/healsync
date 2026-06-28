"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

const DetailsCard = ({ value }) => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    
    // Interactive states for booking selection layout
    const [selectedDay, setSelectedDay] = useState(value.availableDays?.[0] || '');
    const [selectedSlot, setSelectedSlot] = useState(value.availableSlots?.[0] || '');
    const [symptoms, setSymptoms] = useState('');
    const [isProcessing, setIsProcessing] = useState(false); // ✅ Added checkout loading state

    if (isPending) {
        return <div className="min-h-[400px] flex items-center justify-center font-medium text-gray-500">Loading your profile...</div>;
    }
    if (!user) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 text-center">
                <p className="font-bold text-gray-700 text-lg">Please log in to continue.</p>
                <Link href="/login" className="px-5 py-2.5 bg-teal-700 text-white font-bold text-sm rounded-xl hover:bg-teal-600 transition-all">
                    Go to Login
                </Link>
            </div>
        );
    }

    // Normalize display naming configurations
    const displayName = value.doctorName?.startsWith("Dr.") ? value.doctorName : `Dr. ${value.doctorName}`;
    
    const qualificationsList = Array.isArray(value.qualifications)
        ? value.qualifications
        : value.qualifications?.split(',').map(q => q.trim()) || ["MBBS"];

    // ✅ Dynamic Client Checkout Submission Handler
    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctorId: value._id,
                    doctorName: value.doctorName,
                    consultationFee: value.consultationFee,
                    day: selectedDay,
                    slot: selectedSlot,
                    symptoms: symptoms,
                    userEmail: user?.email,
                }),
            });

            const data = await response.json();

            if (data.url) {
                // Redirect user to Stripe Checkout site directly
                window.location.href = data.url;
            } else {
                alert(data.error || "Failed to generate checkout gateway session.");
            }
        } catch (error) {
            console.error("Checkout submission failed:", error);
            alert("Connection error occurred. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 font-sans text-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* ================= LEFT MAIN PANEL (8 Columns) ================= */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                        <div className="h-44 bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 relative" />
                        <div className="px-6 pb-6 relative pt-16 sm:pt-0 sm:pl-44 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="absolute -top-16 left-6 w-32 h-32 rounded-2xl border-4 border-white bg-white shadow-md overflow-hidden">
                                <Image 
                                    src={value.profileImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d"}
                                    alt={displayName}
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">{displayName}</h1>
                                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full capitalize bg-teal-50 text-teal-700 border border-teal-200/50">
                                        ✓ {value.verificationStatus || "Pending"}
                                    </span>
                                </div>
                                <p className="text-teal-700 font-bold text-sm tracking-wide mt-0.5">{value.specialization}</p>
                                <p className="text-gray-400 text-xs font-semibold flex items-center gap-1 mt-1">
                                    {value.hospitalName || "General Healthcare Institute"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Platform Tri-Stat Layout Block */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { value: `${value.experience || '0'} yrs`, label: "Experience" },
                            { value: `4.9 / 5`, label: "Rating" },
                            { value: "98", label: "Reviews" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
                                <span className="text-base font-black text-gray-900 tracking-tight block">{stat.value}</span>
                                <span className="text-gray-400 text-xxs font-bold uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* About section */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-black text-gray-900 tracking-tight mb-3">About</h2>
                        <p className="text-gray-500 text-sm leading-relaxed font-medium">{value.bio || "No biography provided."}</p>
                    </div>

                    {/* Qualifications */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-black text-gray-900 tracking-tight mb-4">Qualifications</h2>
                        <div className="flex flex-wrap gap-2.5">
                            {qualificationsList.map((qual, index) => (
                                <span key={index} className="bg-teal-50/60 text-teal-800 font-extrabold text-xs px-4 py-2 border border-teal-100/60 rounded-xl">
                                    {qual}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT BOOKING PANEL (4 Columns) ================= */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block">Consultation Fee</span>
                            <span className="text-2xl font-black text-teal-700 tracking-tight">${value.consultationFee || "150"}</span>
                        </div>
                    </div>

                    <div className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-black text-gray-900 tracking-tight text-base mb-4">Book Appointment</h3>

                        {/* Select Day Row */}
                        <div className="mb-5">
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Select Day</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(value.availableDays || []).map((day) => (
                                    <button
                                        type="button"
                                        key={day}
                                        onClick={() => setSelectedDay(day)}
                                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all text-center ${
                                            selectedDay === day ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-gray-600 border-gray-200'
                                        }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Select Time Slot */}
                        <div className="mb-5">
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Select Time Slot</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(value.availableSlots || []).map((slot) => (
                                    <button
                                        type="button"
                                        key={slot}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                                            selectedSlot === slot ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-gray-600 border-gray-200'
                                        }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Describe Symptoms Box */}
                        <div className="mb-6">
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Describe Symptoms</label>
                            <textarea
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                                placeholder="Write down your symptoms..."
                                rows={3}
                                className="w-full text-sm p-3.5 bg-slate-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-700 focus:bg-white resize-none"
                            />
                        </div>

                        {/* ✅ Form Submission replaced with onSubmit AJAX interceptor handling setup */}
                        <form onSubmit={handleCheckout}>
                            <button 
                                type="submit" 
                                disabled={isProcessing}
                                className="w-full text-center bg-teal-700 hover:bg-teal-600 disabled:bg-teal-800 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-sm"
                            >
                                {isProcessing ? 'Processing Payment...' : 'Proceed to Payment'}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailsCard;
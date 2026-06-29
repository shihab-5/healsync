import React from 'react';
import Link from 'next/link';

// HeroUI v3 Components (Compound Architecture)
import { Card, Chip, Button } from '@heroui/react';

// Gravity UI Icons
import { Calendar, Clock, CreditCard, ArrowLeft, HeartPulse, Eye, TrashBin } from '@gravity-ui/icons';

// Server-side data fetching integrations
import { getUserSession } from '@/app/lib/session';
import { getAppointments } from '@/app/lib/data';

export default async function MyAppointments() {
    // 1. Fetch user session and global appointments concurrently on the server
    const [user, allAppointments] = await Promise.all([
        getUserSession(),
        getAppointments()
    ]);

    // Fallback context mock matching your raw data architecture safely
    const activeUser = user || {
        id: "6a41bd494864f27d2d465832",
        email: "shihabuli364@gmail.com"
    };

    // 2. Filter data securely to capture only records corresponding to this user
    const myAppointments = allAppointments?.filter(
        (app) => app.userId === activeUser.id || app.userEmail === activeUser.email
    ) || [];

    return (
        <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-10 text-slate-800 font-sans">
            
            <div className="max-w-5xl mx-auto space-y-8 relative">
                
                {/* Navigation Header Action Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors mb-2 group">
                            <ArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            My Consultations
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Manage your appointments, request schedule adjustments, or cancel bookings.
                        </p>
                    </div>

                    {/* Quick Count Badge Component Indicator */}
                    <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 self-start sm:self-center shadow-xs">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active Bookings</span>
                        <span className="text-xl font-black tracking-wide text-slate-800">
                            {myAppointments.length} Total
                        </span>
                    </div>
                </div>

                {/* 3. Conditional Content Output Container Layout */}
                {myAppointments.length === 0 ? (
                    <Card className="border border-slate-200 bg-white p-8 rounded-2xl text-center shadow-xs">
                        <Card.Content className="flex flex-col items-center justify-center space-y-4 py-10">
                            <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl border border-teal-100">
                                <Calendar style={{ fontSize: '32px' }} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-slate-900">No Appointments Found</h3>
                                <p className="text-xs text-slate-500 max-w-sm">
                                    You don't have any medical consultations booked yet.
                                </p>
                            </div>
                            <Link href="/doctors">
                                <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl px-6 border-none mt-2 shadow-sm">
                                    Find a Doctor
                                </Button>
                            </Link>
                        </Card.Content>
                    </Card>
                ) : (
                    /* Grid Layout Card Output List wrapper */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {myAppointments.map((appointment) => (
                            <Card 
                                key={appointment._id}
                                className="border border-slate-200 bg-white rounded-2xl shadow-xs transition-all duration-300 hover:shadow-md hover:border-teal-200 group relative overflow-hidden"
                            >
                                <Card.Content className="p-6 space-y-6">
                                    
                                    {/* Card Header Content Meta Row */}
                                    <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-100">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block">Primary Specialist</span>
                                            <h3 className="text-xl font-bold text-slate-900 tracking-tight capitalize transition-colors group-hover:text-teal-900">
                                                Dr. {appointment.doctorName}
                                            </h3>
                                        </div>
                                        <Chip 
                                            size="sm" 
                                            variant="flat" 
                                            className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold tracking-wide uppercase text-[10px]"
                                        >
                                            Confirmed
                                        </Chip>
                                    </div>

                                    {/* Metrics Detail Information Subgrid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        
                                        {/* Day/Date Metric */}
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 shrink-0">
                                                <Calendar style={{ fontSize: '16px' }} />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Day</span>
                                                <span className="text-sm font-semibold text-slate-800 truncate block">{appointment.day}</span>
                                            </div>
                                        </div>

                                        {/* Time/Slot Metric */}
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 shrink-0">
                                                <Clock style={{ fontSize: '16px' }} />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Time Slot</span>
                                                <span className="text-sm font-semibold text-slate-800 truncate block">{appointment.slot}</span>
                                            </div>
                                        </div>

                                        {/* Financial Consultation Fee Metric */}
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 shrink-0">
                                                <CreditCard style={{ fontSize: '16px' }} />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Paid Amount</span>
                                                <span className="text-sm font-black text-emerald-600 block">${appointment.consultationFee}</span>
                                            </div>
                                        </div>

                                        {/* Health Symptoms Context Indicator */}
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0">
                                                <HeartPulse style={{ fontSize: '16px' }} />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Symptoms</span>
                                                <span className="text-sm font-semibold text-slate-700 truncate block italic">
                                                    {appointment.symptoms || "None declared"}
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                    {/* ✅ CRUD Action Interface Group Wrapper */}
                                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2 w-full">
                                        
                                        {/* 1. VIEW APPOINTMENT */}
                                        <Link href={`/dashboard/patient/myAppointments/${appointment._id}`} className="flex-1">
                                            <Button 
                                                variant="flat"
                                                size="sm"
                                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs h-9 gap-1.5 border-none"
                                            >
                                                <Eye style={{ fontSize: '14px' }} />
                                                View
                                            </Button>
                                        </Link>

                                        {/* 2. RESCHEDULE APPOINTMENT */}
                                        <Link href={`/dashboard/patient/myAppointments/reschedule/${appointment._id}`} className="flex-1">
                                            <Button 
                                                size="sm"
                                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs h-9 gap-1.5 border-none shadow-xs"
                                            >
                                                <Calendar style={{ fontSize: '14px' }} />
                                                Reschedule
                                            </Button>
                                        </Link>

                                        {/* 3. CANCEL APPOINTMENT */}
                                        <Link href={`/dashboard/patient/myAppointments/cancel/${appointment._id}`} className="flex-1">
                                            <Button 
                                                variant="light"
                                                size="sm"
                                                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl text-xs h-9 gap-1.5 border-none"
                                            >
                                                <TrashBin style={{ fontSize: '14px' }} />
                                                Cancel
                                            </Button>
                                        </Link>

                                    </div>

                                </Card.Content>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
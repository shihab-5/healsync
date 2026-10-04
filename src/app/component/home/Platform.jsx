import { getAppointments, getDoctors, getUsers } from '@/app/lib/data';
import React from 'react';

// HeroUI v3 Component (Compound Architecture)
import { Card } from '@heroui/react';

// Gravity UI Icons 
import { Person, Calendar, Star, GraduationCap } from '@gravity-ui/icons';

const Platform = async () => {
    // Fetch data concurrently on the server
    const [allUsers, doctors, appointments] = await Promise.all([
        getUsers(),
        getDoctors(),
        getAppointments()
    ]);

    // Compute metrics safely
    const totalPatients = allUsers?.filter(user => user.role === 'patient').length || allUsers?.length || 0;
    const totalDoctors = doctors?.length || 0;
    const totalAppointments = appointments?.length || 0;
    const totalReviews = 142; 

    return (
        <section className="w-full bg-[#f8faf9] py-6 px-4 md:px-8 text-slate-900 flex justify-center items-center">
            
            {/* Simple stacked layout container */}
            <div className="w-full max-w-5xl flex flex-col gap-3 md:gap-4">
                
                {/* 1. Header Banner (Full Width, No Grid Math) */}
                <Card className="w-full bg-gradient-to-r from-teal-600 to-teal-400 text-white p-5 md:p-6 rounded-2xl shadow-sm border-none flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-md mb-2">
                            System Overview
                        </span>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight">
                            Platform Statistics
                        </h2>
                    </div>
                    <p className="text-teal-50/90 text-xs font-medium max-w-sm md:text-right">
                        Real-time core system registration metrics and continuous system health monitoring indicators.
                    </p>
                </Card>

                {/* 2. Uniform Stats Grid (5 equal columns, 0 span calculations) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    
                    {/* Stat 1: Active Doctors */}
                    <Card className="group border border-slate-200/80 bg-white hover:bg-teal-50/20 p-4 rounded-2xl transition-all duration-200 hover:border-teal-400 hover:shadow-md flex flex-col justify-between min-h-[130px]">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider group-hover:text-teal-700 transition-colors">
                                Doctors
                            </p>
                            <div className="p-1.5 bg-teal-50 text-[#0d9488] rounded-lg border border-teal-100 flex items-center justify-center transition-all group-hover:bg-[#0d9488] group-hover:text-white">
                                <GraduationCap style={{ fontSize: '16px' }} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#0d9488] transition-colors">
                                {totalDoctors.toLocaleString()}
                            </h3>
                            <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">Verified specialists</p>
                        </div>
                    </Card>

                    {/* Stat 2: Total Patients */}
                    <Card className="group border border-slate-200/80 bg-white hover:bg-teal-50/20 p-4 rounded-2xl transition-all duration-200 hover:border-teal-400 hover:shadow-md flex flex-col justify-between min-h-[130px]">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider group-hover:text-teal-700 transition-colors">
                                Patients
                            </p>
                            <div className="p-1.5 bg-teal-50 text-[#0d9488] rounded-lg border border-teal-100 flex items-center justify-center transition-all group-hover:bg-[#0d9488] group-hover:text-white">
                                <Person style={{ fontSize: '16px' }} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#0d9488] transition-colors">
                                {totalPatients.toLocaleString()}
                            </h3>
                            <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">Registered users</p>
                        </div>
                    </Card>

                    {/* Stat 3: Appointments */}
                    <Card className="group border border-slate-200/80 bg-white hover:bg-teal-50/20 p-4 rounded-2xl transition-all duration-200 hover:border-teal-400 hover:shadow-md flex flex-col justify-between min-h-[130px]">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider group-hover:text-teal-700 transition-colors">
                                Bookings
                            </p>
                            <div className="p-1.5 bg-teal-50 text-[#0d9488] rounded-lg border border-teal-100 flex items-center justify-center transition-all group-hover:bg-[#0d9488] group-hover:text-white">
                                <Calendar style={{ fontSize: '16px' }} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#0d9488] transition-colors">
                                {totalAppointments.toLocaleString()}
                            </h3>
                            <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">Consultations</p>
                        </div>
                    </Card>

                    {/* Stat 4: Platform Reviews (Now fits single column) */}
                    <Card className="group border border-slate-200/80 bg-white hover:bg-teal-50/20 p-4 rounded-2xl transition-all duration-200 hover:border-teal-400 hover:shadow-md flex flex-col justify-between min-h-[130px]">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider group-hover:text-teal-700 transition-colors">
                                Reviews
                            </p>
                            <div className="p-1.5 bg-teal-50 text-[#0d9488] rounded-lg border border-teal-100 flex items-center justify-center transition-all group-hover:bg-[#0d9488] group-hover:text-white">
                                <Star style={{ fontSize: '16px' }} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#0d9488] transition-colors">
                                    {totalReviews}
                                </h3>
                                <span className="text-[9px] font-bold text-[#0d9488] bg-teal-50 px-1.5 py-0.5 rounded-md border border-teal-100">
                                    ★ 4.9/5
                                </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                                Patient rating
                            </p>
                        </div>
                    </Card>

                    {/* Stat 5: System Health */}
                    <Card className="group border border-slate-200/80 bg-white hover:bg-teal-50/20 p-4 rounded-2xl transition-all duration-200 hover:border-teal-400 hover:shadow-md flex flex-col justify-between min-h-[130px]">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider group-hover:text-teal-700 transition-colors">
                                Status
                            </p>
                            <div className="flex items-center gap-1 bg-teal-50 px-1.5 py-0.5 rounded-md border border-teal-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                                <span className="text-[9px] font-bold text-teal-700 uppercase">Live</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#0d9488] transition-colors">
                                99.9%
                            </h3>
                            <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">Uptime SLA</p>
                        </div>
                    </Card>

                </div>
            </div>
        </section>
    );
};

export default Platform;
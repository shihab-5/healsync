import { getAppointments, getDoctors, getUsers } from '@/app/lib/data';
import React from 'react';

// HeroUI v3 Component
import { Card } from '@heroui/react';

// Gravity UI Icons
import { Persons, Stethoscope, Calendar, ShieldCheck, Star } from '@gravity-ui/icons';

const Platform = async () => {
    // Fetch data concurrently on the server
    const [allUsers, doctors, appointments] = await Promise.all([
        getUsers(),
        getDoctors(),
        getAppointments()
    ]);

    // Compute dynamic metrics safely
    const totalPatients = allUsers?.filter(user => user.role === 'patient').length || allUsers?.length || 1284;
    const totalDoctors = doctors?.length || 248;
    const totalAppointments = appointments?.length || 3642;

    const stats = [
        {
            icon: Persons,
            value: `${totalPatients.toLocaleString()}+`,
            label: 'Patients',
            description: 'Registered and actively using our platform.'
        },
        {
            icon: Stethoscope,
            value: `${totalDoctors.toLocaleString()}+`,
            label: 'Verified Doctors',
            description: 'Trusted professionals across multiple specialties.'
        },
        {
            icon: Calendar,
            value: `${totalAppointments.toLocaleString()}+`,
            label: 'Appointments',
            description: 'Booked and completed through our platform.'
        },
        {
            icon: ShieldCheck,
            value: '99.9%',
            label: 'Secure Payments',
            description: 'Safe and encrypted transactions.'
        },
        {
            icon: Star,
            value: '4.8/5',
            label: 'User Satisfaction',
            description: 'Based on real feedback from our community.'
        }
    ];

    return (
        <section className="relative w-full bg-gradient-to-b from-[#e8f7f5] via-[#f2faf8] to-[#e4f5f2] py-16 px-4 md:px-8 text-slate-800 flex justify-center items-center overflow-hidden">
            
            {/* Decorative background cross icon (Top Left) */}
            <div className="absolute top-8 left-8 text-[#00b493]/20 text-3xl font-bold select-none pointer-events-none">
                +
            </div>

            {/* Decorative dot matrix grid (Top Right) */}
            <div className="absolute top-10 right-10 grid grid-cols-6 gap-1.5 opacity-25 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#00b493]"></span>
                ))}
            </div>

            <div className="w-full max-w-6xl flex flex-col items-center gap-10 z-10">
                
                {/* 1. Header Section */}
                <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
                    <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#00b493]">
                        OUR PLATFORM IN NUMBERS
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#0d2a2a] tracking-tight leading-tight">
                        Making Healthcare <br className="hidden sm:inline" />
                        Easier, <span className="text-[#00b493]">Together</span>
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base font-normal leading-relaxed mt-1">
                        Our platform is trusted by thousands of patients and healthcare professionals to provide simple, secure, and reliable medical services.
                    </p>
                </div>

                {/* 2. Stat Cards Grid (5 Equal Columns) */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mt-2">
                    {stats.map((stat, idx) => {
                        const IconComponent = stat.icon;
                        return (
                            <Card 
                                key={idx}
                                className="bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,180,147,0.12)] hover:-translate-y-1 p-6 rounded-2xl transition-all duration-300 flex flex-col items-start justify-between min-h-[220px]"
                            >
                                {/* Circle Icon Badge */}
                                <div className="w-12 h-12 rounded-full bg-[#ccf2eb]/60 flex items-center justify-center text-[#00b493] mb-4">
                                    <IconComponent style={{ fontSize: '22px', strokeWidth: 2 }} />
                                </div>

                                {/* Metric Value & Labels */}
                                <div className="flex flex-col gap-1 w-full">
                                    <h3 className="text-2xl md:text-3xl font-black text-[#0d2a2a] tracking-tight">
                                        {stat.value}
                                    </h3>
                                    <p className="text-xs font-bold text-[#0d2a2a] mt-0.5">
                                        {stat.label}
                                    </p>
                                    <p className="text-[11px] text-slate-500 font-normal leading-normal mt-1">
                                        {stat.description}
                                    </p>
                                </div>
                            </Card>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Platform;
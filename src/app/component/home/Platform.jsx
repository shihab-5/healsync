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

    const statCards = [
        {
            id: 'doctors',
            title: 'Active Doctors',
            value: totalDoctors,
            subtitle: 'Verified specialists',
            icon: <GraduationCap style={{ fontSize: '22px' }} />
        },
        {
            id: 'patients',
            title: 'Total Patients',
            value: totalPatients,
            subtitle: 'Registered users',
            icon: <Person style={{ fontSize: '22px' }} />
        },
        {
            id: 'appointments',
            title: 'Appointments',
            value: totalAppointments,
            subtitle: 'Booked consultations',
            icon: <Calendar style={{ fontSize: '22px' }} />
        },
        {
            id: 'reviews',
            title: 'Platform Reviews',
            value: totalReviews,
            subtitle: 'Average 4.9/5 rating',
            icon: <Star style={{ fontSize: '22px' }} />
        }
    ];

    return (
        /* ✅ Main Background: Upgraded to a rich gradient featuring #0D9488 with deep teal anchors */
        <div className="relative min-w-screen bg-gradient-to-br from-[#022c22] via-[#0D9488] to-[#115e59] p-6 md:p-10 text-white overflow-hidden flex flex-col justify-center items-center">
            
            {/* Ambient lighting overlays to enrich the background gradient depth */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute -bottom-10 -left-10 w-[400px] h-[400px] bg-black/20 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="w-full max-w-7xl space-y-10 z-10">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                        System Overview
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-sm">
                        Platform Statistics
                    </h1>
                    <p className="text-teal-100/80 text-sm max-w-md">
                        Real-time core system registration metrics and system health indicators.
                    </p>
                </div>

                {/* Metrics Dashboard Layout Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card) => (
                        <Card 
                            key={card.id}
                            /* ✅ Glassmorphic Cards: Translucent dark backdrop that pops perfectly against the gradient */
                            className="group relative overflow-hidden border border-white/10 bg-black/15 backdrop-blur-xl p-1 rounded-2xl cursor-pointer transition-all duration-300 hover:border-white/30 hover:bg-black/25 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] active:scale-98"
                        >
                            {/* HeroUI v3 Card Content Mapping */}
                            <Card.Content className="flex flex-row justify-between items-center p-5">
                                <div className="space-y-1.5">
                                    <p className="text-teal-100/70 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 group-hover:text-white">
                                        {card.title}
                                    </p>
                                    <h3 className="text-3xl font-extrabold text-white tracking-tight">
                                        {card.value.toLocaleString()}
                                    </h3>
                                    <p className="text-[11px] text-teal-200/60 font-medium">
                                        {card.subtitle}
                                    </p>
                                </div>
                                
                                {/* ✅ Modern Glass Icon Wrapper: Inverts visually into a clean solid white asset when hovered */}
                                <div className="p-3 bg-white/10 text-white rounded-xl border border-white/10 flex items-center justify-center shadow-inner transition-all duration-300 group-hover:bg-white group-hover:text-[#0D9488] group-hover:border-white group-hover:scale-105">
                                    {card.icon}
                                </div>
                            </Card.Content>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Platform;
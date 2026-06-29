import { getUserSession } from '@/app/lib/session';
import React from 'react';

// HeroUI v3 Component (Compound Architecture)
import { Card } from '@heroui/react';

// Gravity UI Icons
import { ShieldCheck, Calendar, CircleExclamation } from '@gravity-ui/icons';
import Image from 'next/image';

const PatientProfile = async () => {
    const user = await getUserSession();

    // Fallback/Hydration pairing using the exact raw schema provide


    // Format account creation date cleanly
    const accountCreatedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#022c22] via-[#0D9488] to-[#115e59] p-6 md:p-10 text-white flex flex-col items-center justify-start overflow-hidden">
            
            {/* Ambient lighting layer overlays */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-white/5 rounded-full blur-[130px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-black/20 rounded-full blur-[110px] pointer-events-none -z-10" />

            <div className="w-full max-w-4xl space-y-8 z-10 mt-4">
                
                {/* 1. Header Section (Matching layout structure from Screenshot 2026-06-29 073754.png) */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
                        My Profile
                    </h1>
                    <p className="text-teal-100/70 text-sm">
                        Manage your personal account information
                    </p>
                </div>

                {/* 2. Profile Summary Glass Card Container */}
                <Card className="relative overflow-hidden border border-white/10 bg-black/15 backdrop-blur-xl p-2 rounded-2xl shadow-2xl">
                    <Card.Content className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
                        
                        {/* Profile Avatar Frame */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-tr from-[#0D9488] to-teal-300 rounded-2xl opacity-70 blur-xs transition duration-300 group-hover:opacity-100" />
                           <Image
                                src={user.image} 
                                alt={`${user.name}'s profile avatar`}
                                width={112} // Tailwind w-28 matches 112px runtime pixel size 
                                height={112} // Tailwind h-28 matches 112px runtime pixel size
                                priority // Bypasses lazy loading constraints for critical above-the-fold hero content
                                className="relative w-28 h-28 object-cover rounded-2xl border border-white/10 shadow-md"
                            />
                        </div>

                        {/* User Identity Info Stack */}
                        <div className="flex flex-col items-center sm:items-start space-y-3 flex-1 text-center sm:text-left">
                            <div className="space-y-0.5">
                                <h2 className="text-2xl font-bold tracking-tight text-white capitalize">
                                    {user.name}
                                </h2>
                                <p className="text-teal-100/60 text-sm font-medium">
                                    {user.email}
                                </p>
                            </div>

                            {/* Dynamic Role Badge (Following styling reference framework) */}
                            <span className="inline-flex items-center text-[11px] font-extrabold tracking-widest text-white uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/20 shadow-sm backdrop-blur-md">
                                {user.role}
                            </span>
                        </div>
                    </Card.Content>
                </Card>

                {/* 3. Account Details Metadata Subsection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Verification Card Box */}
                    <Card className="border border-white/5 bg-black/10 backdrop-blur-lg rounded-xl">
                        <Card.Content className="flex items-center gap-4 p-4">
                            <div className={`p-2.5 rounded-xl border ${user.emailVerified ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                {user.emailVerified ? <ShieldCheck style={{ fontSize: '20px' }} /> : <CircleExclamation style={{ fontSize: '20px' }} />}
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-teal-200/50">Security Status</p>
                                <p className="text-sm font-semibold mt-0.5 text-white">
                                    {user.emailVerified ? 'Verified Account Credentials' : 'Email Address Unverified'}
                                </p>
                            </div>
                        </Card.Content>
                    </Card>

                    {/* Timeline Registration Box */}
                    <Card className="border border-white/5 bg-black/10 backdrop-blur-lg rounded-xl">
                        <Card.Content className="flex items-center gap-4 p-4">
                            <div className="p-2.5 bg-white/5 text-teal-200 border border-white/10 rounded-xl">
                                <Calendar style={{ fontSize: '20px' }} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-teal-200/50">Registration Date</p>
                                <p className="text-sm font-semibold mt-0.5 text-white">
                                    Joined {accountCreatedDate}
                                </p>
                            </div>
                        </Card.Content>
                    </Card>

                    {/* Account ID Identification Box */}
                    <Card className="md:col-span-2 border border-white/5 bg-black/10 backdrop-blur-lg rounded-xl">
                       
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
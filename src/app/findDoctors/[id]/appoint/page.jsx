import { getUserSession } from '@/app/lib/session';
import { ShieldExclamation } from '@gravity-ui/icons';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const Appointment = async ({params}) => {
        const { id } = await params;

        const user = await getUserSession();
    console.log('Current User Session:', user);
    if (!user) {
        redirect(`/auth/login?redirect=/findDoctors/${id}/appoint`);
    }

    // Auth Role Guard Screen
    if (user.role !== 'patient') {
        return (
            <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
                <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldExclamation className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">Access Restricted</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        Only job patients can apply for positions. Please sign in with a patients account to proceed.
                    </p>
                    <Link 
                        href="/auth/login" 
                        className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition"
                    >
                        Switch Account
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div>
            Appoint the doctor
        </div>
    );
};

export default Appointment;
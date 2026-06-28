import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

async function getDoctors() {
  try {
    const res = await fetch("http://localhost:5000/api/doctors", {
      cache: "no-store" 
    });

    if (!res.ok) {
      throw new Error("API server responded with error status code.");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data from remote server:", error);
    return []; 
  }
}

const TopDoc = async () => {
    const doctors = await getDoctors();

    if (!doctors || doctors.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400 font-medium">
                No doctor registration records found in the database.
            </div>
        );
    }

    return (
        <section className="py-16 px-4 max-w-7xl mx-auto font-sans bg-gray-50/50">
            {/* Header Layout Block */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-3">
                    Featured Doctors
                </h2>
                <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                    Meet our highly qualified and experienced healthcare professionals
                </p>
            </div>

            {/* RESTORED: Maximum of 3 columns with gap-8 makes the cards big and clean again */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {doctors.map((doctor) => {
                    const displayName = doctor.doctorName.startsWith("Dr.") 
                        ? doctor.doctorName 
                        : `Dr. ${doctor.doctorName}`;

                    return (
                        <div 
                            key={doctor._id.toString()} 
                            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            {/* Profile Image View Frame */}
                            <div className="relative w-full h-64 bg-gray-100 overflow-hidden"> 
                                {/* Note: I also increased the height slightly from h-56 to h-64 to match the wider cards */}
                                <Image 
                                    src={doctor.profileImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d"} 
                                    alt={displayName}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                                
                                {/* Dynamic Status Pill Overlay Badge */}
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

                            {/* Informational Core Segment Area */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-1 group-hover:text-teal-700 transition-colors line-clamp-1">
                                    {displayName}
                                </h3>
                                
                                <p className="text-gray-400 text-sm font-semibold mb-4 tracking-wide uppercase">
                                    {doctor.specialization}
                                </p>

                                {/* Rating and Professional Details Metadata */}
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

                                {/* Fee Summary and Action Trigger Section */}
                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-black text-teal-700">${doctor.consultationFee}</span>
                                        <span className="text-gray-400 text-xs font-bold tracking-wider uppercase ml-1">/ visit</span>
                                    </div>
                                    
                                    <button className="bg-teal-700 hover:bg-teal-600 active:scale-95 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-sm shadow-teal-700/5">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls / View Link */}
            <div className="flex justify-center mt-12">
                <Link href="/findDoctors"
                >
                <button className="px-6 py-3 border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-bold text-sm rounded-xl bg-white shadow-sm transition-all active:scale-98">
                    View All Doctors
                </button>
                </Link>
                
            </div>
        </section>
    );
};

export default TopDoc;
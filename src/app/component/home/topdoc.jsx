import React from "react";
import Image from "next/image";
import Link from "next/link";

async function getDoctors() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors`, {
      cache: "no-store",
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

  const topDoctors = doctors
    .filter((doctor) => doctor.verificationStatus === "verified")
    .slice(0, 4);

  if (!topDoctors || topDoctors.length === 0) {
    return (
      <div className="text-center py-20 text-white/80 font-medium bg-teal-800">
        No featured doctors found.
      </div>
    );
  }

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-gradient-to-tl from-teal-800 via-teal-600 to-teal-400 text-white font-sans relative overflow-hidden">
      {/* Soft Ambient Light Glows for Visual Depth */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Layout Block */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-extrabold tracking-widest text-teal-100 uppercase mb-3 drop-shadow-sm">
            FEATURED DOCTORS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-sm">
            Meet Our Top Specialists
          </h2>
          <p className="text-sm sm:text-base text-teal-50/90 max-w-xl mx-auto leading-relaxed">
            Consult with highly qualified, verified healthcare professionals committed to your well-being.
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {topDoctors.map((doctor) => {
            const displayName = doctor.doctorName.startsWith("Dr.")
              ? doctor.doctorName
              : `Dr. ${doctor.doctorName}`;

            return (
              <div
                key={doctor._id.toString()}
                className="group bg-white rounded-2xl border border-white/40 overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Profile Image View Frame */}
                  <div className="relative w-full h-64 bg-slate-100 overflow-hidden">
                    <Image
                      src={
                        doctor.profileImage ||
                        "https://images.unsplash.com/photo-1622253692010-333f2da6031d"
                      }
                      alt={displayName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      priority
                    />

                    {/* Verification Status Pill Badge */}
                    <div
                      className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 backdrop-blur-md text-[11px] font-bold px-3 py-1 rounded-full shadow-md text-black ${
                        doctor.verificationStatus === "verified"
                          ? "bg-teal-100  text-teal-600"
                          : "bg-amber-500/90"
                      }`}
                    >
                      {doctor.verificationStatus === "verified" && (
                        <svg
                          className="w-3.5 h-3.5 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span className="capitalize tracking-wide">
                        {doctor.verificationStatus || "pending"}
                      </span>
                    </div>
                  </div>

                  {/* Core Details Area */}
                  <div className="p-5 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1 group-hover:text-teal-600 transition-colors line-clamp-1">
                      {displayName}
                    </h3>

                    <p className="text-teal-700 text-xs font-bold tracking-wider uppercase mb-3">
                      {doctor.specialization}
                    </p>

                    {/* Rating and Experience Metadata */}
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-2">
                      <div className="flex items-center gap-1 text-amber-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-slate-900 font-bold">
                          {doctor.rating || "4.8"}
                        </span>
                        <span className="text-slate-400 font-normal">
                          ({doctor.reviewCount || "24"})
                        </span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <div className="text-slate-600 font-medium">
                        {doctor.experience} yrs exp.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fee & Action Trigger Footer */}
                <div className="p-5 pt-0 mt-auto">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-slate-900">
                        ${doctor.consultationFee}
                      </span>
                      <span className="text-slate-400 text-[10px] font-bold tracking-wider uppercase ml-1">
                        / visit
                      </span>
                    </div>

                    <Link
                      href={`/findDoctors/${doctor._id}`}
                      className="bg-gradient-to-br from-teal-800 via-teal-600 to-teal-400 hover:bg-[#0b7a70] active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-teal-700/20"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Doctors Button */}
        <div className="flex justify-center mt-12">
          <Link href="/findDoctors">
            <button className="px-8 py-3.5 bg-white text-teal-800 hover:bg-teal-50 hover:text-teal-900 font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-98 border border-white/60">
              View All Doctors
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopDoc;
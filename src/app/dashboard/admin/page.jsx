"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, Chip } from "@heroui/react";
import {
  Person,
  Calendar,
  CreditCard,
  Star,
  ShieldCheck,
  ShieldExclamation,
  PersonFill,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { getAppointments } from "@/app/lib/data";
import { getDoctors } from "@/app/lib/action/doctor";
import { getUsers } from "@/app/lib/action/user";
import { getReviews } from "@/app/lib/action/review";

export default function AdminDashboardOverview() {
  const { data: session, isPending } = authClient.useSession();
  const admin = session?.user;

  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [u, d, a, r] = await Promise.all([
          getUsers(),
          getDoctors(),
          getAppointments(),
          getReviews(),
        ]);
        setUsers(u || []);
        setDoctors(d || []);
        setAppointments(a || []);
        setReviews(r || []);
      } catch (err) {
        console.error("Failed to load admin overview:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ---- Derived stats ----

  const patientCount = useMemo(
    () => users.filter((u) => u.role === "patient").length,
    [users]
  );

  const pendingDoctors = useMemo(
    () => doctors.filter((d) => d.verificationStatus !== "verified").length,
    [doctors]
  );

  const verifiedDoctors = useMemo(
    () => doctors.filter((d) => d.verificationStatus === "verified").length,
    [doctors]
  );

  // Some appointment records have null userId/consultationFee (per your sample data) — guard against that
  const totalRevenue = useMemo(
    () =>
      appointments
        .filter((a) => a.sessionId) // only actually-paid ones
        .reduce((sum, a) => sum + Number(a.consultationFee || 0), 0),
    [appointments]
  );

  const paidAppointmentsCount = useMemo(
    () => appointments.filter((a) => a.sessionId).length,
    [appointments]
  );

  const avgPlatformRating = useMemo(() => {
    if (reviews.length === 0) return null;
    const sum = reviews.reduce((s, r) => s + Number(r.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const statusBreakdown = useMemo(() => {
    const counts = { pending: 0, confirmed: 0, completed: 0, rejected: 0, cancelled: 0 };
    appointments.forEach((a) => {
      const status = a.appointmentStatus || "pending";
      if (counts[status] !== undefined) counts[status] += 1;
    });
    return counts;
  }, [appointments]);

  const recentAppointments = useMemo(
    () => [...appointments].slice(-6).reverse(),
    [appointments]
  );

  const metrics = [
    {
      id: "patients",
      value: patientCount,
      label: "Total Patients",
      icon: Person,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    {
      id: "doctors",
      value: doctors.length,
      label: "Total Doctors",
      subtext: `${verifiedDoctors} verified`,
      icon: PersonFill,
      iconBg: "bg-teal-50 text-teal-600 border border-teal-100",
    },
    {
      id: "appointments",
      value: appointments.length,
      label: "Total Appointments",
      subtext: `${paidAppointmentsCount} paid`,
      icon: Calendar,
      iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
    },
    {
      id: "revenue",
      value: `$${totalRevenue}`,
      label: "Total Revenue",
      icon: CreditCard,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    {
      id: "reviews",
      value: reviews.length,
      label: "Total Reviews",
      subtext: avgPlatformRating ? `${avgPlatformRating} avg rating` : "No ratings yet",
      icon: Star,
      iconBg: "bg-amber-50 text-amber-500 border border-amber-100",
    },
    {
      id: "pending",
      value: pendingDoctors,
      label: "Pending Verifications",
      icon: ShieldExclamation,
      iconBg: "bg-rose-50 text-rose-600 border border-rose-100",
    },
  ];

  const statusColor = {
    pending: "warning",
    confirmed: "accent",
    completed: "success",
    rejected: "danger",
    cancelled: "default",
  };

  if (isPending || loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/60">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading admin overview...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-sm">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-teal-500/10 blur-xl pointer-events-none" />
        <div className="relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300 bg-white/10 px-2.5 py-1 rounded-md">
            Admin Dashboard
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight mt-2">
            Welcome back, {admin?.name || "Admin"}
          </h1>
          <p className="text-xs md:text-sm text-slate-300 font-medium mt-1.5 max-w-xl leading-relaxed">
            Platform-wide overview of users, doctors, appointments, and payments.
          </p>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {metrics.map((m) => (
          <Card
            key={m.id}
            className="border border-slate-100 bg-white p-5 rounded-2xl shadow-sm flex flex-row items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${m.iconBg}`}>
              <m.icon size={18} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-2xl font-black text-slate-800 tracking-tight">{m.value}</span>
              <span className="text-xs font-bold text-slate-500 truncate">{m.label}</span>
              {m.subtext && (
                <span className="text-[11px] font-semibold text-slate-400 mt-0.5 truncate">{m.subtext}</span>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Recent appointments */}
        <Card className="lg:col-span-2 border border-slate-100 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-50 mb-4 font-bold text-base text-slate-800">
            <Calendar className="text-teal-600 size-5" />
            <h2>Recent Appointments</h2>
          </div>

          {recentAppointments.length === 0 ? (
            <p className="text-sm text-slate-400 font-medium py-6 text-center">
              No appointments yet.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentAppointments.map((a) => (
                <div
                  key={a._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-100 transition-all"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-slate-800 truncate">
                      Dr. {a.doctorName || "Unknown"}
                    </span>
                    <span className="text-xs text-slate-400 font-medium truncate">
                      {a.userEmail || "Unknown patient"} &middot; {a.day} {a.slot}
                    </span>
                  </div>
                  <Chip
                    size="sm"
                    variant="soft"
                    color={statusColor[a.appointmentStatus] || "warning"}
                    className="capitalize font-bold shrink-0"
                  >
                    {a.appointmentStatus || "pending"}
                  </Chip>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Status breakdown + verification alert */}
        <div className="space-y-6">
          <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-base text-slate-800 mb-4">Appointment Status</h2>
            <div className="flex flex-col gap-3">
              {Object.entries(statusBreakdown).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 capitalize">{status}</span>
                  <Chip size="sm" variant="soft" color={statusColor[status]} className="font-bold">
                    {count}
                  </Chip>
                </div>
              ))}
            </div>
          </Card>

          {pendingDoctors > 0 && (
            <Card className="border border-rose-100 bg-rose-50/60 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-2">
                <ShieldExclamation className="text-rose-600 size-5" />
                <h2 className="font-bold text-sm text-rose-700">Action Needed</h2>
              </div>
              <p className="text-xs text-rose-600 font-medium leading-relaxed">
                {pendingDoctors} doctor{pendingDoctors !== 1 ? "s are" : " is"} awaiting
                verification. Review them in Manage Doctors.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
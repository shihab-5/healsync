"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, Chip, Avatar, Button } from "@heroui/react";
import {
  Calendar,
  CreditCard,
  HeartFill,
  LayoutColumns,
} from "@gravity-ui/icons";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getAppointments } from "@/app/lib/data";

export default function DashboardOverview() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments once we know who the user is
  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const all = await getAppointments();
        const mine = (all || []).filter((a) => a.userId === user.id);
        setAppointments(mine);
      } catch (err) {
        console.error("Failed to load appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  // ---- Derived data (memoized so it only recalculates when appointments change) ----

  const metrics = useMemo(() => {
    const total = appointments.length;

    const totalPaid = appointments.reduce(
      (sum, a) => sum + Number(a.consultationFee || 0),
      0
    );

    const completed = appointments.filter(
      (a) => a.appointmentStatus === "completed"
    ).length;

    const upcomingCount = appointments.filter(
      (a) => a.appointmentStatus !== "completed" && a.appointmentStatus !== "cancelled"
    ).length;

    return [
      {
        id: "appointments",
        value: total,
        label: "Total Appointments",
        subtext: `${upcomingCount} upcoming`,
        icon: Calendar,
        iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      },
      {
        id: "payments",
        value: `$${totalPaid}`,
        label: "Total Paid",
        subtext: `${appointments.filter((a) => a.sessionId).length} transactions`,
        icon: CreditCard,
        iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      },
      {
        id: "completed",
        value: completed,
        label: "Completed",
        subtext: "Appointments done",
        icon: LayoutColumns,
        iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
      },
    ];
  }, [appointments]);

  const upcomingAppointments = useMemo(() => {
    return appointments
      .filter(
        (a) => a.appointmentStatus !== "completed" && a.appointmentStatus !== "cancelled"
      )
      .slice(0, 5);
  }, [appointments]);

  const recentPayments = useMemo(() => {
    return appointments
      .filter((a) => a.sessionId) // only ones that actually went through Stripe
      .slice(0, 5);
  }, [appointments]);

  const favoriteDoctors = useMemo(() => {
    const grouped = {};
    appointments.forEach((a) => {
      if (!a.doctorId) return;
      if (!grouped[a.doctorId]) {
        grouped[a.doctorId] = {
          id: a.doctorId,
          name: a.doctorName,
          count: 0,
        };
      }
      grouped[a.doctorId].count += 1;
    });
    return Object.values(grouped)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [appointments]);

  // ---- Loading state ----
  if (isPending || loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/60">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      {/* Welcome Banner */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 p-6 text-white shadow-sm">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-teal-500/20 blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 right-24 h-28 w-28 rounded-full bg-teal-400/20 blur-lg pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-200/90 bg-teal-900/40 px-2.5 py-1 rounded-md">
              Patient Dashboard
            </span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mt-2">
              Welcome back, {user?.name || "Patient"}!
            </h1>
            <p className="text-xs md:text-sm text-teal-100/90 font-medium mt-1.5 max-w-xl leading-relaxed">
              You have {metrics[0]?.subtext} this week. Stay on top of your consultations below.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 self-start md:self-center shadow-inner">
            <span className="text-[10px] text-teal-200 font-bold uppercase tracking-wider block">
              Patient ID
            </span>
            <span className="text-sm font-mono font-bold tracking-wider">
              {user?.id?.slice(-8).toUpperCase() || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {metrics.map((metric) => (
          <Card
            key={metric.id}
            className="border border-slate-100 bg-white p-5 rounded-2xl shadow-xs flex flex-row items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-105 ${metric.iconBg}`}
            >
              <metric.icon size={18} />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-2xl font-black text-slate-800 tracking-tight transition-colors duration-200 group-hover:text-teal-900">
                {metric.value}
              </span>
              <span className="text-xs font-bold text-slate-500 mt-0.5 truncate">
                {metric.label}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                {metric.subtext}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Appointments */}
          <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-4">
              <div className="flex items-center gap-2 font-bold text-base text-slate-800">
                <Calendar className="text-teal-600 size-5" />
                <h2>Upcoming Appointments</h2>
              </div>
              <Link
                href="/dashboard/patient/myAppointments"
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
              >
                View All &rarr;
              </Link>
            </div>

            {upcomingAppointments.length === 0 ? (
              <p className="text-sm text-slate-400 font-medium py-6 text-center">
                No upcoming appointments yet.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {upcomingAppointments.map((app) => (
                  <div
                    key={app._id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                        <Calendar size={16} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-slate-800 truncate">
                          Dr. {app.doctorName}
                        </span>
                        <span className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                          {app.day} • {app.slot}
                        </span>
                      </div>
                    </div>
                    <Chip
                      size="sm"
                      variant="flat"
                      className="capitalize font-bold text-xs px-3"
                      color={app.appointmentStatus === "confirmed" ? "primary" : "warning"}
                    >
                      {app.appointmentStatus || "pending"}
                    </Chip>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Recent Payments */}
          <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-4">
              <div className="flex items-center gap-2 font-bold text-base text-slate-800">
                <CreditCard className="text-teal-600 size-5" />
                <h2>Recent Payments</h2>
              </div>
              <Link
                href="/dashboard/patient/payments"
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
              >
                View All &rarr;
              </Link>
            </div>

            {recentPayments.length === 0 ? (
              <p className="text-sm text-slate-400 font-medium py-6 text-center">
                No payments yet.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {recentPayments.map((pay) => (
                  <div
                    key={pay._id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-200"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-slate-800 truncate">
                        Dr. {pay.doctorName}
                      </span>
                      <span className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                        {pay.sessionId?.slice(-10)} • {pay.day}
                      </span>
                    </div>
                    <span className="text-base font-extrabold text-emerald-600 shrink-0">
                      ${pay.consultationFee}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Favorite/Most-Booked Doctors */}
        <div className="w-full">
          <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-4">
              <div className="flex items-center gap-2 font-bold text-base text-slate-800">
                <HeartFill className="text-rose-500 size-5" />
                <h2>Most Booked Doctors</h2>
              </div>
            </div>

            {favoriteDoctors.length === 0 ? (
              <p className="text-sm text-slate-400 font-medium py-6 text-center">
                Book your first appointment to see this.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {favoriteDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-white shadow-2xs hover:shadow-sm hover:border-teal-200 transition-all duration-200 gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar
                        name={doc.name}
                        className="w-12 h-12 font-bold text-white bg-gradient-to-br from-teal-600 to-teal-400 text-sm rounded-xl shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-slate-800 truncate group-hover:text-teal-600 transition-colors">
                          Dr. {doc.name}
                        </span>
                        <span className="text-xs font-semibold text-teal-600 bg-teal-50/60 border border-teal-100/50 rounded-md px-2 py-0.5 mt-1 w-max">
                          Booked {doc.count}x
                        </span>
                      </div>
                    </div>

                    <Button
                      as={Link}
                      href={`/findDoctors/${doc.id}`}
                      size="sm"
                      className="w-full sm:w-auto bg-slate-50 hover:bg-teal-600 text-slate-600 hover:text-white font-bold rounded-lg px-3 transition-all border-none"
                    >
                      Book
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
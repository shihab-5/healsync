"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card } from "@heroui/react";
import { Person, Persons, Calendar, Star } from "@gravity-ui/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { getAppointments } from "@/app/lib/data";
import { getDoctors } from "@/app/lib/action/doctor";
import { getUsers } from "@/app/lib/action/user";
import { getReviews } from "@/app/lib/action/review";

const RATING_COLORS = ["#0F766E", "#14B8A6", "#2DD4BF", "#5EEAD4", "#99F6E4"];
const STATUS_COLORS = {
  pending: "#EAB308",
  confirmed: "#0F766E",
  completed: "#16A34A",
  rejected: "#DC2626",
  cancelled: "#94A3B8",
};

export default function AdminAnalytics() {
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
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalPatients = useMemo(
    () => users.filter((u) => u.role === "patient").length,
    [users]
  );

  // ---- Doctor Performance (rating based) ----
  const doctorPerformance = useMemo(() => {
    const grouped = {};

    reviews.forEach((r) => {
      if (!r.doctorId) return;
      if (!grouped[r.doctorId]) {
        grouped[r.doctorId] = { doctorId: r.doctorId, name: r.doctorName, total: 0, count: 0 };
      }
      grouped[r.doctorId].total += Number(r.rating || 0);
      grouped[r.doctorId].count += 1;
    });

    return Object.values(grouped)
      .map((d) => ({
        name: `Dr. ${d.name}`,
        rating: Number((d.total / d.count).toFixed(1)),
        reviews: d.count,
      }))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8); // top 8 to keep the chart readable
  }, [reviews]);

  // ---- Appointment status breakdown (bonus chart, supports the Recharts requirement) ----
  const statusBreakdown = useMemo(() => {
    const counts = {};
    appointments.forEach((a) => {
      const status = a.appointmentStatus || "pending";
      counts[status] = (counts[status] || 0) + 1;
    });
    return Object.entries(counts).map(([status, value]) => ({ status, value }));
  }, [appointments]);

  const metrics = [
    {
      id: "patients",
      value: totalPatients,
      label: "Total Patients",
      icon: Person,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    {
      id: "doctors",
      value: doctors.length,
      label: "Total Doctors",
      icon: Persons,
      iconBg: "bg-teal-50 text-teal-600 border border-teal-100",
    },
    {
      id: "appointments",
      value: appointments.length,
      label: "Total Appointments",
      icon: Calendar,
      iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
    },
  ];

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/60">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
          Analytics
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Platform performance at a glance.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {metrics.map((m) => (
          <Card
            key={m.id}
            className="border border-slate-100 bg-white p-5 rounded-2xl shadow-sm flex flex-row items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${m.iconBg}`}>
              <m.icon size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-800 tracking-tight">{m.value}</span>
              <span className="text-xs font-bold text-slate-500">{m.label}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctor Performance — Bar Chart */}
        <Card className="lg:col-span-2 border border-slate-100 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-50 mb-4 font-bold text-base text-slate-800">
            <Star className="text-amber-500 size-5" />
            <h2>Doctor Performance (by Rating)</h2>
          </div>

          {doctorPerformance.length === 0 ? (
            <p className="text-sm text-slate-400 font-medium py-12 text-center">
              No reviews yet — ratings will appear here once patients leave feedback.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={doctorPerformance} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: "#64748B" }} />
                <Tooltip
                  cursor={{ fill: "#F8FAFB" }}
                  contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }}
                  formatter={(value, name, props) => [
                    `${value} ★ (${props.payload.reviews} reviews)`,
                    "Rating",
                  ]}
                />
                <Bar dataKey="rating" radius={[8, 8, 0, 0]}>
                  {doctorPerformance.map((_, i) => (
                    <Cell key={i} fill={RATING_COLORS[i % RATING_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Appointment status — Pie Chart */}
        <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-50 mb-4 font-bold text-base text-slate-800">
            <Calendar className="text-teal-600 size-5" />
            <h2>Appointment Status</h2>
          </div>

          {statusBreakdown.length === 0 ? (
            <p className="text-sm text-slate-400 font-medium py-12 text-center">
              No appointments yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusBreakdown}
                  dataKey="value"
                  nameKey="status"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {statusBreakdown.map((entry, i) => (
                    <Cell key={i} fill={STATUS_COLORS[entry.status] || "#94A3B8"} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }}
                  formatter={(value, name) => [value, name]}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 11, textTransform: "capitalize" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
}
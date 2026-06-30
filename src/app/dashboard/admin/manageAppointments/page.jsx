"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, Chip, Avatar } from "@heroui/react";
import {
  Calendar,
  Clock,
  Tray,
  Magnifier,
  Notebook,
  CircleCheck,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { getAppointments } from "@/app/lib/action/appointments";

const FILTERS = ["all", "pending", "accepted", "completed", "rejected"];

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data || []);
      } catch (err) {
        console.error("Failed to load appointments:", err);
        toast.error("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statusOf = (appt) => appt.appointmentStatus || "pending";

  const counts = useMemo(() => {
    const c = { all: appointments.length, pending: 0, accepted: 0, completed: 0, rejected: 0 };
    appointments.forEach((a) => {
      const s = statusOf(a);
      if (c[s] !== undefined) c[s] += 1;
    });
    return c;
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((a) => {
        const matchesFilter = activeFilter === "all" || statusOf(a) === activeFilter;
        const matchesSearch =
          !search.trim() ||
          a.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
          a.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
          a.day?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => (b._id || "").localeCompare(a._id || "")); // newest first
  }, [appointments, activeFilter, search]);

  const statusConfig = {
    pending:   { color: "warning",   label: "Pending" },
    accepted:  { color: "success",   label: "Accepted" },
    completed: { color: "secondary", label: "Completed" },
    rejected:  { color: "danger",    label: "Rejected" },
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/60">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading appointments...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
          Manage Appointments
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          View all appointments across the platform and monitor their status.
        </p>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                activeFilter === f
                  ? "bg-teal-700 text-white"
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f} ({counts[f] ?? 0})
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Magnifier size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by patient, doctor, or day..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 bg-white focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Appointment list */}
      {filteredAppointments.length === 0 ? (
        <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-3">
            <Calendar size={22} />
          </div>
          <p className="text-sm font-semibold text-slate-500">No appointments found</p>
          <p className="text-xs text-slate-400 mt-1">
            Try a different filter or search term.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredAppointments.map((appt) => {
            const status = statusOf(appt);

            return (
              <Card
                key={appt._id}
                className="border border-slate-100 bg-white rounded-2xl shadow-sm p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <Avatar
                      name={appt.userEmail}
                      className="w-12 h-12 font-bold text-white bg-gradient-to-br from-sky-600 to-indigo-500 rounded-xl shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-800 truncate">
                          {appt.userEmail}
                        </span>
                        <Chip
                          size="sm"
                          variant="soft"
                          color={statusConfig[status]?.color || "default"}
                          className="font-bold"
                        >
                          {statusConfig[status]?.label || status}
                        </Chip>
                        {appt.transactionId && (
                          <Chip size="sm" variant="soft" color="success" className="font-bold">
                            Paid
                          </Chip>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                        Dr. {appt.doctorName || "—"}
                        {appt.symptoms ? ` · ${appt.symptoms}` : ""}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} /> {appt.day}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} /> {appt.slot}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tray size={13} /> ${appt.consultationFee}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-1 shrink-0 self-start md:self-center">
                    {appt.sessionId && (
                      <span className="text-[11px] text-slate-300 font-mono truncate max-w-[200px]">
                        Session: {appt.sessionId.slice(0, 24)}…
                      </span>
                    )}
                    {status === "completed" && (
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                        <CircleCheck size={13} className="text-emerald-500" />
                        Consultation finished
                      </span>
                    )}
                    {appt.userId && (
                      <span className="text-[11px] text-slate-300 font-mono truncate max-w-[200px]">
                        Patient ID: {appt.userId.slice(-8)}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
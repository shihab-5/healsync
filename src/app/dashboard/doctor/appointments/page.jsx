"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Chip } from "@heroui/react";
import {
  Check,
  Xmark,
  FileText,
  Funnel,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getAppointments } from "@/app/lib/data";
import { getDoctors } from "@/app/lib/action/doctor";
import { getUsers } from "@/app/lib/action/user";
import { updateAppointment } from "@/app/lib/action/appointments";

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "rejected", label: "Rejected" },
];

export default function AppointmentRequests() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const currentUser = session?.user;

  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState("all");

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [u, d, a] = await Promise.all([
          getUsers(),
          getDoctors(),
          getAppointments(),
        ]);
        setUsers(u || []);
        setDoctors(d || []);
        setAppointments(a || []);
      } catch (err) {
        console.error("Failed to load appointment data:", err);
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Find current doctor profile matching the logged-in session user
  const currentDoctor = useMemo(() => {
    if (!currentUser) return null;
    return doctors.find(
      (d) =>
        d.userId === currentUser.id ||
        d.email?.toLowerCase() === currentUser.email?.toLowerCase() ||
        d._id === currentUser.id
    );
  }, [doctors, currentUser]);
// console.log("Current Doctor Profile:", currentDoctor);
  // Filter appointments for this specific doctor and enrich patient names from user data
  const doctorAppointments = useMemo(() => {
    if (!currentDoctor && !currentUser) return [];
    const docId = currentDoctor?.userId || currentDoctor?.id || currentUser?.id;
  // console.log("Current Doctor ID:", docId);
    return appointments
      .filter((app) => app.doctorId === docId)
      .map((app) => {
        const patient = users.find((u) => u.id === app.userId || u._id === app.userId);
        return {
          ...app,
          patientName:
            app.userName ||
            patient?.name ||
            app.userEmail?.split("@")[0] ||
            "Patient",
        };
      });
  }, [appointments, currentDoctor, currentUser, users]);

  // Filter list based on selected status tab
  const filteredAppointments = useMemo(() => {
    return doctorAppointments.filter((app) => {
      if (selectedStatus === "all") return true;
      const status = (app.appointmentStatus || "pending").toLowerCase();
      // Map 'accepted' to 'confirmed' for consistent status matching
      const normalizedStatus = status === "accepted" ? "confirmed" : status;
      return normalizedStatus === selectedStatus;
    });
  }, [doctorAppointments, selectedStatus]);

  // Local static status updates (Accept / Reject)
const handleAppointmentUpdate = async (appointmentId, newStatus) => {
  try {
    await updateAppointment(appointmentId, { appointmentStatus: newStatus });
    setAppointments((prev) =>
      prev.map((app) =>
        (app._id || app.id) === appointmentId
          ? { ...app, appointmentStatus: newStatus }
          : app
      )
    );
    if (newStatus === "confirmed") toast.success("Appointment accepted!");
    if (newStatus === "rejected") toast.error("Appointment rejected.");
  } catch (err) {
    toast.error("Failed to update appointment");
  }
};

  // Local Mark Completed & Navigation to Prescription Page
const handleMarkCompleted = async (appointment) => {
  const id = appointment._id || appointment.id;
  if (!id) {
    toast.error("Unable to navigate: missing appointment ID.");
    return;
  }

  try {
    await updateAppointment(id, { appointmentStatus: "completed" });

    setAppointments((prev) =>
      prev.map((app) =>
        (app._id || app.id) === id
          ? { ...app, appointmentStatus: "completed" }
          : app
      )
    );

    toast.success("Marked as Completed!");

    const patientId = appointment.userId || appointment.patientId || "";
    const patientName = appointment.userEmail || "";
    const searchParams = new URLSearchParams();

    searchParams.set("appointmentId", id);
    if (patientId) searchParams.set("patientId", patientId);
    if (patientName) searchParams.set("patientEmail", patientName);

    const destination = "/dashboard/doctor/prescriptions" +
      (searchParams.toString() ? `?${searchParams.toString()}` : "");

    router.push(destination);
  } catch (err) {
    toast.error("Failed to mark appointment as completed");
  }
};

  if (isSessionPending || loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/60">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading requests...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F4F6F8] p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] tracking-tight">
          Appointment Requests
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Review and manage patient appointment requests
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
        <Funnel size={18} className="text-slate-400 shrink-0" />
        <div className="flex items-center gap-2">
          {STATUS_TABS.map((tab) => {
            const isActive = selectedStatus === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedStatus(tab.key)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                  isActive
                    ? "bg-[#2563EB] text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <Card className="border border-slate-200/60 bg-white rounded-2xl p-10 text-center shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            No {selectedStatus === "all" ? "" : selectedStatus} appointment requests found.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((app) => {
            console.log("Rendering appointment:", app);
            const id = app._id || app.id;
            const rawStatus = (app.appointmentStatus || "pending").toLowerCase();
            const status = rawStatus === "accepted" ? "confirmed" : rawStatus;
            const avatarInitial = app.patientName ? app.patientName.charAt(0).toUpperCase() : "P";

            return (
              <Card
                key={id}
                className="border border-slate-200/60 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Patient Avatar & Details */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#2563EB] font-black text-lg flex items-center justify-center shrink-0">
                      {avatarInitial}
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-extrabold text-slate-800">
                        {app.userEmail}
                      </h3>
                      <h3 className="text-base font-medium text-slate-600">
                        {app.paymentStatus}
                      </h3>
                      <p className="text-xs font-medium text-slate-400">
                        {app.day || app.date || "2025-07-15"} at {app.slot || app.time || "10:00 AM"}
                      </p>

                      {/* Symptoms Badge */}
                      {app.symptoms && (
                        <div className="inline-block bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-xs text-slate-600 font-medium mt-1">
                          <span className="font-bold text-slate-400">Symptoms: </span>
                          {app.symptoms}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Status Tag & Action Buttons */}
                  <div className="flex items-center gap-2 self-start md:self-center">
                    {/* Status Display Pill */}
                    {status === "pending" && (
                      <Chip size="sm" variant="flat" className="bg-amber-50 text-amber-600 font-bold px-3 py-1">
                        Pending
                      </Chip>
                    )}

                    {(status === "confirmed" || status === "accepted") && (
                      <Chip size="sm" variant="flat" className="bg-blue-50 text-blue-600 font-bold px-3 py-1">
                        Confirmed
                      </Chip>
                    )}

                    {status === "completed" && (
                      <Chip size="sm" variant="flat" className="bg-emerald-50 text-emerald-600 font-bold px-3 py-1">
                        Completed
                      </Chip>
                    )}

                    {status === "rejected" && (
                      <Chip size="sm" variant="flat" className="bg-rose-50 text-rose-600 font-bold px-3 py-1">
                        Rejected
                      </Chip>
                    )}

                    {/* Action Controls */}
                    {status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => handleAppointmentUpdate(id, "confirmed")}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-bold rounded-xl border border-emerald-200"
                          startContent={<Check size={16} />}
                        >
                          Accept
                        </Button>

                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => handleAppointmentUpdate(id, "rejected")}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl border border-rose-200"
                          startContent={<Xmark size={16} />}
                        >
                          Reject
                        </Button>
                      </>
                    )}

                    {(status === "confirmed" || status === "accepted") && (
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={() => handleMarkCompleted(app)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl border border-blue-200"
                        startContent={<FileText size={16} />}
                      >
                        Mark Complete
                      </Button>
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
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Chip } from "@heroui/react";
import {
  Check,
  Xmark,
  CircleCheck,
  Person,
  Calendar,
  Clock,
  FileText,
  Pulse,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { updateAppointmentStatus } from "@/app/lib/action/appointments";

const STATUS_TABS = [
  { key: "pending", label: "Pending Requests" },
  { key: "accepted", label: "Upcoming / Accepted" },
  { key: "completed", label: "Completed" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All" },
];

export default function AppointmentRequests({ initialAppointments = [] }) {
  const router = useRouter();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [loadingId, setLoadingId] = useState(null);

  // Filter appointments by selected status tab
  const filteredAppointments = appointments.filter((app) => {
    if (selectedStatus === "all") return true;
    return (app.appointmentStatus || "pending").toLowerCase() === selectedStatus;
  });

  // Handle Accept/Reject status updates
  const handleStatusChange = async (appointmentId, newStatus) => {
    setLoadingId(appointmentId);
    try {
      if (typeof updateAppointmentStatus === "function") {
        await updateAppointmentStatus(appointmentId, newStatus);
      }

      setAppointments((prev) =>
        prev.map((app) =>
          (app._id || app.id) === appointmentId
            ? { ...app, appointmentStatus: newStatus }
            : app
        )
      );

      if (newStatus === "accepted") {
        toast.success("Appointment request accepted!");
      } else if (newStatus === "rejected") {
        toast.error("Appointment request rejected.");
      }
    } catch (err) {
      toast.error("Failed to update appointment status.");
    } finally {
      setLoadingId(null);
    }
  };

  // Mark Completed & Redirect to Prescription Page
  const handleMarkCompleted = async (appointment) => {
    const id = appointment._id || appointment.id;
    setLoadingId(id);

    try {
      if (typeof updateAppointmentStatus === "function") {
        await updateAppointmentStatus(id, "completed");
      }

      setAppointments((prev) =>
        prev.map((app) =>
          (app._id || app.id) === id
            ? { ...app, appointmentStatus: "completed" }
            : app
        )
      );

      toast.success("Marked as Completed! Redirecting to prescription...");

      const patientId = appointment.userId || appointment.patientId || "";
      const queryParams = new URLSearchParams({
        appointmentId: id,
        patientId,
        patientName: appointment.userName || appointment.userEmail || "",
      }).toString();

      router.push(`/dashboard/doctor/prescription?${queryParams}`);
    } catch (err) {
      toast.error("Failed to mark appointment as completed.");
      setLoadingId(null);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "success";
      case "rejected":
        return "danger";
      case "completed":
        return "secondary";
      default:
        return "warning";
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 flex items-center gap-2">
            <Pulse className="text-teal-600" size={26} /> Appointment Requests
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Review patient requests, manage schedule approvals, and generate prescriptions.
          </p>
        </div>
      </div>

      {/* Status Filter Tabs (Button Group) */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-4">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedStatus(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedStatus === tab.key
                ? "bg-teal-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Appointment Cards Grid */}
      {filteredAppointments.length === 0 ? (
        <Card className="border border-slate-100 bg-white rounded-2xl p-10 text-center shadow-sm">
          <Calendar size={36} className="mx-auto text-slate-300 mb-3" />
          <p className="text-base font-bold text-slate-600">No {selectedStatus} appointments found</p>
          <p className="text-xs text-slate-400 mt-1">
            New patient appointment requests will appear here.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAppointments.map((app) => {
            const id = app._id || app.id;
            const status = (app.appointmentStatus || "pending").toLowerCase();
            const isLoading = loadingId === id;

            return (
              <Card
                key={id}
                className="border border-slate-100 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Patient Info Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                        <Person size={16} />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-800 truncate">
                          {app.userName || app.userEmail?.split("@")[0] || "Patient"}
                        </h3>
                        <p className="text-[11px] text-slate-400 truncate">{app.userEmail}</p>
                      </div>
                    </div>

                    <Chip
                      size="sm"
                      color={getStatusBadgeColor(status)}
                      className="font-bold capitalize text-[10px]"
                    >
                      {status}
                    </Chip>
                  </div>

                  {/* Schedule Details */}
                  <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 font-medium text-slate-600 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Calendar size={14} className="text-teal-600" /> Day:
                      </span>
                      <span className="font-bold text-slate-800">{app.day || "N/A"}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock size={14} className="text-teal-600" /> Time Slot:
                      </span>
                      <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                        {app.slot || app.time || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Symptoms */}
                  {app.symptoms && (
                    <div className="text-xs text-slate-600 bg-amber-50/60 border border-amber-100 p-2.5 rounded-xl">
                      <span className="font-bold text-amber-900 block mb-0.5">Symptoms:</span>
                      <p className="line-clamp-2">{app.symptoms}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  {status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        color="success"
                        isLoading={isLoading}
                        onPress={() => handleStatusChange(id, "accepted")}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                        startContent={!isLoading && <Check size={16} />}
                      >
                        Accept
                      </Button>

                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        isLoading={isLoading}
                        onPress={() => handleStatusChange(id, "rejected")}
                        className="flex-1 font-bold rounded-xl"
                        startContent={!isLoading && <Xmark size={16} />}
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {status === "accepted" && (
                    <Button
                      size="sm"
                      isLoading={isLoading}
                      onPress={() => handleMarkCompleted(app)}
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl"
                      startContent={!isLoading && <CircleCheck size={16} />}
                    >
                      Mark Completed & Create Prescription
                    </Button>
                  )}

                  {status === "completed" && (
                    <Button
                      size="sm"
                      variant="light"
                      onPress={() =>
                        router.push(
                          `/dashboard/doctor/prescription?appointmentId=${id}&patientId=${
                            app.userId || app.patientId || ""
                          }`
                        )
                      }
                      className="w-full text-teal-700 font-bold hover:bg-teal-50 rounded-xl"
                      startContent={<FileText size={16} />}
                    >
                      View Prescription
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
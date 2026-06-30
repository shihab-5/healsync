"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, Button, Chip, Avatar } from "@heroui/react";
import {
  ShieldCheck,
  ShieldExclamation,
  Xmark,
  Magnifier,
  PersonFill,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { getDoctors, updateDoctorProfile } from "@/app/lib/action/doctor";

const FILTERS = ["all", "pending", "verified", "rejected"];

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [actingId, setActingId] = useState(null); // doctorId currently being updated

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data || []);
      } catch (err) {
        console.error("Failed to load doctors:", err);
        toast.error("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statusOf = (doc) => doc.verificationStatus || "pending";

  const counts = useMemo(() => {
    const c = { all: doctors.length, pending: 0, verified: 0, rejected: 0 };
    doctors.forEach((d) => {
      const s = statusOf(d);
      if (c[s] !== undefined) c[s] += 1;
    });
    return c;
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) => {
      const matchesFilter = activeFilter === "all" || statusOf(d) === activeFilter;
      const matchesSearch =
        !search.trim() ||
        d.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
        d.specialization?.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [doctors, activeFilter, search]);

  const updateStatus = async (doctor, newStatus, successMsg) => {
    setActingId(doctor._id);
    try {
      await updateDoctorProfile(doctor._id, { verificationStatus: newStatus });
      setDoctors((prev) =>
        prev.map((d) =>
          d._id === doctor._id ? { ...d, verificationStatus: newStatus } : d
        )
      );
      toast.success(successMsg);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update doctor status.");
    } finally {
      setActingId(null);
    }
  };

  const handleVerify = (doctor) =>
    updateStatus(doctor, "verified", `Dr. ${doctor.doctorName} has been verified.`);

  const handleReject = (doctor) => {
    if (!confirm(`Reject Dr. ${doctor.doctorName}'s verification request?`)) return;
    updateStatus(doctor, "rejected", `Dr. ${doctor.doctorName}'s verification was rejected.`);
  };

  const handleCancelVerification = (doctor) => {
    if (!confirm(`Cancel verification for Dr. ${doctor.doctorName}? They'll be hidden from patients until re-verified.`))
      return;
    updateStatus(doctor, "pending", `Verification cancelled for Dr. ${doctor.doctorName}.`);
  };

  const statusConfig = {
    pending: { color: "warning", label: "Pending" },
    verified: { color: "success", label: "Verified" },
    rejected: { color: "danger", label: "Rejected" },
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/60">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading doctors...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
          Manage Doctors
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Verify, reject, or revoke doctor profiles on the platform.
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
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 bg-white focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Doctor list */}
      {filteredDoctors.length === 0 ? (
        <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-3">
            <PersonFill size={22} />
          </div>
          <p className="text-sm font-semibold text-slate-500">No doctors found</p>
          <p className="text-xs text-slate-400 mt-1">
            Try a different filter or search term.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredDoctors.map((doc) => {
            const status = statusOf(doc);
            const isActing = actingId === doc._id;

            return (
              <Card
                key={doc._id}
                className="border border-slate-100 bg-white rounded-2xl shadow-sm p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <Avatar
                      src={doc.profileImage || undefined}
                      name={doc.doctorName}
                      className="w-12 h-12 font-bold text-white bg-gradient-to-br from-teal-600 to-teal-400 rounded-xl shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-800">
                          Dr. {doc.doctorName}
                        </span>
                        <Chip
                          size="sm"
                          variant="soft"
                          color={statusConfig[status]?.color || "default"}
                          className="font-bold"
                        >
                          {statusConfig[status]?.label || status}
                        </Chip>
                      </div>
                      <span className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                        {doc.specialization || "—"} &middot; {doc.hospitalName || "—"} &middot; {doc.experience || 0} yrs exp
                      </span>
                      <span className="text-xs text-slate-400 font-medium truncate">
                        ${doc.consultationFee || 0} consultation fee
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                    {status !== "verified" && (
                      <Button
                        size="sm"
                        onPress={() => handleVerify(doc)}
                        isLoading={isActing}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg"
                        startContent={<ShieldCheck size={14} />}
                      >
                        Verify
                      </Button>
                    )}

                    {status !== "rejected" && status !== "verified" && (
                      <Button
                        size="sm"
                        onPress={() => handleReject(doc)}
                        isLoading={isActing}
                        variant="ghost"
                        className="text-rose-600 hover:bg-rose-50 font-bold rounded-lg border border-rose-200"
                        startContent={<Xmark size={14} />}
                      >
                        Reject
                      </Button>
                    )}

                    {status === "verified" && (
                      <Button
                        size="sm"
                        onPress={() => handleCancelVerification(doc)}
                        isLoading={isActing}
                        variant="ghost"
                        className="text-amber-700 hover:bg-amber-50 font-bold rounded-lg border border-amber-200"
                        startContent={<ShieldExclamation size={14} />}
                      >
                        Cancel Verification
                      </Button>
                    )}

                    {status === "rejected" && (
                      <Button
                        size="sm"
                        onPress={() => handleCancelVerification(doc)}
                        isLoading={isActing}
                        variant="ghost"
                        className="text-slate-600 hover:bg-slate-50 font-bold rounded-lg border border-slate-200"
                      >
                        Reset to Pending
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
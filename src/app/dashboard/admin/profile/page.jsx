"use client";

import React from "react";
import { Card, Chip } from "@heroui/react";
import { ShieldCheck, Calendar, Envelope, Person, Globe } from "@gravity-ui/icons";

// Admin Data
const adminData = {
  _id: { $oid: "6a424472bb130d8c47215391" },
  name: "Mr . admin",
  email: "admin@admin.com",
  emailVerified: false,
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  createdAt: { $date: "2026-06-29T10:09:54.673Z" },
  updatedAt: { $date: "2026-06-29T10:09:54.673Z" },
  role: "admin",
};

export default function AdminProfilePage() {
  // Format the ISO date safely
  const joinedDate = new Date(adminData.createdAt.$date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full min-h-screen bg-[#F4F6F8] p-4 md:p-8 font-sans">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] tracking-tight">
          Admin Profile
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          System administrator account details
        </p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Header Overview Card */}
        <Card className="border border-slate-200/60 bg-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-5">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <img
              src={adminData.image}
              alt={adminData.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <h2 className="text-xl font-extrabold text-[#1E293B]">{adminData.name}</h2>
              <Chip
                status="danger"
                variant="flat"
                className="bg-rose-50 text-rose-600 font-bold text-xs px-3 py-0.5 rounded-full capitalize"
              >
                {adminData.role}
              </Chip>
            </div>

            <p className="text-xs font-semibold text-slate-400">{adminData.email}</p>

            <p className="text-xs font-medium text-slate-500 flex items-center justify-center sm:justify-start gap-1 pt-1">
              <Calendar width={14} height={14} className="text-slate-400" />
              Member since {joinedDate}
            </p>
          </div>
        </Card>

        {/* Read-Only Account Information Card */}
        <Card className="border border-slate-200/60 bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <ShieldCheck className="text-blue-600" width={22} height={22} />
            <h3 className="text-lg font-extrabold text-[#1E293B]">
              Account Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Full Name
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1E293B] bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Person width={16} height={16} className="text-slate-400" />
                {adminData.name}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Email Address
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1E293B] bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Envelope width={16} height={16} className="text-slate-400" />
                {adminData.email}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                System Role
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1E293B] bg-slate-50 p-3 rounded-xl border border-slate-100 capitalize">
                <ShieldCheck width={16} height={16} className="text-rose-500" />
                {adminData.role}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Email Status
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1E293B] bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Globe width={16} height={16} className="text-slate-400" />
                {adminData.emailVerified ? "Verified" : "Unverified"}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
"use client";

import React from "react";
import { Card, Chip, Avatar, Button } from "@heroui/react";
import { 
  Calendar, 
  CreditCard, 
  Star, 
  HeartFill,
  LayoutColumns
} from "@gravity-ui/icons";
import Link from "next/link";

export default function DashboardOverview() {
  
  // Static Mock Data Definitions for Easy Future Dynamic Updates
  const metrics = [
    {
      id: "appointments",
      value: "4",
      label: "Total Appointments",
      subtext: "2 upcoming",
      icon: Calendar,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    {
      id: "payments",
      value: "$200",
      label: "Total Paid",
      subtext: "2 transactions",
      icon: CreditCard,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    {
      id: "reviews",
      value: "2",
      label: "My Reviews",
      subtext: "Reviews submitted",
      icon: Star,
      iconBg: "bg-amber-50 text-amber-500 border border-amber-100",
    },
    {
      id: "completed",
      value: "1",
      label: "Completed",
      subtext: "Appointments done",
      icon: LayoutColumns,
      iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
    },
  ];

  const upcomingAppointments = [
    {
      id: "app-01",
      doctorName: "Dr. James Mitchell",
      specialty: "Cardiology",
      dateTime: "2025-07-15 at 10:00 AM",
      status: "confirmed",
    },
    {
      id: "app-02",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Neurology",
      dateTime: "2025-07-20 at 11:00 AM",
      status: "pending",
    },
  ];

  const recentPayments = [
    {
      id: "pay-01",
      doctorName: "Dr. James Mitchell",
      txnId: "TXN-2025-001",
      date: "2025-07-14",
      amount: "$120",
    },
    {
      id: "pay-02",
      doctorName: "Dr. Emily Rodriguez",
      txnId: "TXN-2025-002",
      date: "2025-06-28",
      amount: "$80",
    },
  ];

  const favoriteDoctors = [
    {
      id: "doc-01",
      name: "Dr. James Mitchell",
      specialty: "Cardiology",
      rating: "4.9",
      reviews: "120",
      image: "",
    },
    {
      id: "doc-02",
      name: "Dr. Sarah Johnson",
      specialty: "Neurology",
      rating: "4.8",
      reviews: "94",
      image: "",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      
      {/* 1. Optimized Patient Welcome Banner Section */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 p-6 text-white shadow-sm">
        {/* Ambient background visual glows */}
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-teal-500/20 blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 right-24 h-28 w-28 rounded-full bg-teal-400/20 blur-lg pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-200/90 bg-teal-900/40 px-2.5 py-1 rounded-md">Patient Dashboard</span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mt-2">Welcome back, Alex Turner!</h1>
            <p className="text-xs md:text-sm text-teal-100/90 font-medium mt-1.5 max-w-xl leading-relaxed">
              Your health profile is in perfect sync. You have upcoming medical consultations scheduled this week. Remember to review any checking directives.
            </p>
          </div>
          
          {/* Patient Quick Info Tag */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 self-start md:self-center shadow-inner">
            <span className="text-[10px] text-teal-200 font-bold uppercase tracking-wider block">Patient ID</span>
            <span className="text-sm font-mono font-bold tracking-wider">HS-2026-8941</span>
          </div>
        </div>
      </div>

      {/* 2. Optimized Premium Metric Cards Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metrics.map((metric) => (
          <Card 
            key={metric.id} 
            className="border border-slate-100 bg-white p-5 rounded-2xl shadow-xs flex flex-row items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Soft decorative color matching glow overlay on card hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.015] transition-opacity duration-300 ${metric.iconBg.split(' ')[0]}`} />
            
            {/* Visual Icon Container Box */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-105 ${metric.iconBg}`}>
              <metric.icon size={18} />
            </div>
            
            <div className="flex flex-col min-w-0">
              <span className="text-2xl font-black text-slate-800 tracking-tight transition-colors duration-200 group-hover:text-teal-900">
                {metric.value}
              </span>
              <span className="text-xs font-bold text-slate-500 mt-0.5 truncate">
                {metric.label}
              </span>
              
              {/* Dynamic Looking Status Bullet Subtext */}
              <span className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                {metric.subtext}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* 3. Splitted Action Sections Base */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side Section Column (Upcoming Appointments & Recent Payments) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* A. Upcoming Appointments Block Container */}
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

            <div className="flex flex-col gap-4">
              {upcomingAppointments.map((app) => (
                <div 
                  key={app.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                      <Calendar size={16} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-slate-800 truncate">{app.doctorName}</span>
                      <span className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                        {app.specialty} • {app.dateTime}
                      </span>
                    </div>
                  </div>
                  <Chip
                    size="sm"
                    variant="flat"
                    className="capitalize font-bold text-xs px-3"
                    color={app.status === "confirmed" ? "primary" : "warning"}
                  >
                    {app.status}
                  </Chip>
                </div>
              ))}
            </div>
          </Card>

          {/* B. Recent Payments Block Container */}
          <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-4">
              <div className="flex items-center gap-2 font-bold text-base text-slate-800">
                <CreditCard className="text-teal-600 size-5" />
                <h2>Recent Payments</h2>
              </div>
              <Link 
                href="/dashboard/patient" 
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
              >
                View All &rarr;
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {recentPayments.map((pay) => (
                <div 
                  key={pay.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-200"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-slate-800 truncate">{pay.doctorName}</span>
                    <span className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                      {pay.txnId} • {pay.date}
                    </span>
                  </div>
                  <span className="text-base font-extrabold text-emerald-600 shrink-0">
                    {pay.amount}
                  </span>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Side Section Column (Favorite Doctors Display) */}
        <div className="w-full">
          
          {/* C. Favorite Doctors Panel Component */}
          <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-4">
              <div className="flex items-center gap-2 font-bold text-base text-slate-800">
                <HeartFill className="text-rose-500 size-5" />
                <h2>Favorite Doctors</h2>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {favoriteDoctors.map((doc) => (
                <div 
                  key={doc.id} 
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-white shadow-2xs hover:shadow-sm hover:border-teal-200 transition-all duration-200 gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar 
                      src={doc.image || undefined} 
                      name={doc.name} 
                      className="w-12 h-12 font-bold text-white bg-gradient-to-br from-teal-600 to-teal-400 text-sm rounded-xl shrink-0" 
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-slate-800 truncate group-hover:text-teal-600 transition-colors">
                        {doc.name}
                      </span>
                      <span className="text-xs font-semibold text-teal-600 bg-teal-50/60 border border-teal-100/50 rounded-md px-2 py-0.5 mt-1 w-max">
                        {doc.specialty}
                      </span>
                      
                      {/* Rating Component Row Details */}
                      <div className="flex items-center gap-1 mt-1.5 text-amber-500">
                        <Star size={12} className="fill-current" />
                        <span className="text-xs font-extrabold text-slate-700">{doc.rating}</span>
                        <span className="text-[10px] text-slate-400 font-medium">({doc.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Immediate Shortcut Access Core Trigger */}
                  <Button
                    as={Link}
                    href="/doctors"
                    size="sm"
                    className="w-full sm:w-auto bg-slate-50 hover:bg-teal-600 text-slate-600 hover:text-white font-bold rounded-lg px-3 transition-all border-none"
                  >
                    Book
                  </Button>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
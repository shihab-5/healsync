"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { Link } from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 flex items-center justify-center p-4 font-sans">
      <Card className="max-w-md w-full border border-slate-100 bg-white p-8 rounded-3xl shadow-sm text-center relative overflow-hidden flex flex-col items-center">
        
        {/* Subtle Decorative Clinical Glow Background Elements */}
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal-500/10 blur-xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-rose-500/5 blur-xl pointer-events-none" />

        {/* Modern Minimalistic Keyhole/Lock Visual Icon (Pure CSS/SVG Layout) */}
        <div className="w-20 h-20 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-500 mb-6 shrink-0 relative shadow-2xs group hover:scale-105 transition-transform duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
        </div>

        {/* Content Section */}
        <span className="text-[11px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100/50">
          Security Alert: 403 Forbidden
        </span>
        
        <h1 className="text-2xl font-black tracking-tight text-slate-800 mt-4">
          Restricted Access Area
        </h1>
        
        <p className="text-sm text-slate-500 font-medium mt-3 leading-relaxed max-w-sm">
          It looks like your current account role doesn't have clearance to view this medical dashboard portal. Double-check your credentials or head back to your designated profile panel.
        </p>

        {/* Context Information Box */}
        <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 mt-6 text-left">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            System Guidance
          </div>
          <p className="text-xs text-slate-500 font-semibold leading-normal">
            If you recently registered as a **Doctor**, an administrator must manually review and verify your clinic credentials before your profile opens.
          </p>
        </div>

        {/* Action Button Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-6">
          <Button
            as={Link}
            href="/"
            variant="flat"
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all h-11 border-none"
          >
            Back Home
          </Button>
          <Button
            as={Link}
            href="/auth"
            className="w-full bg-teal-700 hover:bg-teal-600 text-white font-bold rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all h-11 border-none"
          >
            My Dashboard
          </Button>
        </div>

      </Card>
    </div>
  );
}
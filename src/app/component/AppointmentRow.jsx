"use client";

import React from 'react';
import { Chip } from '@heroui/react';
import { Calendar, Clock, CreditCard } from '@gravity-ui/icons';

export default function AppointmentRow({ appointment, actions }) {
  const status = (appointment.appointmentStatus || 'pending').toLowerCase();
  const isCompleted = status === 'completed';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-4 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Primary Specialist</div>
            <h3 className="text-lg font-black text-slate-900 capitalize truncate">Dr. {appointment.doctorName}</h3>
          </div>

          <div className="shrink-0">
            <Chip
              size="sm"
              variant="flat"
              className={`border font-bold tracking-wide uppercase text-[10px] ${
                isCompleted
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : status === 'rejected'
                  ? 'bg-rose-50 text-rose-600 border-rose-100'
                  : status === 'confirmed'
                  ? 'bg-blue-50 text-blue-600 border-blue-100'
                  : 'bg-amber-50 text-amber-600 border-amber-100'
              }`}
            >
              <span className="font-black text-[10px]">{status}</span>
            </Chip>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 shrink-0"><Calendar style={{ fontSize: '16px' }} /></div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold text-slate-400">Day</div>
              <div className="text-sm font-semibold text-slate-800 truncate">{appointment.day}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 shrink-0"><Clock style={{ fontSize: '16px' }} /></div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold text-slate-400">Time Slot</div>
              <div className="text-sm font-semibold text-slate-800 truncate">{appointment.slot}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 shrink-0"><CreditCard style={{ fontSize: '16px' }} /></div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold text-slate-400">Fee</div>
              <div className="text-sm font-black text-emerald-600">${appointment.consultationFee}</div>
            </div>
          </div>
        </div>

        {appointment.symptoms && (
          <div className="mt-3 text-sm text-slate-700 truncate">{appointment.symptoms}</div>
        )}
      </div>

      <div className="flex-shrink-0 w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
          {actions}
        </div>
      </div>
    </div>
  );
}

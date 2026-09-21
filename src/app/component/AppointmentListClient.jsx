"use client";

import React, { useState, useMemo } from 'react';
import AppointmentRow from './AppointmentRow';
import View from './patient/view';
import { RescheduleModal } from './patient/RescheduleModal';
import DeleteAppointment from './patient/deleteAppointment';
import PayNowButton from './patient/PayNowButton';
import PrescriptionViewModal from './dashB/PrescriptionViewModal';
import { CreditCard } from '@gravity-ui/icons';

export default function AppointmentListClient({ appointments = [], pageSize = 8 }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(appointments.length / pageSize));

  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return appointments.slice(start, start + pageSize);
  }, [appointments, page, pageSize]);

  const actionClass = 'h-9 rounded-xl text-xs font-bold gap-1.5 flex items-center justify-center w-full';

  return (
    <div className="space-y-4">
      {current.map((appointment) => {
        const status = (appointment.appointmentStatus || 'pending').toLowerCase();
        const paymentStatus = (appointment.paymentStatus || 'unpaid').toLowerCase();

        return (
          <AppointmentRow
            key={appointment._id}
            appointment={appointment}
            actions={
              <>
                {status === 'completed' ? (
                  <div className="pt-2 w-full">
                    <PrescriptionViewModal appointmentId={appointment._id} />
                  </div>
                ) : (
                  <>
                    <div className="w-full">
                      <View details={appointment} buttonClass={actionClass} />
                    </div>
                    <div className="w-full">
                      <RescheduleModal
                        appointmentId={appointment._id}
                        doctorId={appointment.doctorId}
                        currentDay={appointment.day}
                        currentSlot={appointment.slot}
                        currentSymptoms={appointment.symptoms}
                        buttonClass={actionClass}
                      />
                    </div>
                    <div className="w-full">
                      <DeleteAppointment appointmentId={appointment._id} disabled={paymentStatus === 'paid'} buttonClass={actionClass} />
                    </div>
                    <div className="w-full">
                      {paymentStatus === 'paid' ? (
                        <div className={`${actionClass} bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center`}>
                          <CreditCard className="w-3.5 h-3.5" />
                          Paid
                        </div>
                      ) : (
                        <PayNowButton appointmentId={appointment._id} buttonClass={actionClass} />
                      )}
                    </div>
                  </>
                )}
              </>
            }
          />
        );
      })}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-slate-600">Page {page} of {totalPages}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 bg-white border rounded-xl text-sm font-bold disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-2 bg-white border rounded-xl text-sm font-bold disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@heroui/react';
import { Calendar, Clock, HeartPulse, Xmark } from '@gravity-ui/icons';

import { updateAppointmentStatus } from '@/app/lib/action/appointments';

const FALLBACK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const FALLBACK_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'];

export const RescheduleModal = ({ appointmentId, doctorId, currentDay, currentSlot, currentSymptoms }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [bookedSlotsByDay, setBookedSlotsByDay] = useState({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [day, setDay] = useState(currentDay || '');
  const [slot, setSlot] = useState(currentSlot || '');
  const [symptoms, setSymptoms] = useState(currentSymptoms || '');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Fetch the doctor's weekly schedule AND every existing appointment for this
  // doctor, so we can (a) restrict to real available days/slots and
  // (b) grey out slots someone else already booked.
  useEffect(() => {
    if (!isOpen || !doctorId) return;

    let cancelled = false;
    (async () => {
      setLoadingAvailability(true);
      try {
        const [doctorRes, appointmentsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors/${doctorId}`, { cache: 'no-store' }),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/appointments`, { cache: 'no-store' }),
        ]);

        if (!cancelled && doctorRes.ok) {
          setDoctor(await doctorRes.json());
        }

        if (!cancelled && appointmentsRes.ok) {
          const allAppointments = await appointmentsRes.json();
          const list = Array.isArray(allAppointments) ? allAppointments : allAppointments?.appointments || [];

          // Build { Monday: ['09:00 AM', '11:00 AM'], ... } from every OTHER
          // active appointment this doctor already has, excluding the booking
          // we're currently editing (so the patient can keep their own slot).
          const map = {};
          list.forEach((appt) => {
            const apptDoctorId = appt.doctorId?.$oid || appt.doctorId;
            if (apptDoctorId !== doctorId) return;
            if (appt._id?.$oid === appointmentId || appt._id === appointmentId) return;
            if (appt.appointmentStatus === 'cancelled' || appt.status === 'cancelled') return;

            if (!map[appt.day]) map[appt.day] = [];
            map[appt.day].push(appt.slot);
          });

          if (!cancelled) setBookedSlotsByDay(map);
        }
      } catch (err) {
        // Fall back to generic day/slot lists below; booked slots just won't be excluded.
        console.error('Failed to load doctor availability:', err);
      } finally {
        if (!cancelled) setLoadingAvailability(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, doctorId, appointmentId]);

  const availableDays = doctor?.availableDays?.length ? doctor.availableDays : FALLBACK_DAYS;
  const availableSlots = doctor?.availableSlots?.length ? doctor.availableSlots : FALLBACK_SLOTS;
  const takenSlotsForSelectedDay = bookedSlotsByDay[day] || [];

  const handleDayChange = (newDay) => {
    setDay(newDay);
    const taken = bookedSlotsByDay[newDay] || [];
    const keepingOwnSlot = newDay === currentDay && slot === currentSlot;
    if (slot && taken.includes(slot) && !keepingOwnSlot) {
      setSlot('');
    }
  };

  const handleClose = () => {
    if (isPending) return;
    setIsOpen(false);
    // Reset to original values if they closed without saving.
    setDay(currentDay || '');
    setSlot(currentSlot || '');
    setSymptoms(currentSymptoms || '');
  };

  const handleSubmit = (e) => {
    console.log('[RescheduleModal] submit clicked', { appointmentId, day, slot, symptoms });
    e.preventDefault();
    if (!day || !slot) {
      toast.error('Please select a day and time slot');
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateAppointmentStatus(appointmentId, {
          day,
          slot,
          symptoms,
        });

        console.log('[RescheduleModal] server action result', result);

        if (!result?.success) {
          toast.error(result?.error || 'Failed to reschedule appointment');
          return;
        }

        toast.success(result?.message || 'Appointment rescheduled successfully');
        setIsOpen(false);
        router.refresh();
      } catch (err) {
        console.error('Reschedule failed:', err);
        toast.error('Something went wrong while rescheduling');
      }
    });
  };

  return (
    <>
      <Button
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold z-30 rounded-xl text-xs h-9 gap-1.5 border-none shadow-xs"
      >
        <Calendar style={{ fontSize: '14px' }} />
        Reschedule
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel — plain div, not HeroUI Card, so nothing overrides our width/height */}
          <div
            className="relative flex flex-col bg-white rounded-2xl z-50 shadow-xl border border-slate-200 overflow-hidden"
            style={{ width: '100%', maxWidth: '28rem', maxHeight: '90vh' }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Reschedule Appointment</h2>
                    {doctor?.doctorName && (
                      <p className="text-xs text-slate-500 mt-0.5">with Dr. {doctor.doctorName}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
                  >
                    <Xmark style={{ fontSize: '18px' }} />
                  </button>
                </div>

                {/* Body — scrolls internally if content is taller than the viewport allows */}
                <div className="px-6 py-5 space-y-5 overflow-y-auto">
                  {loadingAvailability && (
                    <p className="text-xs text-slate-400 font-semibold">Loading availability...</p>
                  )}
                  {/* Day */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
                      <Calendar style={{ fontSize: '14px' }} />
                      Day
                    </label>
                    <select
                      value={day}
                      onChange={(e) => handleDayChange(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="" disabled>Select a day</option>
                      {availableDays.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Slot */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
                      <Clock style={{ fontSize: '14px' }} />
                      Time Slot
                    </label>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      required
                      disabled={!day}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:opacity-60"
                    >
                      <option value="" disabled>{day ? 'Select a time slot' : 'Pick a day first'}</option>
                      {availableSlots.map((s) => {
                        const isOwnCurrentSlot = day === currentDay && s === currentSlot;
                        const isTaken = takenSlotsForSelectedDay.includes(s) && !isOwnCurrentSlot;
                        return (
                          <option key={s} value={s} disabled={isTaken}>
                            {s}{isTaken ? ' — already booked' : ''}
                          </option>
                        );
                      })}
                    </select>
                    {day && availableSlots.every((s) => takenSlotsForSelectedDay.includes(s) && !(day === currentDay && s === currentSlot)) && (
                      <p className="text-[11px] text-rose-500 font-semibold">
                        No slots left on {day}. Try another day.
                      </p>
                    )}
                  </div>

                  {/* Symptoms */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
                      <HeartPulse style={{ fontSize: '14px' }} />
                      Symptoms
                    </label>
                    <textarea
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      rows={3}
                      placeholder="Describe your symptoms..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
                  <Button
                    type="button"
                    variant="flat"
                    onClick={handleClose}
                    disabled={isPending}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs h-10 border-none"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs h-10 border-none shadow-xs disabled:opacity-60"
                  >
                    {isPending ? 'Saving...' : 'Confirm Reschedule'}
                  </Button>
                </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RescheduleModal;
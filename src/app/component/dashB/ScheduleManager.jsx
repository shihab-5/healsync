"use client";

import React, { useState, useMemo } from "react";
import { Card, Button, Chip, Modal, useOverlayState } from "@heroui/react";
import { Plus, TrashBin, Calendar, Clock, Person, Pencil } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { addScheduleSlot, updateScheduleSlot, deleteScheduleSlot } from "@/app/lib/action/schedule";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ScheduleManager({ doctorInfo, appointments = [] }) {
  const doctorId = doctorInfo?._id || doctorInfo?.id;

  const [schedules, setSchedules] = useState(doctorInfo?.schedules || []);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [actingId, setActingId] = useState(null);

  // Modal State using useOverlayState or standard useState in HeroUI v3
  const [isOpen, setIsOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [slotDay, setSlotDay] = useState("Monday");
  const [slotTime, setSlotTime] = useState("09:00 AM");
  const [maxPatients, setMaxPatients] = useState("1");

  const dayAppointments = useMemo(() => {
    return appointments.filter(
      (app) => app.doctorId === doctorId && app.day?.toLowerCase() === selectedDay.toLowerCase()
    );
  }, [appointments, doctorId, selectedDay]);

  const handleOpenAdd = () => {
    setEditingSlot(null);
    setSlotDay(selectedDay);
    setSlotTime("09:00 AM");
    setMaxPatients("1");
    setIsOpen(true);
  };

  const handleOpenEdit = (slot) => {
    setEditingSlot(slot);
    setSlotDay(slot.day || selectedDay);
    setSlotTime(slot.slot || slot.time);
    setMaxPatients(slot.maxPatients || "1");
    setIsOpen(true);
  };

  const handleSaveSlot = async () => {
    if (!slotTime.trim()) {
      toast.error("Please enter a valid time slot.");
      return;
    }

    const payload = {
      doctorId,
      day: slotDay,
      slot: slotTime,
      maxPatients: Number(maxPatients) || 1,
      isBooked: false,
    };

    try {
      if (editingSlot) {
        await updateScheduleSlot(editingSlot._id || editingSlot.id, payload);
        setSchedules((prev) =>
          prev.map((s) => ((s._id || s.id) === (editingSlot._id || editingSlot.id) ? { ...s, ...payload } : s))
        );
        toast.success("Schedule slot updated!");
      } else {
        const newSlot = { ...payload, _id: Date.now().toString() };
        await addScheduleSlot(doctorId, payload);
        setSchedules((prev) => [...prev, newSlot]);
        toast.success("New schedule slot added!");
      }
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to save schedule slot.");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!confirm("Are you sure you want to remove this slot?")) return;

    setActingId(slotId);
    try {
      await deleteScheduleSlot(slotId);
      setSchedules((prev) => prev.filter((s) => (s._id || s.id) !== slotId));
      toast.success("Slot removed successfully.");
    } catch (err) {
      toast.error("Failed to remove slot.");
    } finally {
      setActingId(null);
    }
  };

  const filteredSlots = useMemo(() => {
    return schedules.filter((s) => s.day?.toLowerCase() === selectedDay.toLowerCase());
  }, [schedules, selectedDay]);

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
            Manage Schedule
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Dr. {doctorInfo?.doctorName || "Doctor"} — {doctorInfo?.specialization || "General"}
          </p>
        </div>

        <Button
          color="primary"
          onPress={handleOpenAdd}
          className="bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-sm"
        >
          <Plus size={18} /> Add Time Slot
        </Button>
      </div>

      {/* Days Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200/80 pb-4">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDay === day
                ? "bg-teal-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Slots & Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
            <Clock size={18} className="text-teal-600" /> Available Slots for {selectedDay}
          </h2>

          {filteredSlots.length === 0 ? (
            <Card className="border border-slate-100 bg-white rounded-2xl p-8 text-center shadow-sm">
              <Clock size={28} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-500">No time slots for {selectedDay}</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSlots.map((slot) => {
                const id = slot._id || slot.id;
                return (
                  <Card
                    key={id}
                    className="border border-slate-100 bg-white rounded-2xl p-4 shadow-sm flex flex-row items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-slate-800">{slot.slot || slot.time}</span>
                        <Chip
                          size="sm"
                          color={slot.isBooked ? "warning" : "success"}
                          className="font-bold text-[10px]"
                        >
                          {slot.isBooked ? "Booked" : "Available"}
                        </Chip>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-1">
                        Max Capacity: {slot.maxPatients || 1} patient(s)
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        isIconOnly
                        variant="light"
                        onPress={() => handleOpenEdit(slot)}
                        className="text-slate-500 hover:text-teal-600 rounded-lg"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="sm"
                        isIconOnly
                        variant="light"
                        isLoading={actingId === id}
                        onPress={() => handleDeleteSlot(id)}
                        className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                      >
                        <TrashBin size={16} />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Booked Appointments side column */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
            <Calendar size={18} className="text-teal-600" /> Booked Appointments ({selectedDay})
          </h2>

          {dayAppointments.length === 0 ? (
            <Card className="border border-slate-100 bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="text-xs font-semibold text-slate-400">No appointments scheduled for {selectedDay}.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {dayAppointments.map((app) => (
                <Card key={app._id} className="border border-slate-100 bg-white rounded-2xl p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-lg">
                      {app.slot}
                    </span>
                    <Chip size="sm" color={app.appointmentStatus === "pending" ? "warning" : "success"}>
                      {app.appointmentStatus}
                    </Chip>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                      <Person size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-800 truncate">{app.userEmail}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* HeroUI v3 Compound Modal */}
      {isOpen && (
        <Modal>
          <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
            <Modal.Container>
              <Modal.Dialog className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                <Modal.CloseTrigger className="absolute top-4 right-4" />
                <Modal.Header>
                  <Modal.Heading className="text-lg font-black text-slate-800">
                    {editingSlot ? "Edit Time Slot" : "Add New Time Slot"}
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="space-y-4 my-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Day of Week</label>
                    <select
                      value={slotDay}
                      onChange={(e) => setSlotDay(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-xl p-2.5 bg-white focus:outline-none focus:border-teal-500"
                    >
                      {DAYS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Slot Time (e.g. 09:00 AM)</label>
                    <input
                      type="text"
                      value={slotTime}
                      onChange={(e) => setSlotTime(e.target.value)}
                      placeholder="09:00 AM"
                      className="w-full text-sm border border-slate-200 rounded-xl p-2.5 bg-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Max Patients Allowed</label>
                    <input
                      type="number"
                      min="1"
                      value={maxPatients}
                      onChange={(e) => setMaxPatients(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-xl p-2.5 bg-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </Modal.Body>

                <Modal.Footer className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button variant="light" onPress={() => setIsOpen(false)} className="font-bold text-slate-500">
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSaveSlot}
                    className="bg-teal-700 text-white font-bold rounded-xl"
                  >
                    {editingSlot ? "Update Slot" : "Create Slot"}
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Button, Modal, Input, TextArea } from "@heroui/react";
import { Plus, TrashBin } from "@gravity-ui/icons";
import toast from "react-hot-toast";

import {
  getPrescriptions,
  createPrescription,
  updatePrescription,
} from "@/app/lib/action/prescription";

export default function PrescriptionManagement() {
  const searchParams = useSearchParams();
  const queryPatientName = searchParams.get("patientName") || "";
  const queryAppointmentId = searchParams.get("appointmentId") || "";
  const queryPatientId = searchParams.get("patientId") || "";

  // Modal Open/Close State
  const [isOpen, setIsOpen] = useState(false);

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medications, setMedications] = useState([
    { name: "", dosage: "", instructions: "" },
  ]);

  // Fetch Prescriptions
  const loadPrescriptions = async () => {
    setLoading(true);
    try {
      const data = await getPrescriptions();
      setPrescriptions(data || []);
    } catch (err) {
      toast.error("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrescriptions();
  }, []);

  // Pre-fill form when redirected from appointments
  useEffect(() => {
    if (queryPatientName) {
      handleOpenCreateModal(queryPatientName);
    }
  }, [queryPatientName]);

  const handleOpenCreateModal = (presetName = "") => {
    setEditingId(null);
    setPatientName(presetName || "");
    setDiagnosis("");
    setNotes("");
    setMedications([{ name: "", dosage: "", instructions: "" }]);
    setIsOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingId(item._id || item.id);
    setPatientName(item.patientName || "");
    setDiagnosis(item.diagnosis || "");
    setNotes(item.notes || "");
    setMedications(
      item.medications?.length
        ? item.medications
        : [{ name: "", dosage: "", instructions: "" }]
    );
    setIsOpen(true);
  };

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const addMedicationRow = () => {
    setMedications((prev) => [
      ...prev,
      { name: "", dosage: "", instructions: "" },
    ]);
  };

  const removeMedicationRow = (index) => {
    if (medications.length === 1) return;
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      toast.error("Patient name is required");
      return;
    }

    setSubmitting(true);
    const payload = {
      patientName,
      diagnosis,
      notes,
      medications: medications.filter((m) => m.name.trim() !== ""),
      appointmentId: queryAppointmentId,
      userId: queryPatientId,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      if (editingId) {
        const res = await updatePrescription(editingId, payload);
        if (res.success) {
          toast.success("Prescription updated successfully!");
          loadPrescriptions();
          setIsOpen(false);
        } else {
          toast.error(res.error || "Failed to update prescription");
        }
      } else {
        const res = await createPrescription(payload);
        if (res.success) {
          toast.success("Prescription created successfully!");
          loadPrescriptions();
          setIsOpen(false);
        } else {
          toast.error(res.error || "Failed to create prescription");
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6F8] p-4 md:p-8 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] tracking-tight">
            Prescription Management
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Create and manage patient prescriptions
          </p>
        </div>

        <Button
          onPress={() => handleOpenCreateModal()}
          className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl px-5 py-2.5 shadow-sm shrink-0"
          startContent={<Plus size={18} />}
        >
          New Prescription
        </Button>
      </div>

      {/* Prescriptions List */}
      {loading ? (
        <div className="w-full h-40 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : prescriptions.length === 0 ? (
        <Card className="border border-slate-200/60 bg-white rounded-2xl p-10 text-center shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            No prescriptions found. Click "New Prescription" to create one.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((item) => {
            const id = item._id || item.id;
            return (
              <Card
                key={id}
                className="border border-slate-200/60 bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#1E293B]">
                      {item.patientName}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">
                      {item.date || "2025-06-10"}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => handleOpenEditModal(item)}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold border border-slate-200 rounded-lg px-3"
                  >
                    Edit
                  </Button>
                </div>

                {item.diagnosis && (
                  <div className="mt-4">
                    <span className="text-xs font-bold text-slate-400 block mb-1">
                      Diagnosis
                    </span>
                    <div className="bg-[#F8FAFC] border border-slate-100/80 rounded-xl p-3.5 text-sm text-slate-700 font-medium">
                      {item.diagnosis}
                    </div>
                  </div>
                )}

                {item.medications && item.medications.length > 0 && (
                  <div className="mt-4">
                    <span className="text-xs font-bold text-slate-400 block mb-2">
                      Medications
                    </span>
                    <div className="space-y-2">
                      {item.medications.map((med, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-extrabold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-extrabold text-slate-800">
                            {med.name}
                          </span>
                          {med.dosage && (
                            <>
                              <span className="text-slate-300">—</span>
                              <span className="text-slate-600 font-medium">
                                {med.dosage}
                              </span>
                            </>
                          )}
                          {med.instructions && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="text-slate-500 font-normal">
                                {med.instructions}
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.notes && (
                  <div className="mt-4">
                    <span className="text-xs font-bold text-slate-400 block mb-1">
                      Notes
                    </span>
                    <p className="text-sm italic text-slate-600 leading-relaxed">
                      {item.notes}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* HeroUI v3 Compound Modal Structure */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="max-w-2xl bg-white p-6 rounded-2xl shadow-xl">
              <form onSubmit={handleSubmit}>
                <Modal.Header>
                  <h2 className="text-lg font-extrabold text-[#1E293B]">
                    {editingId ? "Edit Prescription" : "Create New Prescription"}
                  </h2>
                </Modal.Header>

                <Modal.Body className="space-y-4 py-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">
                      Patient Name *
                    </label>
                    <Input
                      placeholder="Enter patient name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">
                      Diagnosis
                    </label>
                    <TextArea
                      placeholder="e.g. Mild hypertension with stress-induced chest discomfort"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-600">
                        Medications
                      </label>
                      <Button
                        type="button"
                        size="sm"
                        variant="light"
                        className="text-blue-600 font-bold text-xs"
                        onPress={addMedicationRow}
                      >
                        + Add Medication
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {medications.map((med, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/60"
                        >
                          <Input
                            placeholder="Medicine name"
                            size="sm"
                            value={med.name}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className="flex-1"
                          />
                          <Input
                            placeholder="Dosage (e.g. 5mg)"
                            size="sm"
                            value={med.dosage}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "dosage",
                                e.target.value
                              )
                            }
                            className="w-32"
                          />
                          <Input
                            placeholder="Frequency / Notes"
                            size="sm"
                            value={med.instructions}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "instructions",
                                e.target.value
                              )
                            }
                            className="flex-1"
                          />
                          {medications.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              isIconOnly
                              variant="light"
                              className="text-rose-500"
                              onPress={() => removeMedicationRow(index)}
                            >
                              <TrashBin size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">
                      Notes & Follow-up Instructions
                    </label>
                    <TextArea
                      placeholder="Patient should maintain a low-sodium diet, exercise regularly..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </Modal.Body>

                <Modal.Footer className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    variant="light"
                    onPress={() => setIsOpen(false)}
                    className="font-bold text-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={submitting}
                    className="bg-[#2563EB] text-white font-bold rounded-xl px-5"
                  >
                    {editingId ? "Update Prescription" : "Save Prescription"}
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
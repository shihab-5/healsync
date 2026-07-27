"use server";

import { revalidatePath } from "next/cache";

// Temporary in-memory or DB store interface
// Replace these with your database model (MongoDB/Prisma/etc.)
let prescriptions = [];

/**
 * Fetch all prescriptions (optionally filtered by doctor or patient)
 */
export async function getPrescriptions(doctorId = null) {
  if (doctorId) {
    return prescriptions.filter((p) => p.doctorId === doctorId);
  }
  return prescriptions;
}

/**
 * Create a new prescription
 */
export async function createPrescription(data) {
  try {
    const newPrescription = {
      _id: `pres_${Date.now()}`,
      patientName: data.patientName,
      userId: data.userId || null,
      doctorId: data.doctorId || null,
      appointmentId: data.appointmentId || null,
      date: data.date || new Date().toISOString().split("T")[0],
      diagnosis: data.diagnosis || "",
      medications: data.medications || [], // Array of { name, dosage, instructions }
      notes: data.notes || "",
      createdAt: new Date().toISOString(),
    };

    prescriptions.unshift(newPrescription);
    revalidatePath("/dashboard/doctor/prescription");
    return { success: true, data: newPrescription };
  } catch (error) {
    console.error("Failed to create prescription:", error);
    return { success: false, error: "Failed to create prescription" };
  }
}

/**
 * Update an existing prescription
 */
export async function updatePrescription(id, data) {
  try {
    const index = prescriptions.findIndex((p) => p._id === id || p.id === id);
    if (index === -1) {
      return { success: false, error: "Prescription not found" };
    }

    prescriptions[index] = {
      ...prescriptions[index],
      patientName: data.patientName ?? prescriptions[index].patientName,
      diagnosis: data.diagnosis ?? prescriptions[index].diagnosis,
      medications: data.medications ?? prescriptions[index].medications,
      notes: data.notes ?? prescriptions[index].notes,
      updatedAt: new Date().toISOString(),
    };

    revalidatePath("/dashboard/doctor/prescription");
    return { success: true, data: prescriptions[index] };
  } catch (error) {
    console.error("Failed to update prescription:", error);
    return { success: false, error: "Failed to update prescription" };
  }
}
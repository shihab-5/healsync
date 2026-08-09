"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL; // adjust to your backend port

/**
 * Fetch all prescriptions (optionally filtered by doctor)
 */
export async function getPrescriptions(doctorId = null) {
  try {
    const url = doctorId
      ? `${baseUrl}/api/prescriptions?doctorId=${doctorId}`
      : `${baseUrl}/api/prescriptions`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch prescriptions:", error);
    return [];
  }
}

/**
 * Create a new prescription
 */
export async function createPrescription(data) {
  try {
    const res = await fetch(`${baseUrl}/api/prescriptions`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
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
    const res = await fetch(`${baseUrl}/api/prescriptions/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to update prescription:", error);
    return { success: false, error: "Failed to update prescription" };
  }
}
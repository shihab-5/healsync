"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * Fetch a single appointment by id — used to get trusted data
 * (e.g. consultationFee, doctorName) instead of relying on client input.
 */
export async function getAppointmentById(id) {
  try {
    const res = await fetch(`${baseUrl}/api/appointments/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch appointment by id:", error);
    return null;
  }
}

/**
 * Record a completed payment
 */
export async function createPayment(data) {
  try {
    const res = await fetch(`${baseUrl}/api/payments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to record payment:", error);
    return { success: false, error: "Failed to record payment" };
  }
}
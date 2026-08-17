'use server'

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const getToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return session?.session?.token;
};
export const bookAppointments = async (data) => {
  console.log('bookAppointments called with data:', data);
  // const token = await getToken();

  const res = await fetch(`${baseUrl}/api/appointments`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  console.log('Response from server:', res); // Debugging line to check the response object 
  let result;
  try {
    result = await res.json();
  } catch {
    throw new Error('Unexpected response from server');
  }

  if (!res.ok) {
    throw new Error(result?.error || 'Failed to book appointment');
  }

  return result;
};

export const deleteAppointment = async (appointmentId) => {
  const token = await getToken();

  const res = await fetch(`${baseUrl}/appointments/${appointmentId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  let data = {};

  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (res.ok) {
    revalidatePath("/dashboard/patient/myAppointments");
    revalidatePath("/dashboard/patient");
    return {
      ...data,
      success: true,
      message: data?.message || data?.error || "Appointment cancelled successfully",
    };
  }

  return {
    ...data,
    success: false,
    error: data?.error || data?.message || "Failed to cancel appointment.",
  };
};

export const updateAppointment = async (appointmentId, data) => {
  console.log('updateAppointment called with appointmentId:', appointmentId, 'and data:', data);
  const res = await fetch(`${baseUrl}/api/appointments/${appointmentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await res.json();
  return responseData;
};
  


export const updateAppointmentStatus = async (appointmentId, { day, slot, symptoms }) => {
  console.log('[appointments.js] updateAppointmentStatus start', { appointmentId, day, slot, symptoms });
  const token = await getToken();

  let res;
  try {
    res = await fetch(`${baseUrl}/appointments/${appointmentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ day, slot, symptoms }),
    });
  } catch (error) {
    return {
      success: false,
      error: "Network error while rescheduling appointment.",
    };
  }

  let data = {};
  try {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = text ? { message: text } : {};
    }
  } catch {
    data = {};
  }

  if (res.ok) {
    revalidatePath("/dashboard/patient/myAppointments");
    revalidatePath("/dashboard/patient");
    return {
      ...data,
      success: true,
      message: data?.message || data?.error || "Appointment rescheduled successfully",
    };
  }

  return {
    ...data,
    success: false,
    error: data?.error || data?.message || "Failed to reschedule appointment.",
  };
}

export const payments = async (data) => {
  const res = await fetch(`${baseUrl}/api/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export async function getAppointments() {
  const res = await fetch(`${baseUrl}/appointments`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch appointments");

  return res.json();
}

/**
 * Update an appointment's status (admin override).
 * Mirrors updateDoctorProfile(id, payload) from app/lib/action/doctor.js
 */
// export async function updateAppointmentStatus(appointmentId, payload) {
//   const res = await fetch(`${baseUrl}/api/appointments/${appointmentId}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) throw new Error("Failed to update appointment");
//   return parseJsonResponse(res);
// }
'use server'

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'process.env.NEXT_PUBLIC_SERVER_URL';

const getToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return session?.session?.token;
};
export const bookAppointments = async (data)=>{
  const token = await getToken();
  console.log('Token retrieved:', token); // Debugging line to check the token
    console.log('Booking appointment with data:', data); // Debugging line to check the data being sent
    const res=await fetch(`${baseUrl}/api/appointments`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
     return res.json();
}

export const payments = async (data)=>{
    const res=await fetch(`${baseUrl}/api/payments`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
     return res.json();
}

export async function getAppointments() {
  const res = await fetch(`${baseUrl}/api/appointments`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}
 
/**
 * Update an appointment's status (admin override).
 * Mirrors updateDoctorProfile(id, payload) from app/lib/action/doctor.js
 */
export async function updateAppointmentStatus(appointmentId, payload) {
  const res = await fetch(`${baseUrl}/api/appointments/${appointmentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update appointment");
  return res.json();
}
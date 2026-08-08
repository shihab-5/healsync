
// "use server";

// import { revalidatePath } from "next/cache";
import { authClient } from "@/lib/auth-client";

export const createDocUser = async (bookAppointment) => {

  const {data:token}= await authClient.token();
  console.log('Token retrieved:', token); // Debugging line to check the token
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify(bookAppointment)
  });
  const data = await res.json();

  if (data.insertedId) {
    revalidatePath('/dashboard/doctor');
  }
  return data;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
 
export const getDoctors = async () => {
  const res = await fetch(`${BASE_URL}/api/doctors`);
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
};
 
// export const getDoctorByUserId = async (userId) => {
//   console.log('Fetching doctor info for userId:', userId); // Debugging line to check the userId
//   const res = await fetch(`${BASE_URL}/api/doctors/${userId}`);
//   // if (!res.ok) throw new Error("Failed to fetch doctor profile");
//   return res.json();
// };

export const getDoctorByUserId = async (userId) => {
  const res = await fetch(`${BASE_URL}/api/doctors/user/${userId}`);
  return res.json();
};
 
export const updateDoctorProfile = async (doctorId, payload) => {
  console.log('Updating doctor profile for doctorId:', doctorId, 'with payload:', payload); // Debugging line to check the payload
  // payload: any subset of { qualifications, experience, consultationFee, schedule, verificationStatus, status }
  const res = await fetch(`${BASE_URL}/api/doctors/${doctorId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update doctor profile");
  return res.json();
};
 



/**
 * Server action to update doctor profile details
 */
// export async function updateDoctorProfile(id, profileData) {
//   try {
//     // Replace this logic with your database model (MongoDB / Prisma / etc.)
//     console.log("Updating Doctor ID:", id, "With Payload:", profileData);

//     // Revalidate paths to update UI across dashboard
//     revalidatePath("/dashboard/doctor/profile");
//     revalidatePath("/dashboard/doctor");

//     return { success: true, message: "Profile updated successfully!" };
//   } catch (error) {
//     console.error("Error updating doctor profile:", error);
//     return { success: false, error: "Failed to update profile details" };
//   }
// }
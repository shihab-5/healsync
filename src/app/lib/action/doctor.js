
export const createDocUser = async (bookAppointment) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
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
 
export const getDoctorByUserId = async (userId) => {
  const res = await fetch(`${BASE_URL}/api/doctors/by-user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch doctor profile");
  return res.json();
};
 
export const updateDoctorProfile = async (doctorId, payload) => {
  // payload: any subset of { qualifications, experience, consultationFee, schedule, verificationStatus, status }
  const res = await fetch(`${BASE_URL}/api/doctors/${doctorId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update doctor profile");
  return res.json();
};
 
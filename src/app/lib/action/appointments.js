'use server'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'process.env.NEXT_PUBLIC_SERVER_URL';

export const bookAppointments = async (data)=>{
    console.log('Booking appointment with data:', data); // Debugging line to check the data being sent
    const res=await fetch(`${baseUrl}/api/appointments`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
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
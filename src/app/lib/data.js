export const getDoctors=async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors`);
    const data = await res.json();
    return data;
}
export const getUsers=async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`);
    const data = await res.json();
    return data;
}


export const getAppointments=async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/appointments`, {
        cache: 'no-store',
        next: { revalidate: 0 },
    });
    const data = await res.json();
    return data;
}
export const getPayments=async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments`, {
        cache: 'no-store',
        next: { revalidate: 0 },
    });
    const data = await res.json();
    return data;
}

export const getDoctorDetails=async(id)=>{
    console.log('Fetching doctor details for id:', id); // Debugging line to check the id being fetched
    
//     const {token}=await auth.api.getToken({
//         headers:await headers()
// })

const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors/${id}`,
        // {
        //       headers:{
        //         authorization:`Bearer ${token}`
        //       }
        //     }
    );
    console.log('Response from server:', res); // Debugging line to check the response object
    const data = await res.json();
    console.log('Fetched doctor details:', data); // Debugging line to check the fetched data
    return data;
    
}
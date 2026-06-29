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
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/appointments`);
    const data = await res.json();
    return data;
}

export const getDoctorDetails=async(id)=>{
    
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
    const data = await res.json();
    return data;
    
}
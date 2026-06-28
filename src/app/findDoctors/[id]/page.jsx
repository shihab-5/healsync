import DetailsCard from '@/app/component/DetailsCard';
import { getDoctorDetails } from '@/app/lib/data';
import React from 'react';

const DoctorDetails = async ({params}) => {
    const { id } =await params;
    const data=await getDoctorDetails(id);
    console.log('DoctorDetails data:', data); // Debugging line to check the fetched data

    if (!data) {
        return <div>
            doctor not found
        </div>
    }
    return (
       <div>
            <DetailsCard
                key={data._id || 'details-fallback'}
                value={data}
            />
       </div>
    );
};

export default DoctorDetails;
import { requireRole } from '@/app/lib/session';
import React from 'react';

const DoctorLayout = async ({children}) => {
    await requireRole('doctor'); // Ensure only patients can access this layout
    return children;
};

export default DoctorLayout;
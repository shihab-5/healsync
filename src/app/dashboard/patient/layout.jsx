import { requireRole } from '@/app/lib/session';
import React from 'react';

const PatientLayout = async ({children}) => {
    await requireRole('patient'); // Ensure only patients can access this layout
    return children;
};

export default PatientLayout;
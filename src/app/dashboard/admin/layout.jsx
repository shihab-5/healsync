import { requireRole } from '@/app/lib/session';
import React from 'react';

const AdminLayout = async ({children}) => {
    await requireRole('admin'); // Ensure only admins can access this layout
    return children;
};

export default AdminLayout;
import React from 'react';
import { Sidebar } from '../component/sidebar';

const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar></Sidebar>
            <div  className="flex-1">{children}</div>
        </div>
    );
};

export default DashboardLayout;
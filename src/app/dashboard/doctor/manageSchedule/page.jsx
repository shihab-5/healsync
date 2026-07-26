import React from 'react';
import { getUserSession } from '@/app/lib/session';
import { getDoctorByUserId } from '@/app/lib/action/doctor';
import { getAppointments } from '@/app/lib/data';
import ScheduleManager from '@/app/component/dashB/ScheduleManager';

const SchedulePage = async () => {
  const user = await getUserSession();
  
  if (!user?.id) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold">
        Please log in to manage your schedule.
      </div>
    );
  }

  const doctorInfo = await getDoctorByUserId(user.id);
  const appointments = (await getAppointments()) || [];

  return (
    <ScheduleManager 
      doctorInfo={doctorInfo} 
      appointments={appointments} 
    />
  );
};

export default SchedulePage;
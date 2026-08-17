import React from 'react';
import { getReviews } from '@/app/lib/action/review';
import { getUserSession } from '@/app/lib/session';

// Pure Hero UI v3 Imports
import { Card, Button, Chip } from "@heroui/react";

// Gravity UI Icons Pack
import { 
  Persons, 
  Calendar, 
  Clock, 
  Star, 
  ChevronRight,
  StarFill
} from "@gravity-ui/icons"; 
import { getAppointments } from '@/app/lib/data';

const DoctorDashBoard = async () => {
  // Fetch raw server data
  const reviews = await getReviews() || [];
  const user = await getUserSession();
  const appointments = await getAppointments() || [];

  // Filter for current doctor
  const myReviews = reviews.filter((review) => review.doctorId === user?.id);
  const myAppointments = appointments.filter((app) => String(app.doctorId) === String(user?.id));

  // --- Real Date Engine (Fixed for 2026/Present Accurate Matching) ---
  const todayISOString = new Date().toISOString().split('T')[0]; // Format: "YYYY-MM-DD"

  // 1. Total Unique Patients
  const uniquePatientsCount = new Set(myAppointments.map(app => app.userId)).size;

  // 2. Today's Appointments Count (Comparing real date string safely instead of weekday text strings)
  const todaysAppointments = myAppointments.filter(app => {
    if (!app.createdAt) return false;
    const appointmentDateStr = app.createdAt.split('T')[0]; // Extracts "YYYY-MM-DD"
    return appointmentDateStr === todayISOString;
  });

  // 3. Pending Requests Count
  const pendingRequestsCount = myAppointments.filter(app => app.appointmentStatus === 'pending').length;

  // 4. Reviews Count & Average Calculation
  const totalReviewsCount = myReviews.length;
  const averageRating = totalReviewsCount > 0 
    ? (myReviews.reduce((sum, rev) => sum + rev.rating, 0) / totalReviewsCount).toFixed(1)
    : "0.0";

  // 5. Consultation Fee from DB payload fallback
  const displayFee = myAppointments[0]?.consultationFee || "120";

  // 6. Get top 3 recent appointments
  const recentAppointments = myAppointments.slice(0, 3);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50/50 min-h-screen text-slate-800">
      
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Doctor Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back, Dr. {user?.name || "James Mitchell"}</p>
      </div>

      {/* 4-Column Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Patients */}
        <Card className="border-none shadow-sm bg-white p-4 flex flex-row items-center gap-4" radius="lg">
          <div className="p-3 bg-teal-50 text-teal-600 radius-md rounded-xl flex items-center justify-center">
            <Persons width={24} height={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{uniquePatientsCount}</h2>
            <p className="text-xs text-slate-400 font-medium">Total Patients</p>
          </div>
        </Card>

        {/* Today's Appointments */}
        <Card className="border-none shadow-sm bg-white p-4 flex flex-row items-center gap-4" radius="lg">
          <div className="p-3 bg-teal-50 text-teal-600 radius-md rounded-xl flex items-center justify-center">
            <Calendar width={24} height={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{todaysAppointments.length}</h2>
            <p className="text-xs text-slate-400 font-medium">Today's Appointments</p>
          </div>
        </Card>

        {/* Pending Requests */}
        <Card className="border-none shadow-sm bg-white p-4 flex flex-row items-center gap-4" radius="lg">
          <div className="p-3 bg-amber-50 text-amber-600 radius-md rounded-xl flex items-center justify-center">
            <Clock width={24} height={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{pendingRequestsCount}</h2>
            <p className="text-xs text-slate-400 font-medium">Pending Requests</p>
          </div>
        </Card>

        {/* Reviews Received */}
        <Card className="border-none shadow-sm bg-white p-4 flex flex-row items-center gap-4" radius="lg">
          <div className="p-3 bg-purple-50 text-purple-600 radius-md rounded-xl flex items-center justify-center">
            <Star width={24} height={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{totalReviewsCount}</h2>
            <p className="text-xs text-slate-400 font-medium">Reviews Received</p>
          </div>
        </Card>
      </div>

      {/* Main Banner: Teal Themed Layout Block */}
      <Card className="bg-teal-600 text-white border-none shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" radius="lg">
        <div>
          <p className="text-xs text-teal-100 uppercase tracking-wider font-semibold">Your Average Rating</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-extrabold">{averageRating}</span>
            <div className="flex text-amber-400 gap-0.5 items-center">
              {[...Array(5)].map((_, i) => {
                const isFilled = i < Math.round(Number(averageRating));
                return isFilled ? (
                  <StarFill key={i} width={18} height={18} className="text-amber-400" />
                ) : (
                  <Star key={i} width={18} height={18} className="text-teal-400 fill-transparent" />
                );
              })}
            </div>
          </div>
          <p className="text-xs text-teal-100 mt-1">Based on {totalReviewsCount} reviews</p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs text-teal-100 uppercase tracking-wider font-semibold">Consultation Fee</p>
          <p className="text-4xl font-black mt-1">${displayFee}</p>
        </div>
      </Card>

      {/* Recent Appointments Block */}
      <Card className="border-none shadow-sm bg-white p-6" radius="lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-900">Recent Appointments</h3>
          <Button 
            className="text-teal-600 font-medium hover:bg-teal-50" 
            variant="light" 
            endContent={<ChevronRight width={16} height={16} />}
            size="sm"
          >
            View All
          </Button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentAppointments.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center">No appointments found.</p>
          ) : (
            recentAppointments.map((appointment) => {
              const isConfirmed = appointment.appointmentStatus === 'confirmed';
              return (
                <div key={appointment._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-3 first:pt-0 last:pb-0">
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {appointment.userEmail ? appointment.userEmail.split('@')[0] : "Patient Profile"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {appointment.day} • {appointment.slot}
                    </p>
                    <p className="text-xs text-slate-500 italic mt-1 line-clamp-1">
                      {appointment.symptoms || "No symptoms listed"}
                    </p>
                  </div>

                  <div>
                    <Chip
                      className="capitalize font-semibold text-xs"
                      color={isConfirmed ? "success" : "warning"}
                      variant="flat"
                      size="sm"
                    >
                      {appointment.appointmentStatus}
                    </Chip>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

    </div>
  );
};

export default DoctorDashBoard;
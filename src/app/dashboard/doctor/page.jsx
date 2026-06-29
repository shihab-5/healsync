'use client';
import { useEffect, useState } from 'react';
import { Card, Chip, Separator, Avatar, Spinner } from '@heroui/react';
import { PersonFill, Calendar, StarFill } from '@gravity-ui/icons';
import { toast, Toaster } from 'react-hot-toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function DoctorDashboard() {
  const [stats, setStats] = useState({ patients: 0, todayAppointments: 0, reviews: 0 });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const doctorId = typeof window !== 'undefined' ? localStorage.getItem('doctorId') : null;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [apptRes, reviewRes] = await Promise.all([
          fetch(`${API}/api/appointments`),
          fetch(`${API}/api/reviews`),
        ]);
        const appts = await apptRes.json();
        const reviews = await reviewRes.json();

        const myAppts = doctorId ? appts.filter(a => a.doctorId === doctorId) : appts;
        const myReviews = doctorId ? reviews.filter(r => r.doctorId === doctorId) : reviews;

        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const todayAppts = myAppts.filter(a => a.day === today);
        const uniquePatients = new Set(myAppts.map(a => a.userEmail)).size;

        setStats({
          patients: uniquePatients,
          todayAppointments: todayAppts.length,
          reviews: myReviews.length,
        });

        setRecentAppointments(myAppts.slice(-5).reverse());
        setRecentReviews(myReviews.slice(-3).reverse());
      } catch (err) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [doctorId]);

  const statCards = [
    {
      label: 'Total Patients',
      value: stats.patients,
      icon: <PersonFill width={24} height={24} />,
      color: 'bg-blue-50 text-blue-600',
      border: 'border-l-4 border-blue-500',
    },
    {
      label: "Today's Appointments",
      value: stats.todayAppointments,
      icon: <Calendar width={24} height={24} />,
      color: 'bg-emerald-50 text-emerald-600',
      border: 'border-l-4 border-emerald-500',
    },
    {
      label: 'Reviews Received',
      value: stats.reviews,
      icon: <StarFill width={24} height={24} />,
      color: 'bg-amber-50 text-amber-600',
      border: 'border-l-4 border-amber-500',
    },
  ];

  const statusColor = {
    pending: 'warning',
    accepted: 'success',
    rejected: 'danger',
    completed: 'secondary',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" color="primary" label="Loading dashboard…" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Doctor Dashboard</h1>
        <p className="text-slate-500 mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {statCards.map(card => (
          <Card key={card.label} className={`${card.border} bg-white shadow-sm`}>
            <Card.Content className="flex flex-row items-center gap-4 py-5 px-6">
              <div className={`p-3 rounded-xl ${card.color}`}>{card.icon}</div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{card.label}</p>
                <p className="text-3xl font-bold text-slate-800 leading-tight">{card.value}</p>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm">
            <Card.Header className="px-6 pt-5 pb-3">
              <h2 className="text-lg font-semibold text-slate-800">Recent Appointments</h2>
            </Card.Header>
            <Separator />
            <Card.Content className="px-0 py-0">
              {recentAppointments.length === 0 ? (
                <p className="text-center text-slate-400 py-10">No appointments yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                        <th className="text-left px-6 py-3">Patient</th>
                        <th className="text-left px-6 py-3">Day</th>
                        <th className="text-left px-6 py-3">Slot</th>
                        <th className="text-left px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentAppointments.map((a, i) => (
                        <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-3 font-medium text-slate-700">{a.userEmail}</td>
                          <td className="px-6 py-3 text-slate-500">{a.day}</td>
                          <td className="px-6 py-3 text-slate-500">{a.slot}</td>
                          <td className="px-6 py-3">
                            <Chip size="sm" color={statusColor[a.appointmentStatus] || 'default'} variant="flat">
                              {a.appointmentStatus}
                            </Chip>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Content>
          </Card>
        </div>

        {/* Recent Reviews */}
        <div>
          <Card className="bg-white shadow-sm">
            <Card.Header className="px-6 pt-5 pb-3">
              <h2 className="text-lg font-semibold text-slate-800">Recent Reviews</h2>
            </Card.Header>
            <Separator />
            <Card.Content className="flex flex-col gap-4 py-4 px-5">
              {recentReviews.length === 0 ? (
                <p className="text-center text-slate-400 py-6">No reviews yet</p>
              ) : (
                recentReviews.map((r, i) => (
                  <div key={i} className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar name={r.patientId?.slice(0, 2).toUpperCase()} size="sm" />
                        <span className="text-sm font-medium text-slate-700 truncate max-w-[120px]">{r.patientId}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <StarIcon
                            key={idx}
                            width={14}
                            height={14}
                            className={idx < r.rating ? 'text-amber-400' : 'text-slate-200'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r.reviewText}</p>
                  </div>
                ))
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
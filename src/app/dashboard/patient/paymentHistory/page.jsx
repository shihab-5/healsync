"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, Chip } from "@heroui/react";
import { CreditCard, ArrowDownLeft } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { getAppointments } from "@/app/lib/data";

const PaymentHistory = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const all = await getAppointments();
        // Only paid appointments belong in payment history
        const mine = (all || []).filter(
          (a) => a.userId === user.id && a.sessionId
        );
        setAppointments(mine);
      } catch (err) {
        console.error("Failed to load payment history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const totalPaid = useMemo(
    () =>
      appointments.reduce((sum, a) => sum + Number(a.consultationFee || 0), 0),
    [appointments]
  );

  if (isPending || loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/60">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">
            Loading your payment history...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
            Payment History
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            All your paid consultation transactions in one place.
          </p>
        </div>

        <Card className="border border-slate-100 bg-white px-5 py-3.5 rounded-2xl shadow-xs flex items-center gap-4 self-start md:self-center">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
            <CreditCard size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-800 tracking-tight">
              ${totalPaid}
            </span>
            <span className="text-xs font-bold text-slate-500">
              Total paid &middot; {appointments.length} transaction
              {appointments.length !== 1 ? "s" : ""}
            </span>
          </div>
        </Card>
      </div>

      {/* Transactions */}
      <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-50 mb-4 font-bold text-base text-slate-800">
          <CreditCard className="text-teal-600 size-5" />
          <h2>Transaction Records</h2>
        </div>

        {appointments.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-3">
              <CreditCard size={22} />
            </div>
            <p className="text-sm font-semibold text-slate-500">
              No payments yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Once you book and pay for a consultation, it'll show up here.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="py-3 pr-4">Doctor</th>
                    <th className="py-3 pr-4">Appointment</th>
                    <th className="py-3 pr-4">Transaction ID</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((pay) => (
                    <tr
                      key={pay._id}
                      className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-3.5 pr-4">
                        <span className="text-sm font-bold text-slate-800">
                          Dr. {pay.doctorName}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="text-xs font-semibold text-slate-500">
                          {pay.day} &middot; {pay.slot}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="text-xs font-mono font-medium text-slate-400">
                          {pay.sessionId?.slice(0, 18)}...
                        </span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <Chip
                          size="sm"
                          variant="flat"
                          color="success"
                          className="capitalize font-bold text-xs px-3"
                        >
                          paid
                        </Chip>
                      </td>
                      <td className="py-3.5 text-right">
                        <span className="text-sm font-extrabold text-emerald-600">
                          ${pay.consultationFee}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden flex flex-col gap-3">
              {appointments.map((pay) => (
                <div
                  key={pay._id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-800">
                      Dr. {pay.doctorName}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-extrabold text-emerald-600">
                      <ArrowDownLeft size={14} />${pay.consultationFee}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>
                      {pay.day} &middot; {pay.slot}
                    </span>
                    <Chip size="sm" variant="flat" color="success" className="font-bold">
                      paid
                    </Chip>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-2 truncate">
                    {pay.sessionId}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default PaymentHistory;
"use client";

import React, { useState, useMemo } from "react";
import { Card, Chip } from "@heroui/react";
import { Magnifier, CreditCard, Person, Calendar } from "@gravity-ui/icons";

export default function PaymentList({ initialPayments = [] }) {
  const [payments] = useState(initialPayments);
  const [search, setSearch] = useState("");

  // Calculate stats
  const totalRevenue = useMemo(() => {
    return payments.reduce((acc, curr) => acc + (Number(curr.consultationFee) || 0), 0);
  }, [payments]);

  // Search filter
  const filteredPayments = useMemo(() => {
    if (!search.trim()) return payments;
    const query = search.toLowerCase();
    return payments.filter(
      (p) =>
        p.transactionId?.toLowerCase().includes(query) ||
        p.userId?.toLowerCase().includes(query) ||
        p.doctorId?.toLowerCase().includes(query) ||
        p._id?.toLowerCase().includes(query)
    );
  }, [payments, search]);

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
            Payment History
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Track consultation payments and transaction details across the platform.
          </p>
        </div>

        {/* Total Revenue Stat Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl px-5 py-3 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <CreditCard size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <p className="text-xl font-black text-slate-800">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <Magnifier size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search transaction ID, user, or doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 bg-white focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Showing <span className="text-slate-800 font-bold">{filteredPayments.length}</span> transaction(s)
        </div>
      </div>

      {/* Payment List Table */}
      {filteredPayments.length === 0 ? (
        <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-3">
            <CreditCard size={22} />
          </div>
          <p className="text-sm font-semibold text-slate-500">No payment records found</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search query.</p>
        </Card>
      ) : (
        <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/60">
                  <th className="py-3 px-5">Transaction ID</th>
                  <th className="py-3 px-5">Fee</th>
                  <th className="py-3 px-5">User ID</th>
                  <th className="py-3 px-5">Doctor ID</th>
                  <th className="py-3 px-5">Paid At</th>
                  <th className="py-3 px-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPayments.map((item) => {
                  const formattedDate = item.paidAt
                    ? new Date(item.paidAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—";

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-5">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {item.transactionId}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-sm font-black text-emerald-600">
                          ${Number(item.consultationFee).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="font-mono text-xs text-slate-500">{item.userId}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="font-mono text-xs text-slate-500">{item.doctorId}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-xs font-medium text-slate-500">{formattedDate}</span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <Chip size="sm" variant="soft" color="success" className="font-bold">
                          Completed
                        </Chip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredPayments.map((item) => {
              const formattedDate = item.paidAt
                ? new Date(item.paidAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—";

              return (
                <div key={item._id} className="p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {item.transactionId}
                    </span>
                    <Chip size="sm" variant="soft" color="success" className="font-bold">
                      Completed
                    </Chip>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400 font-medium">Consultation Fee</span>
                    <span className="text-base font-black text-emerald-600">
                      ${Number(item.consultationFee).toFixed(2)}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-0.5 mt-1 border-t border-slate-50 pt-2">
                    <p className="truncate">
                      <span className="font-semibold text-slate-600">User:</span> {item.userId}
                    </p>
                    <p className="truncate">
                      <span className="font-semibold text-slate-600">Doctor:</span> {item.doctorId}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-600">Date:</span> {formattedDate}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
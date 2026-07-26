import { getPayments } from "@/app/lib/data";
import React from "react";
import PaymentList from "@/app/component/dashB/PaymentList";
const AdminPayment = async () => {
  const payments = (await getPayments()) || [];

  return <PaymentList initialPayments={payments} />;
};

export default AdminPayment;
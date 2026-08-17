"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { CreditCard } from "@gravity-ui/icons";
import toast from "react-hot-toast";

export default function PayNowButton({ appointmentId }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/checkout_sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId }), // that's it — backend looks up everything else
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Failed to start payment.");
      }
    } catch (error) {
      console.error("Checkout submission failed:", error);
      toast.error("Connection error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onPress={handleCheckout}
      disabled={isProcessing}
      className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 text-white font-bold rounded-xl text-xs h-9 gap-1.5 border-none shadow-xs flex items-center justify-center transition-colors"
    >
      <CreditCard className="w-3.5 h-3.5" />
      {isProcessing ? "Redirecting..." : "Pay Now"}
    </Button>
  );
}
import PrescriptionManagement from "@/app/component/dashB/PrescriptionManagement";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/60">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PrescriptionManagement />
    </Suspense>
  );
}
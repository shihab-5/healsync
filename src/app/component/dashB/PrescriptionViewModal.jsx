"use client";

import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { FileText } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { getPrescriptions } from "@/app/lib/action/prescription";

export default function PrescriptionViewModal({ appointmentId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prescription, setPrescription] = useState(null);
  const [fetched, setFetched] = useState(false);

  const handleOpen = async () => {
    setIsOpen(true);
    if (fetched) return; // don't refetch every time it's reopened

    setLoading(true);
    try {
      const data = await getPrescriptions({ appointmentId });
      // getPrescriptions always returns an array — unwrap it to a single object
      const found = Array.isArray(data) && data.length > 0 ? data[0] : null;
      setPrescription(found);
      setFetched(true);
    } catch (err) {
      toast.error("Failed to load prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={handleOpen}
        className="bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl px-5 border-none w-full sm:w-auto"
      >
        <FileText style={{ fontSize: "16px" }} className="mr-1" />
        Prescription
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="max-w-xl bg-white p-6 rounded-2xl shadow-xl">
              <Modal.Header>
                <h2 className="text-lg font-extrabold text-[#1E293B]">
                  Prescription Details
                </h2>
              </Modal.Header>

              <Modal.Body className="py-4 space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : !prescription ? (
                  <p className="text-sm font-medium text-slate-500 text-center py-6">
                    No prescription has been added for this appointment yet.
                  </p>
                ) : (
                  <>
                    <div>
                      <span className="text-xs font-bold text-slate-400 block mb-1">
                        Patient
                      </span>
                      <p className="text-sm font-semibold text-slate-800">
                        {prescription.patientName}
                      </p>
                    </div>

                    {prescription.diagnosis && (
                      <div>
                        <span className="text-xs font-bold text-slate-400 block mb-1">
                          Diagnosis
                        </span>
                        <div className="bg-[#F8FAFC] border border-slate-100/80 rounded-xl p-3.5 text-sm text-slate-700 font-medium">
                          {prescription.diagnosis}
                        </div>
                      </div>
                    )}

                    {prescription.medications?.length > 0 && (
                      <div>
                        <span className="text-xs font-bold text-slate-400 block mb-2">
                          Medications
                        </span>
                        <div className="space-y-2">
                          {prescription.medications.map((med, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-extrabold flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <span className="font-extrabold text-slate-800">
                                {med.name}
                              </span>
                              {med.dosage && (
                                <>
                                  <span className="text-slate-300">—</span>
                                  <span className="text-slate-600 font-medium">
                                    {med.dosage}
                                  </span>
                                </>
                              )}
                              {med.instructions && (
                                <>
                                  <span className="text-slate-300">·</span>
                                  <span className="text-slate-500 font-normal">
                                    {med.instructions}
                                  </span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {prescription.notes && (
                      <div>
                        <span className="text-xs font-bold text-slate-400 block mb-1">
                          Notes
                        </span>
                        <p className="text-sm italic text-slate-600 leading-relaxed">
                          {prescription.notes}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </Modal.Body>

              <Modal.Footer className="flex justify-end pt-2 border-t border-slate-100">
                <Button
                  variant="light"
                  onPress={() => setIsOpen(false)}
                  className="font-bold text-slate-600"
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
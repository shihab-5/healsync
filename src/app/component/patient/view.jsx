'use client';

import React from 'react';
import { Modal, Button } from "@heroui/react";
import { Eye } from '@gravity-ui/icons';

const View = ({ details }) => {
  if (!details) return null;

  return (
    <div className="flex-1">
      <Modal>
        
        {/* Trigger */}
        <Button
          variant="flat"
          size="sm"
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs h-9 gap-1.5 border-none"
        >
          <Eye style={{ fontSize: '14px' }} /> View Details
        </Button>

        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[520px]">
              
              <Modal.Header>
                <Modal.Heading className="text-xl font-bold text-slate-900">
                  Detailed Medical Summary
                </Modal.Heading>
              </Modal.Header>
              
              {/* Core Body Container using consistent Sub-component notation */}
              <Modal.Body className="py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">User Email</span>
                    <p className="text-slate-900 font-semibold">{details.userEmail || 'N/A'}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Appointment Status</span>
                    <p className="text-slate-900 font-semibold capitalize">{details.appointmentStatus || 'Pending'}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Declared Symptoms</span>
                    <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/60 mt-1 text-xs italic">
                      {/* Sanitized Quote Literals to safely handle text elements */}
                      &ldquo;{details.symptoms || 'No explicit tracking symptoms documented.'}&rdquo;
                    </p>
                  </div>

                  <div className="sm:col-span-2 border-t border-slate-100 my-1" />

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Transaction Authorization Status</span>
                    <p className="text-emerald-600 font-bold capitalize">{details.status || 'Unverified'}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Consultation Price Settlement</span>
                    <p className="text-slate-900 font-black">${details.consultationFee}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Gateway Transaction ID</span>
                    <code className="text-[11px] bg-slate-100 text-slate-600 px-2 py-1.5 rounded-lg block truncate font-mono mt-1">
                      {details.transactionId || 'None Processing'}
                    </code>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Session Reference ID</span>
                    <code className="text-[11px] bg-slate-100 text-slate-600 px-2 py-1.5 rounded-lg block truncate font-mono mt-1">
                      {details.sessionId || 'None Provided'}
                    </code>
                  </div>

                </div>
              </Modal.Body> {/* ✅ Fixed: Tag now properly matches the opening <Modal.Body> setup */}
              
              <Modal.Footer>
                <Button 
                  slot="close" 
                  color="danger" 
                  variant="light" 
                  className="font-bold rounded-xl"
                >
                  Dismiss
                </Button>
              </Modal.Footer>

              <Modal.CloseTrigger />

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default View;
'use client'
import { deleteAppointment } from '@/app/lib/action/appointments';
import { TrashBin } from '@gravity-ui/icons';
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const DeleteAppointment = ({ appointmentId, onDeleted }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const data = await deleteAppointment(appointmentId);

    if (data?.success) {
      toast.success(data?.message || 'Appointment cancelled successfully');
      router.refresh();
      if (typeof window !== 'undefined') {
        window.location.assign('/dashboard/patient/myAppointments');
      }
    } else {
      toast.error(data?.error || 'Failed to cancel appointment');
    }
  };

  return (
    <div>
      <AlertDialog>
                                  <Button className="px-3 py-1.5 bg-rose-50/60 hover:bg-rose-100/80 text-rose-600 border border-rose-100/40 rounded-lg text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5">
                                  <TrashBin className="w-3 h-3" />
                                  Cancel</Button>
                                  <AlertDialog.Backdrop>
                                    <AlertDialog.Container>
                                      <AlertDialog.Dialog className="sm:max-w-[400px]">
                                        <AlertDialog.CloseTrigger />
                                        <AlertDialog.Header>
                                          <AlertDialog.Icon status="danger" />
                                          <AlertDialog.Heading>Delete appointment permanently?</AlertDialog.Heading>
                                        </AlertDialog.Header>
                                        <AlertDialog.Body>
                                          <p>
                                            This will permanently delete <strong>My Awesome specialist doctor</strong> and all of its
                                            data. This action cannot be undone.
                                          </p>
                                        </AlertDialog.Body>
                                        <AlertDialog.Footer>
                                          <Button slot="close" variant="tertiary">
                                            Cancel
                                          </Button>
                                          <Button slot="close" variant="danger" onClick={() => handleDelete(appointmentId)}>
                                            Delete 
                                          </Button>
                                        </AlertDialog.Footer>
                                      </AlertDialog.Dialog>
                                    </AlertDialog.Container>
                                  </AlertDialog.Backdrop>
                                </AlertDialog>

    </div>
  );
};

export default DeleteAppointment;
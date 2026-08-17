'use client'
import { deleteAppointment } from '@/app/lib/action/appointments';
import { TrashBin } from '@gravity-ui/icons';
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const DeleteAppointment = ({ appointmentId, onDeleted, disabled = false }) => {
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

  // Paid appointments can't be cancelled — show a disabled, non-interactive button instead
  if (disabled) {
    return (
      <div>
        <Button
          variant="flat"
          size="sm"
          isDisabled
          className="w-full bg-slate-50 text-slate-300 font-bold rounded-xl text-xs h-9 gap-1.5 border-none flex items-center justify-center cursor-not-allowed"
        >
          <TrashBin className="w-3.5 h-3.5" />
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div>
      <AlertDialog>
        <Button
  variant="flat"
  size="sm"
  className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs h-9 gap-1.5 border-none flex items-center justify-center transition-colors"
>
  <TrashBin className="w-3.5 h-3.5" />
  Cancel
</Button>
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
                                          <Button slot="close" variant="danger" onClick={handleDelete}>
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
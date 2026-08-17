import { redirect } from 'next/navigation'

import Link from 'next/link'
import { updateAppointment } from '@/app/lib/action/appointments'
import { createPayment } from '@/app/lib/action/appointmentPayment_actions'
import { stripe } from '@/app/lib/stripe'
export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    payment_intent,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })
  console.log('Payment Intent:', payment_intent)
  console.log('Stripe Checkout Session:', { status, metadata })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    // Every checkout session now comes from Pay Now on an existing appointment —
    // booking itself no longer goes through Stripe. So this always just marks
    // the appointment paid and logs the transaction; nothing else to branch on.
    await updateAppointment(metadata.appointmentId, {
      paymentStatus: 'paid',
      sessionId: session_id,
      transactionId: payment_intent?.id,
    });

    await createPayment({
      appointmentId: metadata.appointmentId,
      userId: metadata.userId,
      doctorId: metadata.doctorId,
      transactionId: payment_intent?.id,
      sessionId: session_id,
      consultationFee: metadata.consultationFee,
    });

    return (
      <section id="success">
           <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 text-center shadow-sm">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    ✓
                </div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Payment Successful!</h1>
                <p className="text-gray-500 text-sm mb-6">
                    Your payment has been received and your appointment is marked as paid.
                </p>
                <Link href="/dashboard/patient" className="inline-block bg-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-teal-600 transition-all">
                    Return to Dashboard
                </Link>
            </div>

        </div>

      </section>
    )
  }
}
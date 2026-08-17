import { getAppointmentById } from '@/app/lib/action/appointmentPayment_actions';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { appointmentId } = await request.json();
        const origin = request.headers.get('origin');

        if (!appointmentId) {
            return NextResponse.json({ error: "appointmentId is required" }, { status: 400 });
        }

        // Pull TRUSTED data from the database — never trust client-provided amounts
        const appointment = await getAppointmentById(appointmentId);

        if (!appointment) {
            return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
        }

        const { doctorId, doctorName, consultationFee, day, slot, symptoms, userEmail } = appointment;
        const userId = appointment.userId || appointment.patientId;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: userEmail || undefined,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Consultation with Dr. ${doctorName || 'Specialist'}`,
                            description: `Appointment Scheduled on ${day} at ${slot}`,
                        },
                        unit_amount: Math.round(Number(consultationFee || 150) * 100),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                appointmentId: String(appointmentId),
                doctorId: String(doctorId || ''),
                doctorName: String(doctorName || ''),
                day: String(day || ''),
                slot: String(slot || ''),
                symptoms: String(symptoms || ''),
                userEmail: String(userEmail || ''),
                userId: String(userId || ''),
                consultationFee: String(consultationFee || 0),
            },
            success_url: `${origin}/dashboard/patient/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/dashboard/patient/appointments`,
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.error('Stripe Session Error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
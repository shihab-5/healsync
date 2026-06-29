import { getUserSession } from '@/app/lib/session';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        // ✅ FIX: Use request.json() instead of request.formData()
        const body = await request.json();
        const { doctorId, doctorName, consultationFee, day, slot, symptoms, userEmail, userId } = body;

        const origin = request.headers.get('origin') || 'http://localhost:3000';

        // Create the Stripe Checkout Session
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
                        // Multiply the fee by 100 to convert to cents ($100 -> 10000 cents)
                        unit_amount: Math.round(Number(consultationFee || 150) * 100),
                    },
                    quantity: 1,
                },
            ],
            // Pass appointment details into metadata for your webhooks or database update
            metadata: {
                doctorId,
                doctorName,
                day,
                slot,
                symptoms,
                userEmail,
                userId ,
                consultationFee,
              },
            success_url: `${origin}/findDoctors/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/findDoctors/${doctorId}`,
        });

        // Return the URL as JSON for the frontend to handle the redirect
        return NextResponse.json({ url: session.url });
        
    } catch (error) {
        console.error('Stripe Session Error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
import Link from 'next/link';

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 text-center shadow-sm">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    ✓
                </div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Payment Successful!</h1>
                <p className="text-gray-500 text-sm mb-6">Your appointment block has been locked in and confirmed with the healthcare provider.</p>
                <Link href="/dashboard/patient" className="inline-block bg-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-teal-600 transition-all">
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );
}
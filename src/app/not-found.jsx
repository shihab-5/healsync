import Link from 'next/link';
import { ArrowLeft, ArrowRight, House, Magnifier } from '@gravity-ui/icons';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.16),_transparent_35%),linear-gradient(135deg,_#f8fffe_0%,_#f3f8ff_100%)] px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-[32px] border border-teal-100/80 bg-white/80 px-6 py-12 shadow-[0_25px_80px_-35px_rgba(13,148,136,0.35)] backdrop-blur-xl sm:px-10 lg:flex-row lg:gap-10 lg:px-14 lg:py-16">
        <div className="max-w-xl text-center lg:text-left">
          <div className="mb-5 inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
            <Magnifier className="mr-2 h-4 w-4" />
            404 • Page not found
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Oops! The page you&apos;re looking for disappeared.
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            The route might have moved, expired, or never existed. Let&apos;s get you back to a safe, helpful place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700"
            >
              <House className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Go to dashboard
            </Link>
          </div>
        </div>

        <div className="relative mt-10 w-full max-w-md lg:mt-0">
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-teal-500/20 via-cyan-400/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
                HealSync
              </span>
              <span className="text-sm font-medium text-slate-300">Error 404</span>
            </div>

            <div className="mt-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-4xl font-black text-teal-300">
                404
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-300">
                Even the best care plans need a reset sometimes. Start from the home page and we&apos;ll guide you back.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center text-sm text-slate-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Use the quick links above to continue
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

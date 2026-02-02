import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-teal-light/70">404</p>
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="text-sm text-gray-300">
          The comet wandered off course. Let’s bring it back home.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-brand-teal-light px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-teal-light/10"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}

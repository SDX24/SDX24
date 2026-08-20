import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-4">
      <div className="mx-auto max-w-md space-y-5 text-center">
        <p className="font-mono-label text-gray-500">404</p>
        <h1 className="text-display-sm font-bold text-white">Page not found</h1>
        <p className="text-gray-400">That page doesn&apos;t exist, or it has moved.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-brand-teal-light px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-teal"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

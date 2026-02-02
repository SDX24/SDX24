import Link from "next/link";

export default function TestPage() {
  const tandemUrl = process.env.NEXT_PUBLIC_TANDEM_URL || "";
  const iframeUrl = tandemUrl;

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">Tandem App Embed</h1>
        <p className="mb-8 text-center text-gray-400">Full Tandem app with guest sign-in option</p>

        {/* Phone-shaped Iframe Container */}
        <div className="mx-auto flex justify-center">
          <div
            className="overflow-hidden rounded-[2.5rem] border-[14px] border-gray-800 bg-gray-800 shadow-2xl"
            style={{ width: "402px", height: "874px" }}
          >
            <iframe
              src={iframeUrl}
              className="h-full w-full"
              title="Tandem App"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block rounded-lg bg-brand-teal-light px-6 py-3 font-bold text-white transition-colors hover:bg-brand-teal"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

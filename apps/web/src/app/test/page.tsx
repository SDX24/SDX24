import Image from "next/image";

export default function TestPage() {
  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">Logo Visibility Test</h1>
        <p className="mb-12 text-center text-gray-400">
          Testing different approaches to make the logo visible on dark backgrounds
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Original - No Effects */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-gray-400">
              Original (No Effects)
            </h3>
            <div className="flex items-center justify-center">
              <Image src="/logo.svg" alt="Original Logo" width={120} height={120} />
            </div>
          </div>

          {/* Option 1: Subtle Glow */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              CSS Glow - Subtle
            </h3>
            <div className="flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Logo with Subtle Glow"
                width={120}
                height={120}
                className="drop-shadow-[0_0_15px_rgba(0,169,145,0.4)] drop-shadow-[0_0_30px_rgba(0,169,145,0.2)]"
              />
            </div>
          </div>

          {/* Option 2: Strong Glow */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              CSS Glow - Strong
            </h3>
            <div className="flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Logo with Strong Glow"
                width={120}
                height={120}
                className="drop-shadow-[0_0_25px_rgba(0,169,145,0.7)] drop-shadow-[0_0_50px_rgba(0,169,145,0.4)]"
              />
            </div>
          </div>

          {/* Option 3: Glassmorphism */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Glassmorphism Background
            </h3>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
                <Image src="/logo.svg" alt="Logo with Glass Background" width={120} height={120} />
              </div>
            </div>
          </div>

          {/* Option 4: Glassmorphism + Glow */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Glass + Glow Combo
            </h3>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl border border-brand-teal-light/20 bg-white/5 p-6 backdrop-blur-lg">
                <Image
                  src="/logo.svg"
                  alt="Logo with Glass and Glow"
                  width={120}
                  height={120}
                  className="drop-shadow-[0_0_20px_rgba(0,169,145,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* Option 5: Circular Background */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Circular Background
            </h3>
            <div className="flex items-center justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/10">
                <Image src="/logo.svg" alt="Logo with Circle Background" width={120} height={120} />
              </div>
            </div>
          </div>

          {/* Option 6: Teal Circle */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Teal Gradient Circle
            </h3>
            <div className="flex items-center justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-brand-teal-light/20 to-brand-teal/20">
                <Image src="/logo.svg" alt="Logo with Teal Circle" width={120} height={120} />
              </div>
            </div>
          </div>

          {/* Option 7: Soft Square */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Soft Square Background
            </h3>
            <div className="flex items-center justify-center">
              <div className="rounded-3xl bg-white/10 p-8">
                <Image src="/logo.svg" alt="Logo with Soft Square" width={120} height={120} />
              </div>
            </div>
          </div>

          {/* Option 8: Border Only */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Border + Glow
            </h3>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl border-2 border-brand-teal-light/30 p-6">
                <Image
                  src="/logo.svg"
                  alt="Logo with Border"
                  width={120}
                  height={120}
                  className="drop-shadow-[0_0_15px_rgba(0,169,145,0.3)]"
                />
              </div>
            </div>
          </div>

          {/* Option 9: Animated Pulse Glow */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Animated Pulse Glow
            </h3>
            <div className="flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Logo with Pulse"
                width={120}
                height={120}
                className="animate-pulse drop-shadow-[0_0_25px_rgba(0,169,145,0.6)] drop-shadow-[0_0_50px_rgba(0,169,145,0.3)]"
              />
            </div>
          </div>

          {/* Option 10: White Background Gradient */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              White to Transparent
            </h3>
            <div className="flex items-center justify-center">
              <div className="rounded-full bg-gradient-to-b from-white/15 to-transparent p-8">
                <Image src="/logo.svg" alt="Logo with White Gradient" width={120} height={120} />
              </div>
            </div>
          </div>

          {/* Option 11: Simple White Circle */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Simple White Circle
            </h3>
            <div className="flex items-center justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white">
                <Image src="/logo.svg" alt="Logo with White Circle" width={100} height={100} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-block rounded-lg bg-brand-teal-light px-6 py-3 font-bold text-white transition-colors hover:bg-brand-teal"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}

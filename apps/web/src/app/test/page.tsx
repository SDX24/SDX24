import Image from "next/image";
import Link from "next/link";

// Logo SVG component with customizable colors
function LogoSVG({
  outline,
  sand,
  drops,
  className = "",
}: {
  outline: string;
  sand: string;
  drops: string;
  className?: string;
}) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M57.2723 0.00335693C72.2708 -0.0427524 87.5618 0.240244 101.139 7.93402C101.391 8.0762 101.644 8.2182 101.903 8.36469C105.69 10.5419 108.796 13.1435 111.839 16.3842C112.347 16.9191 112.871 17.436 113.398 17.9496C122.987 27.4977 127.114 42.9527 127.785 56.5395C127.973 63.195 127.831 69.8686 126.9 76.4594C126.85 76.8132 126.8 77.1671 126.749 77.5317C124.963 89.6024 119.884 100.376 112.007 109.213C111.8 109.447 111.593 109.681 111.38 109.922C109.712 111.766 107.958 113.32 105.994 114.789C105.551 115.123 105.55 115.123 105.098 115.462C100.626 118.741 95.7815 121.092 90.6737 123.005C90.404 123.107 90.1341 123.208 89.8563 123.313C77.8956 127.717 65.5068 127.941 53.0135 127.876C51.1464 127.868 49.2792 127.868 47.412 127.867C43.8944 127.863 40.3762 127.852 36.8583 127.839C32.8456 127.825 28.8328 127.817 24.8202 127.811C16.5826 127.798 8.34488 127.774 0.1073 127.746C0.0716757 125.986 0.0508648 124.226 0.0321045 122.466C0.0219866 121.975 0.011279 121.484 0.000854492 120.978C-0.0366198 116.268 0.753955 112.062 2.8241 107.894C3.03716 107.455 3.03739 107.454 3.25476 107.006C6.4905 100.431 10.7576 94.9052 15.8055 89.8198C16.0405 89.5807 16.2754 89.3421 16.5175 89.0961C21.449 84.2873 27.1246 80.3265 32.7108 76.4594C32.9499 76.2927 33.1892 76.126 33.4354 75.9545C36.0267 74.1574 38.6855 72.5591 41.4403 71.0727C41.8609 70.8456 41.8612 70.8451 42.2899 70.6137C44.2807 69.5639 44.2809 69.5639 45.1893 69.5639C44.5602 71.274 43.4498 72.3283 42.1952 73.5229C41.9794 73.7319 41.7635 73.9416 41.5409 74.1567C40.1895 75.4538 38.8053 76.6966 37.3905 77.9145C35.3379 79.6827 33.4148 81.5723 31.4969 83.5034C30.3071 84.701 29.1104 85.872 27.8553 86.9916C21.8429 92.6059 14.4303 101.153 13.1659 109.909C13.0909 112.059 13.2167 113.556 14.0692 115.517C15.8903 117.519 17.4956 118.217 20.0653 118.325C20.6524 118.33 21.2399 118.333 21.827 118.333C22.1485 118.336 22.4704 118.338 22.8016 118.34C23.8653 118.347 24.9294 118.349 25.993 118.352C26.7361 118.355 27.4795 118.356 28.2225 118.359C29.7827 118.364 31.3431 118.366 32.9032 118.368C34.8898 118.37 36.8767 118.381 38.8632 118.393C40.4 118.401 41.9374 118.403 43.4745 118.404C44.2057 118.405 44.9376 118.408 45.6688 118.414C53.8334 118.474 61.3723 116.894 67.6298 110.857C70.9892 107.085 71.9134 101.83 71.9042 96.8051C71.6859 88.3905 66.403 81.2583 60.9139 75.6664C60.1134 74.9058 59.2988 74.1707 58.4725 73.4428C58.1711 73.1735 57.8692 72.9039 57.5585 72.6264C53.8792 69.3998 49.9394 66.6035 45.9442 63.8539C16.0955 43.2994 16.0954 43.2988 12.7743 28.7573C11.8769 21.9592 12.3503 15.7439 16.2079 10.0893C23.2047 1.20571 33.608 -0.0353517 43.788 0.00531006C44.5741 0.00443534 45.3607 0.00301961 46.1464 0.00140381C47.7869 -0.000488738 49.4271 0.002155 51.0673 0.00823975C53.1358 0.0155515 55.2038 0.0108274 57.2723 0.00335693ZM63.8505 9.46234C63.133 9.47044 62.4156 9.47492 61.6981 9.47699C60.1863 9.47854 58.6744 9.48226 57.163 9.49359C55.2141 9.51074 53.2652 9.52596 51.3163 9.5307C49.4149 9.53479 47.5132 9.54127 45.6122 9.55023C45.0627 9.5529 45.0625 9.55249 44.5243 9.55511C43.4818 9.55942 42.4394 9.56425 41.3973 9.57269C40.9121 9.57704 40.9117 9.57726 40.4364 9.58148C35.9078 9.59937 31.9163 10.2209 28.5145 13.6508C25.9927 16.6257 25.6524 19.1887 25.7186 23.1694C26.6302 32.7656 34.0167 40.4242 40.6356 46.2104C41.9985 47.358 43.3396 48.5199 44.6561 49.727C48.7992 53.5273 53.094 57.0845 57.4911 60.5405C63.8789 65.56 70.3531 70.5376 75.5966 76.9526L76.5858 78.183C79.1349 81.2554 81.0307 84.4987 82.6854 88.1909L83.0253 88.9575C85.4826 94.2937 85.4953 101.797 83.87 107.462L83.453 108.783C83.0497 110.07 82.6325 111.343 82.1688 112.608L81.8182 113.524C91.5543 109.669 99.6974 103.925 104.965 94.0366L105.566 92.8364C111.824 80.3666 113.574 64.6444 111.457 50.7524L111.202 49.308C110.412 44.5485 109.379 40.2462 107.504 35.8403C103.757 27.2917 98.0292 19.0993 89.4657 15.6918C90.2647 17.3795 90.3751 18.8155 90.3807 20.6674L90.3719 21.6987C90.384 23.0073 90.38 24.2997 90.2714 25.6039C87.5947 36.5642 79.05 44.0825 70.8778 50.4614C70.508 50.7492 70.5079 50.7495 70.1454 51.0317C67.7348 52.9055 65.3193 54.7729 62.9003 56.6342L63.705 55.3412C64.0635 54.4292 64.0633 54.429 64.5096 53.6176C65.7171 53.1867 65.7174 53.1867 66.6337 52.2104C67.1851 51.5485 67.7373 50.8862 68.2899 50.226C68.4964 49.9799 68.6963 49.7401 68.8964 49.5014C69.511 48.7653 70.1287 48.033 70.7587 47.312C76.8016 40.4768 82.7125 33.116 83.5526 23.2895C83.6279 19.4206 82.6966 16.794 80.2079 13.9682C75.4449 9.87168 69.6934 9.4008 63.8505 9.46234Z"
          fill={outline}
        />
        <path
          d="M76.988 26.0351C77.3905 26.4661 77.3905 26.4661 77.3905 27.8668C76.4027 35.1006 69.6119 42.0531 64.4021 46.2455C64.1139 46.4739 63.8257 46.7023 63.5286 46.9376C62.9498 47.3988 62.3718 47.8612 61.7946 48.3245C61.5124 48.5512 61.2303 48.7779 60.9393 49.0115C59.7539 50.0174 58.6562 51.1177 57.5634 52.2365C57.3319 52.4076 57.1005 52.5791 56.8622 52.7558C55.6546 52.3248 55.6546 52.3249 54.9724 51.3431C53.7821 49.8377 52.4796 49.1279 50.8748 48.2034C47.3914 46.1024 44.4752 43.6092 41.5666 40.6883C41.3665 40.4902 41.1665 40.2921 40.9604 40.088C36.3347 35.4733 36.3347 35.4733 35.7049 32.1765C35.9313 31.2068 35.9313 31.2068 36.7222 30.5655C38.313 29.717 39.8904 29.2906 41.6169 28.8634C41.9836 28.7716 42.3507 28.6797 42.7286 28.585C47.0827 27.5372 51.4866 26.866 55.9066 26.2308C57.2265 26.0406 58.5451 25.8413 59.8637 25.6412C72.8417 23.723 72.8417 23.723 76.988 26.0351Z"
          fill={sand}
        />
        <path
          d="M56.0572 95.8535C59.5059 97.2847 62.3924 99.5038 65.315 101.887C65.7135 102.172 66.112 102.456 66.5226 102.749C66.3012 105.236 65.5686 106.87 63.8434 108.582C60.1145 111.781 55.585 113.673 50.8055 113.621C50.4952 113.621 50.1845 113.621 49.8645 113.622C48.8473 113.621 47.8305 113.614 46.8134 113.608C46.1046 113.606 45.3957 113.605 44.6865 113.604C42.8277 113.601 40.9693 113.592 39.1104 113.583C37.2108 113.574 35.3112 113.57 33.4117 113.565C29.6897 113.556 25.9677 113.542 22.2458 113.524C22.5528 111.884 22.5528 111.884 23.4124 111.126C26.6798 109.096 29.9771 107.841 33.5917 106.708C40.0934 104.577 45.7427 101.137 51.227 96.877C52.8262 95.7483 54.1746 95.3281 56.0572 95.8535Z"
          fill={sand}
        />
        <path
          d="M51.0257 87.0452C52.032 87.2339 52.032 87.2339 52.7613 87.7455C53.4215 88.8242 53.4416 89.4147 53.2395 90.6818C52.5854 91.6782 52.5854 91.6782 51.6295 92.4057C50.3716 92.594 50.3716 92.594 49.2144 92.4057C48.4093 91.1127 48.4093 91.1127 48.4846 90.062C48.9733 88.4118 49.3476 87.3598 51.0257 87.0452Z"
          fill={drops}
        />
        <path
          d="M53.6421 74.7356C54.6987 74.8972 54.6987 74.8972 55.6546 75.1666C55.9062 76.163 55.9062 76.163 56.0572 77.3215C55.6587 77.9615 55.6587 77.9615 55.2521 78.6144C54.588 78.4722 53.9238 78.33 53.2396 78.1834C52.988 76.9444 52.988 76.9444 52.837 75.5976C53.1027 75.3131 53.3684 75.0287 53.6421 74.7356Z"
          fill={drops}
        />
        <path
          d="M58.4722 90.6818C59.2692 90.6818 60.0662 90.6818 60.8873 90.6818C61.0202 91.3929 61.153 92.104 61.2899 92.8366C60.1326 93.106 60.1326 93.106 58.8748 93.2676C58.6091 92.9832 58.3434 92.6987 58.0697 92.4057C58.2207 91.4898 58.2207 91.4898 58.4722 90.6818Z"
          fill={drops}
        />
        <path
          d="M58.0698 81.2003C58.8667 81.4136 58.8667 81.4136 59.6798 81.6312C59.547 82.2001 59.4142 82.769 59.2773 83.3552C58.746 83.2129 58.2147 83.0707 57.6672 82.9242C57.8001 82.3553 57.9329 81.7864 58.0698 81.2003Z"
          fill={drops}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="128" height="128" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function TestPage() {
  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">Logo Color Variations</h1>
        <p className="mb-12 text-center text-gray-400">
          Testing different color schemes for dark backgrounds
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Original Dark Logo */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-gray-400">
              Original (Dark - Current)
            </h3>
            <div className="flex items-center justify-center">
              <Image src="/logo.svg" alt="Original Logo" width={120} height={120} />
            </div>
            <div className="mt-4 space-y-1 text-center text-xs text-gray-500">
              <div>Outline: #00241F</div>
              <div>Sand: #00A991</div>
              <div>Drops: #006658</div>
            </div>
          </div>

          {/* Option 1: Soft & Elegant */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Soft & Elegant
            </h3>
            <div className="flex items-center justify-center">
              <LogoSVG outline="#9CA3AF" sand="#00A991" drops="#66D9C9" />
            </div>
            <div className="mt-4 space-y-1 text-center text-xs text-gray-400">
              <div>Outline: #9CA3AF (Gray 400)</div>
              <div>Sand: #00A991 (Teal Light)</div>
              <div>Drops: #66D9C9 (Light Mint)</div>
            </div>
          </div>

          {/* Option 2: Teal Harmony */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Teal Harmony
            </h3>
            <div className="flex items-center justify-center">
              <LogoSVG outline="#4D8A7F" sand="#00A991" drops="#80E5D4" />
            </div>
            <div className="mt-4 space-y-1 text-center text-xs text-gray-400">
              <div>Outline: #4D8A7F (Muted Teal-Gray)</div>
              <div>Sand: #00A991 (Teal Light)</div>
              <div>Drops: #80E5D4 (Very Light Teal)</div>
            </div>
          </div>

          {/* Option 3: Neutral Frame */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Neutral Frame
            </h3>
            <div className="flex items-center justify-center">
              <LogoSVG outline="#D1D5DB" sand="#00A991" drops="#4DD4C0" />
            </div>
            <div className="mt-4 space-y-1 text-center text-xs text-gray-400">
              <div>Outline: #D1D5DB (Gray 300)</div>
              <div>Sand: #00A991 (Teal Light)</div>
              <div>Drops: #4DD4C0 (Mid-Light Teal)</div>
            </div>
          </div>

          {/* Option 4: Warm Touch */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Warm Touch
            </h3>
            <div className="flex items-center justify-center">
              <LogoSVG outline="#B8BBBE" sand="#00A991" drops="#00D4B8" />
            </div>
            <div className="mt-4 space-y-1 text-center text-xs text-gray-400">
              <div>Outline: #B8BBBE (Warm Gray)</div>
              <div>Sand: #00A991 (Teal Light)</div>
              <div>Drops: #00D4B8 (Bright Teal-Cyan)</div>
            </div>
          </div>

          {/* Option 5: Gradient Feel (Recommended) */}
          <div className="rounded-xl border-2 border-brand-teal-light/30 bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Gradient Feel ⭐ Recommended
            </h3>
            <div className="flex items-center justify-center">
              <LogoSVG outline="#6B7280" sand="#00A991" drops="#33CCBB" />
            </div>
            <div className="mt-4 space-y-1 text-center text-xs text-gray-400">
              <div>Outline: #6B7280 (Gray 500)</div>
              <div>Sand: #00A991 (Teal Light)</div>
              <div>Drops: #33CCBB (Lighter Teal)</div>
            </div>
          </div>

          {/* Black & White Light */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-white">
              Black & White Light
            </h3>
            <div className="flex items-center justify-center">
              <LogoSVG outline="#E5E7EB" sand="#F3F4F6" drops="#FFFFFF" />
            </div>
            <div className="mt-4 space-y-1 text-center text-xs text-gray-400">
              <div>Outline: #E5E7EB (Gray 200)</div>
              <div>Sand: #F3F4F6 (Gray 100)</div>
              <div>Drops: #FFFFFF (White)</div>
            </div>
          </div>

          {/* With Glow Effect Example */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Gradient + Glow
            </h3>
            <div className="flex items-center justify-center">
              <LogoSVG
                outline="#6B7280"
                sand="#00A991"
                drops="#33CCBB"
                className="drop-shadow-[0_0_20px_rgba(0,169,145,0.5)]"
              />
            </div>
            <div className="mt-4 space-y-1 text-center text-xs text-gray-400">
              <div>Same as Gradient Feel</div>
              <div>+ CSS glow effect</div>
            </div>
          </div>

          {/* With Glassmorphism Background */}
          <div className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-8">
            <h3 className="mb-4 text-center text-sm font-semibold text-brand-teal-light">
              Gradient + Glass BG
            </h3>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl border border-brand-teal-light/20 bg-white/5 p-6 backdrop-blur-lg">
                <LogoSVG outline="#6B7280" sand="#00A991" drops="#33CCBB" />
              </div>
            </div>
            <div className="mt-4 space-y-1 text-center text-xs text-gray-400">
              <div>Same as Gradient Feel</div>
              <div>+ Glassmorphism background</div>
            </div>
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

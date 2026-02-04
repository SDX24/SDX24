"use client";

import Image from "next/image";

import { useScroll, useTransform } from "motion/react";

import { MainTealCard } from "@/components";

export default function Test1Page() {
  const { scrollYProgress } = useScroll();
  const moveX = useTransform(scrollYProgress, [0, 1], [220, -220]);
  const moveY = useTransform(scrollYProgress, [0, 1], [-120, 240]);
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const flipProgress = useTransform(scrollYProgress, [0.25, 0.65], [0, 1]);
  const scaleOnScroll = useTransform(scrollYProgress, [0, 1], [0.9, 1.08]);
  const fadeOnScroll = useTransform(scrollYProgress, [0, 0.6, 1], [0.6, 1, 0.8]);
  const driftRotate = useTransform(scrollYProgress, [0, 1], [2, -6]);
  const driftY = useTransform(scrollYProgress, [0, 1], [40, -60]);

  return (
    <main className="min-h-[140vh] bg-gradient-to-b from-gray-900 via-black to-black px-4 py-16 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-apricot">
            Main Teal Card Motion Lab
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">Scroll-driven movement + flip.</h1>
          <p className="text-sm text-gray-300 sm:text-base">
            Cards contain image-only, image + text, and text-only content to validate behavior.
          </p>
        </div>

        <div className="relative min-h-[420px]">
          <MainTealCard
            className="max-w-[320px]"
            contentClassName="p-6"
            containerMotionProps={{
              style: { x: moveX, y: moveY },
              transition: { type: "spring", stiffness: 120, damping: 18 },
            }}
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-teal-muted">Image Only</p>
              <div className="flex items-center justify-center gap-4">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-2xl"
                />
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
            </div>
          </MainTealCard>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <MainTealCard className="max-w-[360px]" contentClassName="p-7">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-teal-muted">
                Image + Text
              </p>
              <div className="flex items-start gap-4">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={56}
                  height={56}
                  className="rounded-xl"
                />
                <div className="space-y-2">
                  <p className="text-xl font-semibold">Image + copy block.</p>
                  <p className="text-sm text-gray-200">
                    The card expands vertically while keeping glare consistent. This paragraph is
                    intentionally long to confirm the container grows naturally and the tilt/glare
                    continues to feel centered even as height increases on scroll.
                  </p>
                </div>
              </div>
            </div>
          </MainTealCard>

          <MainTealCard
            className="max-w-[360px]"
            contentClassName="p-7"
            containerMotionProps={{ style: { y: floatY } }}
            flipProgress={flipProgress}
            back={
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-teal-muted">Back</p>
                <p className="text-lg font-semibold">Flipped state.</p>
              </div>
            }
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-teal-muted">Text Only</p>
              <p className="text-2xl font-semibold">Scroll-triggered flip.</p>
              <p className="text-sm text-gray-200">
                Front content transitions into back content with a 3D spin.
              </p>
            </div>
          </MainTealCard>
        </div>

        <div className="flex flex-wrap gap-6">
          <MainTealCard
            className="max-w-[320px]"
            contentClassName="p-6"
            containerMotionProps={{
              style: {
                scale: scaleOnScroll,
                opacity: fadeOnScroll,
              },
            }}
          >
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-teal-muted">
                Scroll Scale
              </p>
              <p className="text-lg font-semibold">Scale + fade on scroll.</p>
              <p className="text-sm text-gray-200">
                Useful for subtle depth without interrupting tilt/glare.
              </p>
            </div>
          </MainTealCard>

          <MainTealCard
            className="max-w-[320px]"
            contentClassName="p-6"
            containerMotionProps={{
              style: {
                rotateZ: driftRotate,
                y: driftY,
              },
            }}
          >
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-teal-muted">
                Scroll Drift
              </p>
              <p className="text-lg font-semibold">Rotation + drift.</p>
              <p className="text-sm text-gray-200">
                Keeps layout motion separate from internal tilt.
              </p>
            </div>
          </MainTealCard>
        </div>
      </div>
    </main>
  );
}

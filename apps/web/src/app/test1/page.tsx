"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import { useMotionValue } from "framer-motion";

import { MainTealCard } from "@/components";
import { ScrollTrigger, gsap } from "@/lib/motion";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  if (inMax === inMin) return outMin;
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
};

export default function Test1Page() {
  const moveRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const flipProgress = useMotionValue(0);

  useEffect(() => {
    const context = gsap.context(() => {
      const moveEl = moveRef.current;
      const floatEl = floatRef.current;
      const scaleEl = scaleRef.current;
      const driftEl = driftRef.current;

      const setMoveX = moveEl
        ? (gsap.quickSetter(moveEl, "x", "px") as (value: number) => void)
        : null;
      const setMoveY = moveEl
        ? (gsap.quickSetter(moveEl, "y", "px") as (value: number) => void)
        : null;
      const setFloatY = floatEl
        ? (gsap.quickSetter(floatEl, "y", "px") as (value: number) => void)
        : null;
      const setScale = scaleEl
        ? (gsap.quickSetter(scaleEl, "scale") as (value: number) => void)
        : null;
      const setOpacity = scaleEl
        ? (gsap.quickSetter(scaleEl, "opacity") as (value: number) => void)
        : null;
      const setDriftRotate = driftEl
        ? (gsap.quickSetter(driftEl, "rotate", "deg") as (value: number) => void)
        : null;
      const setDriftY = driftEl
        ? (gsap.quickSetter(driftEl, "y", "px") as (value: number) => void)
        : null;

      const apply = (setter: ((value: number) => void) | null, value: number) => {
        if (setter) setter(value);
      };

      const trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          const flip = clamp((progress - 0.25) / 0.4, 0, 1);

          apply(setMoveX, mapRange(progress, 0, 1, 220, -220));
          apply(setMoveY, mapRange(progress, 0, 1, -120, 240));
          apply(setFloatY, mapRange(progress, 0, 1, 0, -120));

          const scale = mapRange(progress, 0, 1, 0.9, 1.08);
          const opacity =
            progress <= 0.6
              ? mapRange(progress, 0, 0.6, 0.6, 1)
              : mapRange(progress, 0.6, 1, 1, 0.8);
          apply(setScale, scale);
          apply(setOpacity, opacity);

          apply(setDriftRotate, mapRange(progress, 0, 1, 2, -6));
          apply(setDriftY, mapRange(progress, 0, 1, 40, -60));

          flipProgress.set(flip);
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => context.revert();
  }, [flipProgress]);

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
          <div ref={moveRef}>
            <MainTealCard className="max-w-[320px]" contentClassName="p-6">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-brand-teal-muted">
                  Image Only
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src="/images/profile.jpg"
                    alt="Profile"
                    width={64}
                    height={64}
                    className="rounded-2xl"
                  />
                  <Image
                    src="/images/profile.jpg"
                    alt="Profile"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
              </div>
            </MainTealCard>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <MainTealCard className="max-w-[360px]" contentClassName="p-7">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-teal-muted">
                Image + Text
              </p>
              <div className="flex items-start gap-4">
                <Image
                  src="/images/profile.jpg"
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

          <div ref={floatRef}>
            <MainTealCard
              className="max-w-[360px]"
              contentClassName="p-7"
              flipProgress={flipProgress}
              back={
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-teal-muted">Back</p>
                  <p className="text-lg font-semibold">Flipped state.</p>
                </div>
              }
            >
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-brand-teal-muted">
                  Text Only
                </p>
                <p className="text-2xl font-semibold">Scroll-triggered flip.</p>
                <p className="text-sm text-gray-200">
                  Front content transitions into back content with a 3D spin.
                </p>
              </div>
            </MainTealCard>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div ref={scaleRef}>
            <MainTealCard className="max-w-[320px]" contentClassName="p-6">
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
          </div>

          <div ref={driftRef}>
            <MainTealCard className="max-w-[320px]" contentClassName="p-6">
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
      </div>
    </main>
  );
}

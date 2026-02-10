"use client";

import { useEffect, useState } from "react";

import { type MotionValue, motion, useMotionTemplate } from "framer-motion";
import { CircleChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

type HandEmbedProps = {
  visible: boolean;
  y: MotionValue<number>;
  bumpX: MotionValue<number>;
  lineOffset?: number;
};

export const HandEmbed = ({ visible, y, bumpX, lineOffset = 0 }: HandEmbedProps) => {
  const [mounted, setMounted] = useState(false);
  const [cueLeftX, setCueLeftX] = useState(0);
  const [lineReady, setLineReady] = useState(false);
  const [hasPosition, setHasPosition] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateCueX = () => {
      const rightInset = 16;
      const cueSize = 48;
      setCueLeftX(window.innerWidth - rightInset - cueSize);
    };

    updateCueX();
    window.addEventListener("resize", updateCueX);
    return () => window.removeEventListener("resize", updateCueX);
  }, []);

  useEffect(() => {
    if (!visible) {
      setLineReady(false);
      setHasPosition(false);
      return;
    }
    const updatePositionReady = () => {
      const x = bumpX.get();
      const yVal = y.get();
      if (cueLeftX > 0 && x > 0 && yVal > 0) {
        setHasPosition(true);
      }
    };

    updatePositionReady();
    const unsubX = bumpX.on("change", updatePositionReady);
    const unsubY = y.on("change", updatePositionReady);
    return () => {
      unsubX();
      unsubY();
    };
  }, [visible, bumpX, y, cueLeftX]);

  useEffect(() => {
    if (!visible || !hasPosition) {
      setLineReady(false);
      return;
    }
    setLineReady(false);
    const timeout = window.setTimeout(() => setLineReady(true), 1000);
    return () => window.clearTimeout(timeout);
  }, [visible, hasPosition]);

  const cueYOffset = 0;
  const lineYOffset = 0;
  const lineLeft = useMotionTemplate`${bumpX}px`;
  const cueTop = useMotionTemplate`calc(${y}px + ${cueYOffset}px)`;
  const lineTop = useMotionTemplate`calc(${y}px + ${lineYOffset}px + ${lineOffset}px)`;
  const lineWidth = useMotionTemplate`calc(${cueLeftX}px - ${bumpX}px)`;

  if (!mounted || !visible || cueLeftX === 0 || !hasPosition) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-50">
      <motion.div
        className="absolute right-4"
        style={{ top: cueTop }}
        animate={{ opacity: lineReady ? 0.4 : 0, scale: lineReady ? 1 : 0.98 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 shadow-[0_0_24px_rgba(104,213,255,0.2)]">
          <span className="absolute inset-0 rounded-full border border-brand-teal-light/30" />
          <span className="absolute inset-0 rounded-full bg-brand-teal-light/10 opacity-70 animate-ping" />
          <CircleChevronRight className="relative h-5 w-5 text-brand-teal-light" />
        </div>
      </motion.div>
      <motion.div
        className="absolute"
        style={{
          top: lineTop,
          left: lineLeft,
          height: 2,
          width: lineWidth,
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(255,255,255,0.45) 0 4px, transparent 4px 10px)",
          backgroundSize: "12px 2px",
          animation: "hand-dash 1.2s linear infinite reverse",
        }}
        animate={{ opacity: lineReady ? 0.5 : 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <style>{`@keyframes hand-dash { from { background-position: 0 0; } to { background-position: -24px 0; } }`}</style>
    </div>,
    document.body
  );
};

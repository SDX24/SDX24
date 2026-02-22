"use client";

import { useEffect, useState } from "react";

import {
  type MotionValue,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { CircleChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

type HandEmbedProps = {
  visible: boolean;
  y: MotionValue<number>;
  bumpX: MotionValue<number>;
  isSnapped?: boolean;
  isFlyingAway?: boolean;
};

export const HandEmbed = ({
  visible,
  y,
  bumpX,
  isSnapped = false,
  isFlyingAway = false,
}: HandEmbedProps) => {
  const [mounted, setMounted] = useState(false);
  const [cueLeftX, setCueLeftX] = useState(0);
  const [showElements, setShowElements] = useState(false);
  const fillProgress = useMotionValue(0);

  const fillPercentage = useTransform(fillProgress, [0, 1], [0, 100]);
  const radialGradient = useMotionTemplate`radial-gradient(circle at center, #92F189 ${fillPercentage}%, transparent ${fillPercentage}%)`;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isSnapped) {
      animate(fillProgress, 1, { duration: 1.2, ease: "easeOut" });
    } else {
      animate(fillProgress, 0, { duration: 0.2 });
    }
  }, [isSnapped, fillProgress]);

  useEffect(() => {
    const updateCueX = () => {
      setCueLeftX(window.innerWidth - 64); // 16px right inset + 48px cue size
    };
    updateCueX();
    window.addEventListener("resize", updateCueX);
    return () => window.removeEventListener("resize", updateCueX);
  }, []);

  useEffect(() => {
    if (!visible || cueLeftX === 0) {
      setShowElements(false);
      return;
    }

    const checkPosition = () => {
      const hasValidPosition = bumpX.get() > 0 && y.get() > 0;
      setShowElements(hasValidPosition);
    };

    // Subscribe to position changes
    const unsubX = bumpX.on("change", checkPosition);
    const unsubY = y.on("change", checkPosition);

    // Initial check
    checkPosition();

    return () => {
      unsubX();
      unsubY();
    };
  }, [visible, bumpX, y, cueLeftX]);

  const CUE_SIZE = 48;
  const LINE_HEIGHT = 2;
  const lineLeft = useMotionTemplate`${bumpX}px`;
  const cueTop = useMotionTemplate`calc(${y}px - ${CUE_SIZE / 2}px)`;
  const lineTop = useMotionTemplate`calc(${y}px - ${LINE_HEIGHT / 2}px)`;
  const lineWidth = useMotionTemplate`calc(${cueLeftX}px - ${bumpX}px)`;

  if (!mounted || !visible || !showElements) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-50">
      <motion.div
        className="absolute right-4"
        style={{ top: cueTop }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: showElements ? (isFlyingAway ? 0 : 0.4) : 0,
          x: isFlyingAway ? 96 : 0,
        }}
        transition={{ duration: isFlyingAway ? 0.55 : 0.1, ease: "easeInOut" }}
      >
        <div
          className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-200 ${
            isSnapped
              ? "border-[#92F189]/60 bg-black/60 shadow-[0_0_32px_rgba(146,241,137,0.35)]"
              : "border-white/15 bg-black/50 shadow-[0_0_24px_rgba(104,213,255,0.2)]"
          }`}
        >
          <span
            className={`absolute inset-0 rounded-full border transition-colors duration-200 ${
              isSnapped ? "border-[#92F189]/40" : "border-brand-teal-light/30"
            }`}
          />
          <span
            className={`absolute inset-0 rounded-full ${
              !isSnapped ? "opacity-70 animate-ping" : "opacity-0"
            } transition-colors duration-200 ${
              isSnapped ? "bg-[#92F189]/20" : "bg-brand-teal-light/10"
            }`}
          />
          <CircleChevronRight
            className={`relative h-5 w-5 transition-colors duration-200 ${
              isSnapped ? "text-[#92F189]" : "text-brand-teal-light"
            }`}
          />
          <motion.span
            className="absolute inset-0 rounded-full z-20 pointer-events-none"
            style={{
              background: radialGradient,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isSnapped ? 0.95 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
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
        animate={{
          opacity: showElements ? (isFlyingAway ? 0 : 0.5) : 0,
          x: isFlyingAway ? 120 : 0,
        }}
        transition={{ duration: isFlyingAway ? 0.45 : 0.1, ease: "easeInOut" }}
      />
      <style>{`@keyframes hand-dash { from { background-position: 0 0; } to { background-position: -24px 0; } }`}</style>
    </div>,
    document.body
  );
};

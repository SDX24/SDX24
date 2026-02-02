"use client";

import { motion } from "motion/react";

const repeatingTransition = (duration: number, delay: number) => ({
  duration,
  repeat: Infinity,
  repeatType: "loop" as const,
  delay,
  ease: "easeInOut" as const,
});

export const LoaderOne = () => (
  <div className="flex items-center gap-2">
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={repeatingTransition(1, index * 0.2)}
        className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300"
      />
    ))}
  </div>
);

export const LoaderTwo = () => (
  <div className="flex items-center">
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        initial={{ x: 0 }}
        animate={{ x: [0, 20, 0] }}
        transition={repeatingTransition(2, index * 0.4)}
        className="h-4 w-4 -translate-x-2 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500"
      />
    ))}
  </div>
);

export const LoaderThree = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-20 w-20 stroke-neutral-500"
  >
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <motion.path
      initial={{ pathLength: 0, fill: "var(--fill-initial, #e5e7eb)" }}
      animate={{ pathLength: 1, fill: "var(--fill-final, #fcd34d)" }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
    />
  </motion.svg>
);

export const LoaderFour = ({ text = "Loading..." }: { text?: string }) => (
  <div className="relative font-bold text-white [perspective:1000px]">
    <motion.span
      animate={{ skewX: [0, -40, 0], scaleX: [1, 2, 1] }}
      transition={{
        duration: 0.05,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
        ease: "linear",
        times: [0, 0.2, 0.5, 0.8, 1],
      }}
      className="relative z-20 inline-block"
    >
      {text}
    </motion.span>
    <motion.span
      className="absolute inset-0 text-[#00e571]/50 blur-[0.5px]"
      animate={{
        x: [-2, 4, -3, 1.5, -2],
        y: [-2, 4, -3, 1.5, -2],
        opacity: [0.3, 0.9, 0.4, 0.8, 0.3],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
        times: [0, 0.2, 0.5, 0.8, 1],
      }}
    >
      {text}
    </motion.span>
    <motion.span
      className="absolute inset-0 text-[#8b00ff]/50"
      animate={{
        x: [0, 1, -1.5, 1.5, -1, 0],
        y: [0, -1, 1.5, -0.5, 0],
        opacity: [0.4, 0.8, 0.3, 0.9, 0.4],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
        times: [0, 0.3, 0.6, 0.8, 1],
      }}
    >
      {text}
    </motion.span>
  </div>
);

export const LoaderFive = ({ text }: { text: string }) => (
  <div className="font-sans font-bold" aria-label="Animated text loader">
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        className="inline-block"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{
          scale: [1, 1.1, 1],
          textShadow: ["0 0 0 #6b7280", "0 0 1px #6b7280", "0 0 0 #6b7280"],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: index * 0.05,
          ease: "easeInOut",
          repeatDelay: 2,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </div>
);

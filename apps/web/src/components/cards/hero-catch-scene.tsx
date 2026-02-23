"use client";

import { type CSSProperties, useEffect, useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { ProjectCardExpanded } from "../ui/project-card-expanded";

type HeroCatchSceneProps = {
  iframeUrl: string;
  className?: string;
  style?: CSSProperties;
  project: {
    title: string;
    slogan: string;
    description: string;
    stack: string[];
    logoSrc: string;
    wordmarkSrc?: string;
    links?: Array<{ label: string; href: string }>;
    achievements?: string[];
    coverSrc?: string;
    brand?: {
      primary: string;
      primaryLight: string;
      secondary: string;
      analogous: string;
    };
    expandedDescription?: string;
  };
};

const PHONE_WIDTH = 301.5;
const PHONE_HEIGHT = 655.5;

export const HeroCatchScene = ({ iframeUrl, className, style, project }: HeroCatchSceneProps) => {
  const [isFrameActive, setIsFrameActive] = useState(false);
  const resolvedLinks = project.links ?? [];
  const resolvedAchievements = project.achievements ?? [];
  const resolvedCover = project.coverSrc ?? "/logos/tandem/cover.png";
  const resolvedDescription = project.expandedDescription ?? project.description;
  const resolvedBrand =
    project.brand ??
    ({
      primary: "#3373CC",
      primaryLight: "#91B3E3",
      secondary: "#92F189",
      analogous: "#68D5FF",
    } as const);

  useEffect(() => {
    if (!isFrameActive) return;

    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
    };
  }, [isFrameActive]);

  return (
    <div className={className} style={style}>
      <div className="pointer-events-auto relative h-[760px] w-[980px]">
        <motion.div
          className="absolute -left-10 top-[236px] z-10"
          initial={{ x: -170, opacity: 0 }}
          animate={{ x: 0, opacity: 1, y: [0, -6, 0] }}
          transition={{
            x: { duration: 0.7, ease: "easeOut" },
            opacity: { duration: 0.35, ease: "easeOut" },
            y: { delay: 0.8, duration: 0.4, ease: "easeInOut" },
          }}
        >
          <Image
            src="/assets/hand.png"
            alt="Hand catching device"
            width={320}
            height={184}
            className="-scale-x-100 select-none"
            priority
          />
        </motion.div>

        <motion.div
          className="absolute top-0 z-20"
          style={{ left: `${PHONE_WIDTH}px` }}
          initial={{ x: 390, opacity: 0, rotate: 6 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          onPointerEnter={() => setIsFrameActive(true)}
          onPointerLeave={() => setIsFrameActive(false)}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ delay: 0.8, duration: 0.45, ease: "easeInOut" }}
          >
            <div
              className="overflow-hidden rounded-[2.5rem] border-[12px] border-gray-800 bg-gray-800 shadow-2xl"
              style={{ width: `${PHONE_WIDTH}px`, height: `${PHONE_HEIGHT}px` }}
            >
              <iframe
                src={iframeUrl}
                className="h-full w-full"
                title="Tandem App"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute top-[70px] z-30 w-[500px]"
          style={{ left: `${352 + PHONE_WIDTH}px` }}
          initial={{ x: 315, opacity: 0, scale: 0.97 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectCardExpanded
            className="max-w-none"
            title={project.title}
            slogan={project.slogan}
            description={resolvedDescription}
            links={resolvedLinks}
            stack={[...project.stack, "Realtime", "Trusted Reviews"]}
            achievements={resolvedAchievements}
            logoSrc={project.logoSrc}
            wordmarkSrc={project.wordmarkSrc}
            coverSrc={resolvedCover}
            brand={resolvedBrand}
            showCue={false}
            showDragCue={false}
            interactive
          />
        </motion.div>
      </div>
    </div>
  );
};

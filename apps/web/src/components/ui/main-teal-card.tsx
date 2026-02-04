import React from "react";

import { cn } from "@/lib/utils";

import { CometCard, type CometCardProps } from "./comet-card";

type MainTealCardProps = {
  className?: string;
  contentClassName?: string;
  containerMotionProps?: CometCardProps["containerMotionProps"];
  children: React.ReactNode;
} & Omit<CometCardProps, "className" | "contentClassName" | "children" | "containerMotionProps">;

export const MainTealCard = ({
  className,
  contentClassName,
  containerMotionProps,
  children,
  ...cometProps
}: MainTealCardProps) => (
  <CometCard
    className={cn("w-full", className)}
    containerMotionProps={containerMotionProps}
    surfaceClassName="border-brand-apricot/60 bg-gradient-to-br from-brand-apricot/30 via-white/10 to-black/75"
    contentClassName={cn("p-6", contentClassName)}
    glareOpacity={0.35}
    glareDuration={0.1}
    hoverDuration={0.18}
    hoverScale={1.06}
    hoverScaleX={1.08}
    hoverScaleY={1.04}
    fluidStrength={0}
    fluidMax={0}
    glareClassName="mix-blend-screen"
    glareColor="rgba(127, 182, 133, 0.85)"
    glareMidColor="rgba(127, 182, 133, 0.45)"
    {...cometProps}
  >
    {children}
  </CometCard>
);

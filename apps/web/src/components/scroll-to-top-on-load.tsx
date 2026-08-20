"use client";

import { useEffect } from "react";

/**
 * Disables browser scroll restoration so a reload starts at the top.
 *
 * Skips the reset when the URL carries a hash. Otherwise a cold load of a shared deep
 * link (`/#work`, `/#contact`) would jump to the section and then be yanked back to the top.
 */
export const ScrollToTopOnLoad = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
};

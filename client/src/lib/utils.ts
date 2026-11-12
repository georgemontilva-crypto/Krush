import clsx, { type ClassValue } from "clsx";
export const cn = (...v: ClassValue[]) => clsx(v);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

/** Phones/tablets or reduced motion: use the light versions of heavy effects. */
export const isLite = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (max-width: 767px), (prefers-reduced-motion: reduce)").matches;

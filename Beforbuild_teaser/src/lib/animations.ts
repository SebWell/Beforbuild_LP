import { interpolate, spring } from "remotion";

export const fadeIn = (
  frame: number,
  delay: number,
  duration: number,
): number =>
  interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const fadeOut = (
  frame: number,
  start: number,
  duration: number,
): number =>
  interpolate(frame - start, [0, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const slideUp = (
  frame: number,
  delay: number,
  distance: number = 30,
): number =>
  interpolate(frame - delay, [0, 20], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const slideRight = (
  frame: number,
  delay: number,
  distance: number = 40,
): number =>
  interpolate(frame - delay, [0, 20], [-distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const scaleIn = (
  frame: number,
  fps: number,
  delay: number,
): number =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });

export const stagger = (index: number, baseDelay: number = 10): number =>
  index * baseDelay;

/**
 * Helpers for working with SVG path data
 */

import type { Point } from "./types";

/**
 * Convert polar coordinates to cartesian point.
 */
export const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angle: number,
): Point => ({
  x: cx + radius * Math.cos(angle),
  y: cy + radius * Math.sin(angle),
});

/**
 * Convert cartesian coordinates to polar.
 */
export const cartesianToPolar = (
  cx: number,
  cy: number,
  p: Point,
): { r: number; angle: number } => {
  const dx = p.x - cx;
  const dy = p.y - cy;
  return {
    r: Math.hypot(dx, dy),
    angle: Math.atan2(dy, dx),
  };
};

/**
 * Create an arc path command.
 * Sweep: 0 = large arc, 1 = sweep arc
 */
export const arcPath = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string => {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);

  const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
};

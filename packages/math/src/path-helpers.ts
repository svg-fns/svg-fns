/**
 * @module
 * Provides helpers for working with SVG path data and coordinate systems.
 *
 * This module uses **degrees** for all angle measurements.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths}
 */

import { DEG_TO_RAD, RAD_TO_DEG } from "@svg-fns/utils";
import type { Point } from "./types";

/**
 * Converts polar coordinates to a Cartesian point.
 *
 * @param cx The x-coordinate of the polar coordinate system's origin.
 * @param cy The y-coordinate of the polar coordinate system's origin.
 * @param radius The radius (distance from the origin).
 * @param angle The angle **in degree**.
 * @returns The corresponding Cartesian point { x, y }.
 */
export const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angle: number, // Degree
): Point => ({
  x: cx + radius * Math.cos(DEG_TO_RAD * angle),
  y: cy + radius * Math.sin(DEG_TO_RAD * angle),
});

/**
 * Converts a Cartesian point to polar coordinates.
 *
 * @param cx The x-coordinate of the polar coordinate system's origin.
 * @param cy The y-coordinate of the polar coordinate system's origin.
 * @param p The Cartesian point { x, y } to convert.
 * @returns The polar coordinates { r, angle }, where angle is in degrees
 * in the range `[-PI, PI]`.
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
    angle: RAD_TO_DEG * Math.atan2(dy, dx), // Degree
  };
};

/**
 * Generates an SVG elliptical arc command string (`A` command).
 *
 * This function correctly calculates the `large-arc-flag` and allows
 * control over the `sweep-flag`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve}
 *
 * @param cx The center x-coordinate of the ellipse.
 * @param cy The center y-coordinate of the ellipse.
 * @param r The radius of the arc (assumes a circle, rx=ry=r).
 * @param startAngleRadians The starting angle of the arc **in degrees**.
 * @param endAngleRadians The ending angle of the arc **in degrees**.
 * @param sweepFlag The direction to draw the arc. `0` for counter-clockwise
 * (negative angle direction), `1` for clockwise (positive angle direction).
 * @returns A string for use in an SVG path's `d` attribute, e.g., "M x1 y1 A r r ...".
 */
export const arcPath = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number, // degrees
  endAngle: number, // degrees
  sweepFlag: 0 | 1 = 1,
): string => {
  const startAngleRadians = DEG_TO_RAD * startAngle;
  const endAngleRadians = DEG_TO_RAD * endAngle;
  const start = polarToCartesian(cx, cy, r, startAngleRadians);
  const end = polarToCartesian(cx, cy, r, endAngleRadians);

  // Normalize the angle difference to be within [0, 2*PI)
  let angleDiff = (endAngleRadians - startAngleRadians) % (2 * Math.PI);
  if (sweepFlag === 1 && angleDiff < 0) {
    angleDiff += 2 * Math.PI;
  }
  if (sweepFlag === 0 && angleDiff > 0) {
    angleDiff -= 2 * Math.PI;
  }

  const largeArcFlag = Math.abs(angleDiff) > Math.PI ? 1 : 0;

  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
};

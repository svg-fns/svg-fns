/**
 * Geometry utilities for 2D space
 */

import type { Point } from "./types";

/**
 * Calculates Euclidean distance between two points.
 */
export const distance = (a: Point, b: Point): number =>
  Math.hypot(b.x - a.x, b.y - a.y);

/**
 * Midpoint between two points.
 */
export const midpoint = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

/**
 * Line equation slope (m) between two points.
 * Returns `Infinity` for vertical lines.
 */
export const slope = (a: Point, b: Point): number =>
  b.x === a.x ? Infinity : (b.y - a.y) / (b.x - a.x);

/**
 * Rotate a point around origin (0,0) or custom pivot.
 */
export const rotatePoint = (
  p: Point,
  angle: number,
  pivot: Point = { x: 0, y: 0 },
): Point => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = p.x - pivot.x;
  const dy = p.y - pivot.y;

  return {
    x: pivot.x + dx * cos - dy * sin,
    y: pivot.y + dx * sin + dy * cos,
  };
};

/**
 * Check if two points are approximately equal (within tolerance).
 */
export const almostEqual = (a: Point, b: Point, tolerance = 1e-7): boolean =>
  Math.abs(a.x - b.x) < tolerance && Math.abs(a.y - b.y) < tolerance;

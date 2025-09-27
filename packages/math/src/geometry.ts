/**
 * @module
 * Provides fundamental 2D geometry utilities and calculations.
 */

import { DEG_TO_RAD } from "@svg-fns/utils";
import type { Point } from "./types";

// --- Core Geometry Functions ---

/**
 * Calculates the Euclidean distance between two points.
 * Uses the robust `Math.hypot()` method.
 *
 * @param a The first point.
 * @param b The second point.
 * @returns The distance between the points.
 */
export const distance = (a: Point, b: Point): number =>
  Math.hypot(b.x - a.x, b.y - a.y);

/**
 * Calculates the midpoint between two points.
 *
 * @param a The first point.
 * @param b The second point.
 * @returns The point that lies exactly halfway between a and b.
 */
export const midpoint = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

/**
 * Calculates the slope (m) of the line equation between two points.
 *
 * - Returns `Infinity` for vertical lines.
 * - Returns `NaN` if the points are identical (as the slope is undefined).
 *
 * @param a The first point.
 * @param b The second point.
 * @param tolerance The tolerance for checking if the line is vertical.
 * See {@link almostEqualNumbers}.
 * @returns The slope of the line.
 */
export const slope = (a: Point, b: Point, tolerance = 1e-9): number => {
  if (almostEqualNumbers(a.x, b.x, tolerance)) {
    return almostEqualNumbers(a.y, b.y, tolerance) ? NaN : Infinity;
  }
  return (b.y - a.y) / (b.x - a.x);
};

/**
 * Rotates a point around a pivot (defaults to the origin).
 *
 * @param p The point to rotate.
 * @param angle The angle of rotation **in degrees**.
 * @param pivot The pivot point to rotate around. Defaults to { x: 0, y: 0 }.
 * @returns The new, rotated point.
 */
export const rotatePoint = (
  p: Point,
  angle: number, // degree
  pivot: Point = { x: 0, y: 0 },
): Point => {
  const cos = Math.cos(DEG_TO_RAD * angle);
  const sin = Math.sin(DEG_TO_RAD * angle);
  const dx = p.x - pivot.x;
  const dy = p.y - pivot.y;

  return {
    x: pivot.x + dx * cos - dy * sin,
    y: pivot.y + dx * sin + dy * cos,
  };
};

// --- Comparison Helpers ---

/**
 * Checks if two numbers are approximately equal within a tolerance.
 * A robust alternative to `===` for floating-point numbers.
 *
 * @param a The first number.
 * @param b The second number.
 * @param tolerance The absolute tolerance.
 * @returns `true` if the numbers are within the tolerance.
 */
export const almostEqualNumbers = (
  a: number,
  b: number,
  tolerance = 1e-9,
): boolean => Math.abs(a - b) < tolerance;

/**
 * Checks if two points are approximately equal on a per-axis basis.
 *
 * @param a The first point.
 * @param b The second point.
 * @param tolerance The absolute tolerance for both x and y axes.
 * See {@link almostEqualNumbers}.
 * @returns `true` if both axes are within tolerance.
 */
export const almostEqualPoints = (
  a: Point,
  b: Point,
  tolerance = 1e-9,
): boolean =>
  almostEqualNumbers(a.x, b.x, tolerance) &&
  almostEqualNumbers(a.y, b.y, tolerance);

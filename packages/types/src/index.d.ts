/**
 * Axis-aligned rectangle.
 * - `x`, `y`: top-left corner coordinates
 * - `width`, `height`: rectangle dimensions
 */
export type Rect = { x: number; y: number; width: number; height: number };

/**
 * 2D point in Cartesian space.
 * - `x`, `y`: coordinates
 */
export type Point = { x: number; y: number };

/**
 * Padding specification for layout or box-model operations.
 * - Single number applies to all sides
 * - Object form allows per-side values
 */
export type Padding =
  | number
  | { top: number; right: number; bottom: number; left: number };

/**
 * Affine transformation matrix tuple.
 * Matches SVGMatrix `[a b c d e f]`, representing:
 *
 *   [ a c e ]
 *   [ b d f ]
 *   [ 0 0 1 ]
 *
 * Used for scale, rotate, skew, and translate operations.
 */
export type Matrix = [number, number, number, number, number, number];

export type Rect = { x: number; y: number; width: number; height: number };
export type Point = { x: number; y: number };

export type Padding =
  | number
  | { top: number; right: number; bottom: number; left: number };

/**
 * Affine transform matrix tuple.
 * Matches SVGMatrix [a b c d e f].
 */
export type Matrix = [number, number, number, number, number, number];

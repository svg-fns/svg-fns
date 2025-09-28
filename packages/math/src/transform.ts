/**
 * @module
 * A clean, well-documented TypeScript library for SVG affine transformations.
 * This module provides pure functions for creating, composing, and applying 2D transformation matrices.
 *
 * ## Conventions
 * - **Matrix Format**: Follows the SVG `matrix(a, b, c, d, e, f)` specification, stored as a 6-element number array `[a, b, c, d, e, f]`.
 * - **Angle Units**: All functions that accept angles (`rotationMatrix`, `skewXMatrix`, etc.) expect values in **degrees**.
 * - **Composition Order**: Matrix composition (`composeMatrices`) is applied **right-to-left**, matching CSS and mathematical conventions.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform}
 */

import type { Matrix, Point } from "@svg-fns/types";
import { DEG_TO_RAD, RAD_TO_DEG } from "@svg-fns/utils";

// --- Matrix Factories ---

/** Creates an identity matrix: `matrix(1 0 0 1 0 0)`. */
export const identityMatrix = (): Matrix => [1, 0, 0, 1, 0, 0];

/**
 * Creates a translation matrix: `matrix(1 0 0 1 tx ty)`.
 * @param tx The distance to translate along the x-axis.
 * @param ty The distance to translate along the y-axis.
 */
export const translationMatrix = (tx = 0, ty = 0): Matrix => [
  1,
  0,
  0,
  1,
  tx,
  ty,
];

/**
 * Creates a scaling matrix: `matrix(sx 0 0 sy 0 0)`.
 * @param sx The factor to scale by on the x-axis.
 * @param sy The factor to scale by on the y-axis. If omitted, `sx` is used.
 */
export const scaleMatrix = (sx = 1, sy = sx): Matrix => [sx, 0, 0, sy, 0, 0];

/**
 * Creates a rotation matrix from an angle in degrees.
 * The rotation is performed around the origin (0, 0).
 * @param angleDegrees The angle of rotation in **degrees**.
 */
export const rotationMatrix = (angleDegrees = 0): Matrix => {
  const angleRadians = angleDegrees * DEG_TO_RAD;
  const cos = Math.cos(angleRadians);
  const sin = Math.sin(angleRadians);
  return [cos, sin, -sin, cos, 0, 0];
};

/**
 * Creates a skew matrix along the x-axis.
 * @param angleDegrees The skew angle in **degrees**.
 */
export const skewXMatrix = (angleDegrees = 0): Matrix => {
  const angleRadians = angleDegrees * DEG_TO_RAD;
  return [1, 0, Math.tan(angleRadians), 1, 0, 0];
};

/**
 * Creates a skew matrix along the y-axis.
 * @param angleDegrees The skew angle in **degrees**.
 */
export const skewYMatrix = (angleDegrees = 0): Matrix => {
  const angleRadians = angleDegrees * DEG_TO_RAD;
  return [1, Math.tan(angleRadians), 0, 1, 0, 0];
};

// --- Matrix Operations ---

/**
 * Multiplies two SVG 2D affine matrices (B × A).
 * The resulting matrix first applies transformation A, then transformation B.
 * @param mB The second matrix to apply (left-hand side).
 * @param mA The first matrix to apply (right-hand side).
 */
export const multiplyMatrices = (mB: Matrix, mA: Matrix): Matrix => {
  const [a1, b1, c1, d1, e1, f1] = mA;
  const [a2, b2, c2, d2, e2, f2] = mB;

  return [
    a2 * a1 + c2 * b1, // a
    b2 * a1 + d2 * b1, // b
    a2 * c1 + c2 * d1, // c
    b2 * c1 + d2 * d1, // d
    a2 * e1 + c2 * f1 + e2, // e
    b2 * e1 + d2 * f1 + f2, // f
  ];
};

/**
 * Composes multiple matrices into a single matrix.
 * Composition is applied from **right to left**, meaning the last matrix in the
 * list is applied to the point first.
 *
 * @example
 * // This will first scale the point by 2, then translate it by (10, 0).
 * const transform = composeMatrices(
 * translationMatrix(10, 0),
 * scaleMatrix(2)
 * );
 * const newPoint = applyMatrixToPoint({ x: 5, y: 5 }, transform);
 * // newPoint is { x: 20, y: 10 }  ((5*2)+10, (5*2))
 *
 * @param matrices A list of matrices to compose.
 * @returns A single matrix representing the combined transformation.
 */
export const composeMatrices = (...matrices: Matrix[]): Matrix => {
  if (matrices.length === 0) return identityMatrix();
  // Reverse the order for a right-to-left composition (B * A)
  return matrices.reduceRight((acc, m) => multiplyMatrices(m, acc));
};

// --- Matrix Application & Parsing ---

/**
 * Applies a transformation matrix to a 2D point.
 * @param p The point to transform.
 * @param m The transformation matrix.
 * @returns The new, transformed point.
 */
export const applyMatrixToPoint = (p: Point, m: Matrix): Point => {
  const [a, b, c, d, e, f] = m;
  return {
    x: a * p.x + c * p.y + e,
    y: b * p.x + d * p.y + f,
  };
};

/**
 * Decomposes a 2D affine matrix into its constituent transformations.
 * This implementation extracts translation, scaling, rotation, and x-axis skew.
 *
 * Note: Decomposition is not always unique (e.g., a scale of -1 can be a rotation).
 * This function returns one valid, standard interpretation. It does not extract skewY.
 *
 * @param m The matrix to decompose.
 * @returns An object containing `translate`, `rotate` (degrees), `scale`, and `skewX` (degrees).
 */
export const decomposeMatrix = (m: Matrix) => {
  const [a, b, c, d, e, f] = m;

  // Translation is straightforward
  const translate = { x: e, y: f };

  // QR decomposition to separate rotation/skew from scale
  const rotate = RAD_TO_DEG * Math.atan2(b, a);
  const scaleX = Math.hypot(a, b);

  const shearFactor = a * c + b * d;
  const skewX = RAD_TO_DEG * Math.atan2(shearFactor, scaleX * scaleX);

  const scaleY = (a * d - b * c) / scaleX;

  return {
    translate,
    rotate,
    scale: { x: scaleX, y: scaleY },
    skewX,
  };
};

/**
 * Parses an SVG transform string into a single composed matrix.
 * This function is robust against malformed input (e.g., non-numeric values).
 *
 * @param transformString The SVG `transform` attribute string, e.g., "translate(10, 20) rotate(45)".
 * @returns The composed `Matrix`. Returns an identity matrix if the string is empty or invalid.
 */
export const parseTransform = (transformStr?: string | null): Matrix => {
  const input = transformStr?.trim();
  if (!input || input.length > 2000) return identityMatrix();

  const transformRegex = /(\w+)\s*\(([^)]*)\)/g;
  const matrices: Matrix[] = [];
  let match: RegExpExecArray | null;

  // biome-ignore lint/suspicious/noAssignInExpressions: quick while loop
  while ((match = transformRegex.exec(input)) !== null) {
    const [, name, rawValues] = match;
    const numbers = rawValues.split(/[\s,]+/).map(Number);

    // If parsing numbers results in NaN, skip this transform to avoid corrupting the matrix
    if (numbers.some(Number.isNaN)) {
      continue;
    }

    switch (name) {
      case "matrix":
        if (numbers.length === 6) matrices.push(numbers as Matrix);
        break;
      case "translate":
        matrices.push(translationMatrix(numbers[0] || 0, numbers[1] || 0));
        break;
      case "scale":
        {
          const sx = numbers[0] ?? 1;
          const sy = numbers[1] ?? sx;
          matrices.push(scaleMatrix(sx, sy));
        }
        break;
      case "rotate":
        {
          const [angle, cx, cy] = [
            numbers[0] || 0,
            numbers[1] || 0,
            numbers[2] || 0,
          ];
          // Rotation with a pivot is T * R * -T
          if (cx !== 0 || cy !== 0) {
            matrices.push(
              composeMatrices(
                translationMatrix(cx, cy),
                rotationMatrix(angle),
                translationMatrix(-cx, -cy),
              ),
            );
          } else {
            matrices.push(rotationMatrix(angle));
          }
        }
        break;
      case "skewX":
        matrices.push(skewXMatrix(numbers[0] || 0));
        break;
      case "skewY":
        matrices.push(skewYMatrix(numbers[0] || 0));
        break;
    }
  }
  // The SVG spec applies transforms from left to right in the string.
  // Our compose function is right-to-left, so we pass them in order.
  return composeMatrices(...matrices);
};

/**
 * Apply an SVG `transform` string to a point.
 * Combines parsing and matrix application into a single call.
 *
 * @example
 * const p = { x: 10, y: 5 };
 * const t = "translate(5,10) rotate(45)";
 * const newPoint = transformPoint(p, t);
 * // newPoint is the transformed { x, y } after applying translation and rotation
 *
 * @param point The point to transform in SVG user coordinates.
 * @param transformString The SVG `transform` string (e.g., "translate(10,20) scale(2)").
 *                        Supports `matrix`, `translate`, `scale`, `rotate`, `skewX`, `skewY`.
 * @returns The new, transformed point.
 * @see {@link parseTransform} for parsing details.
 * @see {@link applyMatrixToPoint} for applying matrices.
 */
export const transformPoint = (
  point: Point,
  transformString: string,
): Point => {
  const matrix = parseTransform(transformString);
  return applyMatrixToPoint(point, matrix);
};

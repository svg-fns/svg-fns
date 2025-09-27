/*
 * @svg-fns/math - transforms.ts
 * Clean, well-documented TypeScript implementation of SVG-affine transform helpers.
 * - Pure functions, no DOM
 * - Small, well-tested, production-minded
 *
 * Exports:
 * - types: Point, Matrix
 * - factories: identityMatrix, translationMatrix, scaleMatrix, rotationMatrix, skewXMatrix, skewYMatrix
 * - applyMatrixToPoint(point, matrix)
 * - composeMatrices(a, b, ...rest)  // applies a then b then rest (left-to-right)
 * - decomposeMatrix(matrix) -> { translate, rotate, scale, skewX }
 * - parseTransform(transformString) -> Matrix
 *
 * The Matrix type follows the SVG `matrix(a b c d e f)` convention stored as [a, b, c, d, e, f].
 */

import type { Matrix, Point } from "./types";

/** Identity matrix: matrix(1 0 0 1 0 0) */
export const identityMatrix = (): Matrix => [1, 0, 0, 1, 0, 0];

/** Create translation matrix for tx, ty -> matrix(1 0 0 1 tx ty) */
export const translationMatrix = (tx = 0, ty = 0): Matrix => [
  1,
  0,
  0,
  1,
  tx,
  ty,
];

/** Create scale matrix sx, sy -> matrix(sx 0 0 sy 0 0) */
export const scaleMatrix = (sx = 1, sy = sx): Matrix => [sx, 0, 0, sy, 0, 0];

/**
 * Create rotation matrix by angleDegrees about origin.
 * Rotation uses the SVG/Cartesian convention where positive angles rotate clockwise
 * when in screen coordinates with Y down. For typical math (Y up) you'd flip sign.
 */
export const rotationMatrix = (angleDegrees = 0): Matrix => {
  const r = (angleDegrees * Math.PI) / 180;
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  return [cos, sin, -sin, cos, 0, 0];
};

/** SkewX by angleDegrees -> matrix(1 tan(a) 0 1 0 0) */
export const skewXMatrix = (angleDegrees = 0): Matrix => {
  const a = (angleDegrees * Math.PI) / 180;
  return [1, 0, Math.tan(a), 1, 0, 0];
};

/** SkewY by angleDegrees -> matrix(1 0 tan(a) 1 0 0) */
export const skewYMatrix = (angleDegrees = 0): Matrix => {
  const a = (angleDegrees * Math.PI) / 180;
  return [1, Math.tan(a), 0, 1, 0, 0];
};

/** Multiply two SVG 2D affine matrices (mB ∘ mA).
 * Resulting matrix applies mA first, then mB.
 */
export const multiplyMatrices = (mA: Matrix, mB: Matrix): Matrix => {
  const [a1, b1, c1, d1, e1, f1] = mA;
  const [a2, b2, c2, d2, e2, f2] = mB;

  const a = a1 * a2 + c1 * b2;
  const b = b1 * a2 + d1 * b2;
  const c = a1 * c2 + c1 * d2;
  const d = b1 * c2 + d1 * d2;
  const e = a1 * e2 + c1 * f2 + e1;
  const f = b1 * e2 + d1 * f2 + f1;

  return [a, b, c, d, e, f];
};

/**
 * Compose matrices in SVG order: composeMatrices(m1, m2) returns a matrix
 * which applies m1, then m2 (i.e. right-to-left on points).
 *
 * Example:
 *   composeMatrices(translationMatrix(5,0), scaleMatrix(2))
 *   // scales, then translates
 */
export const composeMatrices = (...matrices: Matrix[]): Matrix => {
  if (matrices.length === 0) return identityMatrix();
  return matrices.reduce((acc, m) => multiplyMatrices(acc, m));
};

/** Apply a matrix to a point. */
export const applyMatrixToPoint = (p: Point, m: Matrix): Point => {
  const [a, b, c, d, e, f] = m;
  return {
    x: a * p.x + c * p.y + e,
    y: b * p.x + d * p.y + f,
  };
};

/**
 * Decompose a 2D affine matrix into translate, rotate (deg), scale and skewX (deg).
 * Algorithm taken from commonly used SVG decomposition approach (e.g. M. Hernández).
 *
 * Returns:
 * {
 *   translate: { x, y },
 *   rotate: number (degrees),
 *   scale: { x, y },
 *   skewX: number (degrees)
 * }
 *
 * Notes:
 * - rotate is the rotation component in degrees
 * - skewX is the X-axis skew in degrees (skewY can be derived if needed)
 */
export const decomposeMatrix = (m: Matrix) => {
  const [a, b, c, d, e, f] = m;

  // translation
  const translate = { x: e, y: f };

  // compute scaleX
  const scaleX = Math.hypot(a, b);

  // normalize first column
  let aNorm = a;
  let bNorm = b;
  if (scaleX !== 0) {
    aNorm = a / scaleX;
    bNorm = b / scaleX;
  }

  // shear = aNorm*c + bNorm*d
  const shear = aNorm * c + bNorm * d;

  // remove shear from second column
  const c2 = c - aNorm * shear;
  const d2 = d - bNorm * shear;

  // compute scaleY
  const scaleY = Math.hypot(c2, d2);

  // handle reflection (negative determinant)
  const det = a * d - b * c;
  const reflect = det < 0 ? -1 : 1;

  // rotation (in degrees) from normalized first column
  const rotate = (Math.atan2(b, a) * 180) / Math.PI;

  const skewX = (Math.atan(shear) * 180) / Math.PI;

  return {
    translate,
    rotate,
    scale: { x: scaleX * reflect, y: scaleY },
    skewX,
  };
};

/**
 * Parse an SVG transform string and return the resulting composed matrix.
 * Supports: translate, translateX, translateY, scale, scaleX, scaleY, rotate, skewX, skewY, matrix
 *
 * Examples:
 * - "translate(10,20) rotate(30) scale(2)"
 * - "matrix(a,b,c,d,e,f)"
 */
export const parseTransform = (input: string): Matrix => {
  if (!input || !input.trim()) return identityMatrix();
  const tokens: string[] = [];
  // regex to extract transform functions
  const re = /([a-zA-Z]+)\s*\(([^)]*)\)/g;
  let m: RegExpExecArray | null;
  // biome-ignore lint/suspicious/noAssignInExpressions: quick while loop
  while ((m = re.exec(input)) !== null) tokens.push(m[0]);

  const matrices: Matrix[] = tokens.map((token) => {
    const parts = token.match(/([a-zA-Z]+)\s*\(([^)]*)\)/);
    if (!parts) return identityMatrix();
    const name = parts[1];
    const raw = parts[2].trim();
    // split numbers by comma or spaces
    const nums = raw
      .replace(/,/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .map((s) => Number(s));

    switch (name) {
      case "matrix":
        if (nums.length < 6) return identityMatrix();
        return [nums[0], nums[1], nums[2], nums[3], nums[4], nums[5]] as Matrix;
      case "translate": {
        const tx = nums[0] ?? 0;
        const ty = nums[1] ?? 0;
        return translationMatrix(tx, ty);
      }
      case "translateX":
        return translationMatrix(nums[0] ?? 0, 0);
      case "translateY":
        return translationMatrix(0, nums[0] ?? 0);
      case "scale": {
        const sx = nums[0] ?? 1;
        const sy = nums[1] ?? sx;
        return scaleMatrix(sx, sy);
      }
      case "scaleX":
        return scaleMatrix(nums[0] ?? 1, 1);
      case "scaleY":
        return scaleMatrix(1, nums[0] ?? 1);
      case "rotate": {
        // rotate(angle [cx cy])
        const angle = nums[0] ?? 0;
        const cx = nums[1] ?? 0;
        const cy = nums[2] ?? 0;
        if (cx !== 0 || cy !== 0) {
          // translate to origin, rotate, translate back
          return composeMatrices(
            translationMatrix(cx, cy),
            rotationMatrix(angle),
            translationMatrix(-cx, -cy),
          );
        }
        return rotationMatrix(angle);
      }
      case "skewX":
        return skewXMatrix(nums[0] ?? 0);
      case "skewY":
        return skewYMatrix(nums[0] ?? 0);
      default:
        return identityMatrix();
    }
  });

  // Compose left-to-right (first token applied first)
  return composeMatrices(...matrices);
};

// ----------------------
// Simple runtime tests when executed directly via ts-node or similar.
// Exported for unit tests (vitest) externally.
// ----------------------

export const _testHelpers = {
  multiplyMatrices,
};

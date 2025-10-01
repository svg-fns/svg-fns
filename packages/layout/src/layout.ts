// @svg-fns/layout
// TypeScript implementation of low-level SVG layout utilities (viewBox, cropping, pan & zoom)
// Focus: accuracy, DX, efficiency — non-opinionated building blocks for higher-level ops.

import type { Matrix, Padding, Point, Rect } from "@svg-fns/types";
import { isValidRect, roundIf, toPadding, unionRects } from "@svg-fns/utils";

// --- ViewBox helpers ---

/**
 * Parse a `viewBox` string into a rect.
 *
 * @param vb viewBox attribute string
 * @returns Rect or null if invalid
 * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
 */
export const parseViewBox = (vb: string | null): Rect | null => {
  if (!vb) return null;
  const parts = vb
    .trim()
    .split(/[\s,]+/)
    .map(Number)
    .filter(Number.isFinite);
  if (parts.length < 4) return null;
  const [x, y, width, height] = parts;
  return { x, y, width, height };
};

/**
 * Read current viewBox of an SVG.
 *
 * @param svg SVG element
 * @returns Rect or null
 */
export const getViewBox = (svg: SVGSVGElement): Rect | null =>
  parseViewBox(svg.getAttribute("viewBox"));

/**
 * Set SVG viewBox (and optionally preserveAspectRatio).
 *
 * @param svg SVG element
 * @param rect Rect to set
 * @param opts Options (round, preserveAspectRatio)
 */
export const setViewBox = (
  svg: SVGSVGElement,
  { x, y, height, width }: Rect,
  opts?: { preserveAspectRatio?: string; round?: boolean },
): void => {
  svg.setAttribute(
    "viewBox",
    [x, y, width, height]
      .map((dimension) => roundIf(dimension, opts?.round))
      .join(" "),
  );
  if (opts?.preserveAspectRatio)
    svg.setAttribute("preserveAspectRatio", opts.preserveAspectRatio);
};

/**
 * Parse dimension string into pixels where possible.
 * - Supports: unitless, px, vh, vw (requires `window`)
 * - Supports: em, rem (requires optional `fontSize` context)
 * - Throws on unsupported units or missing context
 *
 * @param v Attribute string
 * @param context Optional: { fontSize?: number } for em/rem
 * @returns number in px, or null if empty
 */
export const parseDimension = (
  v: string | null,
  context?: { fontSize?: number },
): number | null => {
  if (!v) return null;

  const n = parseFloat(v);
  if (!Number.isFinite(n)) return null;

  if (/^[0-9.+-]+(?:px)?$/.test(v)) return n;

  if (v.endsWith("vw")) {
    if (typeof window === "undefined")
      throw new Error("Cannot resolve vw without window");
    return (n / 100) * window.innerWidth;
  }

  if (v.endsWith("vh")) {
    if (typeof window === "undefined")
      throw new Error("Cannot resolve vh without window");
    return (n / 100) * window.innerHeight;
  }

  if (v.endsWith("em") || v.endsWith("rem")) {
    const fs =
      context?.fontSize ??
      parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (!Number.isFinite(fs))
      throw new Error(`Cannot resolve ${v} without font size context`);
    return n * fs;
  }

  throw new Error(`Unsupported or unknown unit in dimension: "${v}"`);
};

/**
 * Read width/height attributes.
 *
 * @param svg SVG element
 * @returns { width, height } or nulls
 */
export const getDimensions = (
  svg: SVGSVGElement,
  context?: { fontSize?: number },
): { width: number | null; height: number | null } => {
  return {
    width: parseDimension(svg.getAttribute("width"), context),
    height: parseDimension(svg.getAttribute("height"), context),
  };
};

/**
 * Update width/height attributes.
 *
 * @param svg SVG element
 * @param width New width (optional)
 * @param height New height (optional)
 */
export const updateDimensions = (
  svg: SVGSVGElement,
  width?: number | null,
  height?: number | null,
): void => {
  if (width !== undefined && width !== null)
    svg.setAttribute("width", String(width));
  if (height !== undefined && height !== null)
    svg.setAttribute("height", String(height));
};

// --- Content bbox calculation ---

/**
 * Compute the bounding box of an SVG element with its current transform matrix applied.
 *
 * Unlike `element.getBBox()`, which ignores transforms (scale, rotate, translate),
 * this function projects the element's local bounding box into the SVG's coordinate
 * system by applying the element's `CTM` (current transformation matrix).
 *
 * @param el - Any SVGGraphicsElement (e.g., <path>, <text>, <rect>, <g>, <image>, …)
 * @returns The transformed bounding box as { x, y, width, height }
 *
 * @example
 * ```ts
 * const svg = document.querySelector("svg")!;
 * const text = svg.querySelector("text")!;
 * const box = getBBoxWithTransform(text);
 * console.log(box); // Correct bounds, accounting for transform="scale(.1)"
 * ```
 *
 * @remarks
 * - Throws if the element does not support `getBBox()`.
 * - Returns the raw transformed box; if you need union across multiple elements,
 *   compose with a `unionRects` utility.
 */
export const getBBoxWithTransform = (el: SVGGraphicsElement): Rect => {
  try {
    const localBox = el.getBBox();
    const ctm = el.getCTM();
    if (!ctm) return localBox; // no transform → fallback

    const corners = [
      new DOMPoint(localBox.x, localBox.y),
      new DOMPoint(localBox.x + localBox.width, localBox.y),
      new DOMPoint(localBox.x, localBox.y + localBox.height),
      new DOMPoint(localBox.x + localBox.width, localBox.y + localBox.height),
    ].map((p) => p.matrixTransform(ctm));

    const xs = corners.map((p) => p.x);
    const ys = corners.map((p) => p.y);

    const bbox = {
      x: Math.min(...xs),
      y: Math.min(...ys),
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
    };
    if (!isValidRect(bbox)) throw new Error("Invalid rect");
    return bbox;
  } catch (err) {
    console.debug("Error computing bbox with transform", el, err);
    return { x: 0, y: 0, width: 0, height: 0 };
  }
};

/**
 * Compute a tight bounding box of SVG content.
 * - Starts with root <svg> getBBox()
 * - Optionally expands to children that extend beyond root
 *
 * @param svg The SVG element to compute content bounds for
 * @param clipToViewBox If true, only use root <svg> bbox
 * @returns Rect bounding all visible graphics
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox
 */
export const getContentBBox = (
  svg: SVGSVGElement,
  clipToViewBox = false,
): Rect => {
  let bbox: Rect = getBBoxWithTransform(svg);

  if (!clipToViewBox) {
    for (const el of svg.querySelectorAll<SVGGraphicsElement>(
      "g, use, path, rect, circle, ellipse, line, polygon, polyline, text, image",
    )) {
      bbox = unionRects(bbox, getBBoxWithTransform(el));
    }
  }

  return bbox;
};

/**
 * Compute trim box (tight content box + padding).
 *
 * @param svg SVG element
 * @param padding Padding
 * @returns @link {Rect}
 */
export const computeTrimBox = (
  svg: SVGSVGElement,
  padding: Padding = 0,
  clipToViewBox = false,
): Rect => {
  const content = getContentBBox(svg, clipToViewBox);
  const pad = toPadding(padding);
  return {
    x: content.x - pad.left,
    y: content.y - pad.top,
    width: content.width + pad.left + pad.right,
    height: content.height + pad.top + pad.bottom,
  };
};

/**
 * Tightly crop an SVG to content.
 *
 * @param svg SVG element
 * @param opts Options (padding, mutate, preserveDimensions, round)
 * @returns { box, apply } where apply() applies crop
 */
export const tightlyCropSvg = (
  svg: SVGSVGElement,
  opts?: {
    padding?: Padding;
    mutate?: boolean;
    preserveDimensions?: boolean;
    round?: boolean;
    clipToViewBox?: boolean;
  },
): { box: Rect; apply: (target?: SVGSVGElement) => SVGSVGElement } => {
  const padding = opts?.padding ?? 0;
  const box = computeTrimBox(svg, padding, opts?.clipToViewBox);
  const apply = (target: SVGSVGElement = svg) => {
    setViewBox(target, box, { round: opts?.round });
    if (!opts?.preserveDimensions)
      updateDimensions(target, box.width, box.height);
    return target;
  };

  if (opts?.mutate ?? true) apply(svg);
  return { box, apply };
};

// --- Pan & Zoom (viewBox-based) ---

/**
 * Translate current viewBox.
 *
 * @param svg SVG element
 * @param dx Delta x
 * @param dy Delta y
 * @param opts Options (mutate, round)
 */
export const translateViewBox = (
  svg: SVGSVGElement,
  dx: number,
  dy: number,
  opts?: { mutate?: boolean; round?: boolean },
): Rect | null => {
  const vb = getViewBox(svg);
  if (!vb) return null;
  const newRect: Rect = {
    x: vb.x + dx,
    y: vb.y + dy,
    width: vb.width,
    height: vb.height,
  };
  if (opts?.mutate ?? true) setViewBox(svg, newRect, { round: opts?.round });
  return newRect;
};

/**
 * Scale (zoom) current viewBox.
 *
 * @param svg SVG element
 * @param factor Zoom factor (>0)
 * @param cx Optional center x
 * @param cy Optional center y
 * @param opts Options (mutate, round)
 */
export const scaleViewBox = (
  svg: SVGSVGElement,
  factor: number,
  cx?: number,
  cy?: number,
  opts?: { mutate?: boolean; round?: boolean },
): Rect | null => {
  if (!Number.isFinite(factor) || factor <= 0)
    throw new Error("factor must be > 0");
  const vb = getViewBox(svg);
  if (!vb) return null;
  const centerX = (Number.isFinite(cx) ? cx : vb.x + vb.width / 2) as number;
  const centerY = (Number.isFinite(cy) ? cy : vb.y + vb.height / 2) as number;
  const newW = vb.width / factor;
  const newH = vb.height / factor;
  const newX = centerX - (centerX - vb.x) / factor;
  const newY = centerY - (centerY - vb.y) / factor;
  const newRect: Rect = { x: newX, y: newY, width: newW, height: newH };
  if (opts?.mutate ?? true) setViewBox(svg, newRect, { round: opts?.round });
  return newRect;
};

/**
 * Apply affine matrix to a point.
 */
const applyMatrixToPoint = (m: Matrix, p: Point): Point => ({
  x: m[0] * p.x + m[2] * p.y + m[4],
  y: m[1] * p.x + m[3] * p.y + m[5],
});

/**
 * Apply matrix transform to viewBox.
 *
 * @param svg SVG element
 * @param matrix Affine matrix
 * @param opts Options (mutate, round)
 */
export const setViewBoxTransform = (
  svg: SVGSVGElement,
  matrix: Matrix,
  opts?: { mutate?: boolean; round?: boolean },
): Rect | null => {
  const vb = getViewBox(svg);
  if (!vb) return null;
  const corners: Point[] = [
    { x: vb.x, y: vb.y },
    { x: vb.x + vb.width, y: vb.y },
    { x: vb.x, y: vb.y + vb.height },
    { x: vb.x + vb.width, y: vb.y + vb.height },
  ];
  const transformed = corners.map((c) => applyMatrixToPoint(matrix, c));
  const xs = transformed.map((p) => p.x);
  const ys = transformed.map((p) => p.y);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  const width = Math.max(...xs) - x;
  const height = Math.max(...ys) - y;
  const out: Rect = { x, y, width, height };
  if (opts?.mutate ?? true) setViewBox(svg, out, { round: opts?.round });
  return out;
};

// --- Convenience helpers ---

/**
 * Center viewBox around content center.
 *
 * @param svg SVG element
 * @param opts Options (mutate, round)
 */
export const centerSvg = (
  svg: SVGSVGElement,
  opts?: { mutate?: boolean; round?: boolean },
): Rect | null => {
  const content = getContentBBox(svg);
  const vb = getViewBox(svg) ?? {
    x: 0,
    y: 0,
    width: content.width,
    height: content.height,
  };
  const cx = content.x + content.width / 2;
  const cy = content.y + content.height / 2;
  const newX = cx - vb.width / 2;
  const newY = cy - vb.height / 2;
  const out: Rect = { x: newX, y: newY, width: vb.width, height: vb.height };
  if (opts?.mutate ?? true) setViewBox(svg, out, { round: opts?.round });
  return out;
};

/**
 * Fit content into target rect (preserve aspect ratio).
 *
 * @param svg SVG element
 * @param targetW Target width
 * @param targetH Target height
 * @param opts Options (mutate, padding, round)
 */
export const fitSvg = (
  svg: SVGSVGElement,
  targetW: number,
  targetH: number,
  opts?: { mutate?: boolean; padding?: Padding; round?: boolean },
): Rect | null => {
  const content = getContentBBox(svg);
  const pad = toPadding(opts?.padding ?? 0);
  const contentW = Math.max(1, content.width + pad.left + pad.right);
  const contentH = Math.max(1, content.height + pad.top + pad.bottom);
  const scale = Math.min(targetW / contentW, targetH / contentH);
  const vb = computeTrimBox(svg, opts?.padding ?? 0);
  const newW = vb.width / scale;
  const newH = vb.height / scale;
  const cx = vb.x + vb.width / 2;
  const cy = vb.y + vb.height / 2;
  const newRect: Rect = {
    x: cx - newW / 2,
    y: cy - newH / 2,
    width: newW,
    height: newH,
  };
  if (opts?.mutate ?? true) setViewBox(svg, newRect, { round: opts?.round });
  return newRect;
};

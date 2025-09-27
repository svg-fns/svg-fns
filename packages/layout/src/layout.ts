// @svg-fns/layout
// TypeScript implementation of low-level SVG layout utilities (viewBox, cropping, pan & zoom)
// Focus: accuracy, DX, efficiency — non-opinionated building blocks for higher-level ops.

export type Rect = { x: number; y: number; width: number; height: number };
export type Point = { x: number; y: number };

export type Padding =
  | number
  | { top: number; right: number; bottom: number; left: number };

export type Matrix = {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
};

const toPadding = (
  p: Padding = 0,
): { top: number; right: number; bottom: number; left: number } =>
  typeof p === "number" ? { top: p, right: p, bottom: p, left: p } : p;

const rectRight = (r: Rect) => r.x + r.width;
const rectBottom = (r: Rect) => r.y + r.height;

const unionRects = (a: Rect, b: Rect): Rect => {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  const right = Math.max(rectRight(a), rectRight(b));
  const bottom = Math.max(rectBottom(a), rectBottom(b));
  return { x, y, width: right - x, height: bottom - y };
};

const roundIf = (n: number, round = true) =>
  round ? Math.round(n * 1000) / 1000 : n;

// --- ViewBox helpers ---

/**
 * Parse a viewBox string into a Rect, or null if missing/invalid.
 */
export const parseViewBox = (vb: string | null): Rect | null => {
  if (!vb) return null;
  const parts = vb
    .trim()
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
  if (parts.length < 4) return null;
  const [x, y, width, height] = parts;
  return { x, y, width, height };
};

/**
 * Read the current viewBox on an SVG element. Returns null if none is set.
 */
export const getViewBox = (svg: SVGSVGElement): Rect | null =>
  parseViewBox(svg.getAttribute("viewBox"));

/**
 * Force-set the viewBox on the SVG element.
 * Mutates the element.
 */
export const setViewBox = (
  svg: SVGSVGElement,
  rect: Rect,
  opts?: { preserveAspectRatio?: string; round?: boolean },
): void => {
  const round = opts?.round ?? true;
  svg.setAttribute(
    "viewBox",
    `${roundIf(rect.x, round)} ${roundIf(rect.y, round)} ${roundIf(rect.width, round)} ${roundIf(rect.height, round)}`,
  );
  if (opts?.preserveAspectRatio)
    svg.setAttribute("preserveAspectRatio", opts.preserveAspectRatio);
};

const parseDimension = (v: string | null) => {
  if (!v || v.endsWith("%")) return null;
  const n = parseFloat(v.replace(/px$/, ""));
  return Number.isFinite(n) ? n : null;
};
/**
 * Read width/height attributes (as numbers) if present. Returns null for missing/percentage values.
 */
export const getDimensions = (
  svg: SVGSVGElement,
): { width: number | null; height: number | null } => {
  const w = svg.getAttribute("width");
  const h = svg.getAttribute("height");

  return { width: parseDimension(w), height: parseDimension(h) };
};

/**
 * Update width/height attributes. If a value is null/undefined it's left unchanged.
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

export const isValidRect = ({ x, y, width, height }: Rect | DOMRect) =>
  [x, y, width, height].every(Number.isFinite);

// --- Content bbox calculation ---

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
  let bbox: Rect;
  try {
    bbox = svg.getBBox();
  } catch {
    bbox = { x: 0, y: 0, width: 0, height: 0 };
  }

  if (!clipToViewBox) {
    for (const el of svg.querySelectorAll(
      "g, use, path, rect, circle, ellipse, line, polygon, polyline, text",
    ) as NodeListOf<SVGGraphicsElement>) {
      try {
        const elBBox = el.getBBox();
        if (isValidRect(elBBox)) {
          bbox = unionRects(bbox, elBBox);
        }
      } catch {
        // Ignore elements that throw
      }
    }
  }

  return bbox;
};

/**
 * Compute the tight cropping rectangle (in SVG user coordinates) around visible content, plus optional padding.
 * Does not mutate the SVG.
 */
export const computeTrimBox = (
  svg: SVGSVGElement,
  padding: Padding = 0,
): Rect => {
  const content = getContentBBox(svg);
  const pad = toPadding(padding);
  return {
    x: content.x - pad.left,
    y: content.y - pad.top,
    width: content.width + pad.left + pad.right,
    height: content.height + pad.top + pad.bottom,
  };
};

/**
 * Tightly crop ("trim") an SVG's viewBox to its content.
 * - By default mutates the provided SVG.
 * - Returns the computed box and an apply() helper if you prefer manual apply.
 */
export const tightlyCropSvg = (
  svg: SVGSVGElement,
  opts?: {
    padding?: Padding;
    mutate?: boolean;
    preserveDimensions?: boolean;
    round?: boolean;
  },
): { box: Rect; apply: (target?: SVGSVGElement) => SVGSVGElement } => {
  const padding = opts?.padding ?? 0;
  const box = computeTrimBox(svg, padding);
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
 * Translate the current viewBox by dx,dy (user coordinate units). Mutates by default.
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
 * Scale (zoom) the viewBox by `factor` around an optional center (cx,cy) in user coordinates.
 * - factor > 1 => zoom in (smaller viewBox w/h)
 * - factor < 1 => zoom out
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

const applyMatrixToPoint = (m: Matrix, p: Point): Point => ({
  x: m.a * p.x + m.c * p.y + m.e,
  y: m.b * p.x + m.d * p.y + m.f,
});

/**
 * Apply an affine matrix to the viewBox. The viewBox will be set to the bounding box of the
 * transformed original viewBox corners. This can produce skew/shear.
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
 * Align content to center by adjusting viewBox (keeps width/height, recenters the viewBox around content center)
 */
export const centerSvg = (
  svg: SVGSVGElement,
  opts?: { mutate?: boolean; round?: boolean },
): Rect | null => {
  const content = getContentBBox(svg);
  const vb = getViewBox(svg) ?? {
    x: 0,
    y: 0,
    width: content.width || 0 || 100,
    height: content.height || 0 || 100,
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
 * Fit SVG content into the given width/height (in SVG user coords) while preserving aspect ratio.
 * Mutates by default.
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

export default {
  parseViewBox,
  getViewBox,
  setViewBox,
  getWidthHeight: getDimensions,
  updateDimensions,
  getContentBBox,
  computeTrimBox,
  tightlyCropSvg,
  translateViewBox,
  scaleViewBox,
  setViewBoxTransform,
  centerSvg,
  fitSvg,
};

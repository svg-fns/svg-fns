/**
 * @packageDocumentation
 * @module @svg-fns/info
 *
 * @overview
 * High-performance, tree-shakeable utilities to extract **information** from SVG elements.
 * Works in both **browser** and **Node.js** (with a DOM shim like JSDOM).
 *
 * 👉 Note: These functions require an **SVG element**.
 * If you have an SVG string, first parse it with `{ parseSvg } from @svg-fns/io`.
 *
 * ## Features
 * - Get dimensions and aspect ratio
 * - Compute bounding boxes
 * - Extract unique fill and stroke colors
 *
 * Designed for:
 * - **Web apps** (e.g. dynamic chart exports, previews)
 * - **Node pipelines** (e.g. image processing, build tools)
 * - **AI/automation workflows** needing structured SVG metadata
 */

/**
 * Get the width and height of an SVG element.
 *
 * - Uses `width`/`height` attributes when available.
 * - Falls back to `viewBox` if explicit dimensions are missing.
 * - Returns `{ width: number, height: number }`.
 *
 * @example
 * ```ts
 * const { width, height } = getSvgDimensions(svgElement);
 * ```
 *
 * @param svg - An `SVGSVGElement` instance.
 */
export const getSvgDimensions = (svg: SVGSVGElement) => {
  const width = parseFloat(svg.getAttribute("width") || "0");
  const height = parseFloat(svg.getAttribute("height") || "0");

  if (width && height) return { width, height };

  const viewBox = svg.getAttribute("viewBox");
  if (viewBox) {
    const [, , w, h] = viewBox.split(" ").map(parseFloat);
    return { width: w, height: h };
  }

  return { width: 0, height: 0 };
};

/**
 * Get the aspect ratio (width ÷ height) of an SVG element.
 *
 * - Derived from `getSvgDimensions`.
 * - Returns `1` if height is zero or missing.
 *
 * @example
 * ```ts
 * const ratio = getSvgAspectRatio(svgElement); // e.g. 1.777...
 * ```
 *
 * @param svg - An `SVGSVGElement` instance.
 */
export const getSvgAspectRatio = (svg: SVGSVGElement) => {
  const { width, height } = getSvgDimensions(svg);
  return height ? width / height : Infinity;
};

const isFiniteNumber = Number.isFinite;
/**
 * Get the bounding box of an SVG element and its children.
 *
 * - In browsers, uses the native `getBBox()` API.
 * - In Node.js, approximates by traversing child elements.
 * - Returns `{ x, y, width, height }`.
 *
 * @example
 * ```ts
 * const bbox = getSvgBBox(svgElement);
 * console.log(bbox.width, bbox.height);
 * ```
 *
 * @param svg - An `SVGSVGElement` instance.
 */
export const getSvgBBox = (svg: SVGSVGElement) => {
  if (typeof window !== "undefined" && svg.getBBox) {
    return svg.getBBox();
  }

  // Node.js fallback approximation
  let xMin = Infinity,
    yMin = Infinity,
    xMax = -Infinity,
    yMax = -Infinity;

  const traverse = (el: Element) => {
    const bbox =
      typeof (el as SVGGraphicsElement).getBBox === "function"
        ? (el as SVGGraphicsElement).getBBox()
        : { x: 0, y: 0, width: 0, height: 0 };

    xMin = Math.min(xMin, bbox.x);
    yMin = Math.min(yMin, bbox.y);
    xMax = Math.max(xMax, bbox.x + bbox.width);
    yMax = Math.max(yMax, bbox.y + bbox.height);

    Array.from(el.children).forEach(traverse);
  };

  traverse(svg);

  return {
    x: isFiniteNumber(xMin) ? xMin : 0,
    y: isFiniteNumber(yMin) ? yMin : 0,
    width: isFiniteNumber(xMax - xMin) ? xMax - xMin : 0,
    height: isFiniteNumber(yMax - yMin) ? yMax - yMin : 0,
  };
};

/**
 * Extract all unique fill and stroke colors used in an SVG element.
 *
 * - Scans recursively through all child elements.
 * - Ignores `fill="none"` and `stroke="none"`.
 * - Returns `{ fills: string[], strokes: string[] }`.
 *
 * @example
 * ```ts
 * const { fills, strokes } = getSvgColors(svgElement);
 * console.log(fills); // ['#000', '#f00']
 * ```
 *
 * @param svg - An `SVGSVGElement` instance.
 */
export const getSvgColors = (svg: SVGSVGElement) => {
  const fills = new Set<string>();
  const strokes = new Set<string>();

  const traverse = (el: Element) => {
    const fill = el.getAttribute("fill");
    const stroke = el.getAttribute("stroke");

    if (fill && fill !== "none") fills.add(fill);
    if (stroke && stroke !== "none") strokes.add(stroke);

    Array.from(el.children).forEach(traverse);
  };

  traverse(svg);

  return {
    fills: Array.from(fills),
    strokes: Array.from(strokes),
  };
};

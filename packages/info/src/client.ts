import { isValidColor } from "@svg-fns/utils";

/**
 * @packageDocumentation
 * @module @svg-fns/info
 *
 * High-performance, tree-shakeable utilities to extract structured **information** from SVG elements.
 * Works in both **browser** and **Node.js** (with a DOM shim like JSDOM).
 *
 * 👉 If you have an SVG string, first parse it with `{ parseSvg }` from `@svg-fns/io`.
 *
 * ## Features
 * - Get SVG dimensions and aspect ratio
 * - Compute bounding boxes (browser-native or Resvg fallback)
 * - Extract unique fill & stroke colors
 *
 * Designed for:
 * - **Web apps** (chart exports, previews)
 * - **Build pipelines** (image processing, asset analysis)
 * - **AI/automation workflows** (structured SVG metadata extraction)
 */

/**
 * Get the width and height of an SVG element.
 *
 * - Prefers explicit `width` / `height` attributes.
 * - Falls back to `viewBox` if dimensions are missing.
 *
 * @example
 * ```ts
 * const { width, height } = getSvgDimensions(svgElement);
 * ```
 */
export const getSvgDimensions = (svg: SVGSVGElement) => {
  const width = parseFloat(svg.getAttribute("width") || "0");
  const height = parseFloat(svg.getAttribute("height") || "0");

  if (width && height) return { width, height };

  const viewBox = svg.getAttribute("viewBox");
  if (viewBox) {
    const [, , w, h] = viewBox.split(/[\s,]+/).map(parseFloat);
    return { width: w, height: h };
  }

  return { width: 0, height: 0 };
};

/**
 * Get the aspect ratio (`width ÷ height`) of an SVG element.
 *
 * - Uses `getSvgDimensions` internally.
 * - Returns `Infinity` if height is `0`.
 *
 * @example
 * ```ts
 * const ratio = getSvgAspectRatio(svgElement); // e.g. 1.777...
 * ```
 */
export const getSvgAspectRatio = (svg: SVGSVGElement) => {
  const { width, height } = getSvgDimensions(svg);
  return height ? width / height : Infinity;
};

/**
 * Extract fill & stroke colors using computed styles (browser only) - high fidelity.
 */
export const getSvgColors = (svg: SVGSVGElement) => {
  const fills = new Set<string>();
  const strokes = new Set<string>();
  const elements = [svg, ...Array.from(svg.querySelectorAll<SVGElement>("*"))];

  elements.forEach((el) => {
    const style = window.getComputedStyle(el);
    const fill = style.getPropertyValue("fill");
    const stroke = style.getPropertyValue("stroke");
    if (isValidColor(fill)) fills.add(fill);
    if (isValidColor(stroke)) strokes.add(stroke);
  });

  return {
    fills: [...fills],
    strokes: [...strokes],
    colors: [...new Set([...fills, ...strokes])],
  };
};

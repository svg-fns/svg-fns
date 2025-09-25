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
 * Compute a bounding box using `@resvg/resvg-js`.
 *
 * - Accurate and transformation-aware.
 * - Async import — always returns a `Promise<DOMRect>`.
 *
 * @internal Exported for advanced users.
 */
export const getSvgBBoxResvg = (svg: SVGSVGElement): Promise<DOMRect> => {
  return import("@resvg/resvg-js").then(({ Resvg }) => {
    const resvg = new Resvg(svg.outerHTML);
    const bbox = resvg.getBBox();
    return bbox
      ? new DOMRect(bbox.x, bbox.y, bbox.width, bbox.height)
      : new DOMRect(0, 0, 0, 0);
  });
};

/**
 * Compute a rough bounding box approximation by recursively traversing children.
 *
 * - Uses `getBBox()` where available.
 * - Returns `{0,0,0,0}` for elements without geometry.
 *
 * @internal Exported for advanced users.
 */
export const getSvgBBoxApproximation = (svg: SVGSVGElement): DOMRect => {
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

  return new DOMRect(
    Number.isFinite(xMin) ? xMin : 0,
    Number.isFinite(yMin) ? yMin : 0,
    Number.isFinite(xMax - xMin) ? xMax - xMin : 0,
    Number.isFinite(yMax - yMin) ? yMax - yMin : 0,
  );
};

/**
 * Get the bounding box of an SVG element and its children.
 *
 * - **Browser:** Uses native `getBBox()` (accurate, sync).
 * - **Node.js with `@resvg/resvg-js`:** Uses the Rust engine for accuracy.
 * - **Node.js without Resvg:** Falls back to recursive approximation.
 *
 * ⚠️ Always returns a `Promise<DOMRect>` for API consistency across environments.
 *
 * @example
 * ```ts
 * const bbox = await getSvgBBox(svgElement);
 * console.log(bbox.width, bbox.height);
 * ```
 */
export const getSvgBBox = async (svg: SVGSVGElement): Promise<DOMRect> => {
  if (typeof window !== "undefined" && typeof svg.getBBox === "function") {
    return svg.getBBox();
  }

  try {
    return await getSvgBBoxResvg(svg);
  } catch (error) {
    console.warn("[svg-fns/info] Resvg not available, using approximation.");
    console.debug(error);
    return getSvgBBoxApproximation(svg);
  }
};

/**
 * Extract fill & stroke colors using computed styles (browser only) - high fidelity.
 */
export const getSvgColorsBrowser = (svg: SVGSVGElement) => {
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

/**
 * Extract fill & stroke colors from attributes (Node.js fallback).
 */
export const getSvgColorsNode = (svg: SVGSVGElement) => {
  const fills = new Set<string>();
  const strokes = new Set<string>();
  const elements = [svg, ...Array.from(svg.querySelectorAll<SVGElement>("*"))];

  elements.forEach((el) => {
    const fill = el.getAttribute("fill");
    const stroke = el.getAttribute("stroke");
    if (isValidColor(fill)) fills.add(fill);
    if (isValidColor(stroke)) strokes.add(stroke);
  });

  return {
    fills: [...fills],
    strokes: [...strokes],
    colors: [...new Set([...fills, ...strokes])],
  };
};

/**
 * Extract all unique fill and stroke colors from an SVG element.
 *
 * - **Browser:** Uses computed styles (high fidelity).
 * - **Node.js:** Uses attributes (approximation).
 *
 * @example
 * ```ts
 * const { fills, strokes, colors } = getSvgColors(svgElement);
 * ```
 */
export const getSvgColors = (
  svg: SVGSVGElement,
): { fills: string[]; strokes: string[]; colors: string[] } =>
  typeof window !== "undefined"
    ? getSvgColorsBrowser(svg)
    : getSvgColorsNode(svg);

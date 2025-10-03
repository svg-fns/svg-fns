import {
  blobToDataURLBrowser,
  canvasToBlob,
  resolveDimensions,
} from "@svg-fns/utils";
import type { Options, SvgConversionResult } from "./types";
import { parseOptions } from "./utils";

/**
 * Convert SVG → Blob in the browser.
 *
 * @param svg - The SVG markup string.
 * @param opts - Conversion options {@link Options}.
 * @returns A promise resolving to {@link SvgConversionResult}. If format is `"svg"`, use `@svg-fns/info`, or `@svg-fns/geometry` to get SVG dimensions or to transform
 *
 * Notes:
 * - Prefers `OffscreenCanvas` for better performance; falls back to `<canvas>` if unavailable.
 * - If `format === "svg"` → returns the raw Blob; **width, height, scale are undefined**
 *   (no rasterization performed). Options like `fit` and `scale` are ignored.
 * - Ideal for client-side exports, downloads, and previews.
 */
export const svgToBlob = async (
  svg: string,
  opts?: Options,
): Promise<SvgConversionResult> => {
  const { format, quality, scale, background, fit, ...rest } =
    parseOptions(opts);

  const svgBlob = new Blob([svg], { type: "image/svg+xml" });
  if (format === "svg") {
    return { blob: svgBlob, format };
  }

  const svgUrl = await blobToDataURLBrowser(svgBlob);
  const img = new Image();
  img.src = svgUrl;
  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = rej;
  });

  const { width, height } = resolveDimensions(rest, img);

  const w = Math.round(width * scale);
  const h = Math.round(height * scale);

  const isOffscreenCanvas = typeof OffscreenCanvas !== "undefined";
  const canvas = isOffscreenCanvas
    ? new OffscreenCanvas(w, h)
    : Object.assign(document.createElement("canvas"), { width: w, height: h });

  const ctx = canvas.getContext("2d") as
    | CanvasRenderingContext2D
    | OffscreenCanvasRenderingContext2D;

  if (!ctx) throw new Error("[svgToBlob] Canvas context not available");

  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
  }

  if (fit === "fill" || !rest.width || !rest.height) {
    ctx.drawImage(img, 0, 0, w, h);
  } else {
    const scaleX = w / img.width;
    const scaleY = h / img.height;
    let scaleFactor: number;

    switch (fit) {
      case "cover":
        scaleFactor = Math.max(scaleX, scaleY);
        break;
      case "contain":
        scaleFactor = Math.min(scaleX, scaleY);
        break;
      case "inside":
        scaleFactor = Math.min(1, Math.min(scaleX, scaleY));
        break;
      case "outside":
        scaleFactor = Math.max(1, Math.max(scaleX, scaleY));
        break;
      default:
        scaleFactor = Math.min(scaleX, scaleY);
        break;
    }

    const dx = (w - img.width * scaleFactor) / 2;
    const dy = (h - img.height * scaleFactor) / 2;
    ctx.drawImage(
      img,
      dx,
      dy,
      img.width * scaleFactor,
      img.height * scaleFactor,
    );
  }

  const mimeType = `image/${format === "jpg" ? "jpeg" : format}`;
  try {
    const blob = await canvasToBlob(canvas, mimeType, quality);
    return { blob, width: w, height: h, format, scale };
  } catch {
    console.warn(
      `[svgToBlob] Format "${format}" unsupported. Falling back to PNG.`,
    );
    const blob = await canvasToBlob(canvas, "image/png", quality);
    return { blob, width: w, height: h, format: "png", scale };
  }
};

/**
 * Convert SVG → Data URL (Browser).
 *
 * @param svg - The SVG markup string.
 * @param opts - Conversion options {@link Options}.
 * @returns A promise resolving to {@link SvgConversionResult}. If format is `"svg"`, use `@svg-fns/info`, or `@svg-fns/geometry` to get SVG dimensions or to transform
 *
 * Encodes output as `data:image/...;base64,...` for direct embedding in:
 * - `<img>` tags
 * - CSS backgrounds
 * - DOCX documents (via {@link https://github.com/md2docx/mdast2docx mdast2docx})
 */
export const svgToDataUrl = async (
  svg: string,
  opts?: Options,
): Promise<SvgConversionResult> => {
  const res = await svgToBlob(svg, opts);
  if (res.blob) res.dataUrl = await blobToDataURLBrowser(res.blob);
  return res;
};

/**
 * Convert SVG → File Download (Browser).
 *
 *
 * @param svg - The SVG markup string.
 * @param filename - The output filename. Defaults to `"image"`.
 * @param opts - Conversion options {@link Options}.
 * @returns A promise resolving to {@link SvgConversionResult}. If format is `"svg"`, use `@svg-fns/info`, or `@svg-fns/geometry` to get SVG dimensions or to transform
 *
 * Downloads the SVG or rasterized image to the user's device.
 */
export const downloadSvg = async (
  svg: string | SVGSVGElement,
  filename?: string,
  opts?: Options,
): Promise<SvgConversionResult> => {
  const svgStr = typeof svg === "string" ? svg : svg.outerHTML;
  const res = await svgToBlob(svgStr, opts);

  if (!res.blob) {
    throw new Error("Failed to convert SVG to Blob");
  }

  const a = document.createElement("a");
  a.href = URL.createObjectURL(res.blob);
  a.download = filename?.includes(".")
    ? filename
    : `${filename ?? "image"}.${res.format}`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Delay revoke to ensure browser processes click
  setTimeout(() => URL.revokeObjectURL(a.href), 0);

  return res;
};

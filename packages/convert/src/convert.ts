import { blobToDataURLBrowser, canvasToBlob, parseOptions } from "./utils";

/**
 * Supported output formats for SVG conversion.
 * `avif` requires modern browsers or Node; falls back if unsupported.
 */
export type Format = "png" | "jpeg" | "webp" | "avif" | "svg";

/**
 * How the image should be resized to fit the target dimensions:
 *
 * - **cover**   → Scale to fully cover the box, cropping if necessary.
 * - **contain** → Scale to fit entirely inside the box, letterboxing if needed.
 * - **fill**    → Stretch to exactly match width/height, ignoring aspect ratio.
 * - **inside**  → Like "contain", but never upscale (only shrink if too large).
 * - **outside** → Like "cover", but never downscale (only grow if too small).
 */
export type Fit = "cover" | "contain" | "fill" | "inside" | "outside";

/**
 * Options to control SVG conversion output.
 */
export interface SvgConversionOptions {
  /** Output format. Defaults to "svg". */
  format?: Format;

  /** Output quality (0–1). Only applies to lossy formats like jpeg/webp. Default: 0.92 */
  quality?: number;

  /** Target width in pixels. Defaults to intrinsic SVG width. */
  width?: number;

  /** Target height in pixels. Defaults to intrinsic SVG height. */
  height?: number;

  /** Scaling factor for width/height. Useful for high-DPI rendering. Default: 1 */
  scale?: number;

  /** Fill background color (e.g., "#fff"). Useful for formats without transparency (jpeg). */
  background?: string;
  /**
   * How the image should be resized to fit the target dimensions:
   *
   * - **cover**   → Scale to fully cover the box, cropping if necessary.
   * - **contain** → Scale to fit entirely inside the box, letterboxing if needed.
   * - **fill**    → Stretch to exactly match width/height, ignoring aspect ratio.
   * - **inside**  → Like "contain", but never upscale (only shrink if too large).
   * - **outside** → Like "cover", but never downscale (only grow if too small).
   */
  fit?: Fit;
}

export type Options = SvgConversionOptions | Format | Fit | number;

/**
 * Converts an SVG string to a Blob (browser).
 * @param svg The SVG content as a string.
 * @param opts Conversion options.
 * @returns A Promise that resolves with a Blob representing the converted image.
 */
export const svgToBlob = async (svg: string, opts?: Options): Promise<Blob> => {
  const { format, quality, width, height, scale, background, fit } =
    parseOptions(opts);
  const svgBlob = new Blob([svg], { type: "image/svg+xml" });

  if (format === "svg") return svgBlob;

  const svgUrl = await blobToDataURLBrowser(svgBlob);
  const img = new Image();
  img.src = svgUrl;

  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = rej;
  });

  const w = Math.round((width ?? img.width) * scale);
  const h = Math.round((height ?? img.height) * scale);

  const isOffscreenCanvas = typeof OffscreenCanvas !== "undefined";
  const canvas = isOffscreenCanvas
    ? new OffscreenCanvas(w, h)
    : Object.assign(document.createElement("canvas"), { width: w, height: h });

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  // Optional background
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
  }

  // Handle fit options
  if (fit === "fill") {
    // Default stretch
    ctx.drawImage(img, 0, 0, w, h);
  } else {
    const scaleX = w / img.width;
    const scaleY = h / img.height;

    let scaleFactor: number;
    switch (fit) {
      case "cover":
        scaleFactor = Math.max(scaleX, scaleY); // cover fully, may crop
        break;
      case "contain":
        scaleFactor = Math.min(scaleX, scaleY); // fit inside, may letterbox
        break;
      case "inside":
        scaleFactor = Math.min(1, Math.min(scaleX, scaleY)); // shrink to fit, never upscale
        break;
      case "outside":
        scaleFactor = Math.max(1, Math.max(scaleX, scaleY)); // grow to cover, never downscale
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

  const mimeType = `image/${format}`;
  try {
    return await canvasToBlob(isOffscreenCanvas, canvas, mimeType, quality);
  } catch {
    console.warn(`[svgToBlob] Format ${format} not supported, falling back.`);
    return canvasToBlob(isOffscreenCanvas, canvas, undefined, quality);
  }
};

/**
 * Converts an SVG string to a Buffer (Node.js).
 * @param svg The SVG content as a string.
 * @param opts Conversion options.
 * @returns A Promise that resolves with a Node.js Buffer of the converted image.
 */
export const svgToBuffer = async (
  svg: string,
  opts?: Options,
): Promise<Buffer> => {
  const { format, quality, width, height, scale, background, fit } =
    parseOptions(opts);
  const sharp = await import("sharp");
  let pipeline = sharp.default(Buffer.from(svg));

  // Apply optional background
  if (background) pipeline = pipeline.flatten({ background });

  // Determine final width/height with scale
  const finalWidth = width ? Math.round(width * scale) : undefined;
  const finalHeight = height ? Math.round(height * scale) : undefined;

  if (finalWidth || finalHeight) {
    pipeline = pipeline.resize(finalWidth, finalHeight, {
      fit,
      background,
    });
  }

  return pipeline
    .toFormat(format, { quality: Math.round(quality * 100) })
    .toBuffer();
};

/**
 * Converts an SVG string to a Data URL in the browser.
 * @param svg SVG content.
 * @param opts Conversion options.
 * @returns A Promise resolving to a base64 Data URL.
 */
export const svgToDataUrlBrowser = async (
  svg: string,
  opts?: Options,
): Promise<string> => {
  const blob = await svgToBlob(svg, opts);
  return await blobToDataURLBrowser(blob);
};

/**
 * Converts an SVG string to a Data URL in Node.js.
 * @param svg SVG content.
 * @param opts Conversion options.
 * @returns A Promise resolving to a base64 Data URL.
 */
export const svgToDataUrlNode = async (
  svg: string,
  opts?: Options,
): Promise<string> => {
  const options = parseOptions(opts);
  const buffer = await svgToBuffer(svg, options);
  return `data:image/${options?.format ?? "svg"};base64,${buffer.toString("base64")}`;
};

/**
 * Converts an SVG string to a Data URL in either environment.
 * Detects server vs browser automatically.
 * @param svg SVG content.
 * @param opts Conversion options.
 * @returns A Promise resolving to a base64 Data URL.
 */
export const svgToDataUrl = async (
  svg: string,
  opts?: Options,
): Promise<string> => {
  const isServer =
    typeof window === "undefined" || typeof document === "undefined";
  return isServer
    ? svgToDataUrlNode(svg, opts)
    : svgToDataUrlBrowser(svg, opts);
};

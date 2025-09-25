import {
  blobToDataURLBrowser,
  canvasToBlob,
  isNode,
  resolveDimensions,
} from "@svg-fns/utils";
import { parseOptions } from "./utils";

/**
 * Supported output formats for SVG → image conversion.
 *
 * - **Raster**: `"png"`, `"jpeg"`, `"jpg"`, `"webp"`, `"avif"`
 * - **Vector**: `"svg"` (fastest, no quality loss)
 *
 * ⚠️ `"avif"` requires modern browsers or Node.js with AVIF support.
 * Falls back to `"png"` if unsupported.
 */
export type Format = "png" | "jpg" | "jpeg" | "webp" | "avif" | "svg";

/**
 * Strategies for fitting SVG into target dimensions.
 * - **cover**   → Fill box completely, cropping overflow.
 * - **contain** → Fit entirely inside, may letterbox.
 * - **fill**    → Stretch to match box exactly (ignore aspect ratio).
 * - **inside**  → Like contain, but never upscale.
 * - **outside** → Like cover, but never downscale.
 */
export type Fit = "cover" | "contain" | "fill" | "inside" | "outside";

/**
 * Options for SVG → image conversion.
 */
export interface SvgConversionOptions {
  /** Output format. Default: `"svg"`. */
  format?: Format;

  /** Quality factor (0–1). Applies only to lossy formats (`jpeg`/`webp`/`avif`). Default: `0.92`. */
  quality?: number;

  /** Target width in px. Default: intrinsic SVG width. */
  width?: number;

  /** Target height in px. Default: intrinsic SVG height. */
  height?: number;

  /** Scale factor applied to width/height. Default: `1`. */
  scale?: number;

  /** Background color (e.g. `"#fff"`). Recommended for non-transparent formats like `jpeg`. */
  background?: string;

  /**
   * Resizing mode:
   * - `"cover"`   → Fill box completely, crop overflow
   * - `"contain"` → Fit inside box, may letterbox
   * - `"fill"`    → Stretch to exact size, ignore aspect ratio
   * - `"inside"`  → Like contain, but never upscale
   * - `"outside"` → Like cover, but never downscale
   */
  fit?: Fit;
}

/** Shorthand option type: `SvgConversionOptions | Format | Fit | quality (0 - 1)`. */
export type Options = SvgConversionOptions | Format | Fit | number;

/**
 * Standardized result from all conversion functions.
 */
export interface SvgConversionResult {
  /** Blob (browser only). */
  blob?: Blob;
  /** Buffer (Node.js only). */
  buffer?: Buffer;
  /** Base64 data URL (works in all envs). */
  dataUrl?: string;
  /** Final width after resizing/scaling. */
  width?: number;
  /** Final height after resizing/scaling. */
  height?: number;
  /** Output format. */
  format: Format;
  /** Applied scale factor. */
  scale?: number;
}

/**
 * Convert SVG → Blob in the browser.
 *
 * @param svg - The SVG markup string.
 * @param opts - Conversion options (format, width, height, fit, etc.).
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
    const blob = await canvasToBlob(
      isOffscreenCanvas,
      canvas,
      mimeType,
      quality,
    );
    return { blob, width: w, height: h, format, scale };
  } catch {
    console.warn(
      `[svgToBlob] Format "${format}" unsupported. Falling back to PNG.`,
    );
    const blob = await canvasToBlob(
      isOffscreenCanvas,
      canvas,
      "image/png",
      quality,
    );
    return { blob, width: w, height: h, format: "png", scale };
  }
};

/**
 * Convert SVG → Buffer (Node.js).
 *
 * @param svg - The SVG markup string.
 * @param opts - Conversion options.
 * @returns A promise resolving to {@link SvgConversionResult}.
 *
 * Behavior:
 * - Uses `sharp` internally for fast rasterization.
 * - If both `width` and `height` are missing → infers from intrinsic SVG metadata.
 * - If only one is defined → computes the other using aspect ratio × scale factor.
 * - If `format === "svg"` → simply returns a raw `Buffer`.
 */
export const svgToBuffer = async (
  svg: string,
  opts?: Options,
): Promise<SvgConversionResult> => {
  try {
    const { format, quality, width, height, scale, background, fit } =
      parseOptions(opts);

    const svgBuffer = Buffer.from(svg);

    if (format === "svg") {
      return { buffer: svgBuffer, format };
    }

    const sharp = await import("sharp");
    let pipeline = sharp.default(svgBuffer);

    if (background) pipeline = pipeline.flatten({ background });

    let finalWidth = width;
    let finalHeight = height;

    if (!finalWidth || !finalHeight) {
      const meta = await pipeline.metadata();

      const dimensions = resolveDimensions({ width, height }, meta);
      finalHeight = dimensions.height;
      finalWidth = dimensions.width;
    }

    finalHeight = Math.round(finalHeight * scale);
    finalWidth = Math.round(finalWidth * scale);

    pipeline = pipeline.resize(finalWidth, finalHeight, { fit, background });

    const buffer = await pipeline
      .toFormat(format, { quality: Math.round(quality * 100) })
      .toBuffer();

    return { buffer, width: finalWidth, height: finalHeight, format, scale };
  } catch (err) {
    console.error(err);
    throw new Error("[svgToBuffer] Failed. Ensure `sharp` is installed.");
  }
};

/**
 * Convert SVG → Data URL (Browser).
 *
 * Encodes output as `data:image/...;base64,...` for direct embedding in:
 * - `<img>` tags
 * - CSS backgrounds
 * - DOCX documents (via {@link https://github.com/md2docx/mdast2docx mdast2docx})
 */
export const svgToDataUrlBrowser = async (
  svg: string,
  opts?: Options,
): Promise<SvgConversionResult> => {
  const res = await svgToBlob(svg, opts);
  if (res.blob) res.dataUrl = await blobToDataURLBrowser(res.blob);
  return res;
};

/**
 * Convert SVG → Data URL (Node.js / server).
 *
 * Encodes SVG or rasterized buffer as `data:image/...;base64,...`.
 * Supports server-side usage: SSR, APIs, CLI tools, or {@link https://github.com/md2docx/mdast2docx mdast2docx} pipelines.
 */
export const svgToDataUrlNode = async (
  svg: string,
  opts?: Options,
): Promise<SvgConversionResult> => {
  const options = parseOptions(opts);
  const res = await svgToBuffer(svg, options);
  if (res.buffer) {
    res.dataUrl = `data:image/${
      !options?.format || options.format === "svg" ? "svg+xml" : options?.format
    };base64,${res.buffer.toString("base64")}`;
  }
  return res;
};

/**
 * Convert SVG → Data URL (Universal).
 *
 * Auto-detects runtime (Browser vs Node.js).
 */
export const svgToDataUrl = async (
  svg: string,
  opts?: Options,
): Promise<SvgConversionResult> => {
  return isNode()
    ? svgToDataUrlNode(svg, opts)
    : svgToDataUrlBrowser(svg, opts);
};

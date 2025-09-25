import { isServer, resolveDimensions } from "@svg-fns/utils";
import { svgToDataUrl as svgToDataUrlBrowser } from "./client";
import type { Options, SvgConversionResult } from "./types";
import { parseOptions } from "./utils";

export * from "./types";

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
 * Convert SVG → Data URL (Server).
 *
 * Encodes SVG or rasterized buffer as `data:image/...;base64,...`.
 * Supports server-side usage: SSR, APIs, CLI tools, or {@link https://github.com/md2docx/mdast2docx mdast2docx} pipelines.
 */
export const svgToDataUrlServer = async (
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
 * Auto-detects runtime (Client vs server).
 */
export const svgToDataUrl = async (
  svg: string,
  opts?: Options,
): Promise<SvgConversionResult> => {
  return isServer()
    ? svgToDataUrlServer(svg, opts)
    : svgToDataUrlBrowser(svg, opts);
};

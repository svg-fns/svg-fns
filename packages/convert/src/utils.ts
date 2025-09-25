import type { Fit, Format, Options, SvgConversionOptions } from "./convert";

export const blobToDataURLBrowser = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export const canvasToBlob = (
  isOffscreenCanvas: boolean,
  canvas: OffscreenCanvas | HTMLCanvasElement,
  mimeType: string | undefined,
  quality: number,
): Promise<Blob> => {
  if (isOffscreenCanvas) {
    return (canvas as OffscreenCanvas).convertToBlob({
      type: mimeType,
      quality: Math.round(quality * 100),
    });
  } else {
    return new Promise((res, rej) => {
      (canvas as HTMLCanvasElement).toBlob?.(
        (blob) => {
          if (blob) res(blob);
          else rej(new Error("Canvas toBlob failed"));
        },
        mimeType,
        quality,
      );
    });
  }
};

export const DEFAULT_OPTIONS = {
  format: "svg" as Format,
  quality: 0.92,
  scale: 1,
  fit: "cover" as Fit,
};

export const parseOptions = (
  opts?: Options,
): typeof DEFAULT_OPTIONS & SvgConversionOptions => {
  if (typeof opts === "string" && /png|jpeg|webp|avif|svg/.test(opts)) {
    opts = {
      format: opts as Format,
    };
  } else if (typeof opts === "string") {
    opts = {
      fit: opts as Fit,
    };
  } else if (typeof opts === "number") {
    opts = {
      quality: opts,
    };
  }
  const options = { ...DEFAULT_OPTIONS, ...opts };
  options.quality =
    options.quality > 1 ? options.quality / 100 : options.quality;
  return options;
};

/**
 * Resolve final width and height for SVG/image conversion.
 *
 * - If both options.width and options.height are defined → use them.
 * - If both are missing → fallback to image dimensions.
 * - If only one is defined → calculate the other to preserve aspect ratio.
 *
 * @param options - Conversion options { width?, height? }.
 * @param imgDims - Intrinsic image dimensions { width, height }.
 * @returns Resolved { width, height } after applying scale.
 */
export const resolveDimensions = (
  options: { width?: number; height?: number },
  imgDims: { width: number; height: number },
) => {
  const { width, height } = options;
  const { width: imgW, height: imgH } = imgDims;

  const aspectRatio = imgW / imgH;
  let finalWidth: number;
  let finalHeight: number;

  if (width && height) {
    finalWidth = width;
    finalHeight = height;
  } else if (width) {
    finalWidth = width;
    finalHeight = width / aspectRatio;
  } else if (height) {
    finalWidth = height * aspectRatio;
    finalHeight = height;
  } else {
    finalWidth = imgW;
    finalHeight = imgH;
  }

  return { width: Math.round(finalWidth), height: Math.round(finalHeight) };
};

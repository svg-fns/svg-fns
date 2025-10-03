import type { Padding, Rect } from "@svg-fns/types";

/**
 * Convert a browser `Blob` into a base64 data URL.
 * @param blob - The Blob to convert
 * @returns A promise resolving to a data URL string
 */
export const blobToDataURLBrowser = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

/**
 * Convert a canvas to a Blob (supports OffscreenCanvas and HTMLCanvasElement).
 *
 * @param canvas - Canvas instance
 * @param mimeType - MIME type (e.g. "image/png")
 * @param quality - 0–1 quality for lossy formats
 * @returns A Promise resolving to a Blob
 */
export const canvasToBlob = (
  canvas: OffscreenCanvas | HTMLCanvasElement,
  mimeType: string | undefined,
  quality: number = 0.92,
): Promise<Blob> => {
  if (canvas instanceof OffscreenCanvas) {
    return canvas.convertToBlob({
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

/**
 * Normalize padding input into full edge object.
 *
 * @param p Padding shorthand (number or object)
 * @returns Padding object with top/right/bottom/left
 */
export const toPadding = (
  p: Padding = 0,
): { top: number; right: number; bottom: number; left: number } =>
  typeof p === "number" ? { top: p, right: p, bottom: p, left: p } : p;

/**
 * Rounds a number to 3 decimals by default.
 * - Enabled = true (default)
 * - Disable only for advanced/extreme cases
 */
export const roundIf = (n: number, round = true) =>
  round ? Math.round(n * 1000) / 1000 : n;

/**
 * Check if rect has finite coords.
 */
export const isValidRect = ({ x, y, width, height }: Rect | DOMRect) =>
  [x, y, width, height].every(Number.isFinite);

/**
 * Get right edge of a rect.
 */
export const rectRight = (r: Rect) => r.x + r.width;

/**
 * Get bottom edge of a rect.
 */
export const rectBottom = (r: Rect) => r.y + r.height;

/**
 * Compute union of two rects.
 *
 * @param a First rect
 * @param b Second rect
 * @returns Bounding rect covering both
 */
export const unionRects = (a: Rect, b: Rect): Rect => {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  const right = Math.max(rectRight(a), rectRight(b));
  const bottom = Math.max(rectBottom(a), rectBottom(b));
  return { x, y, width: right - x, height: bottom - y };
};

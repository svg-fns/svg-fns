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
 * @param isOffscreenCanvas - True if canvas is OffscreenCanvas
 * @param canvas - Canvas instance
 * @param mimeType - MIME type (e.g. "image/png")
 * @param quality - 0–1 quality for lossy formats
 * @returns A Promise resolving to a Blob
 */
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

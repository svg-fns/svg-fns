/**
 * Resolve final width and height for SVG/image conversion.
 *
 * - If both width and height are provided → use them
 * - If both missing → fallback to intrinsic dimensions
 * - If only one is defined → compute the other to preserve aspect ratio
 *
 * @param options - Conversion options { width?, height? }
 * @param imgDims - Intrinsic dimensions { width, height }
 * @returns Object with { width, height } rounded
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

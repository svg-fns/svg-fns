import type { Fit, Format, Options, SvgConversionOptions } from "./convert";

/** Default SVG conversion options */
export const DEFAULT_OPTIONS = {
  format: "svg" as Format,
  quality: 0.92,
  scale: 1,
  fit: "cover" as Fit,
};

/**
 * Normalize conversion options to a full object.
 *
 * Supports shorthand:
 * - String → format or fit
 * - Number → quality
 */
export const parseOptions = (
  opts?: Options,
): typeof DEFAULT_OPTIONS & SvgConversionOptions => {
  if (typeof opts === "string" && /png|jpeg|jpg|webp|avif|svg/.test(opts)) {
    opts = { format: opts as Format };
  } else if (typeof opts === "string") {
    opts = { fit: opts as Fit };
  } else if (typeof opts === "number") {
    opts = { quality: opts };
  }

  const options = { ...DEFAULT_OPTIONS, ...opts };
  options.quality =
    options.quality > 1 ? options.quality / 100 : options.quality;

  return options;
};

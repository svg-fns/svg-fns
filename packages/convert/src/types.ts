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
  /** Blob (Client only). */
  blob?: Blob;
  /** Buffer (Server only). */
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

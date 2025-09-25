/**
 * Validate whether a color string is meaningful.
 *
 * - Filters out `"none"`, `"transparent"`, CSS URL refs, and fully transparent rgba.
 */
export const isValidColor = (color: string | null): color is string =>
  !!color &&
  color.trim() !== "" &&
  color !== "none" &&
  color !== "transparent" &&
  !color.startsWith("url(") &&
  color !== "rgba(0, 0, 0, 0)";

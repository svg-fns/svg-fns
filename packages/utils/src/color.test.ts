import { describe, expect, it } from "vitest";
import { isValidColor } from "./color";

describe("isValidColor", () => {
  it("returns false for null or empty string", () => {
    expect(isValidColor(null)).toBe(false);
    expect(isValidColor("")).toBe(false);
    expect(isValidColor("   ")).toBe(false);
  });

  it("returns false for 'none' or 'transparent'", () => {
    expect(isValidColor("none")).toBe(false);
    expect(isValidColor("transparent")).toBe(false);
  });

  it("returns false for 'url(...)' patterns", () => {
    expect(isValidColor("url(#gradient)")).toBe(false);
    expect(isValidColor("url(http://example.com)")).toBe(false);
  });

  it("returns false for 'rgba(0, 0, 0, 0)'", () => {
    expect(isValidColor("rgba(0, 0, 0, 0)")).toBe(false);
  });

  it("returns true for valid colors", () => {
    expect(isValidColor("#fff")).toBe(true);
    expect(isValidColor("#123456")).toBe(true);
    expect(isValidColor("red")).toBe(true);
    expect(isValidColor("rgb(255,0,0)")).toBe(true);
    expect(isValidColor("rgba(255,0,0,1)")).toBe(true);
  });
});

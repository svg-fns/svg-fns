// io.test.ts
/** biome-ignore-all lint/suspicious/noExplicitAny: Unit tests */
import { describe, expect, it } from "vitest";
import { parseSvg, serializeSvg, unsafeParseSvg } from "./client";

// Vitest + JSDOM: simulates browser environment
describe("@svg-fns/io (browser)", () => {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle cx="5" cy="5" r="5"/></svg>`;

  it("parses SVG safely", () => {
    const el = parseSvg(svgString);
    expect(el.tagName).toBe("svg");
    expect(el.querySelector("circle")).toBeTruthy();
  });

  it("throws on invalid SVG (safe mode)", () => {
    expect(() => parseSvg("<div></div>")).toThrow(/Invalid SVG/);
  });

  it("parses SVG unsafely and sanitizes by default", () => {
    const dirty = `<svg><script>alert(1)</script><circle cx="5" cy="5" r="5" onload="evil()"/></svg>`;
    const el = unsafeParseSvg(dirty, {});
    expect(el.querySelector("script")).toBeNull(); // removed
    expect(el.querySelector("circle")?.getAttribute("onload")).toBeNull(); // stripped
  });

  it("serializes SVG back to string", () => {
    const el = parseSvg(svgString);
    const out = serializeSvg(el);
    expect(out).toContain("<svg");
    expect(out).toContain("circle");
  });
});

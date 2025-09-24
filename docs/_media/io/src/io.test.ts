// io.test.ts
/** biome-ignore-all lint/suspicious/noExplicitAny: Unit tests */
import { describe, expect, it } from "vitest";
import {
  loadSvg,
  parseSvg,
  parseSvgBrowser,
  serializeSvg,
  serializeSvgBrowser,
  unsafeParseSvg,
} from "./io";

// Vitest + JSDOM: simulates browser environment
describe("@svg-fns/io (browser)", () => {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle cx="5" cy="5" r="5"/></svg>`;

  it("parses SVG safely", () => {
    const el = parseSvgBrowser(svgString);
    expect(el.tagName).toBe("svg");
    expect(el.querySelector("circle")).toBeTruthy();
  });

  it("throws on invalid SVG (safe mode)", () => {
    expect(() => parseSvgBrowser("<div></div>")).toThrow(/Invalid SVG/);
  });

  it("parses SVG unsafely and sanitizes by default", () => {
    const dirty = `<svg><script>alert(1)</script><circle cx="5" cy="5" r="5" onload="evil()"/></svg>`;
    const el = unsafeParseSvg(dirty, {});
    expect(el.querySelector("script")).toBeNull(); // removed
    expect(el.querySelector("circle")?.getAttribute("onload")).toBeNull(); // stripped
  });

  it("serializes SVG back to string", () => {
    const el = parseSvgBrowser(svgString);
    const out = serializeSvgBrowser(el);
    expect(out).toContain("<svg");
    expect(out).toContain("circle");
  });

  it("universal parseSvg works in browser", () => {
    const el = parseSvg(svgString) as SVGElement;
    expect(el.tagName).toBe("svg");
  });

  it("universal serializeSvg works in browser", () => {
    const el = parseSvg(svgString) as SVGElement;
    const out = serializeSvg(el) as string;
    expect(out).toContain("<svg");
  });

  it("loadSvg from raw string", async () => {
    const el = await loadSvg(svgString);
    expect(el.tagName).toBe("svg");
  });

  it("loadSvg from URL (mock fetch)", async () => {
    const mockSvg = `<svg><rect width="5" height="5"/></svg>`;
    globalThis.fetch = async () =>
      new Response(mockSvg, { status: 200, statusText: "OK" });
    const el = await loadSvg(new URL("http://example.com/test.svg"));
    expect(el.querySelector("rect")).toBeTruthy();
  });

  it("loadSvg rejects invalid input", async () => {
    await expect(loadSvg(123 as any)).rejects.toThrow(/Unsupported/);
  });
});

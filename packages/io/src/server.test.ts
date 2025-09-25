// io.test.ts
/** biome-ignore-all lint/suspicious/noExplicitAny: Unit tests */
import { describe, expect, it } from "vitest";
import { loadSvg, parseSvg, serializeSvg } from "./server";

// Vitest + JSDOM: simulates browser environment
describe("@svg-fns/io", () => {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle cx="5" cy="5" r="5"/></svg>`;

  it("parses SVG safely", async ({ expect }) => {
    const el = await parseSvg(svgString);
    expect(el.tagName).toBe("svg");
    expect(el.querySelector("circle")).toBeTruthy();
  });

  it("throws on invalid SVG (safe mode)", () => {
    expect(() => parseSvg("<div></div>")).toThrow(/Invalid SVG/);
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

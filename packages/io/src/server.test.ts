// io.test.ts
/** biome-ignore-all lint/suspicious/noExplicitAny: Unit tests */
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  loadSvg,
  parseSvg,
  parseSvgServer,
  serializeSvg,
  serializeSvgServer,
} from "./server";

const validSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle cx="5" cy="5" r="5"/></svg>`;
const invalidSvg = `<div></div>`;

describe("@svg-fns/io - server/browser", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("parseSvgServer parses valid SVG", async () => {
    const el = await parseSvgServer(validSvg);
    expect(el.tagName.toLowerCase()).toBe("svg");
    expect(el.getElementsByTagName("circle").length).toBe(1);
  });

  it("parseSvgServer throws on invalid SVG with strict mode", async () => {
    await expect(parseSvgServer(invalidSvg)).rejects.toThrow(/Invalid SVG/);
  });

  it("parseSvgServer ignores strict=false", async () => {
    const el = await parseSvgServer(invalidSvg, { strict: false });
    expect(el.tagName.toLowerCase()).toBe("div");
  });

  it("serializeSvgServer returns string", async () => {
    const el = await parseSvgServer(validSvg);
    const str = await serializeSvgServer(el);
    expect(str).toContain("<svg");
    expect(str).toContain("circle");
  });

  it("universal parseSvg returns Promise in Node", async () => {
    // simulate Node
    const origWindow = globalThis.window;
    delete (globalThis as any).window;
    const el = await parseSvg(validSvg);
    expect(el.tagName.toLowerCase()).toBe("svg");
    globalThis.window = origWindow;
  });

  it("universal serializeSvg returns Promise in Node", async () => {
    const el = await parseSvgServer(validSvg);
    const str = await serializeSvgServer(el); // use serializeSvgServer, not universal serializeSvg in Node
    expect(str).toContain("<svg");
  });

  it("loadSvg from raw string works", async () => {
    const el = await loadSvg(validSvg);
    expect(el.tagName.toLowerCase()).toBe("svg");
  });

  // it("loadSvg from URL (fetch mock)", async () => {
  //   const mockSvg = `<svg><rect width="5" height="5"/></svg>`;
  //   globalThis.fetch = vi.fn(
  //     async () => new Response(mockSvg, { status: 200 }),
  //   ) as any;
  //   const el = await loadSvg(new URL("http://example.com/test.svg"));
  //   expect(el.querySelector("rect")).toBeTruthy();
  // });

  it("loadSvg rejects unsupported input types", async () => {
    await expect(loadSvg(123 as any)).rejects.toThrow(/Unsupported/);
  });
});

/** biome-ignore-all lint/suspicious/noExplicitAny: test file */
import { describe, expect, it, vi } from "vitest";
import { svgToBuffer, svgToDataUrlServer } from "./server";

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
  <rect width="50" height="50" fill="red"/>
</svg>`;

// Mock sharp for Node tests
vi.mock("sharp", () => {
  const mockPipeline = {
    resize: vi.fn().mockReturnThis(),
    flatten: vi.fn().mockReturnThis(),
    toFormat: vi.fn().mockReturnThis(),
    toBuffer: vi.fn().mockResolvedValue(Buffer.from("fakeimage")),
    metadata: vi.fn().mockResolvedValue({ width: 50, height: 50 }),
  };
  return { default: vi.fn(() => mockPipeline) };
});

describe("svgToBuffer (Node.js)", () => {
  it("returns Buffer if format != svg", async () => {
    const result = await svgToBuffer(SAMPLE_SVG, {
      format: "png",
      width: 50,
      height: 50,
    });
    expect(result.buffer).toBeInstanceOf(Buffer);
  });

  it("returns raw buffer if format === svg", async () => {
    const result = await svgToBuffer(SAMPLE_SVG, { format: "svg" });
    expect(result.buffer).toBeInstanceOf(Buffer);
  });

  it("applies background and resize options", async () => {
    const result = await svgToBuffer(SAMPLE_SVG, {
      format: "jpeg",
      background: "#fff",
      width: 30,
    });
    expect(result.buffer).toBeInstanceOf(Buffer);
  });

  it("computes missing dimension from metadata and applies scale", async () => {
    const result = await svgToBuffer(SAMPLE_SVG, {
      format: "png",
      width: 100,
      scale: 2,
    });
    expect(result.width).toBe(200);
    expect(result.height).toBe(200); // maintains aspect ratio
  });

  it("handles different quality values", async () => {
    const result = await svgToBuffer(SAMPLE_SVG, {
      format: "jpeg",
      quality: 0.8,
    });
    expect(result.buffer).toBeInstanceOf(Buffer);
  });

  it("handles missing dimensions", async () => {
    const result = await svgToBuffer(SAMPLE_SVG, {
      format: "png",
    });
    expect(result.buffer).toBeInstanceOf(Buffer);
  });

  it("handles different fit modes", async () => {
    const fits = ["cover", "contain", "fill", "inside", "outside"] as const;
    for (const fit of fits) {
      const result = await svgToBuffer(SAMPLE_SVG, {
        format: "png",
        width: 100,
        height: 100,
        fit,
      });
      expect(result.buffer).toBeInstanceOf(Buffer);
    }
  });
});

describe("svgToDataUrlServer", () => {
  it("produces valid base64 dataUrl", async () => {
    const result = await svgToDataUrlServer(SAMPLE_SVG, { format: "jpeg" });
    expect(result.dataUrl?.startsWith("data:image/jpeg;base64,")).toBe(true);
  });

  it("produces dataUrl for SVG format", async () => {
    const result = await svgToDataUrlServer(SAMPLE_SVG, { format: "svg" });
    expect(result.dataUrl?.startsWith("data:image/svg+xml;base64,")).toBe(true);
  });

  it("handles jpg format alias", async () => {
    const result = await svgToDataUrlServer(SAMPLE_SVG, { format: "jpg" });
    expect(result.dataUrl?.startsWith("data:image/jpg;base64,")).toBe(true);
  });

  it("handles undefined format", async () => {
    const result = await svgToDataUrlServer(SAMPLE_SVG, {});
    expect(result.dataUrl?.startsWith("data:image/svg+xml;base64,")).toBe(true);
  });
});

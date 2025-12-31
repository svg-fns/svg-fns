/** biome-ignore-all lint/suspicious/noExplicitAny: test file */
import { describe, expect, it } from "vitest";
import { svgToBlob, svgToDataUrl } from "./client";

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
  <rect width="50" height="50" fill="red"/>
</svg>`;

describe.concurrent("svgToBlob (client)", () => {
  it("returns SVG blob if format is svg", async () => {
    const result = await svgToBlob(SAMPLE_SVG, { format: "svg" });
    expect(result.blob).toBeInstanceOf(Blob);
    expect(result.width).toBeUndefined();
    expect(result.height).toBeUndefined();
  });

  it("returns raster blob with width/height/scale", async () => {
    const result = await svgToBlob(SAMPLE_SVG, {
      format: "png",
      width: 100,
      height: 50,
      scale: 2,
    });
    expect(result.blob).toBeInstanceOf(Blob);
    expect(result.width).toBe(200);
    expect(result.height).toBe(100);
    expect(result.scale).toBe(2);
  });

  it("applies background fill", async () => {
    const result = await svgToBlob(SAMPLE_SVG, {
      format: "jpeg",
      background: "#000",
    });
    expect(result.blob?.type).toBe("image/jpeg");
  });

  it("handles different formats", async () => {
    const formats = ["png", "jpeg", "webp"] as const;
    for (const format of formats) {
      const result = await svgToBlob(SAMPLE_SVG, { format });
      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.format).toBe(format);
    }
  });

  it("handles quality parameter", async () => {
    const result = await svgToBlob(SAMPLE_SVG, {
      format: "jpeg",
      quality: 0.5,
    });
    expect(result.blob).toBeInstanceOf(Blob);
  });

  it("handles scale without explicit dimensions", async () => {
    const result = await svgToBlob(SAMPLE_SVG, {
      format: "png",
      scale: 3,
    });
    expect(result.blob).toBeInstanceOf(Blob);
    expect(result.scale).toBe(3);
  });

  it.each([
    "fill",
    "cover",
    "contain",
    "inside",
    "outside",
  ])("renders correctly with fit=%s", async (fit) => {
    const result = await svgToBlob(SAMPLE_SVG, {
      format: "png",
      width: 80,
      height: 40,
      // @ts-expect-error -- it should be Fit but string
      fit,
    });
    expect(result.blob).toBeInstanceOf(Blob);
  });

  it("handles missing dimensions with fit modes", async () => {
    const result = await svgToBlob(SAMPLE_SVG, {
      format: "png",
      fit: "contain",
    });
    expect(result.blob).toBeInstanceOf(Blob);
  });

  it("handles only width specified", async () => {
    const result = await svgToBlob(SAMPLE_SVG, {
      format: "png",
      width: 100,
    });
    expect(result.blob).toBeInstanceOf(Blob);
    expect(result.width).toBe(100);
  });

  it("handles only height specified", async () => {
    const result = await svgToBlob(SAMPLE_SVG, {
      format: "png",
      height: 80,
    });
    expect(result.blob).toBeInstanceOf(Blob);
    expect(result.height).toBe(80);
  });
});

describe("svgToDataUrl", () => {
  it("produces valid base64 dataUrl", async () => {
    const result = await svgToDataUrl(SAMPLE_SVG, { format: "png" });
    expect(result.dataUrl?.startsWith("data:image/png;base64,")).toBe(true);
  });

  it("returns dataUrl for SVG format", async () => {
    const result = await svgToDataUrl(SAMPLE_SVG, { format: "svg" });
    expect(result.dataUrl?.startsWith("data:image/svg+xml;base64,")).toBe(true);
  });

  it("includes blob in result", async () => {
    const result = await svgToDataUrl(SAMPLE_SVG, { format: "png" });
    expect(result.blob).toBeInstanceOf(Blob);
    expect(result.dataUrl).toBeDefined();
  });

  it("handles different formats for dataUrl", async () => {
    const formats = ["png", "jpeg", "svg"] as const;
    for (const format of formats) {
      const result = await svgToDataUrl(SAMPLE_SVG, { format });
      expect(result.dataUrl).toBeDefined();
      expect(result.format).toBe(format);
    }
  });
});

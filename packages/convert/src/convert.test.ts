/** biome-ignore-all lint/suspicious/noExplicitAny: test file */
import { describe, expect, it, vi } from "vitest";
import {
  SvgConversionResult,
  svgToBlob,
  svgToBuffer,
  svgToDataUrlBrowser,
  svgToDataUrlNode,
} from "./convert";

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

describe.concurrent("svgToBlob (browser)", () => {
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

  it.each(["fill", "cover", "contain", "inside", "outside"])(
    "renders correctly with fit=%s",
    async (fit) => {
      const result = await svgToBlob(SAMPLE_SVG, {
        format: "png",
        width: 80,
        height: 40,
        // @ts-expect-error -- it should be Fit but string
        fit,
      });
      expect(result.blob).toBeInstanceOf(Blob);
    },
  );
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
});

describe("svgToDataUrlBrowser", () => {
  it("produces valid base64 dataUrl", async () => {
    const result = await svgToDataUrlBrowser(SAMPLE_SVG, { format: "png" });
    expect(result.dataUrl?.startsWith("data:image/png;base64,")).toBe(true);
  });

  it("returns dataUrl for SVG format", async () => {
    const result = await svgToDataUrlBrowser(SAMPLE_SVG, { format: "svg" });
    expect(result.dataUrl?.startsWith("data:image/svg+xml;base64,")).toBe(true);
  });
});

describe("svgToDataUrlNode", () => {
  it("produces valid base64 dataUrl", async () => {
    const result = await svgToDataUrlNode(SAMPLE_SVG, { format: "jpeg" });
    expect(result.dataUrl?.startsWith("data:image/jpeg;base64,")).toBe(true);
  });

  it("produces dataUrl for SVG format", async () => {
    const result = await svgToDataUrlNode(SAMPLE_SVG, { format: "svg" });
    expect(result.dataUrl?.startsWith("data:image/svg+xml;base64,")).toBe(true);
  });
});

describe("svgToDataUrl (universal)", () => {
  it("calls browser version when not Node", async () => {
    const result = await (await import("./convert")).svgToDataUrl(SAMPLE_SVG, {
      format: "png",
    });
    expect(result.dataUrl?.startsWith("data:image/png;base64,")).toBe(true);
  });
});

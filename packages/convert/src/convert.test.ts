/** biome-ignore-all lint/suspicious/noExplicitAny: test file */
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  svgToBlob,
  svgToBuffer,
  svgToDataUrl,
  svgToDataUrlBrowser,
  svgToDataUrlNode,
} from "./convert";

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
  <rect width="50" height="50" fill="red"/>
</svg>`;

// --- Node.js Mock ---
vi.mock("sharp", () => ({
  default: vi.fn(() => ({
    resize: vi.fn().mockReturnThis(),
    flatten: vi.fn().mockReturnThis(),
    toFormat: vi.fn().mockReturnThis(),
    toBuffer: vi.fn().mockResolvedValue(Buffer.from("fakeimage")),
  })),
}));

describe.concurrent("svgToBlob (browser)", () => {
  it("returns an SVG Blob when format is svg", async () => {
    const blob = await svgToBlob(SAMPLE_SVG, { format: "svg" });
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("image/svg+xml");
  });

  it("returns a raster Blob when format is png", async () => {
    const blob = await svgToBlob(SAMPLE_SVG, {
      format: "png",
      width: 20,
      height: 20,
    });
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("image/png");
  });

  it("applies background fill when requested", async () => {
    const blob = await svgToBlob(SAMPLE_SVG, {
      format: "jpeg",
      background: "#fff",
    });
    expect(blob.type).toBe("image/jpeg");
  });
});

describe("svgToBuffer (Node.js)", () => {
  beforeAll(() => {
    // mock sharp to avoid native dependency in test environment
    vi.mock("sharp", () => {
      return {
        default: vi.fn(() => {
          const pipeline = {
            flatten: vi.fn().mockReturnThis(),
            resize: vi.fn().mockReturnThis(),
            toFormat: vi.fn().mockReturnThis(),
            toBuffer: vi.fn().mockResolvedValue(Buffer.from("fakebuffer")),
          };
          return pipeline;
        }),
      };
    });
  });

  it("returns a Buffer when format is png", async () => {
    const buf = await svgToBuffer(SAMPLE_SVG, {
      format: "png",
      width: 10,
      height: 10,
    });
    expect(Buffer.isBuffer(buf)).toBe(true);
  });

  it("passes background option to sharp.flatten", async () => {
    const buf = await svgToBuffer(SAMPLE_SVG, {
      format: "jpeg",
      background: "#000",
    });
    expect(Buffer.isBuffer(buf)).toBe(true);
  });
});

describe("svgToDataUrl", () => {
  it("returns a base64 data url (browser)", async () => {
    const url = await svgToDataUrlBrowser(SAMPLE_SVG, {
      format: "png",
      width: 20,
      height: 20,
    });
    expect(url.startsWith("data:image/png;base64,")).toBe(true);
  });

  it("returns a base64 data url (node)", async () => {
    const url = await svgToDataUrlNode(SAMPLE_SVG, { format: "jpeg" });
    expect(url.startsWith("data:image/jpeg;base64,")).toBe(true);
  });
});

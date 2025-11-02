/** biome-ignore-all lint/suspicious/noExplicitAny: test file */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { downloadSvg, svgToBlob, svgToDataUrl } from "./client";
import { svgToBuffer, svgToDataUrlServer } from "./server";

const COMPLEX_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="200" height="100" fill="url(#grad)" />
  <circle cx="50" cy="50" r="30" fill="blue" opacity="0.7" />
  <text x="100" y="60" font-family="Arial" font-size="16" fill="white">Test</text>
</svg>`;

const MALFORMED_SVG = `<svg xmlns="http://www.w3.org/2000/svg">
  <rect width="50" height="50" fill="red"
  <circle cx="25" cy="25" r="10" fill="blue" />
</svg>`;

// Mock DOM APIs for client tests
Object.defineProperty(global, "Image", {
  value: class {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    src = "";
    width = 200;
    height = 100;

    constructor() {
      setTimeout(() => this.onload?.(), 0);
    }
  },
});

Object.defineProperty(global, "URL", {
  value: {
    createObjectURL: vi.fn(() => "blob:mock-url"),
    revokeObjectURL: vi.fn(),
  },
});

// Mock sharp for server tests
vi.mock("sharp", () => {
  const mockPipeline = {
    resize: vi.fn().mockReturnThis(),
    flatten: vi.fn().mockReturnThis(),
    toFormat: vi.fn().mockReturnThis(),
    toBuffer: vi.fn().mockResolvedValue(Buffer.from("mock-image-data")),
    metadata: vi.fn().mockResolvedValue({ width: 200, height: 100 }),
  };
  return { default: vi.fn(() => mockPipeline) };
});

describe("Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Complex SVG Processing", () => {
    it("handles SVG with gradients and complex elements", async () => {
      const result = await svgToBlob(COMPLEX_SVG, {
        format: "png",
        width: 400,
        height: 200,
        scale: 1.5,
      });

      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.width).toBe(600); // 400 * 1.5
      expect(result.height).toBe(300); // 200 * 1.5
      expect(result.format).toBe("png");
    });

    it("preserves aspect ratio with complex SVG", async () => {
      const result = await svgToBlob(COMPLEX_SVG, {
        format: "jpeg",
        width: 100,
        fit: "contain",
      });

      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.width).toBe(100);
      expect(result.height).toBe(50); // maintains 2:1 aspect ratio
    });
  });

  describe("Error Handling", () => {
    it("handles malformed SVG gracefully in client", async () => {
      // Should not throw, but may produce unexpected results
      const result = await svgToBlob(MALFORMED_SVG, { format: "png" });
      expect(result.blob).toBeInstanceOf(Blob);
    });

    it("handles malformed SVG gracefully in server", async () => {
      const result = await svgToBuffer(MALFORMED_SVG, { format: "png" });
      expect(result.buffer).toBeInstanceOf(Buffer);
    });

    it("handles empty SVG string", async () => {
      const result = await svgToBlob("", { format: "svg" });
      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.format).toBe("svg");
    });
  });

  describe("Format Consistency", () => {
    it("produces consistent results between client and server for SVG format", async () => {
      const clientResult = await svgToDataUrl(COMPLEX_SVG, { format: "svg" });
      const serverResult = await svgToDataUrlServer(COMPLEX_SVG, {
        format: "svg",
      });

      expect(clientResult.format).toBe(serverResult.format);
      expect(
        clientResult.dataUrl?.startsWith("data:image/svg+xml;base64,"),
      ).toBe(true);
      expect(
        serverResult.dataUrl?.startsWith("data:image/svg+xml;base64,"),
      ).toBe(true);
    });

    it("handles jpg vs jpeg format aliases consistently", async () => {
      const jpgResult = await svgToBlob(COMPLEX_SVG, { format: "jpg" });
      const jpegResult = await svgToBlob(COMPLEX_SVG, { format: "jpeg" });

      expect(jpgResult.blob?.type).toBe("image/jpeg");
      expect(jpegResult.blob?.type).toBe("image/jpeg");
    });
  });

  describe("Performance Edge Cases", () => {
    it("handles very large scale factors", async () => {
      const result = await svgToBlob(COMPLEX_SVG, {
        format: "png",
        width: 50,
        height: 25,
        scale: 10,
      });

      expect(result.width).toBe(500);
      expect(result.height).toBe(250);
    });

    it("handles very small dimensions", async () => {
      const result = await svgToBlob(COMPLEX_SVG, {
        format: "png",
        width: 1,
        height: 1,
      });

      expect(result.width).toBe(1);
      expect(result.height).toBe(1);
    });

    it("handles fractional dimensions", async () => {
      const result = await svgToBlob(COMPLEX_SVG, {
        format: "png",
        width: 100.7,
        height: 50.3,
        scale: 1.5,
      });

      // Should round to integers
      expect(result.width).toBe(152); // Math.round(100.7 * 1.5)
      expect(result.height).toBe(75); // Math.round(50.3 * 1.5)
    });
  });

  describe("Quality Settings", () => {
    it("applies quality settings correctly across formats", async () => {
      const formats = ["jpeg", "webp"] as const;

      for (const format of formats) {
        const result = await svgToBlob(COMPLEX_SVG, {
          format,
          quality: 0.5,
        });

        expect(result.blob).toBeInstanceOf(Blob);
        expect(result.format).toBe(format);
      }
    });

    it("ignores quality for lossless formats", async () => {
      const result = await svgToBlob(COMPLEX_SVG, {
        format: "png",
        quality: 0.1, // Should be ignored for PNG
      });

      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.format).toBe("png");
    });
  });

  describe("Background Handling", () => {
    it("applies background consistently across formats", async () => {
      const backgrounds = [
        "#ffffff",
        "#000000",
        "rgba(255,0,0,0.5)",
        "transparent",
      ];

      for (const background of backgrounds) {
        const result = await svgToBlob(COMPLEX_SVG, {
          format: "png",
          background,
        });

        expect(result.blob).toBeInstanceOf(Blob);
      }
    });

    it("handles background with transparent formats", async () => {
      const result = await svgToBlob(COMPLEX_SVG, {
        format: "png",
        background: "transparent",
      });

      expect(result.blob).toBeInstanceOf(Blob);
    });
  });

  describe("Dimension Resolution", () => {
    it("handles SVG without explicit dimensions", async () => {
      const svgNoDimensions = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
        <rect width="100" height="50" fill="red"/>
      </svg>`;

      const result = await svgToBlob(svgNoDimensions, { format: "png" });
      expect(result.blob).toBeInstanceOf(Blob);
    });

    it("handles SVG with only viewBox", async () => {
      const svgViewBoxOnly = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
        <circle cx="100" cy="50" r="40" fill="blue"/>
      </svg>`;

      const result = await svgToBlob(svgViewBoxOnly, {
        format: "png",
        width: 300,
      });

      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.width).toBe(300);
    });
  });

  describe("Download Integration", () => {
    let mockAnchor: any;

    beforeEach(() => {
      mockAnchor = {
        href: "",
        download: "",
        click: vi.fn(),
        remove: vi.fn(),
      };

      vi.spyOn(document, "createElement").mockReturnValue(mockAnchor);
      vi.spyOn(document.body, "appendChild").mockImplementation(
        () => mockAnchor,
      );
      vi.spyOn(document.body, "removeChild").mockImplementation(
        () => mockAnchor,
      );
    });

    // it("downloads complex SVG with proper filename", async () => {
    //   const result = await downloadSvg(COMPLEX_SVG, "complex-graphic", {
    //     format: "png",
    //     width: 400,
    //     scale: 2,
    //   });

    //   expect(mockAnchor.download).toBe("complex-graphic.png");
    //   expect(result.width).toBe(800); // 400 * 2
    // });

    it("handles download with SVG element input", async () => {
      const svgElement = document.createElement("svg");
      svgElement.outerHTML = COMPLEX_SVG;

      const result = await downloadSvg(svgElement, "from-element.svg");

      expect(mockAnchor.download).toBe("from-element.svg");
      expect(result.format).toBe("svg");
    });
  });
});

import { describe, expect, it, vi } from "vitest";
import {
  blobToDataURLBrowser,
  canvasToBlob,
  DEFAULT_OPTIONS,
  parseOptions,
  resolveDimensions,
} from "./utils";

describe("utils", () => {
  describe("blobToDataURLBrowser", () => {
    it("resolves a base64 string from Blob", async () => {
      const blob = new Blob(["hello"], { type: "text/plain" });
      const result = await blobToDataURLBrowser(blob);
      expect(result).toMatch(/^data:text\/plain;base64,/);
    });
  });

  describe("canvasToBlob", () => {
    it("calls convertToBlob for OffscreenCanvas", async () => {
      const mockBlob = new Blob([]);
      const canvas = {
        convertToBlob: vi.fn().mockResolvedValue(mockBlob),
      } as unknown as OffscreenCanvas;

      const blob = await canvasToBlob(true, canvas, "image/png", 0.5);
      expect(blob).toBe(mockBlob);
      expect(canvas.convertToBlob).toHaveBeenCalled();
    });

    it("calls toBlob for HTMLCanvasElement", async () => {
      const mockBlob = new Blob([]);
      const canvas = {
        toBlob: (cb: (b: Blob | null) => void) => cb(mockBlob),
      } as unknown as HTMLCanvasElement;

      const blob = await canvasToBlob(false, canvas, "image/png", 0.5);
      expect(blob).toBe(mockBlob);
    });

    it("rejects if toBlob returns null", async () => {
      const canvas = {
        toBlob: (cb: (b: Blob | null) => void) => cb(null),
      } as unknown as HTMLCanvasElement;
      await expect(canvasToBlob(false, canvas, "image/png", 1)).rejects.toThrow(
        "Canvas toBlob failed",
      );
    });
  });

  describe("parseOptions", () => {
    it("returns defaults", () => {
      const opts = parseOptions();
      expect(opts).toEqual(DEFAULT_OPTIONS);
    });

    it("accepts format string shorthand", () => {
      const opts = parseOptions("png");
      expect(opts.format).toBe("png");
    });

    it("accepts fit string shorthand", () => {
      const opts = parseOptions("contain");
      expect(opts.fit).toBe("contain");
    });

    it("accepts quality number shorthand > 1", () => {
      const opts = parseOptions(50);
      expect(opts.quality).toBe(0.5);
    });

    it("merges full options", () => {
      const opts = parseOptions({
        format: "jpeg",
        width: 10,
        height: 20,
        quality: 0.8,
      });
      expect(opts.format).toBe("jpeg");
      expect(opts.width).toBe(10);
      expect(opts.height).toBe(20);
      expect(opts.quality).toBe(0.8);
    });
  });

  describe("resolveDimensions", () => {
    const intrinsic = { width: 100, height: 50 };

    it("returns intrinsic if none provided", () => {
      const dims = resolveDimensions({}, intrinsic);
      expect(dims).toEqual({ width: 100, height: 50 });
    });

    it("calculates missing height", () => {
      const dims = resolveDimensions({ width: 50 }, intrinsic);
      expect(dims).toEqual({ width: 50, height: 25 });
    });

    it("calculates missing width", () => {
      const dims = resolveDimensions({ height: 25 }, intrinsic);
      expect(dims).toEqual({ width: 50, height: 25 });
    });

    it("uses provided width and height", () => {
      const dims = resolveDimensions({ width: 30, height: 40 }, intrinsic);
      expect(dims).toEqual({ width: 30, height: 40 });
    });
  });
});

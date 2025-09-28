import { describe, expect, it, vi } from "vitest";
import {
  blobToDataURLBrowser,
  canvasToBlob,
  isValidRect,
  unionRects,
} from "./browser";

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

  it("isValidRect", () => {
    expect(isValidRect({ x: 0, y: 0, width: 0, height: 0 })).toBe(true);
  });

  it("unionRect", () => {
    expect(
      unionRects(
        { x: 0, y: 0, width: 10, height: 10 },
        { x: 5, y: 5, width: 10, height: 10 },
      ),
    ).toEqual({ x: 0, y: 0, width: 15, height: 15 });
  });
});

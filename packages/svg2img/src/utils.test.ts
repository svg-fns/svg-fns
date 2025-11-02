import { describe, expect, it } from "vitest";
import { DEFAULT_OPTIONS, parseOptions } from "./utils";

describe("utils", () => {
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

    it("accepts quality number shorthand <= 1", () => {
      const opts = parseOptions(0.8);
      expect(opts.quality).toBe(0.8);
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

    it("handles all supported formats", () => {
      const formats = ["png", "jpeg", "jpg", "webp", "avif", "svg"];
      for (const format of formats) {
        const opts = parseOptions(format);
        expect(opts.format).toBe(format);
      }
    });

    it("handles all fit modes", () => {
      const fits = ["cover", "contain", "fill", "inside", "outside"];
      for (const fit of fits) {
        const opts = parseOptions(fit);
        expect(opts.fit).toBe(fit);
      }
    });

    it("converts percentage quality in options object", () => {
      const opts = parseOptions({ quality: 85 });
      expect(opts.quality).toBe(0.85);
    });

    it("handles edge case quality values", () => {
      expect(parseOptions(0).quality).toBe(0);
      expect(parseOptions(1).quality).toBe(1);
      expect(parseOptions(100).quality).toBe(1);
    });

    it("treats unknown strings as fit mode", () => {
      const opts = parseOptions("unknown");
      expect(opts.fit).toBe("unknown");
    });

    it("handles empty options object", () => {
      const opts = parseOptions({});
      expect(opts).toEqual(DEFAULT_OPTIONS);
    });
  });
});

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
});

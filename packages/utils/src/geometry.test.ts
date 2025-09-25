import { describe, expect, it } from "vitest";
import { resolveDimensions } from "./geometry";

describe("utils", () => {
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

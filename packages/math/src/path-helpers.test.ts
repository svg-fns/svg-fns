import { describe, expect, it } from "vitest";
import { arcPath, cartesianToPolar, polarToCartesian } from "./path-helpers";

describe("path-helpers", () => {
  it("converts polar to cartesian", () => {
    const p = polarToCartesian(0, 0, 1, Math.PI / 2);
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBeCloseTo(1);
  });

  it("converts cartesian to polar", () => {
    const polar = cartesianToPolar(0, 0, { x: 0, y: 1 });
    expect(polar.r).toBeCloseTo(1);
    expect(polar.angle).toBeCloseTo(Math.PI / 2);
  });

  it("creates arc path", () => {
    const d = arcPath(0, 0, 50, 0, Math.PI / 2);
    expect(d).toContain("M");
    expect(d).toContain("A");
  });
});

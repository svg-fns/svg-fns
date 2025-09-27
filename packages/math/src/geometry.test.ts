import { describe, expect, it } from "vitest";
import {
  almostEqualPoints,
  distance,
  midpoint,
  rotatePoint,
  slope,
} from "./geometry";

describe("geometry", () => {
  it("calculates distance correctly", () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });

  it("finds midpoint", () => {
    expect(midpoint({ x: 0, y: 0 }, { x: 2, y: 2 })).toEqual({ x: 1, y: 1 });
  });

  it("calculates slope", () => {
    expect(slope({ x: 0, y: 0 }, { x: 2, y: 2 })).toBe(1);
    expect(slope({ x: 0, y: 0 }, { x: 0, y: 5 })).toBe(Infinity);
  });

  it("rotates point around origin", () => {
    const p = rotatePoint({ x: 1, y: 0 }, 90);
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBeCloseTo(1);
  });

  it("checks almostEqual", () => {
    expect(
      almostEqualPoints(
        { x: 1, y: 1 },
        { x: 1.00000001, y: 1.00000001 },
        0.00000001,
      ),
    ).toBe(true);
    expect(almostEqualPoints({ x: 1, y: 1 }, { x: 1.1, y: 1.1 })).toBe(false);
  });
});

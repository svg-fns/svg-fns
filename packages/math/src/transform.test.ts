import { describe, expect, it } from "vitest";
import {
  applyMatrixToPoint,
  composeMatrices,
  decomposeMatrix,
  parseTransform,
  rotationMatrix,
  scaleMatrix,
  skewXMatrix,
  skewYMatrix,
  transformPoint,
} from "./transform";

describe("@svg-fns/math transforms", () => {
  it("rotationMatrix 0 degrees should leave point unchanged", () => {
    const p = { x: 3, y: 4 };
    const res = applyMatrixToPoint(p, rotationMatrix(0));
    expect(res).toEqual(p);
  });

  it("skewXMatrix should skew point along X", () => {
    const p = { x: 1, y: 1 };
    const res = applyMatrixToPoint(p, skewXMatrix(45));
    expect(res.x).toBeCloseTo(2, 6); // x + y*tan(45°) = 1 + 1*1 = 2
    expect(res.y).toBeCloseTo(1, 6);
  });

  it("skewYMatrix should skew point along Y", () => {
    const p = { x: 1, y: 1 };
    const res = applyMatrixToPoint(p, skewYMatrix(45));
    expect(res.x).toBeCloseTo(1, 6);
    expect(res.y).toBeCloseTo(2, 6);
  });

  it("composeMatrices with no arguments returns identity", () => {
    const m = composeMatrices();
    const p = { x: 1, y: 1 };
    const res = applyMatrixToPoint(p, m);
    expect(res).toEqual(p);
  });

  it("parseTransform handles empty string as identity", () => {
    const m = parseTransform("");
    const p = { x: 5, y: 5 };
    expect(applyMatrixToPoint(p, m)).toEqual(p);
  });

  it("parseTransform skips invalid numbers gracefully", () => {
    const m = parseTransform("translate(foo,10) rotate(90)");
    const res = applyMatrixToPoint({ x: 1, y: 0 }, m);
    expect(Math.round(res.x)).toBe(0);
    expect(Math.round(res.y)).toBe(1);
  });

  it("parseTransform handles rotate with pivot correctly", () => {
    const m = parseTransform("rotate(90,1,1)");
    const p = { x: 2, y: 1 };
    const res = applyMatrixToPoint(p, m);
    // rotation around (1,1) -> (2,1) rotates to (1,2)
    expect(res.x).toBeCloseTo(1, 6);
    expect(res.y).toBeCloseTo(2, 6);
  });

  it("applies skewX correctly", () => {
    const m = parseTransform("skewX(45)");
    const p = { x: 1, y: 1 };
    const res = applyMatrixToPoint(p, m);
    expect(res.x).toBeCloseTo(2); // x + tan(45°)*y = 1 + 1*1
    expect(res.y).toBeCloseTo(1);
  });

  it("applies skewY correctly", () => {
    const m = parseTransform("skewY(45)");
    const p = { x: 1, y: 1 };
    const res = applyMatrixToPoint(p, m);
    expect(res.x).toBeCloseTo(1);
    expect(res.y).toBeCloseTo(2); // y + tan(45°)*x = 1 + 1*1
  });

  it("transformPoint integrates parseTransform + applyMatrixToPoint", () => {
    const p = { x: 1, y: 1 };
    const res = transformPoint(p, "translate(2,3) scale(2)");
    // scale first: (1*2,1*2) = (2,2), then translate (2+2,2+3) = (4,5)
    expect(res).toEqual({ x: 4, y: 5 });
  });

  it("decomposeMatrix handles negative scale/rotation edge case", () => {
    const m = composeMatrices(scaleMatrix(-2, -3), rotationMatrix(180));
    const dec = decomposeMatrix(m);
    expect(dec.scale.x).toBeCloseTo(2, 6);
    expect(dec.scale.y).toBeCloseTo(3, 6);
  });

  it("parseTransform handles matrix() directly", () => {
    const mStr = "matrix(1,2,3,4,5,6)";
    const m = parseTransform(mStr);
    expect(m).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

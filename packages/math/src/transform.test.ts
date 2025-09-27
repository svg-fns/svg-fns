import { describe, expect, it } from "vitest";
import {
  applyMatrixToPoint,
  composeMatrices,
  decomposeMatrix,
  identityMatrix,
  parseTransform,
  rotationMatrix,
  scaleMatrix,
  translationMatrix,
} from "./transform";

describe("@svg-fns/math transforms", () => {
  it("identityMatrix should leave point unchanged", () => {
    const p = { x: 5, y: 10 };
    const res = applyMatrixToPoint(p, identityMatrix());
    expect(res).toEqual(p);
  });

  it("translationMatrix should translate point", () => {
    const p = { x: 0, y: 0 };
    const res = applyMatrixToPoint(p, translationMatrix(10, 20));
    expect(res).toEqual({ x: 10, y: 20 });
  });

  it("scaleMatrix should scale point", () => {
    const p = { x: 2, y: 3 };
    const res = applyMatrixToPoint(p, scaleMatrix(2, 3));
    expect(res).toEqual({ x: 4, y: 9 });
  });

  it("rotationMatrix 90 degrees should rotate point (1,0) to (0,1)", () => {
    const p = { x: 1, y: 0 };
    const res = applyMatrixToPoint(p, rotationMatrix(90));
    expect(Math.round(res.x)).toBe(0);
    expect(Math.round(res.y)).toBe(1);
  });

  it("composeMatrices should apply transforms in SVG order (right-to-left on points)", () => {
    const p = { x: 1, y: 1 };
    // scale then translate (point is scaled first, then moved)
    const m = composeMatrices(scaleMatrix(2), translationMatrix(5, 0));
    const res = applyMatrixToPoint(p, m);
    expect(res).toEqual({ x: 12, y: 2 });
  });

  it("parseTransform should parse simple translate", () => {
    const m = parseTransform("translate(10,20)");
    const res = applyMatrixToPoint({ x: 0, y: 0 }, m);
    expect(res).toEqual({ x: 10, y: 20 });
  });

  it("decomposeMatrix should return expected components", () => {
    const m = composeMatrices(
      translationMatrix(10, 20),
      rotationMatrix(45),
      scaleMatrix(2, 3),
    );
    const dec = decomposeMatrix(m);
    expect(dec.translate.x).toBeCloseTo(10, 6);
    expect(dec.translate.y).toBeCloseTo(20, 6);
    expect(dec.scale.x).toBeCloseTo(2, 6);
    expect(dec.scale.y).toBeCloseTo(3, 6);
  });
});

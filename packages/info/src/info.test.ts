import { beforeEach, describe, expect, it } from "vitest";
import {
  getSvgAspectRatio,
  getSvgBBox,
  getSvgColors,
  getSvgDimensions,
} from "../src";

describe("@svg-fns/info", () => {
  let svg: SVGSVGElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <svg width="200" height="100" viewBox="0 0 200 100"
           xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="200" height="100" fill="#ff0000" stroke="#000000"/>
        <circle cx="50" cy="50" r="25" fill="#00ff00" stroke="none"/>
        <path d="M10 10 H 90 V 90 H 10 Z" fill="none" stroke="#0000ff"/>
      </svg>
    `;
    svg = document.querySelector("svg") as SVGSVGElement;
  });

  // --- Dimensions ---
  it("should return width and height from attributes", () => {
    const { width, height } = getSvgDimensions(svg);
    expect(width).toBe(200);
    expect(height).toBe(100);
  });

  it("should fall back to viewBox when width/height missing", () => {
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    const { width, height } = getSvgDimensions(svg);
    expect(width).toBe(200);
    expect(height).toBe(100);
  });

  it("should return {0,0} when no dimensions or viewBox", () => {
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.removeAttribute("viewBox");
    const { width, height } = getSvgDimensions(svg);
    expect(width).toBe(0);
    expect(height).toBe(0);
  });

  // --- Aspect ratio ---
  it("should calculate aspect ratio correctly", () => {
    expect(getSvgAspectRatio(svg)).toBeCloseTo(2.0);
  });

  // it("should return Infinity if height is zero", () => {
  //   svg.setAttribute("height", "0");
  //   expect(getSvgAspectRatio(svg)).toBe(Infinity);
  // });

  // --- Bounding box ---
  it("should return bounding box of SVG element", async () => {
    const bbox = await getSvgBBox(svg);
    expect(bbox.width).toBeGreaterThan(0);
    expect(bbox.height).toBeGreaterThan(0);
  });

  // it("should return default bbox for empty SVG", () => {
  //   const emptySvg = document.createElementNS(
  //     "http://www.w3.org/2000/svg",
  //     "svg",
  //   );
  //   const bbox = getSvgBBox(emptySvg);
  //   expect(bbox).toEqual({ x: 0, y: 0, width: 0, height: 0 });
  // });

  // --- Colors ---
  // it("should extract unique fill and stroke colors", () => {
  //   const { fills, strokes } = getSvgColors(svg);
  //   expect(fills.sort()).toEqual(["#00ff00", "#ff0000"]);
  //   expect(strokes.sort()).toEqual(["#000000", "#0000ff"]);
  // });

  it("should ignore fill='none' and stroke='none'", () => {
    const rect = svg.querySelector("rect")!;
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", "none");
    const { fills, strokes } = getSvgColors(svg);
    expect(fills).not.toContain("none");
    expect(strokes).not.toContain("none");
  });

  it("should handle empty SVG without errors", () => {
    const emptySvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    const { fills, strokes } = getSvgColors(emptySvg);
    expect(fills).toEqual([]);
    expect(strokes).toEqual([]);
  });
});

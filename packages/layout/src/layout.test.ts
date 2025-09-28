/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  computeTrimBox,
  getDimensions,
  getViewBox,
  parseDimension,
  parseViewBox,
  scaleViewBox,
  setViewBox,
  tightlyCropSvg,
  translateViewBox,
} from "./layout";

const SVG_NS = "http://www.w3.org/2000/svg";

const createSampleSvg = (addPath = false) => {
  const SVG_NS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(SVG_NS, "svg") as SVGSVGElement;
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("height", "100");
  svg.setAttribute("width", "100");

  if (addPath) {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", "M10 80 C 40 10, 65 10, 95 80");
    path.setAttribute("stroke", "black");
    path.setAttribute("fill", "transparent");

    svg.appendChild(path);
  }
  document.body.appendChild(svg);

  return svg;
};

describe("@svg-fns/layout - updated empty SVG with mocked getBBox", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("getDimensions", ({ expect }) => {
    const svg = createSampleSvg();
    const { height, width } = getDimensions(svg);
    expect(height).toBe(100);
    expect(width).toBe(100);

    svg.setAttribute("width", "50vw");
    expect(getDimensions(svg).width).toBe(window.innerWidth / 2);

    svg.setAttribute("height", "50vh");
    expect(getDimensions(svg).height).toBe(window.innerHeight / 2);

    svg.setAttribute("width", "5em");
    expect(getDimensions(svg, { fontSize: 1 }).width).toBe(5);

    expect(() => parseDimension("5%")).toThrowError(
      `Unsupported or unknown unit in dimension: "5%"`,
    );
  });

  it("computeTrimBox should return mocked getBBox result", () => {
    const svg = createSampleSvg();
    vi.spyOn(svg, "getBBox").mockReturnValue({
      x: 10,
      y: 20,
      width: 30,
      height: 40,
    } as DOMRect);

    const box = computeTrimBox(svg);
    expect(box).toEqual({ x: 10, y: 20, width: 30, height: 40 });
  });

  it("computeTrimBox with path should return global mocked getBBox result", () => {
    const svg = createSampleSvg(true);
    vi.spyOn(svg, "getBBox").mockReturnValue({
      x: 10,
      y: 20,
      width: 30,
      height: 40,
    } as DOMRect);

    const box = computeTrimBox(svg);
    expect(box).toEqual({ x: 0, y: 0, width: 100, height: 100 });
  });

  it("tightlyCropSvg mutates viewBox by default", () => {
    const svg = createSampleSvg();
    vi.spyOn(svg, "getBBox").mockReturnValue({
      x: 5,
      y: 5,
      width: 50,
      height: 50,
    } as DOMRect);

    const { box } = tightlyCropSvg(svg, { padding: 5 });
    const vb = getViewBox(svg);
    expect(vb?.x).toBeCloseTo(box.x);
    expect(vb?.y).toBeCloseTo(box.y);
    expect(vb?.width).toBeCloseTo(box.width);
    expect(vb?.height).toBeCloseTo(box.height);
  });

  it("scaleViewBox zooms correctly around center", () => {
    const svg = createSampleSvg();
    vi.spyOn(svg, "getBBox").mockReturnValue({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    } as DOMRect);

    const scaled = scaleViewBox(svg, 2, undefined, undefined, { mutate: true });
    expect(scaled).toBeTruthy();
    expect(scaled?.width).toBeCloseTo(50);
    expect(scaled?.height).toBeCloseTo(50);

    const vb = getViewBox(svg);
    expect(vb?.width).toBeCloseTo(50);
    expect(vb?.height).toBeCloseTo(50);
  });

  it("translateViewBox moves viewBox correctly", () => {
    const svg = createSampleSvg();
    setViewBox(svg, { x: 0, y: 0, width: 100, height: 100 });

    const newVB = translateViewBox(svg, 10, 20);
    expect(newVB?.x).toBeCloseTo(10);
    expect(newVB?.y).toBeCloseTo(20);

    const vb = getViewBox(svg);
    expect(vb?.x).toBeCloseTo(10);
    expect(vb?.y).toBeCloseTo(20);
  });

  it("setViewBox applies preserveAspectRatio correctly", () => {
    const svg = createSampleSvg();
    setViewBox(
      svg,
      { x: 0, y: 0, width: 50, height: 50 },
      { preserveAspectRatio: "xMidYMid meet" },
    );
    expect(svg.getAttribute("preserveAspectRatio")).toBe("xMidYMid meet");
  });

  it("parseViewBox returns null for invalid input", () => {
    expect(parseViewBox(null)).toBeNull();
    expect(parseViewBox("0 0 50")).toBeNull();
    expect(parseViewBox("a b c d")).toBeNull();
  });
});

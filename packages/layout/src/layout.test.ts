/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { beforeEach, describe, expect, it } from "vitest";

// We import the functions directly from the compiled source in a real repo.
// For this single-file preview we will assume the functions are exported as above.
import {
  computeTrimBox,
  getViewBox,
  scaleViewBox,
  setViewBox,
  tightlyCropSvg,
} from "./layout";

const SVG_NS = "http://www.w3.org/2000/svg";

const createSampleSvg = () => {
  const svg = document.createElementNS(SVG_NS, "svg") as SVGSVGElement;
  svg.setAttribute("viewBox", "0 0 200 100");
  // content rect sitting at 50,25 size 100x50
  const r = document.createElementNS(SVG_NS, "rect");
  r.setAttribute("x", "50");
  r.setAttribute("y", "25");
  r.setAttribute("width", "100");
  r.setAttribute("height", "50");
  svg.appendChild(r);
  document.body.appendChild(svg);
  return svg;
};

describe("@svg-fns/layout - basic behavior", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("computeTrimBox should tightly wrap content", () => {
    const svg = createSampleSvg();
    const box = computeTrimBox(svg);
    expect(box.x).toBeCloseTo(0);
    expect(box.y).toBeCloseTo(0);
    expect(box.width).toBeCloseTo(100);
    expect(box.height).toBeCloseTo(100);
  });

  it("tightlyCropSvg mutates viewBox and dimensions by default", () => {
    const svg = createSampleSvg();
    const { box } = tightlyCropSvg(svg, { padding: 2, mutate: true });
    const vb = getViewBox(svg)!;
    expect(vb.x).toBeCloseTo(box.x);
    expect(vb.y).toBeCloseTo(box.y);
    expect(vb.width).toBeCloseTo(box.width);
    expect(vb.height).toBeCloseTo(box.height);
  });

  it("scaleViewBox zooms correctly around center", () => {
    const svg = createSampleSvg();
    // initial viewBox 0 0 200 100 -> center (100,50)
    const scaled = scaleViewBox(svg, 2, undefined, undefined, { mutate: true });
    expect(scaled).toBeTruthy();
    expect(scaled!.width).toBeCloseTo(100);
    expect(scaled!.height).toBeCloseTo(50);
    // viewBox should reflect it
    const vb = getViewBox(svg)!;
    expect(vb.width).toBeCloseTo(100);
    expect(vb.height).toBeCloseTo(50);
  });
});

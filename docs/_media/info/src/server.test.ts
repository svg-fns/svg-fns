import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getSvgBBox,
  getSvgBBoxApproximation,
  getSvgColors,
  getSvgColorsNode,
} from "./server";

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

  // --- Bounding box ---
  it("returns bounding box of SVG element (browser getBBox)", async () => {
    const bbox = await getSvgBBox(svg);
    expect(bbox.width).toBeGreaterThan(0);
    expect(bbox.height).toBeGreaterThan(0);
    expect(bbox.x).toBeDefined();
    expect(bbox.y).toBeDefined();
  });

  // --- Colors ---
  it("ignores fill='none' and stroke='none'", () => {
    const rect = svg.querySelector("rect")!;
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", "none");
    const { fills, strokes, colors } = getSvgColors(svg);
    expect(fills).not.toContain("none");
    expect(strokes).not.toContain("none");
    expect(colors).not.toContain("none");
  });

  it("handles empty SVG without errors", () => {
    const emptySvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    const { fills, strokes, colors } = getSvgColors(emptySvg);
    expect(fills).toEqual([]);
    expect(strokes).toEqual([]);
    expect(colors).toEqual([]);
  });

  // --- Node.js fallback ---
  it("getSvgColorsNode extracts colors correctly", () => {
    const result = getSvgColorsNode(svg);
    expect(result.fills).toContain("#ff0000");
    expect(result.fills).toContain("#00ff00");
    expect(result.strokes).toContain("#000000");
    expect(result.strokes).toContain("#0000ff");
    expect(result.colors).toEqual(
      Array.from(new Set([...result.fills, ...result.strokes])),
    );
  });

  // --- Edge cases ---
  it("handles elements without fill/stroke attributes", () => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svg.appendChild(g);
    const { fills, strokes } = getSvgColors(svg);
    expect(fills).not.toContain(undefined);
    expect(strokes).not.toContain(undefined);
  });

  it("works when NodeList is empty", () => {
    const emptySvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    const result = getSvgColorsNode(emptySvg);
    expect(result.fills).toEqual([]);
    expect(result.strokes).toEqual([]);
  });

  it("console.warns and falls back when Resvg not available", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    // fake svg without getBBox in Node
    // @ts-expect-error
    const fakeSvg = { children: [], getBBox: undefined } as SVGSVGElement;
    const bbox = await getSvgBBox(fakeSvg);
    expect(bbox).toBeInstanceOf(DOMRect);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

/**
 * @packageDocumentation svg-utils
 * A set of utilities for working with SVGs:
 *  - Convert SVG to Base64
 *  - Crop to content
 *  - Fix known rendering quirks (e.g. Mermaid)
 *  - Convert to fallback raster images
 */

export * from "@svg-fns/convert";
export * from "@svg-fns/info";
export * from "@svg-fns/io";

export interface SvgCropResult {
  svg: string;
  scale: number;
}

/**
 * Crop an SVG tightly to its visible contents.
 *
 * @param svgRaw - Raw SVG string
 * @param container - A container element where the temporary SVG will be mounted
 * @returns Promise resolving to the cropped SVG string and scale factor
 */
export const tightlyCropSvg = (
  svgRaw: string,
  container: HTMLDivElement,
): Promise<SvgCropResult> =>
  new Promise((resolve, reject) => {
    const svgContainer = document.createElement("div");
    svgContainer.innerHTML = svgRaw;
    svgContainer.style.cssText = "width:100%;height:100%;position:absolute;";
    container.appendChild(svgContainer);

    const svgEl = svgContainer.querySelector("svg");
    if (!svgEl) return reject(new Error("No <svg> element found"));

    requestAnimationFrame(() => {
      try {
        const bbox = svgEl.getBBox();
        const computed = getComputedStyle(svgEl);
        const origW = parseFloat(computed.width) || bbox.width;
        const origH = parseFloat(computed.height) || bbox.height;

        const margin = 4;
        const x = bbox.x - margin;
        const y = bbox.y - margin;
        const croppedW = bbox.width + margin * 2;
        const croppedH = bbox.height + margin * 2;

        const finalW = Math.min(croppedW, origW);
        const finalH = Math.min(croppedH, origH);

        const clonedSvg = svgEl.cloneNode(true) as SVGSVGElement;
        clonedSvg.setAttribute("viewBox", `${x} ${y} ${croppedW} ${croppedH}`);
        clonedSvg.setAttribute("width", String(finalW));
        clonedSvg.setAttribute("height", String(finalH));
        clonedSvg.removeAttribute("style");

        const svg = new XMLSerializer().serializeToString(clonedSvg);
        svgContainer.remove();

        resolve({
          svg,
          scale: Math.min(croppedW / origW, croppedH / origH, 1),
        });
      } catch (err) {
        svgContainer.remove();
        reject(err);
      }
    });
  });

/**
 * Fix known quirks in generated SVGs (tool-specific).
 *
 * Example: Mermaid pie chart titles sometimes have misaligned anchors.
 *
 * @param svg - Raw SVG string
 * @param metadata - Info about the diagram type (e.g. `pie`, `gantt`)
 * @returns Modified SVG string
 */
export const fixGeneratedSvg = (
  svg: string,
  metadata: { diagramType: string },
): string => {
  if (metadata.diagramType === "pie") {
    return svg
      .replace(".pieTitleText{text-anchor:middle;", ".pieTitleText{")
      .replace(
        /<text[^>]*class="pieTitleText"[^>]*>(.*?)<\/text>/,
        (match, m1) =>
          match
            .replace(m1, m1.replace(/^"|"$/g, ""))
            .replace(/ x=".*?"/, ' x="-20%"'),
      );
  }
  return svg;
};

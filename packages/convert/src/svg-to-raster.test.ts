import { svgToRaster } from "svg-to-raster";
import { describe, it } from "vitest";

describe("svg-to-raster", () => {
  it("smoke", async ({ expect }) => {
    await svgToRaster("implement this test");
  });
});

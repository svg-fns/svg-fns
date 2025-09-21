import { svgToBase64 } from "svg-to-base64";
import { describe, it } from "vitest";

describe("svg-to-base64", () => {
  it("smoke", async ({ expect }) => {
    await svgToBase64("implement this test");
  });
});

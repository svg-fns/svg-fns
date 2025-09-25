import { describe, expect, it } from "vitest";
import { assertBrowser, assertNode, isBrowser, isNode } from "./check";

describe("Checks", () => {
  it("isNode should return true in Node", () => {
    expect(isNode()).toBe(true);
  });

  it("isBrowser should reflect jsdom (true)", () => {
    expect(isBrowser()).toBe(true);
  });

  it("assertNode should not throw in Node", () => {
    expect(() => assertNode()).not.toThrow();
  });

  it("assertBrowser should not throw when", () => {
    expect(() => assertBrowser()).not.toThrow();
  });
});

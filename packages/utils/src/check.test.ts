import { describe, expect, it } from "vitest";
import { assertClient, assertServer, isClient, isServer } from "./check";

describe("Checks", () => {
  it("isNode should return true in Node", () => {
    expect(isServer()).toBe(true);
  });

  it("isBrowser should reflect jsdom (true)", () => {
    expect(isClient()).toBe(true);
  });

  it("assertNode should not throw in Node", () => {
    expect(() => assertServer()).not.toThrow();
  });

  it("assertBrowser should not throw when", () => {
    expect(() => assertClient()).not.toThrow();
  });
});

/** biome-ignore-all lint/suspicious/noExplicitAny: mocking */
import { vi } from "vitest";

HTMLCanvasElement.prototype.toBlob = (cb, type, _quality) => {
  const fakeBlob = new Blob(["fake"], { type: type || "image/png" });
  cb(fakeBlob);
};

(HTMLCanvasElement.prototype as any).getContext = vi.fn(() => {
  return {
    drawImage: vi.fn(),
    fillRect: vi.fn(),
  };
});

globalThis.Image = class {
  _src = "";
  width = 100;
  height = 100;
  onload: (() => void) | null = null;
  onerror: ((err?: unknown) => void) | null = null;

  set src(value: string) {
    this._src = value;

    // simulate successful image load after a small delay
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 1);
  }

  get src() {
    return this._src;
  }
} as unknown as typeof Image;

const getBBox = () => ({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
});

// @ts-expect-error Mock getBBox (required for SVG operations)
SVGElement.prototype.getBBox = getBBox;

// SVGGraphicsElement.prototype.getBBox = getBBox;

(SVGElement.prototype as any).getComputedTextLength = () => 100; // or any fixed number

declare global {
  interface Window {
    media: "dark" | "light";
    matchMedia: (query: string) => MediaQueryList;
  }
}

// mock matchMedia
const mediaListeners: (() => void)[] = [];
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes(window.media),
    media: query,
    onchange() {
      this.matches = query.includes(window.media);
      mediaListeners.forEach((listener) => {
        listener();
      });
    },
    addEventListener: (_: string, listener: () => void) =>
      mediaListeners.push(listener),
    removeEventListener: (_: string, listener: () => void) =>
      mediaListeners.splice(mediaListeners.indexOf(listener), 1),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, "media", {
  writable: true,
  value: "dark",
});

vi.stubGlobal(
  "OffscreenCanvas",
  class OffscreenCanvasMock {
    width: number;
    height: number;
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      // Add any other properties or methods your code expects
    }
    getContext() {
      // Mock getContext if needed, return a dummy context object
      return {
        fillRect: vi.fn(),
        // ... other context methods
      };
    }
  },
);

// Preserve a reference to the actual URL constructor if it exists (e.g., in Node environments)
const ActualURL = global.URL;

// Define a mock constructor function
const MockURL = vi.fn((url, base) => {
  // You can optionally return a real URL object if the environment supports it
  // and you want the new URL(...) to have actual URL properties (like .hostname, .pathname, etc.)
  if (ActualURL) {
    return new ActualURL(url, base);
  }
  // Otherwise, return a basic mock object with necessary properties
  return {
    href: url,
    // Add other properties as needed:
    pathname: url.split("/")[url.split("/").length - 1],
    // ...
  };
});

// Attach the static methods to the mock constructor
// @ts-expect-error -- ok test
MockURL.createObjectURL = vi.fn(() => "mock-object-url");
// @ts-expect-error -- ok test
MockURL.revokeObjectURL = vi.fn();

// Define the global/window property
Object.defineProperty(window, "URL", {
  writable: true,
  configurable: true, // often helpful to allow re-defining in other tests
  value: MockURL,
});

// For Node/global scope if 'window' isn't enough
Object.defineProperty(global, "URL", {
  writable: true,
  configurable: true,
  value: MockURL,
});

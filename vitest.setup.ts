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

// @ts-expect-error Mock getBBox (required for SVG operations)
SVGElement.prototype.getBBox = () => ({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
});

(SVGElement.prototype as any).getComputedTextLength = () => 100; // or any fixed number

declare global {
  interface Window {
    media: "dark" | "light";
    matchMedia: (query: string) => MediaQueryList;
  }
}

const mediaListeners: (() => void)[] = [];
// mock matchMedia
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

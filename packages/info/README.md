# @svg-fns/info <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml/badge.svg)](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/svg-fns/svg-fns/graph/badge.svg)](https://codecov.io/gh/svg-fns/svg-fns)
[![Version](https://img.shields.io/npm/v/@svg-fns/info.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/info)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@svg-fns/info.svg)](https://www.npmjs.com/package/@svg-fns/info)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@svg-fns/info)
[![NPM License](https://img.shields.io/npm/l/@svg-fns/info)](../../LICENSE)

Lightweight, **tree-shakeable utilities** to extract structured **information from SVGs**.
Works seamlessly in both **browser** and **Node.js** (with DOM shims like JSDOM).

> Part of the [`svg-fns`](https://github.com/your-org/svg-fns) ecosystem — modular SVG utilities inspired by `date-fns`.

---

## ✨ Features

- Get **dimensions** (`width`, `height`)
- Compute **aspect ratio** (`width ÷ height`)
- Calculate **bounding boxes** (browser-native or Resvg fallback)
- Extract unique **fill** and **stroke** colors
- ⚡ Zero dependencies · Fully tree-shakeable · Runs anywhere

---

## 📦 Installation

```bash
npm install @svg-fns/info
```

**_or_**

```bash
pnpm add @svg-fns/info
```

**_or_**

```bash
yarn add @svg-fns/info
```

---

## 🚀 Usage

```ts
import { getSvgDimensions, getSvgAspectRatio, getSvgBBox, getSvgColors } from "@svg-fns/info";

const svg = document.querySelector("svg")!;

// Dimensions
console.log(getSvgDimensions(svg));
// → { width: 800, height: 600 }

// Aspect ratio
console.log(getSvgAspectRatio(svg));
// → 1.333...

// Bounding box
console.log(getSvgBBox(svg));
// Browser → DOMRect
// Node.js → Promise<DOMRect> (via Resvg or fallback)

// Colors
console.log(getSvgColors(svg));
// → { fills: ["#000", "#f00"], strokes: ["#333"], colors: ["#000", "#f00", "#333"] }
```

> 📝 **Note:** These APIs require an `SVGSVGElement`.
> To parse an SVG **string**, use [`@svg-fns/io`](https://github.com/svg-fns/svg-fns/tree/main/packages/io):

```ts
import { parseSvg } from "@svg-fns/io";
import { getSvgDimensions } from "@svg-fns/info";

const svgElement = parseSvg("<svg width='100' height='50'/>");
console.log(getSvgDimensions(svgElement));
// → { width: 100, height: 50 }
```

---

## ⚡ Performance Notes

- **Browser:** Uses native DOM APIs (`getBBox()`, `getComputedStyle`) → fast and accurate.
- **Node.js:**

  - With [`@resvg/resvg-js`](https://github.com/yisibl/resvg-js) → accurate bounding boxes (Rust-based).
  - Without Resvg → fallback approximation by traversing child elements.

- **Aspect ratio:** Returns `Infinity` if `height = 0` (instead of `NaN`).

---

## 📚 API Reference

### `getSvgDimensions(svg: SVGSVGElement)`

- Returns `{ width, height }`.
- Uses `width`/`height` attrs first, then falls back to `viewBox`.

### `getSvgAspectRatio(svg: SVGSVGElement)`

- Returns `width ÷ height`.
- Returns `Infinity` if `height = 0`.

### `getSvgBBox(svg: SVGSVGElement)`

- **Browser:** Returns `DOMRect` (sync).
- **Node.js:** Returns `Promise<DOMRect>` (async import of Resvg).
- Fallback → approximate bbox traversal.

### `getSvgColors(svg: SVGSVGElement)`

- Returns `{ fills: string[], strokes: string[], colors: string[] }`.
- Browser → uses computed styles (includes CSS inheritance).
- Node.js → scans element attributes only.

---

## 🔗 Related Packages

- [`@svg-fns/io`](../io) — Parse, serialize, and load SVGs
- [`@svg-fns/svg2img`](../convert) — Base64, Blob, rasterization, downloads

---

## 🛠️ Contributing

We welcome contributions! 🎉

- Open an issue for bugs/feature requests.
- PRs should include tests + docs.
- See our [contributing guide](../../CONTRIBUTING.md).

---

## 📜 License

Licensed under the **MPL-2.0** open-source license.

---

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/>  
> Support this project: [Enroll in courses](https://mayank-chaudhari.vercel.app/courses) · [Sponsor on GitHub](https://github.com/sponsors/mayank1513)

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>

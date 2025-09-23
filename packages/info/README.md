# @svg-fns/info <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml/badge.svg)](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/svg-fns/svg-fns/graph/badge.svg)](https://codecov.io/gh/svg-fns/svg-fns)
[![Version](https://img.shields.io/npm/v/@svg-fns/info.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/info)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@svg-fns/info.svg)](https://www.npmjs.com/package/@svg-fns/info)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@svg-fns/info)
[![NPM License](https://img.shields.io/npm/l/@svg-fns/info)](../../LICENSE)

Lightweight, tree-shakeable utilities to extract **information from SVGs**.  
Works in both **browser** and **Node.js** environments.

> Part of the [`svg-fns`](https://github.com/your-org/svg-fns) ecosystem — modular SVG utilities inspired by `date-fns`.

---

## ✨ Features

- Get **dimensions** (`width`, `height`) from SVG elements
- Compute **aspect ratio**
- Calculate **bounding boxes**
- Extract all unique **fill** and **stroke** colors
- Zero dependencies · Tree-shakeable · Works anywhere

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

// Example: working with an <svg> element
const svg = document.querySelector("svg")!;

// Dimensions
console.log(getSvgDimensions(svg));
// → { width: 800, height: 600 }

// Aspect ratio
console.log(getSvgAspectRatio(svg));
// → 1.333...

// Bounding box
console.log(getSvgBBox(svg));
// → { x: 0, y: 0, width: 800, height: 600 }

// Colors
console.log(getSvgColors(svg));
// → { fills: ["#000", "#f00"], strokes: ["#333"] }
```

> 📝 **Note:** These utilities require an `SVGSVGElement`.
> If you have an SVG **string**, first parse it using [`@svg-fns/io`](https://github.com/your-org/svg-fns/tree/main/packages/io):

```ts
import { parseSvg } from "@svg-fns/io";
import { getSvgDimensions } from "@svg-fns/info";

const svgElement = parseSvg("<svg width='100' height='50'/>");
console.log(getSvgDimensions(svgElement));
// → { width: 100, height: 50 }
```

---

## ⚡ Performance

- **Browser:** Uses native DOM methods like `getBBox()` for accuracy and speed.
- **Node.js:** Works with DOM shims (e.g. JSDOM). Bounding boxes are approximated by traversing elements.
- **No heavy deps** — keeps your bundle small and tree-shakable.

---

## 📚 API

### `getSvgDimensions(svg: SVGSVGElement)`

Returns `{ width, height }`.

### `getSvgAspectRatio(svg: SVGSVGElement)`

Returns `width ÷ height` (defaults to `1` if missing).

### `getSvgBBox(svg: SVGSVGElement)`

Returns `{ x, y, width, height }`. Uses `getBBox()` in browsers, falls back to traversal in Node.js.

### `getSvgColors(svg: SVGSVGElement)`

Returns `{ fills: string[], strokes: string[] }` — unique colors only.

---

## 🔗 Related Packages

- [`@svg-fns/io`](../io) — Parse/serialize/load SVGs
- [`@svg-fns/convert`](../convert) — Base64, Blob, rasterization, downloads

---

## 🛠️ Contributing

We welcome contributions! 🎉

- Open an issue for bugs/feature requests.
- PRs should include tests and documentation.
- Follow our [contributing guide](../../CONTRIBUTING.md).

---

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>

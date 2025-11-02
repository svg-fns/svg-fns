# SVG Fns <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml/badge.svg)](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/svg-fns/svg-fns/graph/badge.svg)](https://codecov.io/gh/svg-fns/svg-fns)
[![Version](https://img.shields.io/npm/v/svg-fns.svg?colorB=green)](https://www.npmjs.com/package/svg-fns)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/svg-fns.svg)](https://www.npmjs.com/package/svg-fns)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/svg-fns)
[![NPM License](https://img.shields.io/npm/l/svg-fns)](./LICENSE)

![SVG Functions](./logo.jpg)

**Lightweight, tree-shakable utilities for working with SVGs.**
Inspired by [`date-fns`](https://date-fns.org/) — small, focused, modular functions.

---

## ✨ Why svg-fns?

- Works in **browser** & **Node.js**
- **Zero dependencies** · Fully tree-shakable
- Modular design — import only what you need
- Consistent API across packages
- Perfect for design tools, rendering engines, and build pipelines

---

## 📦 Packages

| Package            | Description                                                                                                                                                                      | Badges                                                                                                                                                                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@svg-fns/io`      | Simple and fast utilities to parse, serialize, and load SVG strings and elements. Optimized for both browser and Node.js environments.                                           | [![Version](https://img.shields.io/npm/v/@svg-fns/io.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/io) ![Downloads](https://img.shields.io/npm/d18m/@svg-fns/io.svg) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/@svg-fns/io)                     |
| `@svg-fns/info`    | Lightweight, tree-shakeable utilities to extract structured information (dimensions, aspect ratio, bounding boxes, colors) from SVG elements. Works in both browser and Node.js. | [![Version](https://img.shields.io/npm/v/@svg-fns/info.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/info) ![Downloads](https://img.shields.io/npm/d18m/@svg-fns/info.svg) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/@svg-fns/info)             |
| `@svg-fns/svg2img` | Utility functions to convert SVGs into different formats (Base64, Blob, Data URI, raster images). Works in client and server with optimal performance.                           | [![Version](https://img.shields.io/npm/v/@svg-fns/svg2img.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/svg2img) ![Downloads](https://img.shields.io/npm/d18m/@svg-fns/svg2img.svg) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/@svg-fns/svg2img) |
| `@svg-fns/convert` | Utility functions to convert SVGs into different formats (Base64, Blob, Data URI, raster images). Works in client and server with optimal performance. _(Alias / older naming)_  | [![Version](https://img.shields.io/npm/v/@svg-fns/convert.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/convert) ![Downloads](https://img.shields.io/npm/d18m/@svg-fns/convert.svg) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/@svg-fns/convert) |
| `@svg-fns/layout`  | Lightweight SVG layout utilities — viewBox parsing, scaling, cropping, and trimming for precise content-aware rendering.                                                         | [![Version](https://img.shields.io/npm/v/@svg-fns/layout.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/layout) ![Downloads](https://img.shields.io/npm/d18m/@svg-fns/layout.svg) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/@svg-fns/layout)     |
| `@svg-fns/math`    | Core SVG math utilities: 2D affine transforms, geometry helpers, and path helpers for high-quality SVG manipulation.                                                             | [![Version](https://img.shields.io/npm/v/@svg-fns/math.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/math) ![Downloads](https://img.shields.io/npm/d18m/@svg-fns/math.svg) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/@svg-fns/math)             |
| `@svg-fns/types`   | Shared TypeScript type definitions for SVG-FNS — Rect, Point, Matrix, Padding, and other geometry/layout primitives.                                                             | [![Version](https://img.shields.io/npm/v/@svg-fns/types.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/types) ![Downloads](https://img.shields.io/npm/d18m/@svg-fns/types.svg) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/@svg-fns/types)         |
| `@svg-fns/utils`   | Shared low-level utility helpers for DOM, string parsing, numeric validation, and safe SVG runtime checks used internally across svg-fns packages.                               | [![Version](https://img.shields.io/npm/v/@svg-fns/utils.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/utils) ![Downloads](https://img.shields.io/npm/d18m/@svg-fns/utils.svg) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/@svg-fns/utils)         |

---

## 🚀 Quick Start

Install the umbrella package:

```bash
npm install svg-fns
```

Or install only what you need:

```bash
npm install @svg-fns/io
npm install @svg-fns/info
npm install @svg-fns/svg2img
```

---

## 🛠️ Usage

```ts
import { parseSvg, getSvgDimensions, svgToPng } from "svg-fns";

const svgEl = parseSvg("<svg width='100' height='50'/>");

console.log(getSvgDimensions(svgEl));
// → { width: 100, height: 50 }

const pngBlob = await svgToPng(svgEl, { scale: 2 });
```

---

## 📚 Roadmap

- `@svg-fns/geometry` → vector math, transforms, bounding boxes
- `@svg-fns/path` → path manipulation (split, join, simplify)
- `@svg-fns/text` → text measurement & layout
- More coming…

---

## 🛠️ Contributing

Contributions welcome 🎉

- Open an issue for bugs/ideas
- PRs should include tests + docs
- Follow our [contributing guide](./CONTRIBUTING.md)

---

## License

MPL-2.0 © [Mayank Kumar Chaudhari](https://mayank-chaudhari.vercel.app)

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>

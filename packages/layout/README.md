# @svg-fns/layout <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml/badge.svg)](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/svg-fns/svg-fns/graph/badge.svg)](https://codecov.io/gh/svg-fns/svg-fns)
[![Version](https://img.shields.io/npm/v/@svg-fns/layout.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/layout)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@svg-fns/layout.svg)](https://www.npmjs.com/package/@svg-fns/layout)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@svg-fns/layout)
[![NPM License](https://img.shields.io/npm/l/@svg-fns/layout)](../../LICENSE)

Utilities for **SVG layout manipulation** — parse, scale, crop, and trim `<svg>` viewBoxes with precision.  
Part of the [**svg-fns**](https://github.com/react18-tools/svg-fns) ecosystem.

---

## ✨ Features

- 🔍 **Parse & inspect** SVG `viewBox` values
- ✂️ **Crop tightly** to visible content (`tightlyCropSvg`)
- 📐 **Scale & zoom** around any anchor point
- 📦 Works in **browser + Node.js (JSDOM)**
- ⚡ Zero dependencies, tree-shakeable

---

## 📦 Install

```sh
pnpm add @svg-fns/layout
```

**_or_**

```sh
npm install @svg-fns/layout
```

---

## 🚀 Usage

```ts
import {
  getViewBox,
  setViewBox,
  scaleViewBox,
  tightlyCropSvg,
  computeTrimBox,
} from "@svg-fns/layout";

// Example: crop an SVG tightly to its contents
const svg = document.querySelector("svg")!;
const { box } = tightlyCropSvg(svg, { padding: 2, mutate: true });

// Example: zoom into center by 2x
scaleViewBox(svg, 2, undefined, undefined, { mutate: true });

// Example: read current viewBox
const vb = getViewBox(svg);
console.log(vb); // { x, y, width, height }
```

---

## 📚 API

### `getViewBox(svg: SVGSVGElement): Rect | null`

Get the `viewBox` of an `<svg>` as `{ x, y, width, height }`.

### `setViewBox(svg: SVGSVGElement, box: Rect): void`

Update the `viewBox`.

### `computeTrimBox(svg: SVGSVGElement): Rect`

Compute a tight bounding box of the SVG contents.

### `tightlyCropSvg(svg: SVGSVGElement, opts?): { box: Rect }`

Crop an SVG tightly to its contents, with optional padding.

- `padding: number = 0` — extra space around the trim box
- `mutate: boolean = true` — apply changes directly to `<svg>` (set to `false` for pure calculation)

### `scaleViewBox(svg: SVGSVGElement, factor: number, cx?, cy?, opts?): Rect`

Scale the current viewBox around an anchor (default: center).

---

## 🧪 Testing

```sh
pnpm test
```

---

## 🙏 Acknowledgments

Thanks to the SVG spec authors and OSS community for foundational ideas.
Part of [**svg-fns**](https://github.com/react18-tools/svg-fns) — modular, functional SVG utilities.

---

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>

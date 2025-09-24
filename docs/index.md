---
layout: default
title: Home
nav_order: 1
---

# SVG Fns <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml/badge.svg)](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/svg-fns/svg-fns/graph/badge.svg)](https://codecov.io/gh/svg-fns/svg-fns)
[![Version](https://img.shields.io/npm/v/svg-fns.svg?colorB=green)](https://www.npmjs.com/package/svg-fns)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/svg-fns.svg)](https://www.npmjs.com/package/svg-fns)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/svg-fns)
[![NPM License](https://img.shields.io/npm/l/svg-fns)](./LICENSE)

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

| Package                                  | Description                     | Example Functions                                                     |
| ---------------------------------------- | ------------------------------- | --------------------------------------------------------------------- |
| [`@svg-fns/io`](_media/io)           | Parse, serialize, and load SVGs | `parseSvg`, `stringifySvg`, `loadSvg`                                 |
| [`@svg-fns/info`](_media/info)       | Extract information from SVGs   | `getSvgDimensions`, `getSvgAspectRatio`, `getSvgBBox`, `getSvgColors` |
| [`@svg-fns/convert`](_media/convert) | Convert SVGs between formats    | `svgToPng`, `svgToBase64`, `downloadSvg`                              |

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
npm install @svg-fns/convert
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

## Modules

- [convert/src](convert/src.md)
- [convert/src/convert](convert/src/convert.md)
- [convert/src/utils](convert/src/utils.md)
- [info/src](info/src.md)
- [info/src/info](info/src/info.md)
- [io/src](io/src.md)
- [io/src/io](io/src/io.md)

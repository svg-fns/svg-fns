# @svg-fns/convert <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml/badge.svg)](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/svg-fns/svg-fns/graph/badge.svg)](https://codecov.io/gh/svg-fns/svg-fns)
[![Version](https://img.shields.io/npm/v/@svg-fns/convert.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/convert)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@svg-fns/convert.svg)](https://www.npmjs.com/package/@svg-fns/convert)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@svg-fns/convert)

> **Convert SVG to PNG, JPEG, WebP, AVIF, Data URL, Blob, or Buffer — isomorphic, tree-shakeable, and typed.**

---

## ✨ Overview

`@svg-fns/convert` makes it effortless to transform raw SVG strings into modern image formats.

- **Isomorphic** → works in Browser (Canvas API) & Node.js (Sharp).
- **Tree-shakeable** → zero-bloat, minimal runtime.
- **Typed** → written in TypeScript for DX.
- **Modern formats** → PNG, JPEG, WebP, AVIF.
- **Resizing & fitting** → scale, width/height, cover/contain/fill.

---

## 🚀 Quick Start

```ts
import { svgToDataUrl } from "@svg-fns/convert";

const mySvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="royalblue" />
</svg>`;

// Convert to PNG Data URL at 200px wide
const pngDataUrl = await svgToDataUrl(mySvg, { format: "png", width: 200 });

const img = document.createElement("img");
img.src = pngDataUrl;
document.body.appendChild(img);
```

---

## 📦 Installation

```sh
# Browser or universal usage
pnpm add @svg-fns/convert
npm install @svg-fns/convert
yarn add @svg-fns/convert
```

👉 **For Node.js** (Buffer conversion), install [sharp](https://github.com/lovell/sharp):

```sh
pnpm add sharp
```

---

## 🔑 Core API

### Browser

- **`svgToBlob(svg, options)`** → `Blob`
- **`svgToDataUrlBrowser(svg, options)`** → `string (data URL)`

### Node.js

- **`svgToBuffer(svg, options)`** → `Buffer`
- **`svgToDataUrlNode(svg, options)`** → `string (data URL)`

### Universal

- **`svgToDataUrl(svg, options)`** → auto-detects env → returns Data URL

---

## 🎨 Examples

### 1. Browser → JPEG Blob

```ts
import { svgToBlob } from "@svg-fns/convert";

const blob = await svgToBlob(mySvg, {
  format: "jpeg",
  quality: 0.8,
  background: "#fff",
});

const url = URL.createObjectURL(blob);
document.querySelector("img")!.src = url;
```

---

### 2. Node.js → WebP file

```ts
import { svgToBuffer } from "@svg-fns/convert";
import { writeFile } from "fs/promises";

const buffer = await svgToBuffer(mySvg, {
  format: "webp",
  width: 500,
  height: 500,
  fit: "contain",
});

await writeFile("output.webp", buffer);
```

---

## ⚙️ Options

```ts
interface SvgConversionOptions {
  format?: "png" | "jpeg" | "webp" | "avif" | "svg";
  quality?: number; // 0–1, default: 0.92
  width?: number; // px
  height?: number; // px
  scale?: number; // multiplier, default: 1
  background?: string; // e.g. "#fff"
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
}
```

- **`format`** → output type (default: `"svg"`).
- **`fit`** → how to resize (cover/crop vs contain/letterbox).
- **`scale`** → for high-DPI rendering.
- **`background`** → useful for JPEG (no alpha).

---

## 🤝 Contributing

We welcome issues & PRs!

- [Open an Issue](https://github.com/svg-fns/svg-fns/issues)
- [Submit a PR](https://github.com/svg-fns/svg-fns/pulls)

---

## ❤️ Sponsor

If `@svg-fns/convert` saves you time, consider [sponsoring](https://github.com/sponsors/mayank1513).
Your support fuels maintenance, features & community growth.

---

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center">
  with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a>
</p>

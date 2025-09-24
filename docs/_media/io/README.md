---
layout: default
title: README
parent: Io
nav_order: 162
---

# @svg-fns/io <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml/badge.svg)](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/svg-fns/svg-fns/graph/badge.svg)](https://codecov.io/gh/svg-fns/svg-fns)
[![Version](https://img.shields.io/npm/v/@svg-fns/io.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/io)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@svg-fns/io.svg)](https://www.npmjs.com/package/@svg-fns/io)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@svg-fns/io)
[![NPM License](https://img.shields.io/npm/l/@svg-fns/io)](../../LICENSE)

Feather-light **I/O utilities for working with SVGs** in **browser** and **Node.js**. Minimal, dev-friendly, and universal.

---

## TL;DR 🚀

| Feature                           | Browser | Node.js                     | Notes                                             |
| --------------------------------- | ------- | --------------------------- | ------------------------------------------------- |
| Parse SVG string → `SVGElement`   | ✅ sync | ✅ async (`@xmldom/xmldom`) | Safe / unsafe modes                               |
| Serialize `SVGElement` → string   | ✅ sync | ✅ async                    | Standards-compliant (`XMLSerializer`)             |
| Load from string, URL, File, Blob | ✅      | ✅ string + URL             | Unified API across envs                           |
| Unsafe fast parsing               | ✅      | ❌                          | Only for trusted inputs, risk arises on DOM mount |

---

## Why @svg-fns/io?

- **Feather-light:** No dependencies unless in Node.js.
- **Universal:** Works in browser + Node.
- **Dev-friendly:** Throws meaningful errors, ideal for library authors and apps.
- **Secure:** Unsafe mode is optional and clearly documented.
- **Composable:** Integrates with other `svg-fns` groups (convert, geometry, style, etc.).
- **OSS-advantage:** Designed for corporate, personal, and open-source projects.

---

## Features

<details>
<summary>Parsing</summary>

- `parseSvgBrowser(svgString, config?)` – sync, safe (DOMParser) or unsafe (innerHTML).
- `unsafeParseSvg(svgString, config)` – fast, only for trusted inputs.
- `parseSvgNode(svgString, config?)` – async Node.js parser.
- `parseSvg(svgString, config?)` – universal wrapper.

</details>

<details>
<summary>Serialization</summary>

- `serializeSvgBrowser(svgElement, config?)` – sync, standards-compliant.
- `serializeSvgNode(svgElement, config?)` – async Node.js serializer.
- `serializeSvg(svgElement, config?)` – universal wrapper.

</details>

<details>
<summary>Loading SVGs</summary>

- `loadSvg(input: string | File | Blob | URL, config?)` – unified loader.

  - Browser: string, File, Blob, URL
  - Node.js: string, URL (via fetch)

</details>

---

## Usage Examples

```ts
import { parseSvg, serializeSvg, loadSvg } from "@svg-fns/io";

// parse SVG safely
const svgEl = parseSvg(`<svg><circle cx="5" cy="5" r="5"/></svg>`);

// serialize back to string
const svgString = serializeSvg(svgEl);

// load from URL
const svgFromUrl = await loadSvg("https://example.com/icon.svg");
```

---

## Browser & Node Compatibility

| Feature                   | Browser | Node.js                                |
| ------------------------- | ------- | -------------------------------------- |
| DOMParser / XMLSerializer | ✅      | ❌ (needs @xmldom/xmldom, lazy-loaded) |
| innerHTML fast parsing    | ✅      | ❌                                     |
| File / Blob               | ✅      | ❌ natively                            |
| URL fetch                 | ✅      | ✅ (node-fetch / global fetch)         |

---

## Security Notes

- **Unsafe mode**: parsing itself does **not** execute scripts.
- Risk arises only when the parsed SVG is **attached to the DOM**.
- Always sanitize untrusted SVGs before mounting in unsafe mode.

---

## Installation

```bash
pnpm add @svg-fns/io
```

**_or_**

```
npm install @svg-fns/io
```

---

## Configuration (`IOConfig`)

| Option                | Type                 | Default | Description                                   |
| --------------------- | -------------------- | ------- | --------------------------------------------- |
| `unsafe`              | boolean              | false   | Browser only: use innerHTML parsing for speed |
| `removeScripts`       | boolean              | true    | Strip `<script>` elements in unsafe mode      |
| `removeEventHandlers` | boolean              | true    | Strip `on*` attributes in unsafe mode         |
| `removeForeignObject` | boolean              | false   | Remove `<foreignObject>` elements             |
| `strict`              | boolean              | true    | Validate root element is `<svg>`              |
| `domParser`           | typeof DOMParser     | auto    | Custom parser                                 |
| `xmlSerializer`       | typeof XMLSerializer | auto    | Custom serializer                             |

---

## Contribution & Sponsorship

`@svg-fns/io` thrives with your feedback, PRs, and sponsorship:

- ⭐ Star to show support
- 📝 Submit issues / PRs for bug fixes, new features
- 💖 Sponsor via GitHub Sponsors or Patreon

We welcome **OSS, corporate, and personal project use** — MPL 2.0 ensures safe adoption in commercial products.

---

## SEO & AI-Friendly Tips

- Keywords: `SVG utilities`, `SVG parser`, `SVG serializer`, `SVG Node.js`, `feather-light SVG library`, `universal SVG library`.
- AI usage: The functions are deterministic and type-safe; perfect for AI-assisted SVG generation pipelines.

---

## Roadmap / Future Enhancements

- `convert` utilities: Base64, raster, download
- `geometry` utilities: crop, resize, merge
- `style` utilities: inline, optimize, strip scripts/styles
- Framework JSX/TSX output (`react`, `vue`, `solid`)

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>

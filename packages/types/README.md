# @svg-fns/types <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml/badge.svg)](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/svg-fns/svg-fns/graph/badge.svg)](https://codecov.io/gh/svg-fns/svg-fns)
[![Version](https://img.shields.io/npm/v/@svg-fns/types.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/types)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@svg-fns/types.svg)](https://www.npmjs.com/package/@svg-fns/types)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@svg-fns/types)
[![NPM License](https://img.shields.io/npm/l/@svg-fns/types)](../../LICENSE)

Shared **TypeScript type definitions** for the [`svg-fns`](https://github.com/react18-tools/svg-fns) ecosystem.  
Provides minimal, reusable primitives for SVG geometry, transforms, and layout.

## Install

```sh
pnpm add @svg-fns/types
```

(or `npm install` / `yarn add`)

## Types

- **`Rect`** — `{ x, y, width, height }`
  Axis-aligned rectangle with top-left origin.

- **`Point`** — `{ x, y }`
  Cartesian 2D point.

- **`Padding`** — `number | { top, right, bottom, left }`
  Uniform or per-side padding spec.

- **`Matrix`** — `[a, b, c, d, e, f]`
  Affine transform matrix matching [SVGMatrix](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix).
  Represents:

  ```
  [ a c e ]
  [ b d f ]
  [ 0 0 1 ]
  ```

## Usage

```ts
import type { Rect, Point, Matrix, Padding } from "@svg-fns/types";

const box: Rect = { x: 0, y: 0, width: 100, height: 50 };
const center: Point = { x: 50, y: 25 };
const transform: Matrix = [1, 0, 0, 1, 10, 20];
const pad: Padding = { top: 5, right: 10, bottom: 5, left: 10 };
```

## Motivation

- Keep geometry types consistent across `@svg-fns/*` packages
- Prevent redefinition of common shapes and matrices
- Provide strong typing for SVG transforms, layout, and math helpers

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>

# @svg-fns/math <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml/badge.svg)](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/svg-fns/svg-fns/graph/badge.svg)](https://codecov.io/gh/svg-fns/svg-fns)
[![Version](https://img.shields.io/npm/v/@svg-fns/math.svg?colorB=green)](https://www.npmjs.com/package/@svg-fns/math)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@svg-fns/math.svg)](https://www.npmjs.com/package/@svg-fns/math)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@svg-fns/math)
[![NPM License](https://img.shields.io/npm/l/@svg-fns/math)](../../LICENSE)

High-quality, fully-typed **SVG math utilities** for 2D transformations, geometry calculations, and path generation.  
Part of the `@svg-fns` ecosystem, designed for **production-grade projects**.

## Features

### Transforms

- Identity, translation, scale, rotation, skewX, skewY
- Compose multiple matrices: `composeMatrices(...)`
- Apply matrices to points: `applyMatrixToPoint(point, matrix)`
- Decompose matrices into `{ translate, rotate, scale, skewX }`
- Parse SVG transform strings: `parseTransform("translate(10,20) rotate(30)")`

### Geometry

- `distance(pointA, pointB)` — Euclidean distance
- `midpoint(pointA, pointB)` — midpoint of two points
- `slope(pointA, pointB)` — slope (handles vertical lines)
- `rotatePoint(point, angle, pivot)` — rotate around origin or pivot
- `almostEqual(pointA, pointB)` — check approximate equality

### Path Helpers

- `polarToCartesian(cx, cy, radius, angle)`
- `cartesianToPolar(cx, cy, point)`
- `arcPath(cx, cy, radius, startAngle, endAngle)` — generates SVG arc path

## Installation

```bash
pnpm add @svg-fns/math
```

**_or_**

```bash
npm install @svg-fns/math
```

## Usage

```ts
import {
  translationMatrix,
  scaleMatrix,
  composeMatrices,
  applyMatrixToPoint,
  distance,
  arcPath,
} from "@svg-fns/math";

// Compose transforms
const m = composeMatrices(scaleMatrix(2), translationMatrix(5, 0));
const p = applyMatrixToPoint({ x: 1, y: 1 }, m);
console.log(p); // { x: 12, y: 2 }

// Geometry
console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 })); // 5

// Path
const d = arcPath(0, 0, 50, 0, Math.PI / 2);
console.log(d); // "M ... A ..."
```

## Tests

```bash
pnpm test
```

Fully covered with **Vitest**.

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>

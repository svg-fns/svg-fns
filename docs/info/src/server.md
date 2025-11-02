---
layout: default
title: Server
parent: Src
nav_order: 350
---

# info/src/server

## Functions

### getSvgBBox()

> **getSvgBBox**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`DOMRect`](https://developer.mozilla.org/docs/Web/API/DOMRect)\>

Defined in: [packages/info/src/server.ts:75](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/info/src/server.ts#L75)

Get the bounding box of an SVG element and its children.

- **Browser:** Uses native `getBBox()` (accurate, sync).
- **Node.js with `@resvg/resvg-js`:** Uses the Rust engine for accuracy.
- **Node.js without Resvg:** Falls back to recursive approximation.

⚠️ Always returns a `Promise<DOMRect>` for API consistency across environments.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`DOMRect`](https://developer.mozilla.org/docs/Web/API/DOMRect)\>

#### Example

```ts
const bbox = await getSvgBBox(svgElement);
console.log(bbox.width, bbox.height);
```

***

### getSvgBBoxApproximation()

> **getSvgBBoxApproximation**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): [`DOMRect`](https://developer.mozilla.org/docs/Web/API/DOMRect)

Defined in: [packages/info/src/server.ts:30](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/info/src/server.ts#L30)

**`Internal`**

Compute a rough bounding box approximation by recursively traversing children.

- Uses `getBBox()` where available.
- Returns `{0,0,0,0}` for elements without geometry.

 Exported for advanced users.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

#### Returns

[`DOMRect`](https://developer.mozilla.org/docs/Web/API/DOMRect)

***

### getSvgBBoxResvg()

> **getSvgBBoxResvg**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`DOMRect`](https://developer.mozilla.org/docs/Web/API/DOMRect)\>

Defined in: [packages/info/src/server.ts:12](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/info/src/server.ts#L12)

**`Internal`**

Compute a bounding box using `@resvg/resvg-js`.

- Accurate and transformation-aware.
- Async import — always returns a `Promise<DOMRect>`.

 Exported for advanced users.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`DOMRect`](https://developer.mozilla.org/docs/Web/API/DOMRect)\>

***

### getSvgColors()

> **getSvgColors**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): \{ `colors`: `string`[]; `fills`: `string`[]; `strokes`: `string`[]; \}

Defined in: [packages/info/src/server.ts:122](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/info/src/server.ts#L122)

Extract all unique fill and stroke colors from an SVG element.

- **Browser:** Uses computed styles (high fidelity).
- **Node.js:** Uses attributes (approximation).

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

#### Returns

\{ `colors`: `string`[]; `fills`: `string`[]; `strokes`: `string`[]; \}

##### colors

> **colors**: `string`[]

##### fills

> **fills**: `string`[]

##### strokes

> **strokes**: `string`[]

#### Example

```ts
const { fills, strokes, colors } = getSvgColors(svgElement);
```

***

### getSvgColorsNode()

> **getSvgColorsNode**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): \{ `colors`: `string`[]; `fills`: `string`[]; `strokes`: `string`[]; \}

Defined in: [packages/info/src/server.ts:92](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/info/src/server.ts#L92)

Extract fill & stroke colors from attributes (Node.js fallback).

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

#### Returns

\{ `colors`: `string`[]; `fills`: `string`[]; `strokes`: `string`[]; \}

##### colors

> **colors**: `string`[]

##### fills

> **fills**: `string`[]

##### strokes

> **strokes**: `string`[]

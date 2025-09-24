---
layout: default
title: Info
parent: Info
nav_order: 222
---

# info/src/info

## Functions

### getSvgAspectRatio()

> **getSvgAspectRatio**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): `number`

Defined in: [packages/info/src/info.ts:58](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/info/src/info.ts#L58)

Get the aspect ratio (`width ÷ height`) of an SVG element.

- Uses `getSvgDimensions` internally.
- Returns `Infinity` if height is `0`.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

#### Returns

`number`

#### Example

```ts
const ratio = getSvgAspectRatio(svgElement); // e.g. 1.777...
```

***

### getSvgBBox()

> **getSvgBBox**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`DOMRect`](https://developer.mozilla.org/docs/Web/API/DOMRect)\>

Defined in: [packages/info/src/info.ts:134](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/info/src/info.ts#L134)

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

Defined in: [packages/info/src/info.ts:89](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/info/src/info.ts#L89)

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

Defined in: [packages/info/src/info.ts:71](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/info/src/info.ts#L71)

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

Defined in: [packages/info/src/info.ts:217](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/info/src/info.ts#L217)

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

### getSvgColorsBrowser()

> **getSvgColorsBrowser**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): \{ `colors`: `string`[]; `fills`: `string`[]; `strokes`: `string`[]; \}

Defined in: [packages/info/src/info.ts:164](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/info/src/info.ts#L164)

Extract fill & stroke colors using computed styles (browser only) - high fidelity.

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

***

### getSvgColorsNode()

> **getSvgColorsNode**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): \{ `colors`: `string`[]; `fills`: `string`[]; `strokes`: `string`[]; \}

Defined in: [packages/info/src/info.ts:187](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/info/src/info.ts#L187)

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

***

### getSvgDimensions()

> **getSvgDimensions**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): \{ `height`: `number`; `width`: `number`; \}

Defined in: [packages/info/src/info.ts:32](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/info/src/info.ts#L32)

Get the width and height of an SVG element.

- Prefers explicit `width` / `height` attributes.
- Falls back to `viewBox` if dimensions are missing.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

#### Returns

\{ `height`: `number`; `width`: `number`; \}

##### height

> **height**: `number`

##### width

> **width**: `number`

#### Example

```ts
const { width, height } = getSvgDimensions(svgElement);
```

***

### isValidColor()

> **isValidColor**(`color`: `null` \| `string`): `color is string`

Defined in: [packages/info/src/info.ts:153](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/info/src/info.ts#L153)

Validate whether a color string is meaningful.

- Filters out `"none"`, `"transparent"`, CSS URL refs, and fully transparent rgba.

#### Parameters

##### color

`null` | `string`

#### Returns

`color is string`

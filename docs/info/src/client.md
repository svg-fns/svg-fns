---
layout: default
title: Client
parent: Src
nav_order: 349
---

# info/src/client

## Functions

### getSvgAspectRatio()

> **getSvgAspectRatio**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): `number`

Defined in: [packages/info/src/client.ts:59](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/info/src/client.ts#L59)

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

### getSvgColors()

> **getSvgColors**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): \{ `colors`: `string`[]; `fills`: `string`[]; `strokes`: `string`[]; \}

Defined in: [packages/info/src/client.ts:67](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/info/src/client.ts#L67)

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

### getSvgDimensions()

> **getSvgDimensions**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): \{ `height`: `number`; `width`: `number`; \}

Defined in: [packages/info/src/client.ts:33](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/info/src/client.ts#L33)

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

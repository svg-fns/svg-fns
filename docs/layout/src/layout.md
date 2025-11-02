---
layout: default
title: Layout
parent: Layout
nav_order: 360
---

# layout/src/layout

## Functions

### centerSvg()

> **centerSvg**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `opts?`: \{ `mutate?`: `boolean`; `round?`: `boolean`; \}): `null` \| [`Rect`](../../types/src.md#rect)

Defined in: [packages/layout/src/layout.ts:380](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L380)

Center viewBox around content center.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

##### opts?

Options (mutate, round)

###### mutate?

`boolean`

###### round?

`boolean`

#### Returns

`null` \| [`Rect`](../../types/src.md#rect)

***

### computeTrimBox()

> **computeTrimBox**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `padding`: [`Padding`](../../types/src.md#padding), `clipToViewBox`: `boolean`): [`Rect`](../../types/src.md#rect)

Defined in: [packages/layout/src/layout.ts:228](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L228)

Compute trim box (tight content box + padding).

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

##### padding

[`Padding`](../../types/src.md#padding) = `0`

Padding

##### clipToViewBox

`boolean` = `false`

#### Returns

[`Rect`](../../types/src.md#rect)

#### Link

***

### fitSvg()

> **fitSvg**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `targetW`: `number`, `targetH`: `number`, `opts?`: \{ `mutate?`: `boolean`; `padding?`: [`Padding`](../../types/src.md#padding); `round?`: `boolean`; \}): `null` \| [`Rect`](../../types/src.md#rect)

Defined in: [packages/layout/src/layout.ts:408](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L408)

Fit content into target rect (preserve aspect ratio).

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

##### targetW

`number`

Target width

##### targetH

`number`

Target height

##### opts?

Options (mutate, padding, round)

###### mutate?

`boolean`

###### padding?

[`Padding`](../../types/src.md#padding)

###### round?

`boolean`

#### Returns

`null` \| [`Rect`](../../types/src.md#rect)

***

### getBBoxWithTransform()

> **getBBoxWithTransform**(`el`: [`SVGGraphicsElement`](https://developer.mozilla.org/docs/Web/API/SVGGraphicsElement)): [`Rect`](../../types/src.md#rect)

Defined in: [packages/layout/src/layout.ts:164](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L164)

Compute the bounding box of an SVG element with its current transform matrix applied.

Unlike `element.getBBox()`, which ignores transforms (scale, rotate, translate),
this function projects the element's local bounding box into the SVG's coordinate
system by applying the element's `CTM` (current transformation matrix).

#### Parameters

##### el

[`SVGGraphicsElement`](https://developer.mozilla.org/docs/Web/API/SVGGraphicsElement)

Any SVGGraphicsElement (e.g., \<path\>, \<text\>, \<rect\>, \<g\>, \<image\>, …)

#### Returns

[`Rect`](../../types/src.md#rect)

The transformed bounding box as { x, y, width, height }

#### Example

```ts
const svg = document.querySelector("svg")!;
const text = svg.querySelector("text")!;
const box = getBBoxWithTransform(text);
console.log(box); // Correct bounds, accounting for transform="scale(.1)"
```

#### Remarks

- Throws if the element does not support `getBBox()`.
- Returns the raw transformed box; if you need union across multiple elements,
  compose with a `unionRects` utility.

***

### getContentBBox()

> **getContentBBox**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `clipToViewBox`: `boolean`): [`Rect`](../../types/src.md#rect)

Defined in: [packages/layout/src/layout.ts:204](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L204)

Compute a tight bounding box of SVG content.
- Starts with root \<svg\> getBBox()
- Optionally expands to children that extend beyond root

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

The SVG element to compute content bounds for

##### clipToViewBox

`boolean` = `false`

If true, only use root \<svg\> bbox

#### Returns

[`Rect`](../../types/src.md#rect)

Rect bounding all visible graphics

#### See

https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox

***

### getDimensions()

> **getDimensions**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `context?`: \{ `fontSize?`: `number`; \}): \{ `height`: `null` \| `number`; `width`: `null` \| `number`; \}

Defined in: [packages/layout/src/layout.ts:111](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L111)

Read width/height attributes.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

##### context?

###### fontSize?

`number`

#### Returns

\{ `height`: `null` \| `number`; `width`: `null` \| `number`; \}

or nulls

##### height

> **height**: `null` \| `number`

##### width

> **width**: `null` \| `number`

***

### getViewBox()

> **getViewBox**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)): `null` \| [`Rect`](../../types/src.md#rect)

Defined in: [packages/layout/src/layout.ts:35](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L35)

Read current viewBox of an SVG.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

#### Returns

`null` \| [`Rect`](../../types/src.md#rect)

Rect or null

***

### parseDimension()

> **parseDimension**(`v`: `null` \| `string`, `context?`: \{ `fontSize?`: `number`; \}): `null` \| `number`

Defined in: [packages/layout/src/layout.ts:70](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L70)

Parse dimension string into pixels where possible.
- Supports: unitless, px, vh, vw (requires `window`)
- Supports: em, rem (requires optional `fontSize` context)
- Throws on unsupported units or missing context

#### Parameters

##### v

Attribute string

`null` | `string`

##### context?

Optional: \{ fontSize?: number \} for em/rem

###### fontSize?

`number`

#### Returns

`null` \| `number`

number in px, or null if empty

***

### parseViewBox()

> **parseViewBox**(`vb`: `null` \| `string`): `null` \| [`Rect`](../../types/src.md#rect)

Defined in: [packages/layout/src/layout.ts:17](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L17)

Parse a `viewBox` string into a rect.

#### Parameters

##### vb

viewBox attribute string

`null` | `string`

#### Returns

`null` \| [`Rect`](../../types/src.md#rect)

Rect or null if invalid

#### Link

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox

***

### scaleViewBox()

> **scaleViewBox**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `factor`: `number`, `cx?`: `number`, `cy?`: `number`, `opts?`: \{ `mutate?`: `boolean`; `round?`: `boolean`; \}): `null` \| [`Rect`](../../types/src.md#rect)

Defined in: [packages/layout/src/layout.ts:310](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L310)

Scale (zoom) current viewBox.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

##### factor

`number`

Zoom factor (\>0)

##### cx?

`number`

Optional center x

##### cy?

`number`

Optional center y

##### opts?

Options (mutate, round)

###### mutate?

`boolean`

###### round?

`boolean`

#### Returns

`null` \| [`Rect`](../../types/src.md#rect)

***

### setViewBox()

> **setViewBox**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `rect`: [`Rect`](../../types/src.md#rect), `opts?`: \{ `preserveAspectRatio?`: `string`; `round?`: `boolean`; \}): `void`

Defined in: [packages/layout/src/layout.ts:45](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L45)

Set SVG viewBox (and optionally preserveAspectRatio).

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

##### rect

[`Rect`](../../types/src.md#rect)

Rect to set

##### opts?

Options (round, preserveAspectRatio)

###### preserveAspectRatio?

`string`

###### round?

`boolean`

#### Returns

`void`

***

### setViewBoxTransform()

> **setViewBoxTransform**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `matrix`: [`Matrix`](../../types/src.md#matrix), `opts?`: \{ `mutate?`: `boolean`; `round?`: `boolean`; \}): `null` \| [`Rect`](../../types/src.md#rect)

Defined in: [packages/layout/src/layout.ts:347](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L347)

Apply matrix transform to viewBox.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

##### matrix

[`Matrix`](../../types/src.md#matrix)

Affine matrix

##### opts?

Options (mutate, round)

###### mutate?

`boolean`

###### round?

`boolean`

#### Returns

`null` \| [`Rect`](../../types/src.md#rect)

***

### tightlyCropSvg()

> **tightlyCropSvg**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `opts?`: \{ `clipToViewBox?`: `boolean`; `mutate?`: `boolean`; `padding?`: [`Padding`](../../types/src.md#padding); `preserveDimensions?`: `boolean`; `round?`: `boolean`; \}): \{ `apply`: (`target?`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)) => [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement); `box`: [`Rect`](../../types/src.md#rect); \}

Defined in: [packages/layout/src/layout.ts:250](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L250)

Tightly crop an SVG to content.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

##### opts?

Options (padding, mutate, preserveDimensions, round)

###### clipToViewBox?

`boolean`

###### mutate?

`boolean`

###### padding?

[`Padding`](../../types/src.md#padding)

###### preserveDimensions?

`boolean`

###### round?

`boolean`

#### Returns

\{ `apply`: (`target?`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)) => [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement); `box`: [`Rect`](../../types/src.md#rect); \}

where apply() applies crop

##### apply()

> **apply**: (`target?`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)) => [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

###### Parameters

###### target?

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

###### Returns

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

##### box

> **box**: [`Rect`](../../types/src.md#rect)

***

### translateViewBox()

> **translateViewBox**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `dx`: `number`, `dy`: `number`, `opts?`: \{ `mutate?`: `boolean`; `round?`: `boolean`; \}): `null` \| [`Rect`](../../types/src.md#rect)

Defined in: [packages/layout/src/layout.ts:283](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L283)

Translate current viewBox.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

##### dx

`number`

Delta x

##### dy

`number`

Delta y

##### opts?

Options (mutate, round)

###### mutate?

`boolean`

###### round?

`boolean`

#### Returns

`null` \| [`Rect`](../../types/src.md#rect)

***

### updateDimensions()

> **updateDimensions**(`svg`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `width?`: `null` \| `number`, `height?`: `null` \| `number`): `void`

Defined in: [packages/layout/src/layout.ts:128](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/layout/src/layout.ts#L128)

Update width/height attributes.

#### Parameters

##### svg

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

SVG element

##### width?

New width (optional)

`null` | `number`

##### height?

New height (optional)

`null` | `number`

#### Returns

`void`

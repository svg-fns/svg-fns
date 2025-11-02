---
layout: default
title: Browser
parent: Src
nav_order: 380
---

# utils/src/browser

## Functions

### blobToDataURL()

> **blobToDataURL**(`blob`: [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/utils/src/browser.ts:8](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/browser.ts#L8)

Convert a browser `Blob` into a base64 data URL.

#### Parameters

##### blob

[`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)

The Blob to convert

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

A promise resolving to a data URL string

***

### canvasToBlob()

> **canvasToBlob**(`canvas`: [`OffscreenCanvas`](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas) \| [`HTMLCanvasElement`](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement), `mimeType`: `undefined` \| `string`, `quality`: `number`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)\>

Defined in: [packages/utils/src/browser.ts:24](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/browser.ts#L24)

Convert a canvas to a Blob (supports OffscreenCanvas and HTMLCanvasElement).

#### Parameters

##### canvas

Canvas instance

[`OffscreenCanvas`](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas) | [`HTMLCanvasElement`](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement)

##### mimeType

MIME type (e.g. "image/png")

`undefined` | `string`

##### quality

`number` = `0.92`

0–1 quality for lossy formats

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)\>

A Promise resolving to a Blob

***

### isValidRect()

> **isValidRect**(`__namedParameters`: [`Rect`](../../types/src.md#rect) \| [`DOMRect`](https://developer.mozilla.org/docs/Web/API/DOMRect)): `boolean`

Defined in: [packages/utils/src/browser.ts:70](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/browser.ts#L70)

Check if rect has finite coords.

#### Parameters

##### \_\_namedParameters

[`Rect`](../../types/src.md#rect) | [`DOMRect`](https://developer.mozilla.org/docs/Web/API/DOMRect)

#### Returns

`boolean`

***

### rectBottom()

> **rectBottom**(`r`: [`Rect`](../../types/src.md#rect)): `number`

Defined in: [packages/utils/src/browser.ts:81](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/browser.ts#L81)

Get bottom edge of a rect.

#### Parameters

##### r

[`Rect`](../../types/src.md#rect)

#### Returns

`number`

***

### rectRight()

> **rectRight**(`r`: [`Rect`](../../types/src.md#rect)): `number`

Defined in: [packages/utils/src/browser.ts:76](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/browser.ts#L76)

Get right edge of a rect.

#### Parameters

##### r

[`Rect`](../../types/src.md#rect)

#### Returns

`number`

***

### roundIf()

> **roundIf**(`n`: `number`, `round`: `boolean`): `number`

Defined in: [packages/utils/src/browser.ts:64](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/browser.ts#L64)

Rounds a number to 3 decimals by default.
- Enabled = true (default)
- Disable only for advanced/extreme cases

#### Parameters

##### n

`number`

##### round

`boolean` = `true`

#### Returns

`number`

***

### toPadding()

> **toPadding**(`p`: [`Padding`](../../types/src.md#padding)): \{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}

Defined in: [packages/utils/src/browser.ts:54](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/browser.ts#L54)

Normalize padding input into full edge object.

#### Parameters

##### p

[`Padding`](../../types/src.md#padding) = `0`

Padding shorthand (number or object)

#### Returns

\{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}

Padding object with top/right/bottom/left

##### bottom

> **bottom**: `number`

##### left

> **left**: `number`

##### right

> **right**: `number`

##### top

> **top**: `number`

***

### unionRects()

> **unionRects**(`a`: [`Rect`](../../types/src.md#rect), `b`: [`Rect`](../../types/src.md#rect)): [`Rect`](../../types/src.md#rect)

Defined in: [packages/utils/src/browser.ts:90](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/browser.ts#L90)

Compute union of two rects.

#### Parameters

##### a

[`Rect`](../../types/src.md#rect)

First rect

##### b

[`Rect`](../../types/src.md#rect)

Second rect

#### Returns

[`Rect`](../../types/src.md#rect)

Bounding rect covering both

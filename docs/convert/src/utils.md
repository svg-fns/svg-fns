---
layout: default
title: Utils
parent: Src
nav_order: 218
---

# convert/src/utils

## Variables

### DEFAULT\_OPTIONS

> `const` **DEFAULT\_OPTIONS**: \{ `fit`: [`Fit`](convert.md#fit-1); `format`: [`Format`](convert.md#format-1); `quality`: `number`; `scale`: `number`; \}

Defined in: [packages/convert/src/utils.ts:36](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/utils.ts#L36)

#### Type Declaration

##### fit

> **fit**: [`Fit`](convert.md#fit-1)

##### format

> **format**: [`Format`](convert.md#format-1)

##### quality

> **quality**: `number` = `0.92`

##### scale

> **scale**: `number` = `1`

## Functions

### blobToDataURLBrowser()

> **blobToDataURLBrowser**(`blob`: [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/convert/src/utils.ts:3](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/utils.ts#L3)

#### Parameters

##### blob

[`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

***

### canvasToBlob()

> **canvasToBlob**(`isOffscreenCanvas`: `boolean`, `canvas`: [`OffscreenCanvas`](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas) \| [`HTMLCanvasElement`](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement), `mimeType`: `undefined` \| `string`, `quality`: `number`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)\>

Defined in: [packages/convert/src/utils.ts:11](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/utils.ts#L11)

#### Parameters

##### isOffscreenCanvas

`boolean`

##### canvas

[`OffscreenCanvas`](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas) | [`HTMLCanvasElement`](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement)

##### mimeType

`undefined` | `string`

##### quality

`number`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)\>

***

### parseOptions()

> **parseOptions**(`opts?`: [`Options`](convert.md#options)): \{ `fit`: [`Fit`](convert.md#fit-1); `format`: [`Format`](convert.md#format-1); `quality`: `number`; `scale`: `number`; \} & [`SvgConversionOptions`](convert.md#svgconversionoptions)

Defined in: [packages/convert/src/utils.ts:43](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/utils.ts#L43)

#### Parameters

##### opts?

[`Options`](convert.md#options)

#### Returns

\{ `fit`: [`Fit`](convert.md#fit-1); `format`: [`Format`](convert.md#format-1); `quality`: `number`; `scale`: `number`; \} & [`SvgConversionOptions`](convert.md#svgconversionoptions)

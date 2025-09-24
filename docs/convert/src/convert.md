---
layout: default
title: Convert
parent: Src
nav_order: 217
---

# convert/src/convert

## Interfaces

### SvgConversionOptions

Defined in: [packages/convert/src/convert.ts:23](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L23)

Options to control SVG conversion output.

#### Properties

##### background?

> `optional` **background**: `string`

Defined in: [packages/convert/src/convert.ts:40](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L40)

Fill background color (e.g., "#fff"). Useful for formats without transparency (jpeg).

##### fit?

> `optional` **fit**: [`Fit`](#fit-1)

Defined in: [packages/convert/src/convert.ts:50](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L50)

How the image should be resized to fit the target dimensions:

- **cover**   → Scale to fully cover the box, cropping if necessary.
- **contain** → Scale to fit entirely inside the box, letterboxing if needed.
- **fill**    → Stretch to exactly match width/height, ignoring aspect ratio.
- **inside**  → Like "contain", but never upscale (only shrink if too large).
- **outside** → Like "cover", but never downscale (only grow if too small).

##### format?

> `optional` **format**: [`Format`](#format-1)

Defined in: [packages/convert/src/convert.ts:25](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L25)

Output format. Defaults to "svg".

##### height?

> `optional` **height**: `number`

Defined in: [packages/convert/src/convert.ts:34](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L34)

Target height in pixels. Defaults to intrinsic SVG height.

##### quality?

> `optional` **quality**: `number`

Defined in: [packages/convert/src/convert.ts:28](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L28)

Output quality (0–1). Only applies to lossy formats like jpeg/webp. Default: 0.92

##### scale?

> `optional` **scale**: `number`

Defined in: [packages/convert/src/convert.ts:37](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L37)

Scaling factor for width/height. Useful for high-DPI rendering. Default: 1

##### width?

> `optional` **width**: `number`

Defined in: [packages/convert/src/convert.ts:31](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L31)

Target width in pixels. Defaults to intrinsic SVG width.

## Type Aliases

### Fit

> **Fit** = `"cover"` \| `"contain"` \| `"fill"` \| `"inside"` \| `"outside"`

Defined in: [packages/convert/src/convert.ts:18](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L18)

How the image should be resized to fit the target dimensions:

- **cover**   → Scale to fully cover the box, cropping if necessary.
- **contain** → Scale to fit entirely inside the box, letterboxing if needed.
- **fill**    → Stretch to exactly match width/height, ignoring aspect ratio.
- **inside**  → Like "contain", but never upscale (only shrink if too large).
- **outside** → Like "cover", but never downscale (only grow if too small).

***

### Format

> **Format** = `"png"` \| `"jpeg"` \| `"webp"` \| `"avif"` \| `"svg"`

Defined in: [packages/convert/src/convert.ts:7](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L7)

Supported output formats for SVG conversion.
`avif` requires modern browsers or Node; falls back if unsupported.

***

### Options

> **Options** = [`SvgConversionOptions`](#svgconversionoptions) \| [`Format`](#format-1) \| [`Fit`](#fit-1) \| `number`

Defined in: [packages/convert/src/convert.ts:53](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L53)

## Functions

### svgToBlob()

> **svgToBlob**(`svg`: `string`, `opts?`: [`Options`](#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)\>

Defined in: [packages/convert/src/convert.ts:61](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L61)

Converts an SVG string to a Blob (browser).

#### Parameters

##### svg

`string`

The SVG content as a string.

##### opts?

[`Options`](#options)

Conversion options.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)\>

A Promise that resolves with a Blob representing the converted image.

***

### svgToBuffer()

> **svgToBuffer**(`svg`: `string`, `opts?`: [`Options`](#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [packages/convert/src/convert.ts:144](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L144)

Converts an SVG string to a Buffer (Node.js).

#### Parameters

##### svg

`string`

The SVG content as a string.

##### opts?

[`Options`](#options)

Conversion options.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Buffer`\<`ArrayBufferLike`\>\>

A Promise that resolves with a Node.js Buffer of the converted image.

***

### svgToDataUrl()

> **svgToDataUrl**(`svg`: `string`, `opts?`: [`Options`](#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/convert/src/convert.ts:208](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L208)

Converts an SVG string to a Data URL in either environment.
Detects server vs browser automatically.

#### Parameters

##### svg

`string`

SVG content.

##### opts?

[`Options`](#options)

Conversion options.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

A Promise resolving to a base64 Data URL.

***

### svgToDataUrlBrowser()

> **svgToDataUrlBrowser**(`svg`: `string`, `opts?`: [`Options`](#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/convert/src/convert.ts:178](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L178)

Converts an SVG string to a Data URL in the browser.

#### Parameters

##### svg

`string`

SVG content.

##### opts?

[`Options`](#options)

Conversion options.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

A Promise resolving to a base64 Data URL.

***

### svgToDataUrlNode()

> **svgToDataUrlNode**(`svg`: `string`, `opts?`: [`Options`](#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/convert/src/convert.ts:192](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/convert/src/convert.ts#L192)

Converts an SVG string to a Data URL in Node.js.

#### Parameters

##### svg

`string`

SVG content.

##### opts?

[`Options`](#options)

Conversion options.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

A Promise resolving to a base64 Data URL.

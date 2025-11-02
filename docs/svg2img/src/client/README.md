---
layout: default
title: README
parent: Client
nav_order: 374
---

# svg2img/src/client

## Modules

- [\<internal\>](-internal-.md)

## Functions

### downloadSvg()

> **downloadSvg**(`svg`: `string` \| [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `filename?`: `string`, `opts?`: [`Options`](../types.md#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](../types.md#svgconversionresult)\>

Defined in: [packages/svg2img/src/client.ts:247](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/client.ts#L247)

Convert SVG → File Download (Browser).

#### Parameters

##### svg

The SVG markup string.

`string` | [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

##### filename?

`string`

The output filename. Defaults to `"image"`.

##### opts?

[`Options`](../types.md#options)

Conversion options [Options](../types.md#options).

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](../types.md#svgconversionresult)\>

A promise resolving to [SvgConversionResult](../types.md#svgconversionresult). If format is `"svg"`, use `@svg-fns/info`, or `@svg-fns/geometry` to get SVG dimensions or to transform

Downloads the SVG or rasterized image to the user's device.

***

### svgToBlob()

> **svgToBlob**(`svg`: `string`, `opts?`: [`Options`](../types.md#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](../types.md#svgconversionresult)\>

Defined in: [packages/svg2img/src/client.ts:18](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/client.ts#L18)

Convert SVG → Blob in the browser.

#### Parameters

##### svg

`string`

The SVG markup string.

##### opts?

[`Options`](../types.md#options)

Conversion options [Options](../types.md#options).

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](../types.md#svgconversionresult)\>

A promise resolving to [SvgConversionResult](../types.md#svgconversionresult). If format is `"svg"`, use `@svg-fns/info`, or `@svg-fns/geometry` to get SVG dimensions or to transform

Notes:
- Prefers `OffscreenCanvas` for better performance; falls back to `<canvas>` if unavailable.
- If `format === "svg"` → returns the raw Blob; **width, height, scale are undefined**
  (no rasterization performed). Options like `fit` and `scale` are ignored.
- Ideal for client-side exports, downloads, and previews.

***

### svgToBlobWorkerLogic()

> **svgToBlobWorkerLogic**(`data`: [`WorkerInput`](-internal-.md#workerinput)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](../types.md#svgconversionresult)\>

Defined in: [packages/svg2img/src/client.ts:123](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/client.ts#L123)

Core function to convert SVG to a rasterized Blob, intended EXCLUSIVELY for use
inside a Web Worker thread.
* It bypasses main-thread APIs (Image, document.createElement, URL.createObjectURL)
in favor of high-performance worker APIs (OffscreenCanvas, createImageBitmap).
*

#### Parameters

##### data

[`WorkerInput`](-internal-.md#workerinput)

An object containing the SVG markup and conversion options.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](../types.md#svgconversionresult)\>

A promise resolving to the SvgConversionResult containing the rasterized Blob.

***

### svgToDataUrl()

> **svgToDataUrl**(`svg`: `string`, `opts?`: [`Options`](../types.md#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](../types.md#svgconversionresult)\>

Defined in: [packages/svg2img/src/client.ts:227](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/client.ts#L227)

Convert SVG → Data URL (Browser).

#### Parameters

##### svg

`string`

The SVG markup string.

##### opts?

[`Options`](../types.md#options)

Conversion options [Options](../types.md#options).

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](../types.md#svgconversionresult)\>

A promise resolving to [SvgConversionResult](../types.md#svgconversionresult). If format is `"svg"`, use `@svg-fns/info`, or `@svg-fns/geometry` to get SVG dimensions or to transform

Encodes output as `data:image/...;base64,...` for direct embedding in:
- `<img>` tags
- CSS backgrounds
- DOCX documents (via [mdast2docx](https://github.com/md2docx/mdast2docx))

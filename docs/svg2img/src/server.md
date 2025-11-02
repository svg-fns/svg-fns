---
layout: default
title: Server
parent: Src
nav_order: 369
---

# svg2img/src/server

## Functions

### svgToBuffer()

> **svgToBuffer**(`svg`: `string`, `opts?`: [`Options`](types.md#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](types.md#svgconversionresult)\>

Defined in: [packages/svg2img/src/server.ts:21](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/server.ts#L21)

Convert SVG → Buffer (Node.js).

#### Parameters

##### svg

`string`

The SVG markup string.

##### opts?

[`Options`](types.md#options)

Conversion options.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](types.md#svgconversionresult)\>

A promise resolving to [SvgConversionResult](types.md#svgconversionresult).

Behavior:
- Uses `sharp` internally for fast rasterization.
- If both `width` and `height` are missing → infers from intrinsic SVG metadata.
- If only one is defined → computes the other using aspect ratio × scale factor.
- If `format === "svg"` → simply returns a raw `Buffer`.

***

### svgToDataUrl()

> **svgToDataUrl**(`svg`: `string`, `opts?`: [`Options`](types.md#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](types.md#svgconversionresult)\>

Defined in: [packages/svg2img/src/server.ts:92](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/server.ts#L92)

Convert SVG → Data URL (Universal).

Auto-detects runtime (Client vs server).

#### Parameters

##### svg

`string`

##### opts?

[`Options`](types.md#options)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](types.md#svgconversionresult)\>

***

### svgToDataUrlServer()

> **svgToDataUrlServer**(`svg`: `string`, `opts?`: [`Options`](types.md#options)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](types.md#svgconversionresult)\>

Defined in: [packages/svg2img/src/server.ts:73](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/server.ts#L73)

Convert SVG → Data URL (Server).

Encodes SVG or rasterized buffer as `data:image/...;base64,...`.
Supports server-side usage: SSR, APIs, CLI tools, or [mdast2docx](https://github.com/md2docx/mdast2docx) pipelines.

#### Parameters

##### svg

`string`

##### opts?

[`Options`](types.md#options)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SvgConversionResult`](types.md#svgconversionresult)\>

## References

### Fit

Re-exports [Fit](types.md#fit-1)

***

### Format

Re-exports [Format](types.md#format-2)

***

### Options

Re-exports [Options](types.md#options)

***

### SvgConversionOptions

Re-exports [SvgConversionOptions](types.md#svgconversionoptions)

***

### SvgConversionResult

Re-exports [SvgConversionResult](types.md#svgconversionresult)

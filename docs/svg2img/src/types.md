---
layout: default
title: Types
parent: Src
nav_order: 370
---

# svg2img/src/types

## Interfaces

### SvgConversionOptions

Defined in: [packages/svg2img/src/types.ts:25](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L25)

Options for SVG → image conversion.

#### Properties

##### background?

> `optional` **background**: `string`

Defined in: [packages/svg2img/src/types.ts:42](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L42)

Background color (e.g. `"#fff"`). Recommended for non-transparent formats like `jpeg`.

##### fit?

> `optional` **fit**: [`Fit`](#fit-1)

Defined in: [packages/svg2img/src/types.ts:52](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L52)

Resizing mode:
- `"cover"`   → Fill box completely, crop overflow
- `"contain"` → Fit inside box, may letterbox
- `"fill"`    → Stretch to exact size, ignore aspect ratio
- `"inside"`  → Like contain, but never upscale
- `"outside"` → Like cover, but never downscale

##### format?

> `optional` **format**: [`Format`](#format-2)

Defined in: [packages/svg2img/src/types.ts:27](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L27)

Output format. Default: `"svg"`.

##### height?

> `optional` **height**: `number`

Defined in: [packages/svg2img/src/types.ts:36](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L36)

Target height in px. Default: intrinsic SVG height.

##### quality?

> `optional` **quality**: `number`

Defined in: [packages/svg2img/src/types.ts:30](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L30)

Quality factor (0–1). Applies only to lossy formats (`jpeg`/`webp`/`avif`). Default: `0.92`.

##### scale?

> `optional` **scale**: `number`

Defined in: [packages/svg2img/src/types.ts:39](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L39)

Scale factor applied to width/height. Default: `1`.

##### width?

> `optional` **width**: `number`

Defined in: [packages/svg2img/src/types.ts:33](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L33)

Target width in px. Default: intrinsic SVG width.

***

### SvgConversionResult

Defined in: [packages/svg2img/src/types.ts:61](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L61)

Standardized result from all conversion functions.

#### Properties

##### blob?

> `optional` **blob**: [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)

Defined in: [packages/svg2img/src/types.ts:63](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L63)

Blob (Client only).

##### buffer?

> `optional` **buffer**: `Buffer`\<`ArrayBufferLike`\>

Defined in: [packages/svg2img/src/types.ts:65](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L65)

Buffer (Server only).

##### dataUrl?

> `optional` **dataUrl**: `string`

Defined in: [packages/svg2img/src/types.ts:67](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L67)

Base64 data URL (works in all envs).

##### format

> **format**: [`Format`](#format-2)

Defined in: [packages/svg2img/src/types.ts:73](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L73)

Output format.

##### height?

> `optional` **height**: `number`

Defined in: [packages/svg2img/src/types.ts:71](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L71)

Final height after resizing/scaling.

##### scale?

> `optional` **scale**: `number`

Defined in: [packages/svg2img/src/types.ts:75](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L75)

Applied scale factor.

##### width?

> `optional` **width**: `number`

Defined in: [packages/svg2img/src/types.ts:69](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L69)

Final width after resizing/scaling.

## Type Aliases

### Fit

> **Fit** = `"cover"` \| `"contain"` \| `"fill"` \| `"inside"` \| `"outside"`

Defined in: [packages/svg2img/src/types.ts:20](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L20)

Strategies for fitting SVG into target dimensions.
- **cover**   → Fill box completely, cropping overflow.
- **contain** → Fit entirely inside, may letterbox.
- **fill**    → Stretch to match box exactly (ignore aspect ratio).
- **inside**  → Like contain, but never upscale.
- **outside** → Like cover, but never downscale.

***

### Format

> **Format** = `"png"` \| `"jpg"` \| `"jpeg"` \| `"webp"` \| `"avif"` \| `"svg"`

Defined in: [packages/svg2img/src/types.ts:10](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L10)

Supported output formats for SVG → image conversion.

- **Raster**: `"png"`, `"jpeg"`, `"jpg"`, `"webp"`, `"avif"`
- **Vector**: `"svg"` (fastest, no quality loss)

⚠️ `"avif"` requires modern browsers or Node.js with AVIF support.
Falls back to `"png"` if unsupported.

***

### Options

> **Options** = [`SvgConversionOptions`](#svgconversionoptions) \| [`Format`](#format-2) \| [`Fit`](#fit-1) \| `number`

Defined in: [packages/svg2img/src/types.ts:56](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/types.ts#L56)

Shorthand option type: `SvgConversionOptions | Format | Fit | quality (0 - 1)`.

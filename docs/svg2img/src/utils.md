---
layout: default
title: Utils
parent: Src
nav_order: 371
---

# svg2img/src/utils

## Variables

### DEFAULT\_OPTIONS

> `const` **DEFAULT\_OPTIONS**: \{ `fit`: [`Fit`](types.md#fit-1); `format`: [`Format`](types.md#format-2); `quality`: `number`; `scale`: `number`; \}

Defined in: [packages/svg2img/src/utils.ts:4](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/utils.ts#L4)

Default SVG conversion options

#### Type Declaration

##### fit

> **fit**: [`Fit`](types.md#fit-1)

##### format

> **format**: [`Format`](types.md#format-2)

##### quality

> **quality**: `number` = `0.92`

##### scale

> **scale**: `number` = `1`

## Functions

### parseOptions()

> **parseOptions**(`opts?`: [`Options`](types.md#options)): \{ `fit`: [`Fit`](types.md#fit-1); `format`: [`Format`](types.md#format-2); `quality`: `number`; `scale`: `number`; \} & [`SvgConversionOptions`](types.md#svgconversionoptions)

Defined in: [packages/svg2img/src/utils.ts:18](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/utils.ts#L18)

Normalize conversion options to a full object.

Supports shorthand:
- String → format or fit
- Number → quality

#### Parameters

##### opts?

[`Options`](types.md#options)

#### Returns

\{ `fit`: [`Fit`](types.md#fit-1); `format`: [`Format`](types.md#format-2); `quality`: `number`; `scale`: `number`; \} & [`SvgConversionOptions`](types.md#svgconversionoptions)

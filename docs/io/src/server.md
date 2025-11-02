---
layout: default
title: Server
parent: Src
nav_order: 355
---

# io/src/server

## Functions

### loadSvg()

> **loadSvg**(`input`: `string` \| [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob) \| [`File`](https://developer.mozilla.org/docs/Web/API/File) \| [`URL`](https://developer.mozilla.org/docs/Web/API/URL), `config`: [`IOConfig`](types.md#ioconfig)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)\>

Defined in: [packages/io/src/server.ts:102](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/server.ts#L102)

Load an SVG from a string, File, Blob, or URL.

#### Parameters

##### input

`string` | [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob) | [`File`](https://developer.mozilla.org/docs/Web/API/File) | [`URL`](https://developer.mozilla.org/docs/Web/API/URL)

##### config

[`IOConfig`](types.md#ioconfig) = `{}`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)\>

#### Remarks

- Browser: supports string, File, Blob, and URL.
- Node.js: supports string and URL (via fetch).
- Does **not** handle fs/path directly — keeps API universal.

#### Throws

Error if input is invalid or root element is not \<svg\>.

***

### parseSvg()

> **parseSvg**(`svgString`: `string`, `config`: [`IOConfig`](types.md#ioconfig)): [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)\>

Defined in: [packages/io/src/server.ts:69](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/server.ts#L69)

Universal parser: auto-chooses browser or Node implementation.

#### Parameters

##### svgString

`string`

##### config

[`IOConfig`](types.md#ioconfig) = `{}`

#### Returns

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)\>

***

### parseSvgServer()

> **parseSvgServer**(`svgString`: `string`, `config`: [`IOConfig`](types.md#ioconfig)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)\>

Defined in: [packages/io/src/server.ts:33](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/server.ts#L33)

Parse an SVG string into an SVGSVGElement (Node.js, async).

#### Parameters

##### svgString

`string`

##### config

[`IOConfig`](types.md#ioconfig) = `{}`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)\>

#### Throws

Error if the root element is not \<svg\>.

***

### serializeSvg()

> **serializeSvg**(`element`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `config`: [`IOConfig`](types.md#ioconfig)): `string` \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/io/src/server.ts:82](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/server.ts#L82)

Universal serializer: auto-chooses browser or Node implementation.

#### Parameters

##### element

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

##### config

[`IOConfig`](types.md#ioconfig) = `{}`

#### Returns

`string` \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

***

### serializeSvgServer()

> **serializeSvgServer**(`element`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `config`: [`IOConfig`](types.md#ioconfig)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/io/src/server.ts:55](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/server.ts#L55)

Serialize an SVGSVGElement back to string (Node.js, async).

#### Parameters

##### element

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

##### config

[`IOConfig`](types.md#ioconfig) = `{}`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

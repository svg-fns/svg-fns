---
layout: default
title: Io
parent: Io
nav_order: 226
---

# io/src/io

## Interfaces

### IOConfig

Defined in: [packages/io/src/io.ts:16](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L16)

@svg-fns/io

Feather-light I/O utilities for working with SVG.

📐 Principles
 - No dependencies (uses @xmldom/xmldom only if needed in Node.js, lazy-loaded).
 - Works in both Browser + Node.js.
 - Browser: sync API; optional `unsafe` mode uses innerHTML for speed.
     ⚠️ Security note: In unsafe mode, script execution is only a risk
        once the parsed element is attached to the DOM.
 - Node: async API; loads @xmldom/xmldom at runtime.
 - Dev-friendly errors on invalid input.

#### Properties

##### domParser()?

> `optional` **domParser**: () => [`DOMParser`](https://developer.mozilla.org/docs/Web/API/DOMParser)

Defined in: [packages/io/src/io.ts:18](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L18)

Optional custom DOMParser implementation

###### Returns

[`DOMParser`](https://developer.mozilla.org/docs/Web/API/DOMParser)

##### removeEventHandlers?

> `optional` **removeEventHandlers**: `boolean`

Defined in: [packages/io/src/io.ts:26](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L26)

Strip `on*` event handler attributes (default: true in unsafe mode)

##### removeForeignObject?

> `optional` **removeForeignObject**: `boolean`

Defined in: [packages/io/src/io.ts:28](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L28)

Remove \<foreignObject\> elements (default: false)

##### removeScripts?

> `optional` **removeScripts**: `boolean`

Defined in: [packages/io/src/io.ts:24](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L24)

Remove \<script\> elements (default: true in unsafe mode)

##### strict?

> `optional` **strict**: `boolean`

Defined in: [packages/io/src/io.ts:30](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L30)

Enforce root \<svg\> validation (default: true)

##### unsafe?

> `optional` **unsafe**: `boolean`

Defined in: [packages/io/src/io.ts:22](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L22)

Browser only: use innerHTML for speed (default: false, safe DOMParser used)

##### xmlSerializer()?

> `optional` **xmlSerializer**: () => [`XMLSerializer`](https://developer.mozilla.org/docs/Web/API/XMLSerializer)

Defined in: [packages/io/src/io.ts:20](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L20)

Optional custom XMLSerializer implementation

###### Returns

[`XMLSerializer`](https://developer.mozilla.org/docs/Web/API/XMLSerializer)

## Functions

### loadSvg()

> **loadSvg**(`input`: `string` \| [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob) \| [`File`](https://developer.mozilla.org/docs/Web/API/File) \| [`URL`](https://developer.mozilla.org/docs/Web/API/URL), `config`: [`IOConfig`](#ioconfig)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)\>

Defined in: [packages/io/src/io.ts:246](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L246)

Load an SVG from a string, File, Blob, or URL.

#### Parameters

##### input

`string` | [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob) | [`File`](https://developer.mozilla.org/docs/Web/API/File) | [`URL`](https://developer.mozilla.org/docs/Web/API/URL)

##### config

[`IOConfig`](#ioconfig) = `{}`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)\>

#### Remarks

- Browser: supports string, File, Blob, and URL.
- Node.js: supports string and URL (via fetch).
- Does **not** handle fs/path directly — keeps API universal.

#### Throws

Error if input is invalid or root element is not \<svg\>.

***

### parseSvg()

> **parseSvg**(`svgString`: `string`, `config`: [`IOConfig`](#ioconfig)): [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)\>

Defined in: [packages/io/src/io.ts:209](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L209)

Universal parser: auto-chooses browser or Node implementation.

#### Parameters

##### svgString

`string`

##### config

[`IOConfig`](#ioconfig) = `{}`

#### Returns

[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)\>

***

### parseSvgBrowser()

> **parseSvgBrowser**(`svgString`: `string`, `config`: [`IOConfig`](#ioconfig)): [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)

Defined in: [packages/io/src/io.ts:104](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L104)

Parse an SVG string into an SVGElement (browser).

#### Parameters

##### svgString

`string`

##### config

[`IOConfig`](#ioconfig) = `{}`

#### Returns

[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)

#### Remarks

- Safe mode (default): uses DOMParser.
- Unsafe mode: uses a temporary \<div\>. Faster, but requires sanitization
  since malicious SVGs can contain scripts or handlers.

#### Throws

Error if the root element is not \<svg\> (for `Safe` mode).

***

### parseSvgNode()

> **parseSvgNode**(`svgString`: `string`, `config`: [`IOConfig`](#ioconfig)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)\>

Defined in: [packages/io/src/io.ts:169](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L169)

Parse an SVG string into an SVGElement (Node.js, async).

#### Parameters

##### svgString

`string`

##### config

[`IOConfig`](#ioconfig) = `{}`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)\>

#### Throws

Error if the root element is not \<svg\>.

***

### serializeSvg()

> **serializeSvg**(`element`: [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement), `config`: [`IOConfig`](#ioconfig)): `string` \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/io/src/io.ts:222](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L222)

Universal serializer: auto-chooses browser or Node implementation.

#### Parameters

##### element

[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)

##### config

[`IOConfig`](#ioconfig) = `{}`

#### Returns

`string` \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

***

### serializeSvgBrowser()

> **serializeSvgBrowser**(`element`: [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement), `config`: [`IOConfig`](#ioconfig)): `string`

Defined in: [packages/io/src/io.ts:132](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L132)

Serialize an SVGElement back to string (browser, sync).

#### Parameters

##### element

[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)

##### config

[`IOConfig`](#ioconfig) = `{}`

#### Returns

`string`

#### Remarks

Uses XMLSerializer instead of element.outerHTML to ensure
consistent, standards-compliant output across browsers and Node.js.
outerHTML is simpler but may drop namespaces or produce inconsistent markup.

***

### serializeSvgNode()

> **serializeSvgNode**(`element`: [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement), `config`: [`IOConfig`](#ioconfig)): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/io/src/io.ts:191](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L191)

Serialize an SVGElement back to string (Node.js, async).

#### Parameters

##### element

[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)

##### config

[`IOConfig`](#ioconfig) = `{}`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

***

### unsafeParseSvg()

> **unsafeParseSvg**(`svgString`: `string`, `config`: [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`IOConfig`](#ioconfig), `"removeScripts"` \| `"removeEventHandlers"` \| `"removeForeignObject"`\>): [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)

Defined in: [packages/io/src/io.ts:51](https://github.com/svg-fns/svg-fns/blob/3ca347638e461133d51895b0b1e0a044a65e9288/packages/io/src/io.ts#L51)

Parses an SVG string into an `SVGElement` using an *unsafe* but faster DOM method.

#### Parameters

##### svgString

`string`

##### config

[`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`IOConfig`](#ioconfig), `"removeScripts"` \| `"removeEventHandlers"` \| `"removeForeignObject"`\>

#### Returns

[`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)

#### Remarks

- Parsing itself does **not** execute scripts or handlers, since the element
  is never mounted to the live DOM during this step.
- ⚠️ Security risk arises if the returned element is later attached to the DOM:
  embedded scripts, event handlers, or external references could execute.
- Implementation detail: uses a temporary `<div>` to convert raw SVG markup.
- Recommended only for trusted or pre-sanitized SVG sources.

---
layout: default
title: Client
parent: Src
nav_order: 354
---

# io/src/client

## Functions

### parseSvg()

> **parseSvg**(`svgString`: `string`, `config`: [`IOConfig`](types.md#ioconfig)): [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

Defined in: [packages/io/src/client.ts:85](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/client.ts#L85)

Parse an SVG string into an SVGSVGElement (client side).

#### Parameters

##### svgString

`string`

##### config

[`IOConfig`](types.md#ioconfig) = `{}`

#### Returns

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

#### Remarks

- Safe mode (default): uses DOMParser.
- Unsafe mode: uses a temporary \<div\>. Faster, but requires sanitization
  since malicious SVGs can contain scripts or handlers.

#### Throws

Error if the root element is not \<svg\> (for `Safe` mode).

***

### serializeSvg()

> **serializeSvg**(`element`: [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement), `config`: [`IOConfig`](types.md#ioconfig)): `string`

Defined in: [packages/io/src/client.ts:113](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/client.ts#L113)

Serialize an SVGSVGElement back to string (browser, sync).

#### Parameters

##### element

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

##### config

[`IOConfig`](types.md#ioconfig) = `{}`

#### Returns

`string`

#### Remarks

Uses XMLSerializer instead of element.outerHTML to ensure
consistent, standards-compliant output across browsers and Server.
outerHTML is simpler but may drop namespaces or produce inconsistent markup.

***

### unsafeParseSvg()

> **unsafeParseSvg**(`svgString`: `string`, `config`: [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`IOConfig`](types.md#ioconfig), `"removeScripts"` \| `"removeEventHandlers"` \| `"removeForeignObject"`\>): [`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

Defined in: [packages/io/src/client.ts:32](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/client.ts#L32)

Parses an SVG string into an `SVGSVGElement` using an *unsafe* but faster DOM method.

#### Parameters

##### svgString

`string`

##### config

[`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`IOConfig`](types.md#ioconfig), `"removeScripts"` \| `"removeEventHandlers"` \| `"removeForeignObject"`\>

#### Returns

[`SVGSVGElement`](https://developer.mozilla.org/docs/Web/API/SVGSVGElement)

#### Remarks

- Parsing itself does **not** execute scripts or handlers, since the element
  is never mounted to the live DOM during this step.
- ⚠️ Security risk arises if the returned element is later attached to the DOM:
  embedded scripts, event handlers, or external references could execute.
- Implementation detail: uses a temporary `<div>` to convert raw SVG markup.
- Recommended only for trusted or pre-sanitized SVG sources.

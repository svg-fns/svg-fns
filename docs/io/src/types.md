---
layout: default
title: Types
parent: Src
nav_order: 356
---

# io/src/types

## Interfaces

### IOConfig

Defined in: [packages/io/src/types.ts:1](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/types.ts#L1)

#### Properties

##### domParser()?

> `optional` **domParser**: () => [`DOMParser`](https://developer.mozilla.org/docs/Web/API/DOMParser)

Defined in: [packages/io/src/types.ts:3](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/types.ts#L3)

Optional custom DOMParser implementation

###### Returns

[`DOMParser`](https://developer.mozilla.org/docs/Web/API/DOMParser)

##### removeEventHandlers?

> `optional` **removeEventHandlers**: `boolean`

Defined in: [packages/io/src/types.ts:11](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/types.ts#L11)

Strip `on*` event handler attributes (default: true in unsafe mode)

##### removeForeignObject?

> `optional` **removeForeignObject**: `boolean`

Defined in: [packages/io/src/types.ts:13](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/types.ts#L13)

Remove \<foreignObject\> elements (default: false)

##### removeScripts?

> `optional` **removeScripts**: `boolean`

Defined in: [packages/io/src/types.ts:9](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/types.ts#L9)

Remove \<script\> elements (default: true in unsafe mode)

##### strict?

> `optional` **strict**: `boolean`

Defined in: [packages/io/src/types.ts:15](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/types.ts#L15)

Enforce root \<svg\> validation (default: true)

##### unsafe?

> `optional` **unsafe**: `boolean`

Defined in: [packages/io/src/types.ts:7](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/types.ts#L7)

Browser only: use innerHTML for speed (default: false, safe DOMParser used)

##### xmlSerializer()?

> `optional` **xmlSerializer**: () => [`XMLSerializer`](https://developer.mozilla.org/docs/Web/API/XMLSerializer)

Defined in: [packages/io/src/types.ts:5](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/io/src/types.ts#L5)

Optional custom XMLSerializer implementation

###### Returns

[`XMLSerializer`](https://developer.mozilla.org/docs/Web/API/XMLSerializer)

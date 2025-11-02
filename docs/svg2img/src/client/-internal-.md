---
layout: default
title:  Internal 
parent: Client
nav_order: 373
---

# \<internal\>

## Interfaces

### WorkerInput

Defined in: [packages/svg2img/src/client.ts:110](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/client.ts#L110)

Interface for the data expected by the Web Worker logic.
This structure allows a single object to be passed via postMessage.

#### Properties

##### opts?

> `optional` **opts**: [`Options`](../types.md#options)

Defined in: [packages/svg2img/src/client.ts:112](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/client.ts#L112)

##### svg

> **svg**: `string`

Defined in: [packages/svg2img/src/client.ts:111](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/svg2img/src/client.ts#L111)

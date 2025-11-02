---
layout: default
title: Geometry
parent: Src
nav_order: 383
---

# utils/src/geometry

## Variables

### DEG\_TO\_RAD

> `const` **DEG\_TO\_RAD**: `number`

Defined in: [packages/utils/src/geometry.ts:43](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/geometry.ts#L43)

Conversion factor from degrees to radians.

***

### RAD\_TO\_DEG

> `const` **RAD\_TO\_DEG**: `number`

Defined in: [packages/utils/src/geometry.ts:46](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/geometry.ts#L46)

Conversion factor from radians to degrees.

## Functions

### degToRad()

> **degToRad**(`degrees`: `number`): `number`

Defined in: [packages/utils/src/geometry.ts:49](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/geometry.ts#L49)

Converts an angle from degrees to radians.

#### Parameters

##### degrees

`number`

#### Returns

`number`

***

### radToDeg()

> **radToDeg**(`radians`: `number`): `number`

Defined in: [packages/utils/src/geometry.ts:52](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/geometry.ts#L52)

Converts an angle from radians to degrees.

#### Parameters

##### radians

`number`

#### Returns

`number`

***

### resolveDimensions()

> **resolveDimensions**(`options`: \{ `height?`: `number`; `width?`: `number`; \}, `imgDims`: \{ `height`: `number`; `width`: `number`; \}): \{ `height`: `number`; `width`: `number`; \}

Defined in: [packages/utils/src/geometry.ts:12](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/geometry.ts#L12)

Resolve final width and height for SVG/image conversion.

- If both width and height are provided → use them
- If both missing → fallback to intrinsic dimensions
- If only one is defined → compute the other to preserve aspect ratio

#### Parameters

##### options

Conversion options \{ width?, height? \}

###### height?

`number`

###### width?

`number`

##### imgDims

Intrinsic dimensions \{ width, height \}

###### height

`number`

###### width

`number`

#### Returns

\{ `height`: `number`; `width`: `number`; \}

Object with { width, height } rounded

##### height

> **height**: `number`

##### width

> **width**: `number`

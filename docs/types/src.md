---
layout: default
title: Src
nav_order: 376
---

# types/src

## Type Aliases

### Matrix

> **Matrix** = \[`number`, `number`, `number`, `number`, `number`, `number`\]

Defined in: [packages/types/src/index.d.ts:33](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/types/src/index.d.ts#L33)

Affine transformation matrix tuple.
Matches SVGMatrix `[a b c d e f]`, representing:

  [ a c e ]
  [ b d f ]
  [ 0 0 1 ]

Used for scale, rotate, skew, and translate operations.

***

### Padding

> **Padding** = `number` \| \{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}

Defined in: [packages/types/src/index.d.ts:19](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/types/src/index.d.ts#L19)

Padding specification for layout or box-model operations.
- Single number applies to all sides
- Object form allows per-side values

***

### Point

> **Point** = \{ `x`: `number`; `y`: `number`; \}

Defined in: [packages/types/src/index.d.ts:12](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/types/src/index.d.ts#L12)

2D point in Cartesian space.
- `x`, `y`: coordinates

#### Properties

##### x

> **x**: `number`

Defined in: [packages/types/src/index.d.ts:12](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/types/src/index.d.ts#L12)

##### y

> **y**: `number`

Defined in: [packages/types/src/index.d.ts:12](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/types/src/index.d.ts#L12)

***

### Rect

> **Rect** = \{ `height`: `number`; `width`: `number`; `x`: `number`; `y`: `number`; \}

Defined in: [packages/types/src/index.d.ts:6](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/types/src/index.d.ts#L6)

Axis-aligned rectangle.
- `x`, `y`: top-left corner coordinates
- `width`, `height`: rectangle dimensions

#### Properties

##### height

> **height**: `number`

Defined in: [packages/types/src/index.d.ts:6](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/types/src/index.d.ts#L6)

##### width

> **width**: `number`

Defined in: [packages/types/src/index.d.ts:6](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/types/src/index.d.ts#L6)

##### x

> **x**: `number`

Defined in: [packages/types/src/index.d.ts:6](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/types/src/index.d.ts#L6)

##### y

> **y**: `number`

Defined in: [packages/types/src/index.d.ts:6](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/types/src/index.d.ts#L6)

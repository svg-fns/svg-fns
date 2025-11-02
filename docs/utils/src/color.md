---
layout: default
title: Color
parent: Src
nav_order: 382
---

# utils/src/color

## Functions

### isValidColor()

> **isValidColor**(`color`: `null` \| `string`): `color is string`

Defined in: [packages/utils/src/color.ts:6](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/utils/src/color.ts#L6)

Validate whether a color string is meaningful.

- Filters out `"none"`, `"transparent"`, CSS URL refs, and fully transparent rgba.

#### Parameters

##### color

`null` | `string`

#### Returns

`color is string`

---
layout: default
title: Path Helpers
parent: Src
nav_order: 364
---

# math/src/path-helpers

## See

[https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)

## Functions

### arcPath()

> **arcPath**(`cx`: `number`, `cy`: `number`, `r`: `number`, `startAngle`: `number`, `endAngle`: `number`, `sweepFlag`: `0` \| `1`): `string`

Defined in: [packages/math/src/path-helpers.ts:70](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/path-helpers.ts#L70)

Generates an SVG elliptical arc command string (`A` command).

This function correctly calculates the `large-arc-flag` and allows
control over the `sweep-flag`.

#### Parameters

##### cx

`number`

The center x-coordinate of the ellipse.

##### cy

`number`

The center y-coordinate of the ellipse.

##### r

`number`

The radius of the arc (assumes a circle, rx=ry=r).

##### startAngle

`number`

##### endAngle

`number`

##### sweepFlag

The direction to draw the arc. `0` for counter-clockwise
(negative angle direction), `1` for clockwise (positive angle direction).

`0` | `1`

#### Returns

`string`

A string for use in an SVG path's `d` attribute, e.g., "M x1 y1 A r r ...".

#### See

[https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical\_arc\_curve](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve)

***

### cartesianToPolar()

> **cartesianToPolar**(`cx`: `number`, `cy`: `number`, `p`: [`Point`](../../types/src.md#point)): \{ `angle`: `number`; `r`: `number`; \}

Defined in: [packages/math/src/path-helpers.ts:40](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/path-helpers.ts#L40)

Converts a Cartesian point to polar coordinates.

#### Parameters

##### cx

`number`

The x-coordinate of the polar coordinate system's origin.

##### cy

`number`

The y-coordinate of the polar coordinate system's origin.

##### p

[`Point`](../../types/src.md#point)

The Cartesian point \{ x, y \} to convert.

#### Returns

\{ `angle`: `number`; `r`: `number`; \}

The polar coordinates { r, angle }, where angle is in degrees
in the range `[-PI, PI]`.

##### angle

> **angle**: `number`

##### r

> **r**: `number`

***

### polarToCartesian()

> **polarToCartesian**(`cx`: `number`, `cy`: `number`, `radius`: `number`, `angle`: `number`): [`Point`](../../types/src.md#point)

Defined in: [packages/math/src/path-helpers.ts:21](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/path-helpers.ts#L21)

Converts polar coordinates to a Cartesian point.

#### Parameters

##### cx

`number`

The x-coordinate of the polar coordinate system's origin.

##### cy

`number`

The y-coordinate of the polar coordinate system's origin.

##### radius

`number`

The radius (distance from the origin).

##### angle

`number`

The angle **in degree**.

#### Returns

[`Point`](../../types/src.md#point)

The corresponding Cartesian point { x, y }.

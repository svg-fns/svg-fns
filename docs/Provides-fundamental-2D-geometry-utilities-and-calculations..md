---
layout: default
title: Provides Fundamental 2D Geometry Utilities And Calculations.
nav_order: 2
---

# Provides fundamental 2D geometry utilities and calculations.

## Functions

### almostEqualNumbers()

> **almostEqualNumbers**(`a`: `number`, `b`: `number`, `tolerance`: `number`): `boolean`

Defined in: [packages/math/src/geometry.ts:88](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/geometry.ts#L88)

Checks if two numbers are approximately equal within a tolerance.
A robust alternative to `===` for floating-point numbers.

#### Parameters

##### a

`number`

The first number.

##### b

`number`

The second number.

##### tolerance

`number` = `1e-9`

The absolute tolerance.

#### Returns

`boolean`

`true` if the numbers are within the tolerance.

***

### almostEqualPoints()

> **almostEqualPoints**(`a`: [`Point`](types/src.md#point), `b`: [`Point`](types/src.md#point), `tolerance`: `number`): `boolean`

Defined in: [packages/math/src/geometry.ts:103](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/geometry.ts#L103)

Checks if two points are approximately equal on a per-axis basis.

#### Parameters

##### a

[`Point`](types/src.md#point)

The first point.

##### b

[`Point`](types/src.md#point)

The second point.

##### tolerance

`number` = `1e-9`

The absolute tolerance for both x and y axes.
See [almostEqualNumbers](#almostequalnumbers).

#### Returns

`boolean`

`true` if both axes are within tolerance.

***

### distance()

> **distance**(`a`: [`Point`](types/src.md#point), `b`: [`Point`](types/src.md#point)): `number`

Defined in: [packages/math/src/geometry.ts:19](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/geometry.ts#L19)

Calculates the Euclidean distance between two points.
Uses the robust `Math.hypot()` method.

#### Parameters

##### a

[`Point`](types/src.md#point)

The first point.

##### b

[`Point`](types/src.md#point)

The second point.

#### Returns

`number`

The distance between the points.

***

### midpoint()

> **midpoint**(`a`: [`Point`](types/src.md#point), `b`: [`Point`](types/src.md#point)): [`Point`](types/src.md#point)

Defined in: [packages/math/src/geometry.ts:29](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/geometry.ts#L29)

Calculates the midpoint between two points.

#### Parameters

##### a

[`Point`](types/src.md#point)

The first point.

##### b

[`Point`](types/src.md#point)

The second point.

#### Returns

[`Point`](types/src.md#point)

The point that lies exactly halfway between a and b.

***

### rotatePoint()

> **rotatePoint**(`p`: [`Point`](types/src.md#point), `angle`: `number`, `pivot`: [`Point`](types/src.md#point)): [`Point`](types/src.md#point)

Defined in: [packages/math/src/geometry.ts:61](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/geometry.ts#L61)

Rotates a point around a pivot (defaults to the origin).

#### Parameters

##### p

[`Point`](types/src.md#point)

The point to rotate.

##### angle

`number`

The angle of rotation **in degrees**.

##### pivot

[`Point`](types/src.md#point) = `...`

The pivot point to rotate around. Defaults to \{ x: 0, y: 0 \}.

#### Returns

[`Point`](types/src.md#point)

The new, rotated point.

***

### slope()

> **slope**(`a`: [`Point`](types/src.md#point), `b`: [`Point`](types/src.md#point), `tolerance`: `number`): `number`

Defined in: [packages/math/src/geometry.ts:46](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/geometry.ts#L46)

Calculates the slope (m) of the line equation between two points.

- Returns `Infinity` for vertical lines.
- Returns `NaN` if the points are identical (as the slope is undefined).

#### Parameters

##### a

[`Point`](types/src.md#point)

The first point.

##### b

[`Point`](types/src.md#point)

The second point.

##### tolerance

`number` = `1e-9`

The tolerance for checking if the line is vertical.
See [almostEqualNumbers](#almostequalnumbers).

#### Returns

`number`

The slope of the line.

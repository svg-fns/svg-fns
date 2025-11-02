---
layout: default
title: Transform
parent: Src
nav_order: 365
---

# math/src/transform

## See

[https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform)

## Functions

### applyMatrixToPoint()

> **applyMatrixToPoint**(`p`: [`Point`](../../types/src.md#point), `m`: [`Matrix`](../../types/src.md#matrix)): [`Point`](../../types/src.md#point)

Defined in: [packages/math/src/transform.ts:126](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L126)

Applies a transformation matrix to a 2D point.

#### Parameters

##### p

[`Point`](../../types/src.md#point)

The point to transform.

##### m

[`Matrix`](../../types/src.md#matrix)

The transformation matrix.

#### Returns

[`Point`](../../types/src.md#point)

The new, transformed point.

***

### composeMatrices()

> **composeMatrices**(...`matrices`: [`Matrix`](../../types/src.md#matrix)[]): [`Matrix`](../../types/src.md#matrix)

Defined in: [packages/math/src/transform.ts:112](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L112)

Composes multiple matrices into a single matrix.
Composition is applied from **right to left**, meaning the last matrix in the
list is applied to the point first.

#### Parameters

##### matrices

...[`Matrix`](../../types/src.md#matrix)[]

A list of matrices to compose.

#### Returns

[`Matrix`](../../types/src.md#matrix)

A single matrix representing the combined transformation.

#### Example

```ts
// This will first scale the point by 2, then translate it by (10, 0).
const transform = composeMatrices(
translationMatrix(10, 0),
scaleMatrix(2)
);
const newPoint = applyMatrixToPoint({ x: 5, y: 5 }, transform);
// newPoint is { x: 20, y: 10 }  ((5*2)+10, (5*2))
```

***

### decomposeMatrix()

> **decomposeMatrix**(`m`: [`Matrix`](../../types/src.md#matrix)): \{ `rotate`: `number`; `scale`: \{ `x`: `number`; `y`: `number`; \}; `skewX`: `number`; `translate`: \{ `x`: `number`; `y`: `number`; \}; \}

Defined in: [packages/math/src/transform.ts:144](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L144)

Decomposes a 2D affine matrix into its constituent transformations.
This implementation extracts translation, scaling, rotation, and x-axis skew.

Note: Decomposition is not always unique (e.g., a scale of -1 can be a rotation).
This function returns one valid, standard interpretation. It does not extract skewY.

#### Parameters

##### m

[`Matrix`](../../types/src.md#matrix)

The matrix to decompose.

#### Returns

An object containing `translate`, `rotate` (degrees), `scale`, and `skewX` (degrees).

##### rotate

> **rotate**: `number`

QR decomposition to separate rotation/skew from scale

##### scale

> **scale**: \{ `x`: `number`; `y`: `number`; \}

###### scale.x

> **x**: `number` = `scaleX`

###### scale.y

> **y**: `number` = `scaleY`

##### skewX

> **skewX**: `number`

##### translate

> **translate**: \{ `x`: `number`; `y`: `number`; \}

Translation is straightforward

###### translate.x

> **x**: `number` = `e`

###### translate.y

> **y**: `number` = `f`

***

### identityMatrix()

> **identityMatrix**(): [`Matrix`](../../types/src.md#matrix)

Defined in: [packages/math/src/transform.ts:20](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L20)

Creates an identity matrix: `matrix(1 0 0 1 0 0)`.

#### Returns

[`Matrix`](../../types/src.md#matrix)

***

### multiplyMatrices()

> **multiplyMatrices**(`mB`: [`Matrix`](../../types/src.md#matrix), `mA`: [`Matrix`](../../types/src.md#matrix)): [`Matrix`](../../types/src.md#matrix)

Defined in: [packages/math/src/transform.ts:81](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L81)

Multiplies two SVG 2D affine matrices (B × A).
The resulting matrix first applies transformation A, then transformation B.

#### Parameters

##### mB

[`Matrix`](../../types/src.md#matrix)

The second matrix to apply (left-hand side).

##### mA

[`Matrix`](../../types/src.md#matrix)

The first matrix to apply (right-hand side).

#### Returns

[`Matrix`](../../types/src.md#matrix)

***

### parseTransform()

> **parseTransform**(`transformStr?`: `null` \| `string`): [`Matrix`](../../types/src.md#matrix)

Defined in: [packages/math/src/transform.ts:174](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L174)

Parses an SVG transform string into a single composed matrix.
This function is robust against malformed input (e.g., non-numeric values).

#### Parameters

##### transformStr?

`null` | `string`

#### Returns

[`Matrix`](../../types/src.md#matrix)

The composed `Matrix`. Returns an identity matrix if the string is empty or invalid.

***

### rotationMatrix()

> **rotationMatrix**(`angleDegrees`: `number`): [`Matrix`](../../types/src.md#matrix)

Defined in: [packages/math/src/transform.ts:48](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L48)

Creates a rotation matrix from an angle in degrees.
The rotation is performed around the origin (0, 0).

#### Parameters

##### angleDegrees

`number` = `0`

The angle of rotation in **degrees**.

#### Returns

[`Matrix`](../../types/src.md#matrix)

***

### scaleMatrix()

> **scaleMatrix**(`sx`: `number`, `sy`: `number`): [`Matrix`](../../types/src.md#matrix)

Defined in: [packages/math/src/transform.ts:41](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L41)

Creates a scaling matrix: `matrix(sx 0 0 sy 0 0)`.

#### Parameters

##### sx

`number` = `1`

The factor to scale by on the x-axis.

##### sy

`number` = `sx`

The factor to scale by on the y-axis. If omitted, `sx` is used.

#### Returns

[`Matrix`](../../types/src.md#matrix)

***

### skewXMatrix()

> **skewXMatrix**(`angleDegrees`: `number`): [`Matrix`](../../types/src.md#matrix)

Defined in: [packages/math/src/transform.ts:59](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L59)

Creates a skew matrix along the x-axis.

#### Parameters

##### angleDegrees

`number` = `0`

The skew angle in **degrees**.

#### Returns

[`Matrix`](../../types/src.md#matrix)

***

### skewYMatrix()

> **skewYMatrix**(`angleDegrees`: `number`): [`Matrix`](../../types/src.md#matrix)

Defined in: [packages/math/src/transform.ts:68](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L68)

Creates a skew matrix along the y-axis.

#### Parameters

##### angleDegrees

`number` = `0`

The skew angle in **degrees**.

#### Returns

[`Matrix`](../../types/src.md#matrix)

***

### transformPoint()

> **transformPoint**(`point`: [`Point`](../../types/src.md#point), `transformString`: `string`): [`Point`](../../types/src.md#point)

Defined in: [packages/math/src/transform.ts:257](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L257)

Apply an SVG `transform` string to a point.
Combines parsing and matrix application into a single call.

#### Parameters

##### point

[`Point`](../../types/src.md#point)

The point to transform in SVG user coordinates.

##### transformString

`string`

The SVG `transform` string (e.g., "translate(10,20) scale(2)").
                       Supports `matrix`, `translate`, `scale`, `rotate`, `skewX`, `skewY`.

#### Returns

[`Point`](../../types/src.md#point)

The new, transformed point.

#### Example

```ts
const p = { x: 10, y: 5 };
const t = "translate(5,10) rotate(45)";
const newPoint = transformPoint(p, t);
// newPoint is the transformed { x, y } after applying translation and rotation
```

#### See

 - [parseTransform](#parsetransform) for parsing details.
 - [applyMatrixToPoint](#applymatrixtopoint) for applying matrices.

***

### translationMatrix()

> **translationMatrix**(`tx`: `number`, `ty`: `number`): [`Matrix`](../../types/src.md#matrix)

Defined in: [packages/math/src/transform.ts:27](https://github.com/svg-fns/svg-fns/blob/cea4c00cec48fe1ab930ae567e2a3d1a99b5353c/packages/math/src/transform.ts#L27)

Creates a translation matrix: `matrix(1 0 0 1 tx ty)`.

#### Parameters

##### tx

`number` = `0`

The distance to translate along the x-axis.

##### ty

`number` = `0`

The distance to translate along the y-axis.

#### Returns

[`Matrix`](../../types/src.md#matrix)

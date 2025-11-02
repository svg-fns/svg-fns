# svg-fns

## 0.1.2

### Patch Changes

- Updated dependencies [e09c1ab]
- Updated dependencies [3855768]
- Updated dependencies [1bc979f]
  - @svg-fns/utils@2.0.0
  - @svg-fns/svg2img@0.2.0
  - @svg-fns/info@1.0.0
  - @svg-fns/layout@0.1.0
  - @svg-fns/math@0.0.0

## 0.1.1

### Patch Changes

- 55b691e: Added `getBBoxWithTransform` utility and replaced direct `getBBox` usage with it for accurate bounding box calculations (accounts for transforms).
- Updated dependencies [55b691e]
  - @svg-fns/layout@0.1.0

## 0.1.0

### Minor Changes

- 8e21180: Add two new packages to the svg-fns ecosystem:

  - **@svg-fns/layout** — helpers for positioning, bounding boxes, alignment, and padding.
  - **@svg-fns/types** — shared TypeScript types (Rect, Point, Matrix, Padding) for consistent geometry definitions.

- 80d313a: Added core math utilities for SVG:

  - 2D affine transform helpers (`composeMatrices`, `applyMatrixToPoint`, `decomposeMatrix`, etc.)
  - Geometry helpers (`distance`, `midpoint`, `slope`, `rotatePoint`, `almostEqual`)
  - Path helpers (`polarToCartesian`, `cartesianToPolar`, `arcPath`)

### Patch Changes

- Updated dependencies [1222bc6]
- Updated dependencies [516dd38]
  - @svg-fns/svg2img@0.1.0
  - @svg-fns/utils@1.1.0

## 0.0.2

### Patch Changes

- Updated dependencies [8ebb095]
- Updated dependencies [c806140]
  - @svg-fns/io@1.0.0
  - @svg-fns/info@1.0.0
  - @svg-fns/svg2img@0.0.0

## 0.0.1

### Patch Changes

- ccf682e: Update readme and clean up

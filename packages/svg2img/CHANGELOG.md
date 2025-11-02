# @svg-fns/svg2img

## 0.2.0

### Minor Changes

- 1bc979f: Add worker support

### Patch Changes

- e09c1ab: Rename `blobToDataURLBrowser` to `blobToDataURL`.
- 3855768: Simplify canvasToBlob function. Use `canvas instanceof OffscreenCanvas` rather than requiring `isOffscreenCanvas` as first argument.

## 0.1.0

### Minor Changes

- 1222bc6: Add `downloadSvg` utility:

  - Converts SVG (string or element) into a blob and triggers file download in the browser.
  - Supports custom filename with automatic extension handling.
  - Returns `SvgConversionResult` for further inspection.

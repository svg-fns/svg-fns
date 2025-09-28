# @svg-fns/svg2img

## 1.1.0

### Minor Changes

- 516dd38: - Add radian to degree conversion helpers.
  - Add rect utils such as union etc.

## 1.0.0

### Major Changes

- c806140: ### 🆕 What's changing

  - Conversion functions (`svgToBlob`, `svgToBuffer`, `svgToDataUrl*`) now return a unified object: `SvgConversionResult`:
    - `blob?` → Client only
    - `buffer?` → Server only
    - `dataUrl?` → Universal
    - `width?`, `height?` → final computed dimensions
    - `format` → output format
    - `scale?` → applied scale factor
  - `svgToDataUrl*` no longer return a raw string; use `dataUrl` property.
  - Dimensions are automatically computed from intrinsic SVG size and respect `scale`.
  - Server/client logic split explicitly:
    - `svgToBuffer` → Server-only, exported from `/server`
    - `svgToBlob` → Client
  - Legacy code expecting raw `Blob | Buffer | string` must destructure the returned object.

  ### ⚠️ Breaking Changes

  - All function return types changed → migration required.
  - `svgToDataUrl*` no longer return string directly.
  - Width/height now auto-calculated if missing.
  - Server-only utilities now live in `/server`; importing them from root will break builds.

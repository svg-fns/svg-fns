---
"@svg-fns/convert": major
---

Export more structured conversion results and update return types

- Conversion functions (`svgToBlob`, `svgToBuffer`, `svgToDataUrl*`) now return a unified object (`SvgConversionResult`) containing:
  - `blob?` (Browser only)
  - `buffer?` (Node.js only)
  - `dataUrl?` (Universal)
  - `width?`, `height?` (final dimensions)
  - `format` (output format)
  - `scale?` (applied scale factor)
- `svgToDataUrl*` no longer return a raw string; use `dataUrl` property instead.
- Dimensions are now properly computed from intrinsic SVG size and respect `scale`.
- Node/browser logic is split for clarity (`svgToBuffer` for Node, `svgToBlob` for browser).
- Legacy code expecting raw `Blob | Buffer | string` must destructure the returned object.

**Breaking Changes:**

- All function return types changed → migration required.
- `svgToDataUrl*` functions no longer return string directly.
- Width/height now computed automatically if missing.

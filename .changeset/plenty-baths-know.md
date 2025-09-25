---
"@svg-fns/io": major
"@svg-fns/info": major
---

### 🆕 What's changing

- Export everything from `./node` internally, but **only expose browser-safe utilities** from the package root.
- Non-Node exports from root:
  - `parseSvg` (alias of `parseSvgBrowser`)
  - `serializeSvg` (alias of `serializeSvgBrowser`)
- Node-specific exports remain available from `./node`.

### ⚠️ Breaking Changes

- Consumers importing Node-only utilities from the package root (`@svg-fns/io` or `@svg-fns/info`) will need to switch to `@svg-fns/io/node` or `@svg-fns/info/node`.
- Root index now **only exports browser-safe APIs**.

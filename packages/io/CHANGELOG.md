# @svg-fns/io

## 1.0.0

### Major Changes

- 8ebb095: ### 🆕 What's changing

  - Export **server-only utilities** from `./server`.
  - Root index exports **client-safe APIs only**

  ### ⚠️ Breaking Changes

  - Consumers importing server-only utilities from the root (`@svg-fns/io` or `@svg-fns/info`) must now import from `./server`:
    - `@svg-fns/io/server`
    - `@svg-fns/info/server`
  - Root index now strictly exports **client-safe APIs**.

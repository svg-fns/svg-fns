# @svg-fns/utils

Lightweight utilities to detect and assert runtime environment (Node.js vs Browser).
Designed for libraries that need to run safely across both.

## Install

```sh
pnpm add @svg-fns/utils
```

**_or_**

```sh
npm install @svg-fns/utils
```

**_or_**

```sh
yarn add @svg-fns/utils
```

## API

```ts
import { isNode, isBrowser } from "@svg-fns/utils";
import { assertNode, assertBrowser } from "@svg-fns/utils/assert";

// Detect
isNode(); // true if running in Node.js
isBrowser(); // true if running in a browser-like environment

// Assert
assertNode("requires Node.js"); // throws if not Node
assertBrowser("requires Browser"); // throws if not Browser
```

### Functions

| Function          | Returns / Behavior                       |
| ----------------- | ---------------------------------------- |
| `isNode()`        | `true` if `process.versions.node` exists |
| `isBrowser()`     | `true` if `window` and `document` exist  |
| `assertNode()`    | Throws error if not Node.js environment  |
| `assertBrowser()` | Throws error if not Browser environment  |

## Why?

- Prevents accidental usage of Node-only code in browsers (and vice versa).
- Feather-light: zero dependencies.
- Works seamlessly in monorepos and cross-platform libraries.

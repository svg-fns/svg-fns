# SVG Fns <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml/badge.svg)](https://github.com/svg-fns/svg-fns/actions/workflows/test.yml)
[![Maintainability](https://qlty.sh/gh/svg-fns/projects/svg-fns/maintainability.svg)](https://qlty.sh/gh/svg-fns/projects/svg-fns)
[![codecov](https://codecov.io/gh/svg-fns/svg-fns/graph/badge.svg)](https://codecov.io/gh/svg-fns/svg-fns)
[![Version](https://img.shields.io/npm/v/svg-fns.svg?colorB=green)](https://www.npmjs.com/package/svg-fns)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/svg-fns.svg)](https://www.npmjs.com/package/svg-fns)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/svg-fns)

SVG Fns is a comprehensive library designed to unlock the full potential of React 18 server components. It provides customizable loading animation components and a fullscreen loader container, seamlessly integrating with React and Next.js.

✅ Fully Treeshakable (import from `svg-fns/client/loader-container`)

✅ Fully TypeScript Supported

✅ Leverages the power of React 18 Server components

✅ Compatible with all React 18 build systems/tools/frameworks

✅ Documented with [Typedoc](https://svg-fns.github.io/svg-fns) ([Docs](https://svg-fns.github.io/svg-fns))

✅ Examples for Next.js, and Vite

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Star [this repository](https://github.com/svg-fns/svg-fns) and share it with your friends.

## Getting Started

### Installation

```bash
pnpm add svg-fns
```

**_or_**

```bash
npm install svg-fns
```

**_or_**

```bash
yarn add svg-fns
```

## Want Lite Version? [![npm bundle size](https://img.shields.io/bundlephobia/minzip/svg-fns-lite)](https://www.npmjs.com/package/svg-fns-lite) [![Version](https://img.shields.io/npm/v/svg-fns-lite.svg?colorB=green)](https://www.npmjs.com/package/svg-fns-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/svg-fns-lite.svg)](https://www.npmjs.com/package/svg-fns-lite)

```bash
pnpm add svg-fns-lite
```

**or**

```bash
npm install svg-fns-lite
```

**or**

```bash
yarn add svg-fns-lite
```

> You need `r18gs` as a peer-dependency

### Import Styles

You can import styles globally or within specific components.

```css
/* globals.css */
@import "svg-fns/styles";
```

```tsx
// layout.tsx
import "svg-fns/styles";
```

For selective imports:

```css
/* globals.css */
@import "svg-fns/dist/client/index.css"; /** required if you are using LoaderContainer */
@import "svg-fns/dist/server/bars/bars1/index.css";
```

### Usage

Using loaders is straightforward.

```tsx
import { Bars1 } from "svg-fns/dist/server/bars/bars1";

export default function MyComponent() {
  return someCondition ? <Bars1 /> : <>Something else...</>;
}
```

For detailed API and options, refer to [the API documentation](https://svg-fns.github.io/svg-fns).

**Using LoaderContainer**

`LoaderContainer` is a fullscreen component. You can add this component directly in your layout and then use `useLoader` hook to toggle its visibility.

```tsx
// layout.tsx
<LoaderContainer />
	 ...
```

```tsx
// some other page or component
import { useLoader } from "svg-fns/dist/hooks";

export default MyComponent() {
	const { setLoading } = useLoader();
	useCallback(()=>{
		setLoading(true);
		...do some work
		setLoading(false);
	}, [])
	...
}
```

## License

This library is licensed under the MPL-2.0 open-source license.



> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>

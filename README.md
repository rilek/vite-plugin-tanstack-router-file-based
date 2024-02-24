# vite-plugin-tanstack-router-file-based

> This package is not meant to use in production.

Vite plugin to handle nextjs-flavoured file based routing using @tanstack/router. At the time of creation of this package, file based routing provided by Tanstack isn't nice to use and buggy.

This package uses simplified NextJS approach to handle routes.

Package generates `router.generated.tsx` in source root directory with router exported as `routerTree`. Example usage below.

Package is using `root`, `index`, `layout`, and `not-found` files to build router. URLs are build using directories names, including parameters, prepended with dollar sign. F.e.`./some-route/$param1/another/$param2/index.tsx` is used for URLs `/some-route/{param1}/another/{param2}`.

All of parameters can be configured either in `vite.config.js` file or in `tsr.config.json` file.

### Example route tree

```
pages/
├── some-route
│   ├── $param1
│   │   ├── another-route
│   │   │   └── $param2
│   │   │       ├── components
│   │   │       │   └── component.tsx
│   │   │       └── index.tsx
│   │   └── index.tsx
│   ├── index.tsx
│   └── layout.tsx
├── index.tsx
├── layout.tsx
├── not-found.tsx
└── root.tsx
```

## Install

```bash
npm install @rilekstack/vite-plugin-tanstack-router-file-based
```

## Usage

```ts
// vite.config.js
import { router } from 'vite-plugin-tanstack-router-file-based';

export default defineConfig({
  (...)
  plugins: [router()],
});
```

```tsx
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./router.generated";

import { RouterProvider, createRouter } from "@tanstack/react-router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createRouter({
  routeTree,
});

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## API

### router(config?: Config)

#### Config

```ts
interface Config {
  sourceRoot: string;
  root: string;
  routesDirectory: string;
  configPath: string;
  generatedRouteTree: string;
  extensions: string[];
  fileNames: {
    index: string;
    layout: string;
    notFound: string;
    root: string;
  };
}
```

#### sourceRoot: string

Path to root of source files. Default: `./src`

#### root: string;

Absolute system path to project. Default: `process.cwd()`

#### routesDirectory `string`

Path to directory with routes files related to source root path. Default `./pages`

#### configPath `string`

Filename of filename with configuration. Default: `tsr.config.json`

#### generatedRouteTree `string`

Filename of generated file. Default: `router.generated.tsx`

#### extensions `string[]`

Extensions of files read in order to build router tree. Default: `["tsx", "ts", "jsx", "js"]`

#### fileNames `object`

File names required to build router tree. Default:

```ts
{
  index: "index";
  layout: "layout";
  notFound: "not-found";
  root: "root";
}
```

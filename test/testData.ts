export const root = {
  file: "./src/pages/root.tsx",
  meta: {
    importPath: "./pages/root",
    path: "",
    name: "root",
    extension: "tsx",
  },
};

export const index = {
  file: "./src/pages/index.tsx",
  meta: {
    importPath: "./pages/index",
    path: "",
    name: "index",
    extension: "tsx",
  },
};

export const layout = {
  file: "./src/pages/layout.tsx",
  meta: {
    importPath: "./pages/layout",
    path: "",
    name: "layout",
    extension: "tsx",
  },
};

export const notFound = {
  file: "./src/pages/not-found.tsx",
  meta: {
    importPath: "./pages/not-found",
    path: "",
    name: "not-found",
    extension: "tsx",
  },
};

export const routeIndex = {
  file: "./src/pages/some-route/index.tsx",
  meta: {
    importPath: "./pages/some-route/index",
    path: "/some-route",
    name: "index",
    extension: "tsx",
  },
};

export const routeLayout = {
  file: "./src/pages/some-route/layout.tsx",
  meta: {
    importPath: "./pages/some-route/layout",
    path: "/some-route",
    name: "layout",
    extension: "tsx",
  },
};

export const parameterRouteIndex = {
  file: "./src/pages/some-route/$param/index.tsx",
  meta: {
    importPath: "./pages/some-route/$param/index",
    path: "/some-route/$param",
    name: "index",
    extension: "tsx",
  },
};

export const deepParameterRouteIndex = {
  file: "./src/pages/some-route/$param/nested-route/$param2/index.jsx",
  meta: {
    importPath: "./pages/some-route/$param/nested-route/$param2/index",
    path: "/some-route/$param/nested-route/$param2",
    name: "index",
    extension: "jsx",
  },
};

export const testTreeDirectory = [
  root.file,
  index.file,
  layout.file,
  notFound.file,
  routeIndex.file,
  routeLayout.file,
  parameterRouteIndex.file,
  deepParameterRouteIndex.file,
];

export const testTreeMeta = [
  root.meta,
  index.meta,
  layout.meta,
  notFound.meta,
  routeIndex.meta,
  routeLayout.meta,
  parameterRouteIndex.meta,
  deepParameterRouteIndex.meta,
];

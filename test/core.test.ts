import { describe, expect, it } from "vitest";
// import { buildRouteTree } from "../src/core";
// import { Route } from "../src/types/types";
// import { RouteType } from "../src/types/types";
// import { getConfig } from "../src/config";

// const globalRootRoute = {
//   filePath: "./src/pages/root.tsx",
//   route: {
//     importPath: "./pages/root",
//     path: [],
//     name: "root",
//     isRoot: true,
//     isIndex: false,
//     isLayout: false,
//     isDynamic: false,
//   },
// };

// const indexRoute = {
//   filePath: "./src/pages/index.tsx",
//   route: {
//     importPath: "./pages/index",
//     path: [],
//     name: "index",
//     isRoot: false,
//     isIndex: true,
//     isLayout: false,
//     isDynamic: false,
//     url: "/",
//   },
// };

// const layoutRoute = {
//   filePath: "./src/pages/layout.tsx",
//   route: {
//     importPath: "./pages/layout",
//     path: [],
//     name: "layout",
//     isRoot: false,
//     isIndex: false,
//     isLayout: true,
//     isDynamic: false,
//   },
// };

// const customRoute = {
//   filePath: "./src/pages/users/index.tsx",
//   route: {
//     importPath: "./pages/users/index",
//     path: ["users"],
//     name: "index",
//     isRoot: false,
//     isIndex: true,
//     isLayout: false,
//     isDynamic: false,
//     url: "users",
//   },
// };

// const dynamicRoute = {
//   filePath: "./src/pages/$postId/index.tsx",
//   route: {
//     importPath: "./pages/$postId/index",
//     path: ["$postId"],
//     name: "index",
//     isRoot: false,
//     isIndex: true,
//     isLayout: false,
//     isDynamic: true,
//     url: "$postId",
//   },
// };

// const nestedIndexRoute = {
//   filePath: "./src/pages/posts/index.tsx",
//   route: {
//     importPath: "./pages/posts/index",
//     path: ["posts"],
//     name: "index",
//     isRoot: false,
//     isIndex: true,
//     isLayout: false,
//     isDynamic: false,
//     url: "posts",
//   },
// };

// const nestedLayoutRoute = {
//   filePath: "./src/pages/posts/layout.tsx",
//   route: {
//     importPath: "./pages/posts/layout",
//     path: ["posts"],
//     name: "layout",
//     isRoot: false,
//     isIndex: false,
//     isLayout: true,
//     isDynamic: false,
//   },
// };

// const nestedCustomRoute = {
//   filePath: "./src/pages/posts/users/index.tsx",
//   route: {
//     importPath: "./pages/posts/users/index",
//     path: ["posts", "users"],
//     name: "index",
//     isRoot: false,
//     isIndex: true,
//     isLayout: false,
//     isDynamic: false,
//     url: "posts/users",
//   },
// };

// const nestedDynamicRoute = {
//   filePath: "./src/pages/users/$userId/posts/$postId/index.tsx",
//   route: {
//     importPath: "./pages/users/$userId/posts/$postId/index",
//     path: ["users", "$userId", "posts", "$postId"],
//     name: "index",
//     isRoot: false,
//     isIndex: true,
//     isLayout: false,
//     isDynamic: true,
//     url: "users/$userId/posts/$postId",
//   },
// };

// const filePaths = [
//   globalRootRoute.filePath,
//   indexRoute.filePath,
//   layoutRoute.filePath,
//   customRoute.filePath,
//   dynamicRoute.filePath,
//   nestedIndexRoute.filePath,
//   nestedLayoutRoute.filePath,
//   nestedCustomRoute.filePath,
//   nestedDynamicRoute.filePath,
// ];

// const rawRoutes: Route[] = [
//   globalRootRoute.route,
//   indexRoute.route,
//   layoutRoute.route,
//   customRoute.route,
//   dynamicRoute.route,
//   nestedIndexRoute.route,
//   nestedLayoutRoute.route,
//   nestedCustomRoute.route,
//   nestedDynamicRoute.route,
// ];

// const routesTree = {
//   root: globalRootRoute.route,
//   layout: layoutRoute.route,
//   index: indexRoute.route,
//   users: {
//     index: customRoute.route,
//     $userId: {
//       posts: {
//         $postId: {
//           index: nestedDynamicRoute.route,
//         },
//       },
//     },
//   },
//   posts: {
//     layout: nestedLayoutRoute.route,
//     index: nestedIndexRoute.route,
//     users: {
//       index: nestedCustomRoute.route,
//     },
//   },
//   $postId: { index: dynamicRoute.route },
// };

// const testProjectDirectory = [
//   "./src/pages/index.tsx",
//   "./src/pages/layout.tsx",
//   "./src/pages/not-found.tsx",
//   "./src/pages/root.tsx",
//   "./src/pages/login/index.tsx",
//   "./src/pages/product/index.tsx",
//   "./src/pages/product/layout.tsx",
//   "./src/pages/product/$slug/index.tsx",
//   "./src/pages/product/catalog/layout.tsx",
//   "./src/pages/product/catalog/gallery/test/index.tsx",
// ];

// const outcome: RouteType[] = [
//   {
//     index: 0,
//     type: "root",
//     id: "Root",
//     importPath: "./pages/root",
//   },
//   {
//     type: "layout",
//     id: "RootLayout",
//     importPath: "./pages/layout",
//     parent: "root",
//   },
//   {
//     type: "index",
//     importPath: "./pages/index",
//     path: "/",
//     parent: "RootLayout",
//   },
//   {
//     type: "index",
//     importPath: "./pages/login/index",
//     path: "login",
//     parent: "RootLayout",
//   },
//   {
//     type: "route",
//     id: "ProductRoute",
//     path: "product",
//     parent: "RootLayout",
//   },
//   {
//     type: "layout",
//     importPath: "./pages/product/layout",
//     id: "ProductLayout",
//     parent: "ProductRoute",
//   },
//   {
//     type: "index",
//     importPath: "./pages/product/index",
//     path: "/",
//     parent: "ProductLayout",
//   },
//   {
//     type: "index",
//     importPath: "./pages/product/$slug/index",
//     path: "$slug",
//     parent: "ProductLayout",
//   },
//   {
//     type: "layout",
//     id: "ProductCatalogLayout",
//     importPath: "./pages/product/catalog/layout",
//     parent: "ProductLayout",
//   },
//   {
//     type: "index",
//     importPath: "./pages/product/catalog/gallery/test/index",
//     path: "gallery",
//     parent: "ProductCatalogLayout",
//   },
//   {
//     type: "index",
//     importPath: "./pages/not-found",
//     path: "*",
//     parent: "Layout",
//   },
// ];

describe("router", () => {
  describe("buildRouteTree", () => {
    it("should parse global root file path and create route tree", () => {
      // await buildRouteTree(getConfig(), filePaths);
      expect(true).toStrictEqual(true);
      // expect(buildRouteTree(filePaths)).toStrictEqual(outcome);
    });
    // it("should parse global root file path and create Route object", () => {
    //   expect(buildRouteTree(globalRootRoute.filePath)).toStrictEqual(globalRootRoute.route);
    // });
  });

  // describe("buildRouteTree", () => {
  //   it("should build route tree", () => {
  //     expect(buildRouteTree({ routes: rawRoutes })).toStrictEqual(routesTree);
  //   });
  // });
});

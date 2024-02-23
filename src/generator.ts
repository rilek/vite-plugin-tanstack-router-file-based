import { RouteType } from "./types/types";
import * as prettier from "prettier";

const genCode = ({ variables, routeTree, config }: any) =>
  `/* **************************************************************
* This file is generated by the router-plugin. Do not edit!
* **************************************************************
*/

import { createRoute } from "@tanstack/react-router";

${variables}

${config}

${routeTree}

// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router
//   }
// }`;

const genVariableCode = (route: RouteType): string => {
  if (route.type !== "route") {
    return `import { Route as ${route.id}${
      route.type !== "root" ? "Import" : ""
    } } from "${route.importPath}";`;
  } else {
    return "";
  }
};

const genVariables = (routes: RouteType[]) => {
  return routes.map(genVariableCode).join("\n\n");
};

const genConfigCode = (route: RouteType): string => {
  switch (route.type) {
    // case "route":
    //   return `const ${route.id} = ${route.id}Import.update ({
    //     path: "${route.path}",
    //     getParentRoute: () => ${route.parent}
    //   });`;

    case "index":
      return `const ${route.id} = ${route.id}Import.update ({
        path: "/",
        getParentRoute: () => ${route.parent}
      } as any)`;
    case "layout":
      return `const ${route.id} = ${route.id}Import.update ({
        // path: "/",
        id: "${route.id}",
        getParentRoute: () => ${route.parent}
      } as any)`;
    case "route":
      return `const ${route.id} = createRoute({
        path: "${route.path}",
        getParentRoute: () => ${route.parent}
      } as any);`;

    default:
      return "";
  }
};

const genConfig = (routes: RouteType[]) => {
  return routes.map(genConfigCode).join("\n\n");
};

const findChildren = (routes: RouteType[], parent: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return routes.filter(route => (route as any).parent === parent);
};

function genRouteTreeNodeCode(routes: RouteType[], node: string): string {
  const children = findChildren(routes, node);

  if (node === "NotFound") return "";
  if (children.length === 0) {
    return `${node}`;
  }

  return `${node}.addChildren([${children
    .map(c => genRouteTreeNodeCode(routes, c.id))
    .join(",")}])`;
}

const genRouteTreeCode = (routes: RouteType[]) => {
  const root = routes.find(route => !("parent" in route))?.id;

  if (!root) throw new Error("Root object not found");

  return `export const routeTree = ${genRouteTreeNodeCode(routes, root)};`;
};

// const routesOrder = {
//   root: -1,
//   index: 0,
//   layout: 1,
//   route: 2,
//   notFound: 3,
// } as const;

export const createRouterCode = async ({ routes }: { routes: RouteType[] }) => {
  // const sortedRoutes = routes.sort((a, b) => {
  //   return routesOrder[a.type] - routesOrder[b.type];
  // });

  const variables = genVariables(routes);
  const config = genConfig(routes);
  const routeTree = genRouteTreeCode(routes);

  const code = genCode({ variables, routeTree, config });

  return await prettier.format(code, { semi: true, parser: "typescript" });
};

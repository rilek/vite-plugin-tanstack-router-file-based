/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { flatten, groupBy, identity, pickBy, values } from "lodash";
import { FileDetails } from "./types/types";
import {
  RootRoute,
  RouteType,
  RouteRoute,
  LayoutRoute,
  IndexRoute,
  NotFoundRoute,
} from "./types/types";

type RouteTypeWithoutParent = Omit<RouteType, "parent">;

const toFirstLetterUppercase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
const toPascalCase = (arr: string[]) =>
  arr.map(toFirstLetterUppercase).join("");

const routePath = (type: RouteType["type"], path: string) => {
  let finalPath;
  if (!["root", "layout"].includes(type))
    finalPath = type === "notFound" ? "*" : path;
  else if (type === "index") finalPath = "/";

  return finalPath;
};

const fileToRoute = (
  fileDetails: FileDetails,
  parent?: string
): RouteTypeWithoutParent => {
  const { name, path, importPath } = fileDetails;
  const type = (
    ["root", "layout"].includes(name)
      ? name
      : name === "not-found"
        ? "notFound"
        : "index"
  ) as RouteType["type"];
  const id =
    name === "not-found"
      ? "NotFound"
      : toPascalCase([...path.split("/"), name]);
  const route = pickBy(
    {
      type,
      id,
      path: routePath(type, path),
      parent,
      importPath,
    },
    identity
  ) as RouteTypeWithoutParent;

  return route;
};

const maybeFileToRoute = (fileDetails?: FileDetails, parent?: string) => {
  if (!fileDetails) return undefined;

  return fileToRoute(fileDetails, parent);
};

const mapGroupedFilesToRoutes = (
  groupedFilesTuples: [string, FileDetails[]][],
  parent?: string
) => {
  return groupedFilesTuples.map(([path, files]) => {
    const root = maybeFileToRoute(
      files.find(f => f.name === "root")
    ) as RootRoute;

    const layout = maybeFileToRoute(
      files.find(f => f.name === "layout"),
      root?.id || parent
    ) as LayoutRoute;

    const routeRoute = !root
      ? ({
          id: toPascalCase([...path.split(/[-/]/g), "Route"]),
          type: "route",
          path,
          parent: layout?.id || parent,
        } as RouteRoute)
      : undefined;

    const index = maybeFileToRoute(
      files.find(f => f.name === "index"),
      routeRoute?.id || layout?.id || root?.id || parent
    ) as IndexRoute;

    index["id"] = toPascalCase(index.id.split(/[-/]/g));

    const notFound = maybeFileToRoute(
      files.find(f => f.name === "not-found"),
      routeRoute?.id || layout?.id || root?.id || parent
    ) as NotFoundRoute;

    const route = {} as {
      root?: RootRoute;
      route?: RouteRoute;
      index?: IndexRoute;
      layout?: LayoutRoute;
      notFound?: NotFoundRoute;
    };

    if (root) route["root"] = root;
    if (layout) route["layout"] = layout;
    if (index) route["index"] = index;
    if (routeRoute) route["route"] = routeRoute;
    if (notFound) route["notFound"] = notFound;

    return [path, route] as [string, typeof route];
  });
};

const routeOrder = [
  "root",
  "layout",
  "route",
  "index",
  "notFound",
] as RouteType["type"][];

const routesToArray = (
  routes: Partial<Record<RouteType["type"], RouteType | undefined>>
) => {
  return routeOrder.map(type => routes[type]).filter(x => !!x) as RouteType[];
};

const getFullRoutePath = (allRoutes: RouteType[], route?: RouteRoute) => {
  if (!route) return "";

  const { path, parent } = route;
  let result = path || "";

  if (parent) {
    result =
      getFullRoutePath(
        allRoutes,
        allRoutes.find(r => r.id === parent) as RouteRoute
      ) + result;
  }

  return result;
};

export const prepareRoutes = ({
  fileDetails,
  parent,
}: {
  fileDetails: FileDetails[];
  parent?: string;
}) => {
  const groupedFiles = groupBy(fileDetails, "path");
  const groupedFilesTuples = Object.entries(groupedFiles);

  const groupedRoutes = mapGroupedFilesToRoutes(
    groupedFilesTuples,
    parent
  ).sort(([a], [b]) => b.length - a.length);

  const routesWithParents = groupedRoutes.reduce(
    (acc, [path, routes], _, allRoutes) => {
      const nearestParent = allRoutes.filter(
        ([parentPath, { layout }]) =>
          path.startsWith(parentPath) && parentPath !== path && !!layout
      )?.[0]?.[1];

      if (!nearestParent?.layout) return [...acc, ...routesToArray(routes)];

      const nearestParentName =
        nearestParent.route?.id || nearestParent?.layout?.id;

      // Need to get full path, not local one
      const nearestParentPath = getFullRoutePath(
        flatten(allRoutes.map(([, v]) => values(v))),
        nearestParent.route
      );

      const newRoutes = { ...routes };
      const { index, layout, route } = newRoutes;

      if (layout && !layout?.parent)
        newRoutes.layout = { ...layout, parent: nearestParentName };

      if (route) {
        (newRoutes.route as any).path = newRoutes.route?.path.replace(
          nearestParentPath || "",
          ""
        );

        if (!route?.parent)
          newRoutes.route = {
            ...route,
            parent: layout?.id || nearestParentName,
          };
      }
      if (index) {
        (newRoutes.index as any).path = "/";
        if (!index?.parent)
          newRoutes.index = {
            ...index,
            parent: layout?.id || route?.id || nearestParentName,
          };
      }

      return [...acc, ...routesToArray(newRoutes)];
    },
    [] as RouteType[]
  );

  return routesWithParents;
};

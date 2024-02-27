export interface Config {
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

export type NestedDirStructure = {
  filePath: string;
  layout?: string;
  index?: string;
};

export type RootDirStructure = NestedDirStructure & {
  root?: string;
  notFound?: string;
};

export type DirStructure = RootDirStructure | NestedDirStructure;

export type Route = {
  importPath: string;
  path: string[];
  name: string;
  isRoot: boolean;
  isIndex: boolean;
  isLayout: boolean;
  isDynamic: boolean;
  url?: string;
};

export type RootRoute = {
  type: "root";
  index: number;
  importPath: string;
  id: "Root";
};
export type LayoutRoute = {
  type: "layout";
  parent: string;
  id: string;
  importPath: string;
};

export type IndexRoute = {
  type: "index";
  id: string;
  parent: string;
  importPath: string;
};

export type NotFoundRoute = {
  type: "notFound";
  importPath: string;
  id: string;
  parent: string;
  path: "*";
};

export type RouteRoute = {
  type: "route";
  parent: string;
  id: string;
  path: string;
};

export type RouteType =
  | RouteRoute
  | IndexRoute
  | LayoutRoute
  | RootRoute
  | NotFoundRoute;

export type FilesConfig = { appRoot: string; pagesRoot: string };

export type FileDetails = {
  importPath: string;
  path: string;
  // dir: string;
  // filename: string;
  name: string;
};

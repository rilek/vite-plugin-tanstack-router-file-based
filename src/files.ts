import { Config, FileDetails } from "./types/types";
import path from "path";

export const buildRouteFileRegex = (
  { root, sourceRoot, routesDirectory, fileNames, extensions }: Config,
  absolute = true
) =>
  new RegExp(
    `(${absolute ? "" : "./"}${path.join(
      absolute ? root : ".",
      sourceRoot,
      routesDirectory
    )}/[A-Za-z0-9./$-]*)(${Object.values(fileNames).join("|")}).(${extensions.join(
      "|"
    )})$`
  );

// Get glob pattern for routes files
export const fileSearchPath = ({
  sourceRoot,
  routesDirectory,
  fileNames,
  extensions,
}: Config) =>
  `${sourceRoot}/${routesDirectory}/**/{${Object.values(fileNames).join(
    ","
  )}}.{${extensions.join(",")}}`;

// Splits a file path into its directory and file name components.
const splitFileDir = (
  config: Config,
  filePath: string
): [string, string, string] => {
  const regex = buildRouteFileRegex(config, false);
  const match = filePath.match(regex);

  if (!match) {
    throw new Error(
      `File path ${filePath} does not match the route file regex`
    );
  }

  const [, dir, name, extension] = match;

  return [dir.replace(/\/$/, ""), name, extension];
};

// Parses a file path and returns its details.
const parseFilePath = (config: Config, filePath: string): FileDetails => {
  const { sourceRoot, routesDirectory } = config;
  const [dir, name, extension] = splitFileDir(config, filePath);
  const relative = dir.replace(sourceRoot, ".");
  const importPath = `${relative}/${name}`;
  const path = relative.replace(`./${routesDirectory}`, "");

  const route = {
    importPath,
    path,
    name,
    extension,
  };

  return route;
};

// Parses an array of file paths and returns their details.
export const parseFilePaths = (config: Config, filePaths: string[]) =>
  filePaths.map(filePath => parseFilePath(config, filePath));

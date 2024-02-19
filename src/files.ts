/**
 * This file contains utility functions for parsing file paths.
 */

import { FilesConfig, FileDetails } from "./types/types";

// List of file types used in the file search path
const fileTypes = ["root", "index", "layout", "not-found"];

// List of file extensions used in the file search path
const extensions = ["jsx", "tsx", "js", "ts"];

// Default configuration for file paths
const defaultConfig: FilesConfig = { appRoot: "./src", pagesRoot: "./pages" };

/**
 * Returns the file search path for a given directory path.
 * @param path The directory path to search in.
 * @returns The file search path.
 */
export const fileSearchPath = (path: string) =>
  `${path}/{${fileTypes.join(",")}}.{${extensions.join(",")}}`;

/**
 * Splits a file path into its directory and file name components.
 * @param filePath The file path to split.
 * @returns An array containing the directory and file name components.
 */
const splitFileDir = (filePath: string): [string, string] => {
  const [file, ...dir] = filePath.split("/").reverse();
  return [dir.reverse().join("/"), file];
};

/**
 * Parses a file path and returns its details.
 * @param filePath The file path to parse.
 * @param config The configuration to use for parsing the file path.
 * @returns An object containing the details of the parsed file path.
 */
const parseFilePath = (filePath: string, config?: FilesConfig): FileDetails => {
  const { appRoot, pagesRoot } = config || defaultConfig;

  const [dir, filename] = splitFileDir(filePath);
  const relativeFileDir = dir.replace(appRoot, ".");
  const path = relativeFileDir.replace(new RegExp(pagesRoot + "/?"), "");
  const name = filename.replace(/\..+$/, "");
  const importPath = `${relativeFileDir}/${name}`;

  const route = {
    importPath,
    path,
    dir,
    filename,
    name,
  };

  return route;
};

/**
 * Parses an array of file paths and returns their details.
 * @param filePaths The array of file paths to parse.
 * @param config The configuration to use for parsing the file paths.
 * @returns An array of objects containing the details of the parsed file paths.
 */
export const parseFilePaths = (filePaths: string[], config?: FilesConfig) => {
  const mappedFiles = filePaths.map(filePath =>
    parseFilePath(filePath, config)
  );

  return mappedFiles;
};

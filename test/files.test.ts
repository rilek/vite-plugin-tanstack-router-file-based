import { describe, expect, it } from "vitest";
import {
  buildRouteFileRegex,
  fileSearchPath,
  parseFilePaths,
} from "../src/files";
import { getConfig } from "../src/config";
import { testTreeDirectory, testTreeMeta } from "./testData";

describe("Get files structure", () => {
  const config = getConfig();
  const filesStructure = parseFilePaths(config, testTreeDirectory);

  it("Builds the route file regex correctly", () => {
    const config = getConfig();
    const regex = buildRouteFileRegex(config, false);

    // Test with absolute path
    expect(regex.test("./src/pages/index.tsx")).toBe(true);
    expect(regex.test("./src/pages/layout.tsx")).toBe(true);
    expect(regex.test("./src/pages/home.tsx")).toBe(false);
    expect(regex.test("./src/routes/index.tsx")).toBe(false);

    // Test with relative path
    const absoluteRegex = buildRouteFileRegex(getConfig({ root: "/home/app" }));

    expect(absoluteRegex.test("/home/app/src/pages/index.ts")).toBe(true);
    expect(absoluteRegex.test("/home/app/src/pages/layout.ts")).toBe(true);
    expect(absoluteRegex.test("/home/anotherapp/src/routes/contact.tsx")).toBe(
      false
    );
  });

  it("Generates the correct file search path", () => {
    const config = getConfig();
    const searchPath = fileSearchPath(config);

    expect(searchPath).toBe(
      `${config.sourceRoot}/${config.routesDirectory}/**/{${Object.values(
        config.fileNames
      ).join(",")}}.{${config.extensions.join(",")}}`
    );
  });

  it("Gets proper files metadata", () => {
    expect(filesStructure).toStrictEqual(testTreeMeta);
  });
});

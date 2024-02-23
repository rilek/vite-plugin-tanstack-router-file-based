import { Plugin } from "vite";
import { buildRouteTree } from "./core";
import { buildRouteFileRegex, fileSearchPath } from "./files";
import fg from "fast-glob";
import fs from "fs";
import path from "path";
import { Config } from "./types/types";
import { getConfig } from "./config";

const generateRouterFile = async (config: Config) => {
  const { sourceRoot, generatedRouteTree } = config;
  const filePaths = await fg(fileSearchPath(config));
  const code = await buildRouteTree(config, filePaths);

  fs.writeFileSync(path.join(sourceRoot, generatedRouteTree), code);
};

export function router(defaultConfig: Partial<Config> = {}): Plugin {
  const config = getConfig({ ...defaultConfig });

  return {
    name: "vite-plugin-tanstack-router-file-based",

    async configResolved() {
      await generateRouterFile(config);
    },
    async handleHotUpdate({ file }) {
      const routePathRegex = buildRouteFileRegex(config);

      if (file.match(routePathRegex)) {
        await generateRouterFile(config);
      }
    },
  };
}

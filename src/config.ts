import { Config } from "./types/types";
import path from "path";
import fs from "fs";

const CONFIG_FILE_NAME = "tsr.config.json";

const defaultConfig: Config = {
  sourceRoot: "./src",
  generatedRouteTree: "router.generated.tsx",
  routesDirectory: "pages",
  configPath: path.join(CONFIG_FILE_NAME),
  root: process.cwd(),
  fileNames: {
    index: "index",
    layout: "layout",
    notFound: "not-found",
    root: "root",
  },
  extensions: ["tsx", "ts", "js", "jsx"],
};

export const getConfig = (inlineConfig?: Partial<Config>): Config => {
  const configPath = inlineConfig?.configPath || defaultConfig.configPath;
  const exists = fs.existsSync(configPath);

  const config = {
    ...defaultConfig,
    ...inlineConfig,
    ...(exists
      ? (JSON.parse(fs.readFileSync(configPath, "utf-8")) as Partial<Config>)
      : {}),
  };

  return config;
};

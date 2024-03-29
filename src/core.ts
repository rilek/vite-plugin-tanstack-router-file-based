import { parseFilePaths } from "./files";
import { createRouterCode } from "./generator";
import { prepareRoutes } from "./routes";
import { Config } from "./types/types";

export const buildRouteTree = (config: Config, filePaths: string[]) => {
  const fileDetails = parseFilePaths(config, filePaths);
  const routes = prepareRoutes({ fileDetails });
  const code = createRouterCode({ routes });

  return code;
};

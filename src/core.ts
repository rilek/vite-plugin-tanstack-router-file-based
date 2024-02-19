import { parseFilePaths } from "./files";
import { createRouterCode } from "./generator";
import { prepareRoutes } from "./routes";

export const buildRouteTree = async (filePaths: string[]) => {
  const fileDetails = parseFilePaths(filePaths);
  const routes = prepareRoutes({ fileDetails });
  const code = await createRouterCode({ routes });

  return code;
};

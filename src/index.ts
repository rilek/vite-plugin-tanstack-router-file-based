/* eslint-disable node/no-extraneous-import */
import { buildRouteTree } from "./core";
import { fileSearchPath } from "./files";
import fg from "fast-glob";
import fs from "fs";

export const getProjectDirectory = async () =>
  await fg(fileSearchPath("./src/pages/**"));

export async function router() {
  const filePaths = await getProjectDirectory();
  const code = await buildRouteTree(filePaths);

  fs.writeFileSync("./src/router.generated.tsx", code);

  return null;
}

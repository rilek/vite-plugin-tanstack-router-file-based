import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
  outDir: "./dist",
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    dts: {
      tsconfig: "./tsconfig.build.json",
      respectExternal: false,
    },
  },
});

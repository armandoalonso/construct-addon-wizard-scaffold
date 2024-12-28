import path from "path";
import * as chalkUtils from "./chalkUtils.js";
import webpackConfig from "./webpack_export.config.cjs";
import doWebpack from "./webpack.js";

export default async function exportWebpack() {
  chalkUtils.step("Webpack export build");
  return await doWebpack(webpackConfig);
}

// if is being called from the command line
if (import.meta.url.endsWith(process.argv[1].split(path.sep).join("/"))) {
  chalkUtils.fromCommandLine();
  buildstepWebpack();
}

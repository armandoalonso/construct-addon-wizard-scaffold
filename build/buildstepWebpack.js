import * as chalkUtils from "./chalkUtils.js";
import webpackConfig from "./webpack_buildstep.config.cjs";
import doWebpack from "./webpack.js";
import fromConsole from "./fromConsole.js";

export default async function exportWebpack() {
  chalkUtils.step("Webpack intermediate build");
  return await doWebpack(webpackConfig);
}

// if is being called from the command line
if (fromConsole(import.meta.url)) {
  chalkUtils.fromCommandLine();
  buildstepWebpack();
}

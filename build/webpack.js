import webpack from "webpack";
import * as chalkUtils from "./chalkUtils.js";

export default async function exportWebpack(config) {
  let hadError = false;
  await new Promise((resolve) => {
    webpack(config, (err, stats) => {
      if (err) {
        chalkUtils.errorList(
          "Error(s) in webpack build",
          err.message.split(". ")
        );
        hadError = true;
        return;
      }

      if (stats.hasErrors()) {
        hadError = true;
      }

      console.log(
        stats.toString({
          colors: true,
          chunks: false,
          modules: false,
          children: false,
          chunkModules: false,
          warningsFilter: /export .* was not found in/,
        })
      );
      resolve();
    });
  });

  chalkUtils.newLine();
  if (hadError) {
    chalkUtils.error("Webpack build failed");
  } else {
    chalkUtils.success("Webpack build successful");
  }

  return hadError;
}

import * as chalkUtils from "./chalkUtils.js";
import fromConsole from "./fromConsole.js";
import yoctoSpinner from "yocto-spinner";

const buildSteps = [
  "./validateAddonConfig.js",
  "./generateAceFiles.js",
  "./validateAceConfigs.js",
  "./buildstepWebpack.js",
  "./generateAddonJSON.js",
  "./generateLangJSON.js",
  "./exportWebpack.js",
  "./validateIcon.js",
  "./packageAddon.js",
  "./cleanup.js",
];

export default async function build() {
  for (let i = 0; i < buildSteps.length; i++) {
    const step = buildSteps[i];
    let failed = false;
    try {
      let module = await import(step);
      let promise = module.default();
      if (promise instanceof Promise) {
        let spinner = yoctoSpinner({
          spinner: {
            interval: 80,
            frames: ["⢎ ", "⠎⠁", "⠊⠑", "⠈⠱", " ⡱", "⢀⡰", "⢄⡠", "⢆⡀"],
          },
        }).start();
        failed = await promise;
        spinner.stop();
      } else {
        failed = promise;
      }
    } catch (e) {
      chalkUtils.uncaughtError(
        `Error in build step ${step}:\n${e.message}\n${e.stack}`
      );
      failed = true;
    }
    if (failed) {
      chalkUtils.newLine();
      chalkUtils.newLine();
      chalkUtils.failed(`Build failed`);
      return;
    } else {
      chalkUtils.divider();
    }
  }

  chalkUtils.successBlue("Build successful!");
}

if (fromConsole(import.meta.url)) {
  build();
}

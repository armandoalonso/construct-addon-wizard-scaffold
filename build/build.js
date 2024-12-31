import path from "path";
import * as chalkUtils from "./chalkUtils.js";
import fromConsole from "./fromConsole.js";
import yoctoSpinner from "yocto-spinner";
import { disableTips, disableWarnings } from "../buildconfig.js";

const buildSteps = [
  "./validateAddonConfig.js",
  "./generateAceFiles.js",
  "./validateAceConfigs.js",
  "./buildstepWebpack.js",
  "./generateAddonJSON.js",
  "./generateLangJSON.js",
  "./exportWebpack.js",
  "./processDependencies.js",
  "./validateIcon.js",
  "./packageAddon.js",
  "./cleanup.js",
];

export default async function build(buildSteps) {
  let tips = [];
  let optionalErrors = [];
  let hadError = false;

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
    if (typeof failed !== "boolean") {
      let failedObject = {
        ...failed,
      };
      if (failedObject.hadError) {
        failed = true;
      } else {
        failed = false;
      }
      if (failedObject.hadOptionalError) {
        optionalErrors.push(step);
      }
      if (failedObject.hadTip) {
        tips.push(failedObject.hadTip);
      }
    }
    if (failed) {
      hadError = true;
      chalkUtils.newLine();
      break;
    } else {
      chalkUtils.divider();
    }
  }

  let buildConfigPath = path.resolve("../buildconfig.js");
  if (optionalErrors.length > 0 && !disableWarnings) {
    chalkUtils.warningList(
      "Optional errors occurred in the following build steps",
      optionalErrors
    );
    chalkUtils.newLine();

    if (!disableTips) {
      tips.push(
        chalkUtils._tip(
          `To disable warnings, set ${chalkUtils.tipHighlight(
            "disableWarnings"
          )} in the build config.`
        )
      );
    }
  }

  if (tips.length > 0 && !disableTips) {
    tips.push(
      chalkUtils._tip(
        `To disable tips, set ${chalkUtils.tipHighlight(
          "disableTips"
        )} in the build config.`
      )
    );
    chalkUtils.tipList(tips, `  ${chalkUtils.tipHighlight(buildConfigPath)}`);
    chalkUtils.newLine();
  }

  if (hadError) {
    chalkUtils.newLine();
    chalkUtils.failed(`Build failed`);
    return;
  }

  chalkUtils.successBlue("Build successful!");
}

if (fromConsole(import.meta.url)) {
  build(buildSteps);
}

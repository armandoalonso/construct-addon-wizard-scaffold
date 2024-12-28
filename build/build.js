import path from "path";
import * as chalkUtils from "./chalkUtils.js";

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
      failed = await module.default();
    } catch (e) {
      chalkUtils.uncaughtError(`Error in build step ${step}:\n${e.message}\n`);
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

if (import.meta.url.endsWith(process.argv[1].split(path.sep).join("/"))) {
  build();
}

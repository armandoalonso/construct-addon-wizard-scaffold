import express from "express";
import { exec } from "child_process";
import chokidar from "chokidar";
import cors from "cors";
import fromConsole from "./fromConsole.js";
import build from "./build.js";
import * as chalkUtils from "./chalkUtils.js";
import { basePort } from "../devConfig.js";
import path from "path";

const buildSteps = [
  "./preCleanup.js",
  "./updateProjectData.js",
  "./validateAddonConfig.js",
  "./runAceDefiner.js",
  "./generateAceFiles.js",
  "./validateAceConfigs.js",
  "./generateComboEnums.js",
  "./buildstepWebpack.js",
  "./generateAcesJSON.js",
  "./generateAddonJSON.js",
  "./generateLangJSON.js",
  "./exportWebpack.js",
  "./buildDomside.js",
  "./processDependencies.js",
  "./validateIcon.js",
];

let port = basePort;
const localHostURL = () => `http://localhost:${port}/addon.json`;
let buildRunning = false;

export default async function dev() {
  // Execute build command
  const runBuild = () => {
    if (buildRunning) return;
    buildRunning = true;
    build(buildSteps).then((hadError) => {
      buildRunning = false;
      if (hadError) return;
      chalkUtils.info(
        `Addon served at:\n${chalkUtils.infoHighlight(localHostURL())}`
      );
    });
  };

  // Run initial build
  runBuild();

  // Watch for file changes in the src directory
  // log pwd
  console.log(process.cwd());
  const watcher = chokidar.watch(["../src", "../config.caw.js"], {
    ignored: [/^([.][^.\/\\])|([\/\\]+[.][^.])/],
    persistent: true,
  });

  watcher.on("change", (path) => {
    chalkUtils.info(`File ${path} has been changed. Re-running build...`);
    runBuild();
  });

  const app = express();
  app.use(cors());
  app.use(express.static("../dist/export"));

  function tryListen() {
    app.listen(port, () => {
      chalkUtils.info("Server is running at http://localhost:" + port);
    });
  }

  process.on("uncaughtException", function (err) {
    if (err.code === "EADDRINUSE") {
      chalkUtils.info(`Port ${port} is already in use. Trying another port...`);
      port++;
      tryListen();
    } else {
      chalkUtils.error(err);
      process.exit(1);
    }
  });

  tryListen();
}

if (fromConsole(import.meta.url)) {
  dev();
}

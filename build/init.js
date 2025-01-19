import fs from "fs";
import open from "open";
import { exec } from "child_process";
import * as chalkUtils from "./chalkUtils.js";
import fromConsole from "./fromConsole.js";

export default function initialiseProject() {
  let process = exec("npm run updateProjectData");
  process.stdout.pipe(process.stdout);
  process.stderr.pipe(process.stderr);
  process.on("exit", () => {
    if (!fs.existsSync(".git")) {
      let process2 = exec(
        "git init && git add -A && git commit -m 'Initial commit'"
      );
      process2.stdout.pipe(process2.stdout);
      process2.stderr.pipe(process2.stderr);
      process2.on("exit", () => {
        open("https://github.com/new");
      });
    }
  });
}

if (fromConsole(import.meta.url)) {
  chalkUtils.fromCommandLine();
  initialiseProject();
}

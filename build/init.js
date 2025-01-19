import fs from "fs";
import open from "open";
import { execSync } from "child_process";
import * as chalkUtils from "./chalkUtils.js";
import fromConsole from "./fromConsole.js";

export default function initialiseProject() {
  console.log(execSync("npm install"));
  console.log(execSync("npm run updateProjectData"));
  if (!fs.existsSync(".git")) {
    console.log(execSync("git init"));
    console.log(execSync("git add -A"));
    console.log(execSync('git commit -m "Initial commit"'));
    open("https://github.com/new");
  }
}

if (fromConsole(import.meta.url)) {
  chalkUtils.fromCommandLine();
  initialiseProject();
}

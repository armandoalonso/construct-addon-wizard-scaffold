import fs from "fs";
import version from "./version.js";
import * as chalkUtils from "./build/chalkUtils.js";
import fromConsole from "./build/fromConsole.js";
import { execSync } from "child_process";

function isGitClean() {
  const { status } = execSync("git status --porcelain");
  return status === "";
}

export default function publish(type) {
  // check git is clean
  if (!isGitClean()) {
    chalkUtils.error(
      "Git is not clean\n" +
        chalkUtils._errorUnderline(
          "Please commit all changes before publishing"
        )
    );
    return true;
  }

  // check type is major, minor, patch, revision or a version with the format x.x.x.x
  let newVersion = "";
  if (
    type === "major" ||
    type === "minor" ||
    type === "patch" ||
    type === "revision"
  ) {
    const versionParts = version.split(".");
    const versionType = ["major", "minor", "patch", "revision"].indexOf(type);
    versionParts[versionType]++;
    for (let i = versionType + 1; i < versionParts.length; i++) {
      versionParts[i] = 0;
    }
    newVersion = versionParts.join(".");
  } else if (/^\d+\.\d+\.\d+\.\d+$/.test(type)) {
    newVersion = type;
  } else {
    chalkUtils.error(
      "Invalid version type\n" +
        chalkUtils._errorUnderline(
          "Please use major, minor, patch, revision or a version with the format x.x.x.x"
        )
    );
    return true;
  }
  console.log(newVersion);
  // update version.js
  const versionFile = `./version.js`;
  const versionContent = `export default "${newVersion}";`;
  fs.writeFileSync(versionFile, versionContent);
}

if (fromConsole(import.meta.url)) {
  console.log(process.argv[2]);
  publish(process.argv[2]);
}

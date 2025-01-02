import fs from "fs";
import fromConsole from "./fromConsole.js";
import * as chalkUtils from "./chalkUtils.js";

export default function generateEmptyFiles() {
  // C3 needs these files to exist for some reason, so make empty ones
  const emptyFiles = [
    "actions.js",
    "conditions.js",
    "expressions.js",
    "instance.js",
    "type.js",
  ];
  emptyFiles.forEach((file) => {
    fs.closeSync(fs.openSync(`../dist/export/c3runtime/${file}`, "w"));
  });
}

if (fromConsole(import.meta.url)) {
  chalkUtils.fromCommandLine();
  generateEmptyFiles();
}

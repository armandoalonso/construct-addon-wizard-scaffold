import path from "path";
import * as chalkUtils from "./chalkUtils.js";
import removeDir from "./removeDir.js";

export default async function cleanup() {
  let hadError = false;

  chalkUtils.step("Cleaning up");

  removeDir("../dist/export");
  removeDir("../dist/exportStep");
  removeDir("../generated");

  chalkUtils.success("Cleaned up");

  return hadError;
}

// if is being called from the command line
if (import.meta.url.endsWith(process.argv[1].split(path.sep).join("/"))) {
  chalkUtils.fromCommandLine();
  cleanup();
}

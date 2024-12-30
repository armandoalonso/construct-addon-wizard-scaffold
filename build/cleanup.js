import * as chalkUtils from "./chalkUtils.js";
import removeDir from "./removeDir.js";
import { cleanup as config } from "../buildconfig.js";
import fromConsole from "./fromConsole.js";

export default function cleanup() {
  let hadError = false;

  chalkUtils.step("Cleaning up");

  if (!config.keepExport) removeDir("../dist/export");
  if (!config.keepExportStep) removeDir("../dist/exportStep");
  if (!config.keepGenerated) removeDir("../generated");

  chalkUtils.success("Cleaned up");

  return hadError;
}

// if is being called from the command line
if (fromConsole(import.meta.url)) {
  chalkUtils.fromCommandLine();
  cleanup();
}

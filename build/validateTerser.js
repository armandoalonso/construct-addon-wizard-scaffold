import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { minify } from "terser";
import * as chalkUtils from "./chalkUtils.js";
import fromConsole from "./fromConsole.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function validateTerser() {
  chalkUtils.step("Validating Terser build (mangle-props keep_quoted)");

  const filesToCheck = [
    "../dist/export/c3runtime/main.js",
    "../dist/export/editor.js",
  ];

  let hadError = false;

  for (const file of filesToCheck) {
    const absolutePath = path.resolve(__dirname, file);
    if (!fs.existsSync(absolutePath)) {
      chalkUtils.info(`Skipping ${file} as it does not exist.`);
      continue;
    }

    try {
      const code = fs.readFileSync(absolutePath, "utf8");
      const result = await minify(code, {
        mangle: {
          properties: {
            keep_quoted: true,
          },
        },
        compress: {
          dead_code: true,
          drop_console: false,
          drop_debugger: true,
          keep_classnames: false,
          keep_fargs: true,
          keep_fnames: false,
          keep_infinity: false,
        },
      });

      if (result.error) {
        throw result.error;
      }
      chalkUtils.success(`Terser validation passed for ${file}`);
    } catch (error) {
      chalkUtils.error(`Terser validation failed for ${file}`);
      chalkUtils.error(error.message || error);
      hadError = true;
    }
  }

  if (hadError) {
    chalkUtils.failed("Terser validation failed.");
  } else {
    chalkUtils.success("Terser validation successful!");
  }

  return hadError;
}

// if is being called from the command line
if (fromConsole(import.meta.url)) {
  chalkUtils.fromCommandLine();
  validateTerser();
}

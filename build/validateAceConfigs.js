import * as chalkUtils from "./chalkUtils.js";
import { actionSchema, conditionSchema, expressionSchema } from "./schemas.js";
import { config as actionConfigs } from "../generated/actionConfig.js";
import { config as conditionConfigs } from "../generated/conditionConfig.js";
import { config as expressionConfigs } from "../generated/expressionConfig.js";
import camelCasify from "./camelCasify.js";
import fromConsole from "./fromConsole.js";

let typeMap = {
  action: {
    schema: actionSchema,
    configs: actionConfigs,
  },
  condition: {
    schema: conditionSchema,
    configs: conditionConfigs,
  },
  expression: {
    schema: expressionSchema,
    configs: expressionConfigs,
  },
};

let hadError = false;

function validateAceType(type) {
  if (!typeMap[type]) {
    chalkUtils.error(`Invalid ace type: ${chalkUtils._errorUnderline(type)}`);
    hadError = true;
    return;
  }

  let nameSet = new Set();
  let typeData = typeMap[type];

  for (let [name, config] of Object.entries(typeData.configs)) {
    name = camelCasify(name);
    if (nameSet.has(name)) {
      chalkUtils.newLine();
      chalkUtils.error(
        `\nDuplicate ${type} name: ${chalkUtils._errorUnderline(name)}`
      );
      hadError = true;
    } else {
      nameSet.add(name);
    }
    const { error } = typeData.schema.validate(config, {
      abortEarly: false,
    });
    if (error) {
      chalkUtils.errorList(
        `Error(s) in ${type} ${chalkUtils._errorUnderline(name)}`,
        error.message.split(". ")
      );
      hadError = true;
    }
  }
}

export default function validateAce() {
  hadError = false;
  chalkUtils.step("Validating ACE configs");
  validateAceType("action");
  validateAceType("condition");
  validateAceType("expression");

  if (hadError) {
    chalkUtils.failed("Some ACE configs are invalid.");
  } else {
    chalkUtils.success("All ACE configs are valid!");
  }
  return hadError;
}

// if is being called from the command line
if (fromConsole(import.meta.url)) {
  chalkUtils.fromCommandLine();
  validateAce();
}

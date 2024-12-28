import Plugin from "../src/runtime/plugin.js";
import Type from "../src/runtime/type.js";
import Instance from "../src/runtime/instance.js";
import runtimeConfig from "../template/runtimeConfig.js";
import {
  exposed as exposedActs,
  unexposed as Acts,
} from "../generated/actions.js";
import {
  exposed as exposedCnds,
  unexposed as Cnds,
} from "../generated/conditions.js";
import {
  exposed as exposedExps,
  unexposed as Exps,
} from "../generated/expressions.js";

Instance.prototype = {
  ...Instance.prototype,
  ...exposedActs,
  ...exposedCnds,
  ...exposedExps,
};

const AddonTypeMap = {
  plugin: "Plugins",
  behavior: "Behaviors",
};

globalThis.C3[AddonTypeMap[runtimeConfig.addonType]][runtimeConfig.id] = {
  Acts,
  Cnds,
  Exps,
  Instance,
  Type,
  Plugin,
};

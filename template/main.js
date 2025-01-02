import createPlugin from "../src/runtime/plugin.js";
import createType from "../src/runtime/type.js";
import createInstance from "../src/runtime/instance.js";
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

const pluginBaseClasses = {
  object: globalThis.ISDKPluginBase,
  world: globalThis.ISDKPluginBase,
  dom: globalThis.ISDKDOMPluginBase,
};

const baseClass = {
  plugin: pluginBaseClasses[runtimeConfig.type],
  behavior: globalThis.ISDKBehaviorBase,
};

const typeClass = {
  plugin: globalThis.ISDKObjectTypeBase,
  behavior: globalThis.ISDKBehaviorTypeBase,
};

const pluginInstanceClass = {
  object: globalThis.ISDKInstanceBase,
  world: globalThis.ISDKWorldInstanceBase,
  dom: globalThis.ISDKDOMInstanceBase,
};

const instanceClass = {
  plugin: pluginInstanceClass[runtimeConfig.type],
  behavior: globalThis.ISDKBehaviorInstanceBase,
};

const Instance = createInstance(instanceClass[runtimeConfig.addonType]);
Object.assign(Instance.prototype, exposedActs);
Object.assign(Instance.prototype, exposedCnds);
Object.assign(Instance.prototype, exposedExps);

const AddonTypeMap = {
  plugin: "Plugins",
  behavior: "Behaviors",
};

globalThis.C3[AddonTypeMap[runtimeConfig.addonType]][runtimeConfig.id] = {
  Acts,
  Cnds,
  Exps,
  Instance,
  Type: createType(typeClass[runtimeConfig.addonType]),
  Plugin: createPlugin(baseClass[runtimeConfig.addonType]),
};

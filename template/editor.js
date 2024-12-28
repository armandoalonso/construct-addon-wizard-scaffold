import createInstanceClass from "../src/editor/instance.js";
import createPluginClass from "../template/plugin.js";
import typeClass from "../src/editor/instance.js";
import PLUGIN_INFO from "../template/editorConfig.js";
const SDK = self.SDK;

const AddonTypeMap = {
  plugin: "Plugins",
  behavior: "Behaviors",
};

const SDKType = AddonTypeMap[PLUGIN_INFO.addonType];

SDKType[PLUGIN_INFO.id] = createPluginClass(PLUGIN_INFO);
const P_C = SDKType[PLUGIN_INFO.id];
P_C.Register(PLUGIN_INFO.id, P_C);

P_C.Type = typeClass;

const instanceParentClasses = {
  object: SDK.IInstanceBase,
  world: SDK.IWorldInstanceBase,
  dom: SDK.IWorldInstanceBase,
};
P_C.Instance = createInstanceClass(instanceParentClasses[PLUGIN_INFO.type]);

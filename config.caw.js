import { ADDON_CATEGORY, ADDON_TYPE, PLUGIN_TYPE } from "./template/enums.js";
export const addonType = ADDON_TYPE.PLUGIN;
export const type = PLUGIN_TYPE.OBJECT;
export const id = "sample_addon";
export const name = "Sample Addon";
export const version = "1.0.0.0";
export const author = "skymen";
export const website = "https://www.construct.net";
export const documentation = "https://www.construct.net";
export const description = "Description";
export const category = ADDON_CATEGORY.GENERAL; // "3d", "data-and-storage", "form-controls", "input", "media", "monetisation", "platform-specific", "web", "other"

export const files = {
  extensionScript: {},
  fileDependencies: [],
};

export const hasDomside = false;

// categories that are not filled will use the folder name
export const aceCategories = {};

export const info = {
  // icon: "icon.svg",
  // world only
  // defaultImageUrl: "default-image.png",
  Set: {
    // world only
    IsResizable: false,
    IsRotatable: false,
    Is3D: false,
    HasImage: false,
    IsTiled: false,
    SupportsZElevation: false,
    SupportsColor: false,
    SupportsEffects: false,
    MustPreDraw: false,

    // object only
    IsSingleGlobal: true,

    // world and object
    CanBeBundled: true,
    IsDeprecated: false,
    GooglePlayServicesEnabled: false,
  },
  AddCommonACEs: {
    // world only
    Position: false,
    SceneGraph: false,
    Size: false,
    Angle: false,
    Appearance: false,
    ZOrder: false,
  },
};

export const properties = [
  /*
  {
    type:
      "integer"
      "float"
      "percent"
      "text"
      "longtext"
      "check"
      "font"
      "combo"
      "color"
      "object"
      "group"
      "link"
      "info"

    id: "property_id",
    options: {
      initialValue: 0,
      interpolatable: false,

      // minValue: 0, // omit to disable
      // maxValue: 100, // omit to disable

      // for type combo only
      // items: [
      //   {itemId1: "item name1" },
      //   {itemId2: "item name2" },
      // ],

      // dragSpeedMultiplier: 1, // omit to disable

      // for type object only
      // allowedPluginIds: ["Sprite", "<world>"],

      // for type link only
      // linkCallback: `function(instOrObj) {}`,
      // linkText: "Link Text",
      // callbackType:
      //   "for-each-instance"
      //   "once-for-type"

      // for type info only
      // infoCallback: `function(inst) {}`,
    },
    name: "Property Name",
    desc: "Property Description",
  }
  */
];

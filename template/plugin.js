const SDK = globalThis.SDK;
export default function (PLUGIN_INFO, parentClass) {
  return class extends parentClass {
    constructor() {
      super(PLUGIN_INFO.id);
      SDK.Lang.PushContext("plugins." + PLUGIN_INFO.id.toLowerCase());
      this._info.SetName(self.lang(".name"));
      this._info.SetDescription(self.lang(".description"));
      this._info.SetCategory(PLUGIN_INFO.category);
      this._info.SetAuthor(PLUGIN_INFO.author);
      this._info.SetPluginType(
        PLUGIN_INFO.type === "object" ? "object" : "world"
      );
      this._info.SetHelpUrl(self.lang(".help-url"));
      this._info.SetRuntimeModuleMainScript("c3runtime/plugin.js");
      if (PLUGIN_INFO.info.icon) {
        this._info.SetIcon(
          PLUGIN_INFO.info.icon,
          PLUGIN_INFO.info.icon.endsWith(".svg") ? "image/svg+xml" : "image/png"
        );
      }

      if (PLUGIN_INFO.info.defaultImageUrl) {
        this._info.SetDefaultImageURL(
          `c3runtime/${PLUGIN_INFO.info.defaultImageUrl}`
        );
      }

      if (PLUGIN_INFO.files.domSideScripts) {
        this._info.SetDOMSideScripts(
          PLUGIN_INFO.files.domSideScripts.map((s) => `c3runtime/${s}`)
        );
      }

      if (
        PLUGIN_INFO.files.extensionScript &&
        PLUGIN_INFO.files.extensionScript.enabled
      ) {
        const targets = PLUGIN_INFO.files.extensionScript.targets || [];
        targets.forEach((target) => {
          this._info.AddFileDependency({
            filename: `${PLUGIN_INFO.id}_${target.toLowerCase()}.ext.dll`,
            type: "wrapper-extension",
            platform: `windows-${target.toLowerCase()}`,
          });
        });
      }
      if (PLUGIN_INFO.files.fileDependencies) {
        PLUGIN_INFO.files.fileDependencies.forEach((file) => {
          this._info.AddFileDependency({
            ...file,
            filename: `c3runtime/${file.filename}`,
          });
        });
      }

      if (PLUGIN_INFO.info && PLUGIN_INFO.info.Set)
        Object.keys(PLUGIN_INFO.info.Set).forEach((key) => {
          const value = PLUGIN_INFO.info.Set[key];
          const fn = this._info[`Set${key}`];
          if (fn && value !== null && value !== undefined)
            fn.call(this._info, value);
        });
      if (PLUGIN_INFO.info && PLUGIN_INFO.info.AddCommonACEs)
        Object.keys(PLUGIN_INFO.info.AddCommonACEs).forEach((key) => {
          if (PLUGIN_INFO.info.AddCommonACEs[key])
            this._info[`AddCommon${key}ACEs`]();
        });
      SDK.Lang.PushContext(".properties");
      this._info.SetProperties(
        (PLUGIN_INFO.properties || []).map(
          (prop) =>
            new SDK.PluginProperty(prop.type, prop.id, {
              ...prop.options,
              items:
                prop.type === "combo" && prop.options.items
                  ? prop.options.items.map((i) => Object.keys(i)[0])
                  : undefined,
            })
        )
      );
      SDK.Lang.PopContext(); // .properties
      SDK.Lang.PopContext();
    }
  };
}

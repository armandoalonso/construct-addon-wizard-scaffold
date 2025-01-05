import { id } from "../../config.caw.js";

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();
      this.sdkLoaded = false;
      this.enabled = false;
      this.lastRewardedSuccess = false;
      this._debugModeActive = false;
      this._lastTriggeredTag = "";
      this.config = {};
      this.hasAds = false;
      this.hasInterstitialAds = false;
      this.hasRewardedAds = false;

      // Props
      this._sdkName = 0;
      this._enabledMode = 0;
      this._debugOnPreview = false;
      this._loadingNotification = 0; // Immediate
      this._automaticSuspend = true;
      this._willSuspend = false;
      this._suspendTimeout = 300;
      this._configStr = "{}";
      const properties = this._getInitProperties();
      if (properties) {
        // note properties may be null in some cases
        [
          this._enabledMode,
          this._sdkName,
          this._debugOnPreview,
          this._configStr,
          this._loadingNotification,
          this._automaticSuspend,
          this._suspendTimeout,
        ] = properties;
      }

      this.enabled =
        this._enabledMode === 2 ||
        (this._enabledMode === 1 && !this._isPreview());

      try {
        this.config = JSON.parse(this._configStr);
      } catch (e) {
        this.config = {};
      }

      this._addDOMMessageHandlers([
        ["SuspendRuntime", this._suspendRuntime.bind(this)],
        ["ResumeRuntime", this._resumeRuntime.bind(this)],
      ]);

      if (this._loadingNotification === 0) {
        // Immediate
        runOnStartup(async (runtime) => {
          runtime.addEventListener("beforeprojectstart", () => {
            this._postToDOMAsync("GameLoadingFinished");
          });
        });
      } else if (this._loadingNotification === 1) {
        //After First Layout
        let ignoreFirstLayout = true;
        runOnStartup(async (runtime) => {
          const sendLoadFinishOnLayoutStart = () => {
            if (ignoreFirstLayout) {
              ignoreFirstLayout = false;
              return;
            }
            this._postToDOMAsync("GameLoadingFinished");
            runtime.getAllLayouts().forEach((layout) => {
              layout.removeEventListener(
                "beforelayoutstart",
                sendLoadFinishOnLayoutStart
              );
            });
          };
          runtime
            .getAllLayouts()
            .forEach((layout) =>
              layout.addEventListener(
                "beforelayoutstart",
                sendLoadFinishOnLayoutStart
              )
            );
        });
      }

      if (this.enabled) {
        this._debugModeActive =
          this._debugOnPreview && this._runtime.IsPreview();

        this.runtime.sdk.addLoadPromise(
          this._postToDOMAsync("Init", {
            name: this._sdkName,
            debug: this._debugModeActive,
            config: this.config,
          })
            .then(({ enabled, hasAds, hasInterstitialAds, hasRewardedAds }) => {
              this.sdkLoaded = enabled;
              this.hasAds = hasAds;
              this.hasInterstitialAds = hasInterstitialAds;
              this.hasRewardedAds = hasRewardedAds;
            })
            .catch(console.error)
        );
      }
    }

    _trigger(method) {
      super._trigger(self.C3.Plugins[id].Cnds[method]);
    }

    _release() {
      super._release();
    }

    _saveToJson() {
      return {
        // data to be saved for savegames
      };
    }

    _loadFromJson(o) {
      // load state for savegames
    }
  };
}

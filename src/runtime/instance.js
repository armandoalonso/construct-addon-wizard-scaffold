export default class extends Instance {
  constructor() {
    super();
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
}

import { EventEmitter } from "events";

class StateManager extends EventEmitter {
  constructor() {
    super();
  }
}

export default new StateManager();

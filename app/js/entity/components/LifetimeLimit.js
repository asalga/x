'use strict';

import Component from './Component.js';

import Event from '../../event/Event.js';
import Utils from '../../Utils.js';

/*
  Removes its associated entity from the scene. Either directly
  from the scene or by telling the entity to remove the child
*/
export default class LifetimeLimit extends Component {

  constructor(e, cfg) {
    super(e, 'lifetimelimit');
    this.cfg = cfg;
  }

  timeLeft() {
    return this.limit - this.age;
  }

  reset() {
    let defaults = {
      age: 0,
      limit: 1,
      cb: Utils.noop
    };
    Utils.applyProps(this, defaults, this.cfg);
  }

  update(dt) {
    this.age += dt;
    if (this.age >= this.limit) {
      this.cb();
      // this.entity.recycle();
      this.entity.removeSelf();
    }
  }
}
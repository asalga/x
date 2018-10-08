'use strict';

import Component from './Component.js';

import Event from '../../event/Event.js';
import Utils from '../../Utils.js';

/*
  Removes its associated entity from the scene. Either directly
  from the scene or by telling the entity to remove the child
*/
export default class LimetimeLimit extends Component {

  constructor(e, cfg) {
    super(e, 'lifetimelimit');
    let defaults = {
      age: 0,
      limit: 1,
      cb: Utils.noop()
    };
    Utils.applyProps(this, defaults, cfg);
  }

  update(dt) {
    this.age += dt;
    if (this.age >= this.limit) {

      this.cb();

      if (this.entity.parent) {
        // new Event({ evtName: 'lifetimeexpired', data: this.entity }).fire();
        this.entity.parent.removeDirectChild(this.entity);
      } else {
        scene.remove(this.entity);
      }

    }
  }
}
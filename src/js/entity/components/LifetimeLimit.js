'use strict';

import Component from './Component.js';

import Event from '../../event/Event.js';
import Utils from '../../Utils.js';

export default class LimetimeLimit extends Component {

  /*
    limit {Number}
  */
  constructor(e, cfg) {
    super(e, 'lifetimelimit');
    let defaults = {
      age: 0,
      limit: 1
    };
    Utils.applyProps(this, defaults);
    Utils.applyProps(this, cfg);
  }

  update(dt) {
    this.age += dt;
    if (this.age >= this.limit) {
      scene.remove(this.entity);
    }
  }
}
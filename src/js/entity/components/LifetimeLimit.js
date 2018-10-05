'use strict';

import Component from './Component.js';

import Event from '../../event/Event.js';

export default class LimetimeLimit extends Component {
  constructor(e) {
    super(e, 'lifetimelimit');
    this.age = 0;
    this.limit = 1;
  }

  update(dt) {
    this.age += dt;
    if (this.age >= this.limit) {
      scene.remove(this.entity);
    }
  }
}
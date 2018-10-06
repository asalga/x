'use strict';

import Component from './Component.js';
import Flash from './Flash.js';

export default class NearDeathIndicator extends Component {
  constructor(e) {
    super(e, 'neardeathindicator');
    this.timespan = 99;
  }

  update(dt) {
    let lifetime = this.entity.lifetimelimit;

    if (lifetime.limit - lifetime.age < this.timespan) {
      let flash = new Flash(this.entity, { speed: 5 });
      this.entity.addComponent(flash);

      this.entity.remove(this);

    }
  }
}
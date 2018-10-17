'use strict';

import Component from './Component.js';

import Event from '../../event/Event.js';
import Utils from '../../Utils.js';

export default class Health extends Component {
  constructor(e, cfg) {
    super(e, 'health');
    let defaults = {
      amt: 1,
      canRegen: false,
    };
    Utils.applyProps(this, defaults, cfg);

    this.max = this.amt;
    this.regenerationSpeed = 0;
    this.isRegenerating = false;
    this.oneTimeHurt = [];
  }

  update(dt) {
    super.update(dt);

    if (this.isRegenerating) {
      let diff = dt * this.regenerationSpeed;
      this.increaseHelth(diff);
    }
  }

  percentLeft() {
    return this.amt / this.max;
  }

  increaseHelth(a) {
    this.amt += a;
    this.amt = Math.min(this.amt, this.max);

    if (this.amt === this.max) {
      this.isRegenerating = false;
    }
  }

  hurt(dmg) {
    if (this.entity.killable.dead) { return; }

    this.amt -= dmg;
    new Event({ evtName: 'hurt', data: this.entity }).fire();

    if (this.canRegen && this.isRegenerating === false) {
      this.isRegenerating = true;
    }

    if (this.amt <= 0.001 && this.entity.killable) {
      this.entity.killable.kill();
    }
  }
}
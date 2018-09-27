'use strict';

import Component from './Component.js';
import Debug from '../../debug/Debug.js';

export default class Health extends Component {
  constructor(e, amt = 100, max = 100) {
    super(e, 'health');
    this.health = amt;
    this.max = 100;

    this.canRegen = true;
    this.regenerationSpeed = 0;
    this.isRegenerating = false;
  }

  update(dt) {
    super.update(dt);
    

    if (this.isRegenerating) {
      let diff = dt * this.regenerationSpeed;
      this.increaseHelth(diff);
    }
  }

  increaseHelth(amt) {
    this.health += amt;
    this.health = Math.min(this.health, this.max);

    if (this.health === this.max) {
      this.isRegenerating = false;
    }
  }

  hurt(dmg) {
    this.health -= dmg;

    if (this.canRegen && this.isRegenerating === false) {
      this.isRegenerating = true;
    }

    if (this.health < 0) {
      this.entity.killable.kill();
    }
  }
}
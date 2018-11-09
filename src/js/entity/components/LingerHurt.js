'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

/*
  TODO: fix floating point precision issues
*/
export default class LingerHurt extends Component {
  constructor(e, cfg) {
    super(e, 'lingerhurt');
    let defaults = {
      dmg: 0,
      lingerTime: 0
    };
    Utils.applyProps(this, defaults, cfg);

    this.dmgLeft = this.dmg;
  }

  update(dt) {
    let dps = (dt * this.dmg) / this.lingerTime;

    if (!this.entity.health) {
      /*jshint -W087 */
      debugger;
    }

    // If user specified zero time
    if (this.lingerTime <= 0) {
      this.entity.health.hurt(this.dmg);
      this.entity.removeComponent(this);
      return;
    }

    let inflict = 0;
    // Make sure we don't subtract too much
    if (this.dmgLeft - dps < 0) {
      inflict = this.dmgLeft;
      this.dmgLeft = 0;
    } else {
      inflict = dps;
      this.dmgLeft -= dps;
    }

    this.entity.health.hurt(inflict);

    if (this.dmgLeft <= 0) {
      this.entity.removeComponent(this);
    }
  }
}
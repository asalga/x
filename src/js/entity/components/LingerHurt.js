'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class LingerHurt extends Component {
  constructor(e, cfg) {
    super(e, 'lingerhurt');
    let defaults = {
      dmg: 0,
      lingerTime: 0
    };
    Utils.applyProps(this, defaults, cfg);

    this.dmgLeft = this.dmg;
    this.dmgRemoved = 0;
  }

  update(dt) {
    let dps = (dt * this.dmg)/ this.lingerTime;

    if(!this.entity.health){ debugger;}

    // Make sure we don't subtract too much
    if (this.dmgLeft - dps < 0) {
      this.dmgLeft = 0;
      this.entity.health.hurt(this.dmgLeft);
    } else {
      this.dmgLeft -= dps;
      this.entity.health.hurt(dps);
    }

    if (this.dmgLeft <= 0) {
      this.entity.removeComponent(this);
    }
  }
}
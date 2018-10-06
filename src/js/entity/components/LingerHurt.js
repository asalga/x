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
    Utils.applyProps(this, defaults);
    Utils.applyProps(this, cfg);
    this.dmgLeft = this.dmg;
  }

  update(dt) {

    let dps = dt / this.lingerTime * this.dmg;

    this.entity.health.hurt(dps);
    this.dmgLeft -= dps;

    if (this.dmgLeft <= 0) {
      this.entity.removeComponent(this);
    }
  }
}
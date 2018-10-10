'use strict';

import Component from './Component.js';
import LingerHurt from './LingerHurt.js';

import Utils from '../../Utils.js';

export default class Payload extends Component {

  constructor(e, cfg) {
    super(e, 'payload');
    let defaults = {
      dmg: 1,
      lingerTime: 0
    };
    Utils.applyProps(this, defaults, cfg);

    this.hit = function(data) {
      let other = data.other;

      if (!other.health) { return; }

      // other.health.hurt(this.payload.dmg);
      let lingerHurt = new LingerHurt(other, {
        dmg: this.payload.dmg,
        lingerTime: this.payload.lingerTime
      });
      other.addComponent(lingerHurt);

      scene.remove(e);
    };

    e.on('collision', this.hit, e, { onlySelf: true });
  }

  indicateRemove() {
    this.entity.off('collision', this.hit);
  }
}
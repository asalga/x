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


    e.on('collision', function hit(data) {
      let other = data.other;

      if (!other.health) { return; }

      if (this.payload.lingerTime === 0) {
        other.health.hurt(this.payload.dmg);
      } else {
        let lingerHurt = new LingerHurt(other, {
          dmg: this.payload.dmg,
          lingerTime: this.payload.lingerTime
        });
        other.addComponent(lingerHurt);
      }

      scene.remove(e);
    }, e, { onlySelf: true });
  }
}
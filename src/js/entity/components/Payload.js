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
    Utils.applyProps(this, defaults);
    Utils.applyProps(this, cfg);

    e.on('collision', function hit(data) {
      // Check if one of the entities passed is us
      // TODO: Fix
      let [e1, e2] = [data.e1, data.e2];
      if (e1 !== e && e2 !== e) { return; }
      let other = e1 === e ? e2 : e1;

      if (other.health) {
        if (this.lingerTime === 0) {
          other.health.hurt(this.dmg);
        } else {
          let lingerHurt = new LingerHurt(other, { dmg: this.dmg, lingerTime: this.lingerTime });
          other.addComponent(lingerHurt);
        }
      }
      scene.remove(e);
    }, this);
  }
}
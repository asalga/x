'use strict';

import Component from './Component.js';
import LingerHurt from './LingerHurt.js';

import Utils from '../../Utils.js';

export default class AreaPayload extends Component {

  constructor(e, cfg) {
    super(e, 'areapayload');
    let defaults = {
      dmg: 1
    };
    Utils.applyProps(this, defaults, cfg);
    let entitiesAlreadyHurt = new Set();

    e.on('collision', function hit(data) {
      let other = data.other;

      if (!other.health) { return; }
      if (entitiesAlreadyHurt.has(other.id)) { return; }

      entitiesAlreadyHurt.add(other.id);

      // data.other.health.hurt(this.areapayload.dmg);
      let lingerHurt = new LingerHurt(other, {
        dmg: this.areapayload.dmg,
        lingerTime: 0.5
      });
      other.addComponent(lingerHurt);

    }, e, { onlySelf: true });
  }
}
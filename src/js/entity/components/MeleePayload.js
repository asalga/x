'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class MeleePayload extends Component {
  constructor(e, cfg) {
    super(e, 'meleepayload');
    let defaults = {
      damage: 0
    };
    Utils.applyProps(this, defaults, cfg);

    e.on('collision', function(data) {
      if (!data.other.health) { return; }
      data.other.health.hurt(this.meleepayload.damage);
      
      scene.remove(e);
    }, e, { onlySelf: true });
  }

  update(dt) {}
}
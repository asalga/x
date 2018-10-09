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

    this.on('collision', function(data) {
      data.other.health.hurt(e.damage);
      scene.remove(this.entity);
    }, this, { onlySelf: true });
  }

  update(dt) {}
}
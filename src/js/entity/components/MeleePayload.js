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
      let [target, entity] = [data.e1, data.e2];
      if (data.e1 === this.entity) {
        [target, entity] = [entity, target];
      }
      if (entity.meleepayload !== this) return;

      target.health.hurt(e.damage);
      scene.remove(this.entity);
    }, this);
  }

  update(dt) {}
}
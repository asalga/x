'use strict';

import Component from './Component.js';
import LingerHurt from './LingerHurt.js';

import Utils from '../../Utils.js';

export default class AreaPayload extends Component {

  constructor(e, cfg) {
    super(e, 'areapayload');
    let defaults = {
      dmg: 0
    };
    Utils.applyProps(this, defaults, cfg);

    this.hit = function(data) {
      let other = data.other;
      if (!other.health) { return; }
      other.addComponent(new LingerHurt(other, { dmg: this.dmg, lingerTime: 1 }));
    }.bind(this);

    e.on('collision', this.hit, e, {
      onlySelf: true,
      onlyOnce: data => [data.self.id, data.other.id]
    });
  }
}
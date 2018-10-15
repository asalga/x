'use strict';

import Component from './Component.js';
import LingerHurt from './LingerHurt.js';

import Utils from '../../Utils.js';

export default class AreaPayload extends Component {

  constructor(e, cfg) {
    super(e, 'areapayload');
    let defaults = {
      dmg: 0,
      lingerTime: 1
    };
    Utils.applyProps(this, defaults, cfg);

    this.hit = function(data) {
      let other = data.other;
      if (!other.health) { return; }
      debugger;
      other.addComponent(new LingerHurt(other, { dmg: this.dmg, lingerTime: this.lingerTime }));
    }.bind(this);

    e.on('collision', this.hit, e, {
      onlySelf: true,
      onlyOnce: data => [data.self.id, data.other.id]
    });
  }
}
'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class Stun extends Component {
  constructor(e, cfg) {
    super(e, 'stun');
    let defaults = {
      multiplier: 2
    };
    Utils.applyProps(this, defaults, cfg);

    e.on('hurt', e => {
      if (e.health.percentLeft > 0.5) { return; }
      e.timeScale = 1 / this.multiplier;
    }, this, { onlySelf: true });
  }

  update(dt) {}
}
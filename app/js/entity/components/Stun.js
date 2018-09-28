'use strict';

import Component from './Component.js';

export default class Stun extends Component {
  constructor(e, multiplier) {
    super(e, 'stun');
    this.multiplier = multiplier;

    this.on('hurt', function(e) {
      if (e === this.entity) {
        e.speed *= 1/multiplier;
      }
    }, this);
  }

  update(dt) {}
}
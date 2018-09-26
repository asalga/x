'use strict';

import Component from './Component.js';

export default class SteerToTarget {
  constructor() {
    super(e, 'steertotarget');
  }

  update(dt, entity) {
    if (this.dead) {
      this.deadTime += dt;
    }
  }
}
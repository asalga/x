'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class Killable extends Component {
  constructor(e) {
    super(e, 'killable');
    this.dead = false;
    this.deadTime = 0;
    this.onDeath = Utils.noop();
  }
  update(dt, entity) {
    if (this.dead) {
      this.deadTime += dt;
    }
  }
  kill() {
    this.dead = true;
    this.onDeath();
  }
}
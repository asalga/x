'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
// import Signal from '../../events/Signal.js';

export default class Killable extends Component {
  constructor(e) {
    super(e, 'killable');
    this.dead = false;
    this.deadTime = 0;

    // this.onDeath = new Signal();
    // this.onDeath.add(function(){
      // this.entity.removeSelf();
    // });

    this.onDeath = function() {
      this.entity.removeSelf();
    };

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
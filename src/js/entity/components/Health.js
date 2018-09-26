'use strict';

import Component from './Component.js';

export default class Health extends Component{
  constructor(e, amt = 100) {
  	super(e, 'health');
    this.health = amt;
  }

  hurt(dmg) {
    this.health -= dmg;

    if (this.health < 0) {
      this.entity.killable.kill();
      console.log('health < 0');
    }
  }
}
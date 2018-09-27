'use strict';

import Component from './Component.js';
import Debug from '../../debug/Debug.js';

export default class Health extends Component{
  constructor(e, amt = 100) {
  	super(e, 'health');
    this.health = amt;
  }

  hurt(dmg) {
    this.health -= dmg;

    if (this.health < 0) {
      this.entity.killable.kill();
    }
  }
}
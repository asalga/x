'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class Killable extends Component {
  constructor(e) {
    super(e, 'killable');
    this.dead = false;
    this.deadTime = 0;
    this.onDeath = function(){
      scene.remove(this.entity);
    };
  }
  update(dt, entity) {
    if (this.dead) {
      this.deadTime += dt;
    }
  }
  
  // ready() {
  //   console.log(this.onDeath);
  // }

  kill() {
    this.dead = true;
     this.onDeath();
  }
}
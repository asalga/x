'use strict';

/*
  arrived callback called once bounds overlaps targets bounds
*/

import Component from './Component.js';
import Collision from '../../collision/Collision.js';
import Debug from '../../debug/Debug.js';

export default class GoToTarget extends Component {
  constructor(e) {
    super(e, 'gototarget');
    this.target = null;
    this.hasArrived = false;
    this.speed = 1;
  }

  ready() {
    this.on('collision', this.arrived, this);
  }

  arrived() {
    console.log('arrived has not been overridden');
  }

  update(dt, entity) {
    if (this.hasArrived || this.target === null) {
      return;
    }

    let toTarget = this.target.pos.clone();
    toTarget.sub(entity.pos);
    toTarget.normalize();
    // Debug.add(`${this.speed}, ${entity.speed}`);
    toTarget.mult(entity.speed * this.speed);
    // toTarget.mult(0);
    entity.vel = toTarget;
  }
}
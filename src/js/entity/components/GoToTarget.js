'use strict';

/*
  arrived callback called once bounds overlaps targets bounds
*/

import Component from './Component.js';
import Collision from '../../collision/Collision.js';
import Debug from '../../debug/Debug.js';
import Utils from '../../Utils.js';

export default class GoToTarget extends Component {
  constructor(e, cfg) {
    super(e, 'gototarget');
    let defaults = {
      target: null,
      speed:1
    };
    Utils.applyProps(this, defaults, cfg);
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
    // toTarget.mult(entity.speed * this.speed);

    toTarget.mult(this.speed * entity.speed * 1);
    entity.vel = toTarget;
  }
}
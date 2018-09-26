'use strict';

/*
	arrived callback called once bounds overlaps targets bounds
*/

import Component from './Component.js';
// import Vec2 from '../../math/Vec2.js';
import Collision from '../../collision/Collision.js';

export default class GoToTarget extends Component {
  constructor(e) {
    super(e, 'gototarget')
    this.target = null;
    this.hasArrived = false;
    this.speed = 1;
  }

  arrived() {
    console.log("arrived has not been overridden");
  }

  update(dt, entity) {
    if (this.hasArrived || this.target === null) {
      return;
    }

    let toTarget = this.target.pos.clone();
    toTarget.sub(entity.pos);
    toTarget.normalize();
    toTarget.scale(this.speed);
    entity.vel = toTarget;

    // Should this use a callback or fire an event?
    if (Collision.collided(entity, this.target)) {
      this.arrived();
      // let evt = new Event('ArrivedAtTarget');
      // evt.fire();
    }
  }
}
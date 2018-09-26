'use strict';

// import Vec2 from '../../math/Vec2.js';
import Collision from '../../collision/Collision.js';

export default class GoToTarget {
  constructor(target) {
    this.target = target;
  }

  update(dt, entity) {
    let toTarget = this.target.pos.clone();
    toTarget.sub(entity.pos);
    toTarget.normalize();
    toTarget.scale(31);
    entity.vel = toTarget;

    if (Collision.collided(entity, this.target)) {
      // let evt = new Event('ArrivedAtTarget');
      // evt.fire();
    }
  }
}
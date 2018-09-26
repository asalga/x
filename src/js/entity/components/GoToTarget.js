'use strict';

import Vec2 from '../../math/Vec2.js';

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

    let c1 = entity.bounds;
    let c2 = this.target.bounds;

    let rad = entity.bounds.radius + this.target.bounds.radius;
    let dist = Vec2.Sub(this.target.pos, entity.pos).length();
    console.log(dist - rad);

    if (dist < rad) {
      entity.pos.set(0,0);
      //entity.killable && entity.kill();
    }
  }
}
'use strict';

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
  }
}
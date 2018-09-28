'use strict';

import Component from './Component.js';
import Collision from '../../collision/Collision.js';
import Debug from '../../debug/Debug.js';

import Vec2 from '../../math/Vec2.js';

export default class SeekTarget extends Component {
  constructor(e) {
    super(e, 'seektarget');
    this.target = null;
    // this.hasArrived = false;
    this.speed = 1;
    this.maxSpeed = 200;
    this.maxForce = 2 + Math.random() * 5;

    this.entity.vel.set(40, 0);
    this.lastVel = new Vec2();
  }

  ready() {
    // this.on('collision', this.arrived, this);
  }

  arrived() {
    // console.log('arrived has not been overridden');
  }

  update(dt) {
    let targetPos = new Vec2(this.target.pos);
    let pos = new Vec2(this.entity.pos);
    let vel = this.entity.vel;

    // Keep going in curr trajectory if target is dead
    if (this.target.killable.dead) {
      this.entity.vel = this.lastVel;
      return;
    }

    let desiredVel = targetPos.sub(pos);
    desiredVel.normalize();
    desiredVel.mult(this.maxSpeed);

    let steerVel = Vec2.sub(desiredVel, vel);
    steerVel.limit(this.maxForce);

    vel.add(steerVel);
    this.lastVel = vel;

    // if (this.hasArrived || this.target === null) {
    //   return;
    // }
  }
}
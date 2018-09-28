'use strict';

import Component from './Component.js';
import Collision from '../../collision/Collision.js';
import Debug from '../../debug/Debug.js';

import Vec2 from '../../math/Vec2.js';

export default class SeekTarget extends Component {
  constructor(e) {
    super(e, 'seektarget');
    this.target = null;

    this.maxSpeed = 100;
    this.maxVel = 50;
    this.maxSteerForce = 10;//Math.random() * 25;

    this.lastVel = new Vec2();
    // this.offset = Vec2.rand().mult(30);
  }

  ready() {
    // this.on('collision', this.arrived, this);
  }

  arrived() {
    // console.log('arrived has not been overridden');
  }

  update(dt) {
    // if no longer in the scene
    if (!this.target) { return; }

    // if in scene, but dead
    if (this.target.killable.dead) {
      this.entity.vel = this.lastVel;
      return;
    }
    // return;

    let targetPos = new Vec2(this.target.pos);//.add(this.offset);
    let pos = new Vec2(this.entity.pos);
    let vel = this.entity.vel;

    let desiredVel = targetPos.sub(pos);
    desiredVel.normalize();
    desiredVel.mult(this.maxSpeed);

    let steerVel = Vec2.sub(desiredVel, vel);
    steerVel.limit(this.maxSteerForce);

    vel.add(steerVel);
    vel.limit(this.maxVel);

    this.lastVel = vel;
  }
}
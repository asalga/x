'use strict';

import Component from './Component.js';
import Collision from '../../collision/Collision.js';
import Debug from '../../debug/Debug.js';

import Utils from '../../Utils.js';
import Vec2 from '../../math/Vec2.js';

export default class SeekTarget extends Component {
  constructor(e, cfg) {
    super(e, 'seektarget');
    let defaults = {
      target: null,
      maxSpeed: 100,
      maxVel: 50,
      maxSteerForce: 10,
    };
    Utils.applyProps(this, defaults, cfg)

    // this.connectToTarget(target);
    // e.on('entityadded', tryToTarget)

    e.on('entityadded', data => {
      this.tryToTarget(data);
    }, e);

    this.lastVel = new Vec2();
    // this.offset = Vec2.rand().mult(1);
  }

  tryToTarget(e){
    if (!this.target && e.killable && e.targetable) {
      this.target = e;
    }
  }

  connectToTarget(target) {
    // if(target && target.targetable){
    // target.targetable.push(this);
    // }
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

    let targetPos = new Vec2(this.target.pos); //.add(this.offset);

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
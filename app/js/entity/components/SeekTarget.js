'use strict';

import Component from './Component.js';
import Collision from '../../collision/Collision.js';
import Debug from '../../debug/Debug.js';

import Utils from '../../Utils.js';
import Vec2 from '../../math/Vec2.js';

let _v = new Vec2();

export default class SeekTarget extends Component {
  constructor(e, cfg) {
    super(e, 'seektarget');
    let defaults = {
      target: null,
      maxSpeed: 100,
      maxVel: 50,
      maxSteerForce: 2,
    };
    Utils.applyProps(this, defaults, cfg)

    // this.connectToTarget(target);
    // e.on('entityadded', tryToTarget)

    e.on('entityadded', data => {
      this.tryToTarget(data);
    }, e);

    this.lastVel = new Vec2();
    // this.offset = Vec2.rand().mult(1);

    // cached vectors
    this._targetPos = new Vec2();
    this._desiredVel = new Vec2();
    this._pos = new Vec2();
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

    this._targetPos.set(this.target.pos); //.add(this.offset);
    this._pos.set(this.entity.pos);

    Vec2.subSelf(this._targetPos, this._pos);
    this._desiredVel.set(this._targetPos);
    this._desiredVel.normalize();
    this._desiredVel.mult(this.maxSpeed);

    let vel = this.entity.vel;
    //let steerVel = 
    Vec2.subSelf(this._desiredVel, vel);
    this._desiredVel.limit(this.maxSteerForce);
    // steerVel.limit(this.maxSteerForce);

    vel.add(this._desiredVel);
    vel.limit(this.maxVel);

    this.lastVel = vel;
  }
}
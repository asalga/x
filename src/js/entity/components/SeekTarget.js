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
      maxSpeed: 500,
      maxVel: 50,
      maxSteerForce: 2,
    };
    Utils.applyProps(this, defaults, cfg)

    // this.connectToTarget(target);

    e.on('entityadded', data => {
      this.tryToTarget(data);
    }, e);

    this.lastVel = new Vec2();

    // cached vectors
    this._targetPos = new Vec2();
    this._desiredVel = new Vec2();
    this._pos = new Vec2();
  }

  tryToTarget(e) {
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
    if (this.target === null) {
      return;
    }

    // if in scene, but dead
    if (this.target.killable.dead) {
      this.target = null;
      this.entity.vel = this.lastVel;
      this.entity.vel.normalize();
      this.entity.vel.mult(this.maxSpeed);
      return;
    }

    this._targetPos.set(this.target.pos);
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
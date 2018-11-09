'use strict';

import Component from './Component.js';
import Collision from '../../collision/Collision.js';
import Debug from '../../debug/Debug.js';

import Utils from '../../Utils.js';
import Vec2 from '../../math/Vec2.js';

import Pool from '../../core/Pool.js';

// TODO: this.connectToTarget(target);

export default class SeekTarget extends Component {
  constructor(e, cfg) {
    super(e, 'seektarget');
    let defaults = {
      target: null,
      maxSpeed: 500,
      maxVel: 50,
      maxSteerForce: 2,
    };
    Utils.applyProps(this, defaults, cfg);

    e.on('entityadded', data => {
      this.tryToTarget(data);
    }, e);

    this.lastVel = Pool.get('vec2');
    this._targetPos = Pool.get('vec2');
    this._desiredVel = Pool.get('vec2');
    this._pos = Pool.get('vec2');
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

  free() {
    Pool.free(this.lastVel);
    Pool.free(this._targetPos);
    Pool.free(this._desiredVel);
    Pool.free(this._pos);
  }

  indicateRemove() {
    this.free();
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
      this.entity.vel
        .set(this.lastVel)
        .normalize()
        .mult(this.maxSpeed);
      return;
    }

    this._targetPos.set(this.target.pos);
    this._pos.set(this.entity.pos);

    Vec2.subSelf(this._targetPos, this._pos);
    this._desiredVel
      .set(this._targetPos)
      .normalize()
      .mult(this.maxSpeed);

    let vel = this.entity.vel;
    // let steerVel = 
    Vec2.subSelf(this._desiredVel, vel);
    this._desiredVel.limit(this.maxSteerForce);
    // steerVel.limit(this.maxSteerForce);

    vel.add(this._desiredVel);
    vel.limit(this.maxVel);

    this.lastVel = vel;
  }
}
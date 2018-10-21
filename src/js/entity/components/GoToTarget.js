'use strict';

import Component from './Component.js';
import Collision from '../../collision/Collision.js';
import Debug from '../../debug/Debug.js';
import Utils from '../../Utils.js';

import Vec2 from '../../math/Vec2.js';

export default class GoToTarget extends Component {
  constructor(e, cfg) {
    super(e, 'gototarget');
    let defaults = {
      target: null,
      speed: 1,
      hasArrived: Utils.noop()
    };
    Utils.applyProps(this, defaults, cfg);

    e.on('collision', this.hasArrived, e, { onlySelf: true });

    this._toTarget = new Vec2();
  }

  hasArrived() {
    console.log('arrived has not been overridden');
  }

  update(dt, entity) {
    if (this.target === null) { return; }

    // let toTarget = this.target.pos.clone();
    this._toTarget.set(this.target.pos);
    this._toTarget.sub(entity.pos);
    this._toTarget.normalize();
    this._toTarget.mult(this.speed);

    entity.vel = this._toTarget;
  }
}
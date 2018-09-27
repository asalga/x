'use strict';

/*
  arrived callback called once bounds overlaps targets bounds
*/

import Component from './Component.js';
// import Vec2 from '../../math/Vec2.js';
import Collision from '../../collision/Collision.js';

import EventSystem from '../../event/EventSystem.js';

export default class GoToTarget extends Component {
  constructor(e) {
    super(e, 'gototarget');
    this.target = null;
    this.hasArrived = false;
    this.speed = 1;
  }

  ready() {
    let evt = new EventSystem();
    // debugger;
    evt.on('collision', this.arrived, this);
  }

  arrived() {
    console.log('arrived has not been overridden');
  }

  update(dt, entity) {
    if (this.hasArrived || this.target === null) {
      return;
    }

    let toTarget = this.target.pos.clone();
    toTarget.sub(entity.pos);
    toTarget.normalize();
    toTarget.scale(this.speed);
    entity.vel = toTarget;
  }
}
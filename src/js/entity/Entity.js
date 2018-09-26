'use strict';

import Vec2 from '../math/Vec2.js';
import BoundingCircle from '../collision/BoundingCircle.js';

export class Entity {
  constructor() {
    this.pos = new Vec2();
    this.vel = new Vec2();
    this.components = [];
  }

  draw(p3) {
    this.renderProxy && this.renderProxy(p3);
  }

  update(dt) {
    this.updateProxy && this.updateProxy(dt);

    this.components.forEach(c => {
      // ok if no update method?
      // add in entity on creation or update?
      c.update && c.update(dt, this);
      // c.update(dt, this);
    });

    if (this.vel) {
      let d = this.vel.mult(dt);
      this.pos.add(d);
    }
  }

  addComponent(c) {
    this.components.push(c);
    this[c.name] = c;
  }

  removeComponent(c) {
    console.log('needs impl');
  }
}
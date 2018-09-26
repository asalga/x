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
      c.update(dt, this);
    });

    if (this.vel) {
      let d = this.vel.mult(dt);
      this.pos.add(d);
    }
  }

  addComponent(c) {
    this.components.push(c);
  }

  removeComponent(c){
  	console.log('need impl');
  }
}


export function createUser(p3) {
  let user = new Entity();
  user.name = 'user';
  user.pos.set(p3.width / 2, p3.height / 2);
  user.size = 40;
  user.bounds = new BoundingCircle(user.pos, user.size)

  user.renderProxy = function(p3) {
    p3.stroke(111, 150, 80);
    p3.fill('orange');
    p3.ellipse(p3.width / 2, p3.height / 2, user.size, user.size);

    let center = new Vec2(this.pos.x, this.pos.y);
    let cursor = new Vec2(p3.mouseX, p3.mouseY);

    cursor.sub(center);
    cursor.normalize();
    cursor.mult(80);
    cursor.add(center);

    // if (debug) {
    //   p3.strokeWeight(1);
    //   p3.stroke(0, 255, 0);
    //   p3.line(center.x, center.y, p3.mouseX, p3.mouseY);
    // }

    p3.save();
    p3.strokeWeight(3);
    p3.stroke(255, 0, 0);

    p3.line(center.x, center.y, cursor.x, cursor.y);
    p3.restore();
  }

  return user;
}
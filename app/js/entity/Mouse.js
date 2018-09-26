'use strict';
import { Entity } from './Entity.js';

export default function createMouse() {
  let e = new Entity();
  e.name = 'mouse';

  e.updateProxy = function(dt) {

  }

  e.renderProxy = function(p3) {
    p3.strokeWeight(3);
    p3.fill(50);
    p3.stroke(200);
    p3.ellipse(this.pos.x, this.pos.y, 30, 30);
  };

  return e;
}
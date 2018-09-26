'use strict';
import { Entity } from '../Entity.js';
import GoToTarget from '../components/GoToTarget.js';

export default function createMouse() {
  let mouse = new Entity();
  mouse.name = 'mouse';

  mouse.updateProxy = function(dt) {
  }

  mouse.renderProxy = function(p3) {
    p3.strokeWeight(3);
    p3.fill(50);
    p3.stroke(200);
    p3.ellipse(this.pos.x, this.pos.y, 8, 8);
  };

  mouse.addComponent(new GoToTarget(window.user));

  return mouse;
}
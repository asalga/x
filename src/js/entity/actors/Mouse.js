'use strict';
import { Entity } from '../Entity.js';
import GoToTarget from '../components/GoToTarget.js';
import Killable from '../components/Killable.js';
import BoundingCircle from '../../collision/BoundingCircle.js';

export default function createMouse() {
  let mouse = new Entity();
  mouse.name = 'mouse';
  mouse.size = 8;
  mouse.bounds = new BoundingCircle(mouse.pos, mouse.size);

  mouse.updateProxy = function(dt) {
  }

  mouse.renderProxy = function(p3) {
    p3.strokeWeight(3);
    p3.fill(50);
    p3.stroke(200);
    p3.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  };

  mouse.addComponent(new GoToTarget(window.user));
  mouse.addComponent(new Killable());

  return mouse;
}
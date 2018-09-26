'use strict';
import { Entity } from '../Entity.js';
import GoToTarget from '../components/GoToTarget.js';
import Killable from '../components/Killable.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
import Vec2 from '../../math/Vec2.js';

export default function createMouse() {
  let mouse = new Entity();
  mouse.name = 'mouse';
  mouse.size = 8;
  mouse.bounds = new BoundingCircle(mouse.pos, mouse.size);


  let randPosition = function(entity) {
    let r = Vec2.Rand().mult(130);
    let v = new Vec2(p3.width / 2, p3.height / 2);
    v.add(r);
    entity.pos.set(v.x, v.y);
  }

  // mouse.resetPos = function() {
  randPosition(mouse);
  // mouse.resetPos();

  mouse.updateProxy = function(dt) {}

  mouse.renderProxy = function(p3) {
    p3.strokeWeight(3);
    p3.fill(50);
    p3.stroke(200);
    p3.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  };

  mouse.addComponent(new GoToTarget(scene.getUser()));
  mouse.addComponent(new Killable());

  // mouse.on('ArrivedAtTarget', randPosition(mouse));

  return mouse;
}
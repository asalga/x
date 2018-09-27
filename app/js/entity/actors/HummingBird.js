'use strict';

import Entity from '../Entity.js';
import Killable from '../components/Killable.js';

import BoundingBox from '../../collision/BoundingBox.js';
import CollisionType from '../../collision/CollisionType.js';

import Vec2 from '../../math/Vec2.js';

export default function createHummingBird() {
  let e = new Entity();
  e.name = 'hummingbird';
  e.size = new Vec2(50, 10); 
  e.damage = 10;
  e.bounds = new BoundingBox(e.pos, e.size);
  //new BoundingCircle(e.pos, e.size);

  e.updateProxy = function(dt) {};

  e.renderProxy = function(p3) {
    p3.strokeWeight(1);
    p3.fill(150, 100, 50);
    p3.stroke(200, 0, 200);
    // p3.ellipse(this.pos.x, this.pos.y, this.size, this.size);
    p3.rect(this.pos.x, this.pos.y,  this.size.x, this.size.y);
  };

  e.addComponent(new Killable(e));

  return e;
}
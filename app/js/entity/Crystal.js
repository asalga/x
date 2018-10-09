'use strict';


import Entity from '../Entity.js';
import SpriteRender from '../components/SpriteRender.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
// import Vec2 from '../../math/Vec2.js';

export default function createCrystal() {
  let e = new Entity({name: 'crystal'});
  e.bounds = new BoundingCircle(e.pos, 10);

  let spriteRender = new SpriteRender(e, { layer: 100 });
  spriteRender.draw = function() {
    p3.save();
    p3.translate(e.pos.x, e.pos.y);
    p3.noStroke();
    p3.fill(64, 202, 238);
    p3.ellipse(0, 0, e.bounds.radius, e.bounds.radius);
    p3.restore();
  }
  e.addComponent(spriteRender);

  // e.addComponent(goToTarget);
  // e.addComponent(new Killable(e));
  // e.addComponent(new Stun(e, 3));
  // e.addComponent(new Health(e, 20, 20));
  // e.addComponent(new HealthRender(e));

  return e;
}
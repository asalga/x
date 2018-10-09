'use strict';

import Entity from '../Entity.js';
import Collidable from '../components/Collidable.js';
import Payload from '../components/Payload.js';
import SpriteRender from '../components/SpriteRender.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

export default function createPlamaBullet() {
  let e = new Entity({ name: 'plasmabullet', layer: 2 });
  e.bounds = new BoundingCircle(e.pos, 10);

  scene.add(e);

  let spriteRender = new SpriteRender(e, { layer: 20 });
  spriteRender.draw = function() {
    p3.save();
    p3.noStroke();
    p3.fill('rgb(55, 210, 55)');
    let sz = e.bounds.radius;
    p3.ellipse(e.pos.x, e.pos.y, sz, sz);
    p3.restore();
  }
  e.addComponent(spriteRender);
  e.addComponent(new Payload(e, { dmg: 10, lingerTime: 3 }));
  e.addComponent(new Collidable(e, { type: CollisionType.PLAYER_BULLET, mask: CollisionType.ENEMY }));

  return e;
}
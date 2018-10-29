'use strict';

import Entity from '../Entity.js';

import Payload from '../components/Payload.js';
import Collidable from '../components/Collidable.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

export default function createPlamaBullet() {
  let e = new Entity({ name: 'plasmabullet', layer: 2 });
  e.bounds = new BoundingCircle(e.pos, 10);

  scene.add(e);

  let spriteRender = new SpriteRender(e, { layerName: 'bullet' });
  spriteRender.draw = function(_p3) {
    _p3.save();
    _p3.noStroke();
    _p3.fill('rgb(55, 210, 55)');
    let sz = e.bounds.radius;
    _p3.ellipse(e.pos.x, e.pos.y, sz, sz);
    _p3.restore();
  };
  e.addComponent(spriteRender);
  e.addComponent(new Payload(e, { dmg: 10, lingerTime: 2 }));
  e.addComponent(new Collidable(e, { type: CollisionType.PLAYER_BULLET, mask: CollisionType.ENEMY }));
  e.addComponent(new LifetimeLimit(e, { limit: 1 }));

  return e;
}
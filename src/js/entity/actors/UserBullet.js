'use strict';

import Entity from '../Entity.js';

import Collidable from '../components/Collidable.js';
import Payload from '../components/Payload.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

export default function createBullet() {
  let e = new Entity({ name: 'bullet', layer: 2 });
  scene.add(e);

  e.bounds = new BoundingCircle(e.pos, 5);

  // e.on('death', function(){
  //   // console.log('bullet death');
  // });

  let spriteRender = new SpriteRender(e, { layerName: 'bullet' });
  spriteRender.draw = function(_p3) {
    _p3.save();
    _p3.strokeWeight(2);
    _p3.stroke(20);
    _p3.fill(120);
    let sz = e.bounds.radius;
    _p3.ellipse(e.pos.x, e.pos.y, sz, sz);
    // p3.ellipse(e.pos.x, e.pos.y, sz, sz);
    _p3.restore();
  };

  e.addComponent(spriteRender);
  e.addComponent(new Payload(e, { dmg: 1, lingerTime:1 }));
  e.addComponent(new Collidable(e, {
    type: CollisionType.PLAYER_BULLET,
    mask: CollisionType.ENEMY | CollisionType.ENEMY_BULLET
  }));
  e.addComponent(new LifetimeLimit(e, { limit: 1 }));

  return e;
}
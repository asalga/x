'use strict';

import Entity from '../Entity.js';
import Collidable from '../components/Collidable.js';
import Payload from '../components/Payload.js';
import SpriteRender from '../components/SpriteRender.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import SeekTarget from '../components/SeekTarget.js';
import Vec2 from '../../math/Vec2.js';

export default function createRocketBullet() {
  let e = new Entity({ name: 'homingmissle' });
  scene.add(e);

  e.bounds = new BoundingCircle(e.pos, 10);

  e.on('collision', function(data) {
    let [e1, e2] = [data.e1, data.e2];

    // Check if one of the entities passed is us
    if (e1 !== e && e2 !== e) { return; }
    let other = e1 === e ? e2 : e1;
    other.health.hurt(e.payload.dmg);
    scene.remove(e);
  }, e);

  // COMPONENTS
  let spriteRender = new SpriteRender(e, { layer: 20 });
  spriteRender.draw = function() {
    p3.save();

    p3.noStroke();
    p3.fill('rgb(245, 10, 255)');
    p3.translate(e.pos.x, e.pos.y);
    let a = Math.atan2(e.vel.y, e.vel.x);
    p3.rotate(a);

    let sz = e.bounds.radius;
    p3.rect(-sz, -sz / 2, sz * 2, sz);
    p3.restore();
  }
  e.addComponent(spriteRender);


  let payload = new Payload(e, { dmg: 1 });
  e.addComponent(payload);

  let seek = new SeekTarget(e);
  seek.maxVel = 300;
  seek.target = scene.getUser();
  e.addComponent(seek);

  let coll = new Collidable(e);
  coll.type = CollisionType.ENEMY_BULLET;
  coll.mask = CollisionType.PLAYER;
  e.addComponent(coll);

  return e;
}
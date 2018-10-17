'use strict';

import Entity from '../Entity.js';

import Health from '../components/Health.js';
import Killable from '../components/Killable.js';
import HealthRender from '../components/HealthRender.js';
import Payload from '../components/Payload.js';
import Collidable from '../components/Collidable.js';
import SeekTarget from '../components/SeekTarget.js';
import SpriteRender from '../components/SpriteRender.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import Vec2 from '../../math/Vec2.js';

export default function createRocketBullet() {
  let e = new Entity({ name: 'homingmissle' });

  scene.add(e);

  e.on('collision', data => {
    if (data.other.health) {
      data.other.health.hurt(e.payload.dmg);
      scene.remove(e);
    }
  }, e, { onlySelf: true });

  // COMPONENTS

  // TODO: fix
  e.bounds = new BoundingCircle(e.pos, 10);

  let spriteRender = new SpriteRender(e, { layer: 20 });
  spriteRender.draw = function() {
    p3.save();

    p3.noStroke();
    p3.fill('rgb(245, 10, 255)');
    // p3.translate(e.pos.x, e.pos.y);
    let a = Math.atan2(e.vel.y, e.vel.x);
    p3.rotate(a);

    let sz = e.bounds.radius;
    p3.rect(-sz, -sz / 2, sz * 2, sz);
    p3.restore();
  }
  e.addComponent(spriteRender);
  e.addComponent(new Payload(e, { dmg: 1 }));
  e.addComponent(new SeekTarget(e, { maxVel: 120, target: scene.getUser() }));
  e.addComponent(new Health(e, { amt: 1 }));
  e.addComponent(new Killable(e));
  e.addComponent(new HealthRender(e, { sz: 1 }));
  e.addComponent(new Collidable(e, {
    type: CollisionType.ENEMY_BULLET,
    mask: CollisionType.PLAYER | CollisionType.PLAYER_BULLET
  }));

  return e;
}
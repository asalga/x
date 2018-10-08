'use strict';

import Entity from '../Entity.js';
import Collidable from '../components/Collidable.js';
import Payload from '../components/Payload.js';
import SpriteRender from '../components/SpriteRender.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

export default function createFlakBullet() {
  let e = new Entity({ name: 'flakbullet', layer: 2 });
  e.bounds = new BoundingCircle(e.pos, 5);

  scene.add(e);

  let spriteRender = new SpriteRender(e, { width: 32, height: 32, layer: 20 });

  spriteRender.update = function(dt) {
    this.entity.rot += dt * 10;
  }

  spriteRender.draw = function() {
    let sz = e.bounds.radius;

    this.p3.clearAll();
    this.p3.save();
    this.p3.noStroke();
    this.p3.fill('rgb(0,0,0)');
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.rotate(Math.atan2(e.vel.y, e.vel.x) + this.entity.rot);
    console.log(this.rot);
    this.p3.rect(-sz, -sz / 2, sz * 2, sz);
    this.p3.restore();

    p3.save();
    p3.translate(e.pos.x - (sz / 2), e.pos.y - (sz / 2));
    p3.drawImage(this.sprite, -sz, -sz / 2);
    p3.restore();
  }

  e.addComponent(spriteRender);
  e.addComponent(new Payload(e, { dmg: 50, lingerTime: .4 }));
  e.addComponent(new Collidable(e, { type: CollisionType.PLAYER_BULLET, mask: CollisionType.ENEMY }));
  return e;
}
'use strict';

import Entity from '../Entity.js';

import Collidable from '../components/Collidable.js';
import SpriteRender from '../components/SpriteRender.js';

import CollisionType from '../../collision/CollisionType.js';
import BoundingCircle from '../../collision/BoundingCircle.js';

export default function createExplosion() {
  let e = new Entity({ name: 'explosion', layer: 2 });
  e.bounds = new BoundingCircle(e.pos, 5);
  scene.add(e);

  let spriteRender = new SpriteRender(e, { width: 100, height: 100, layer: 20 });
  spriteRender.draw = function() {
    let sz = e.bounds.radius;

    this.p3.clearAll();
    this.p3.save();
    this.p3.noStroke();
    this.p3.fill('rgb(120, 0, 0, 0.5)');
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.restore();

    p3.save();
    p3.translate(e.pos.x - (sz / 2), e.pos.y - (sz / 2));
    p3.drawImage(this.sprite, -sz, -sz / 2);
    p3.restore();
  }

  e.addComponent(spriteRender);
  e.addComponent(new Collidable(e, { type: CollisionType.PLAYER_BULLET, mask: CollisionType.ENEMY }));
 
  return e;
}
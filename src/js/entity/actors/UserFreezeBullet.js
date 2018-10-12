'use strict';

import Entity from '../Entity.js';

import Collidable from '../components/Collidable.js';
import Payload from '../components/Payload.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CType from '../../collision/CollisionType.js';

import EntityFactory from '../../entity/EntityFactory.js';

export default function createFreezeBullet() {
  let e = new Entity({ name: 'freezebullet', layer: 2 });
  e.bounds = new BoundingCircle(e.pos, 14);

  scene.add(e);

  // COMPONENTS
  let spriteSz = 32;
  let spriteRender = new SpriteRender(e, { width: spriteSz, height: spriteSz, layer: 20 });
  spriteRender.draw = function() {
    let sz = e.bounds.radius;

    this.p3.clearAll();
    this.p3.save();
    this.p3.stroke(255);
    this.p3.strokeWeight(2);
    this.p3.fill('rgba(200, 200, 200, .2)');
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.rotate(Math.PI / 4);
    this.p3.rect(-sz / 2, -sz / 2, sz, sz);
    this.p3.restore();

    p3.drawImage(this.sprite, 0,0);//e.pos.x, e.pos.y);
  }
  e.addComponent(spriteRender);

  e.on('collision', data => {
    let other = data.other;

    // Doesn't make sense to be frozen twice
    if (other.hasChild('crystal')) { return; }

    let crystal = EntityFactory.create('crystal');
    crystal.setTarget(other);
    other.add(crystal);

    scene.remove(e);
  }, e, { onlySelf: true });

  e.addComponent(new Collidable(e, { type: CType.PLAYER_BULLET, mask: CType.ENEMY }));
  e.addComponent(new LifetimeLimit(e, { limit: 1.5 }));

  return e;
}
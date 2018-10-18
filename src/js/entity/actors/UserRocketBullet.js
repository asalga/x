'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import Payload from '../components/Payload.js';
import Collidable from '../components/Collidable.js';
import SeekTarget from '../components/SeekTarget.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';
import NearDeathIndicator from '../components/NearDeathIndicator.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CType from '../../collision/CollisionType.js';

import Vec2 from '../../math/Vec2.js';

export default function createUserRocketBullet() {
  let e = new Entity({ name: 'homingmissle' });
  scene.add(e);

  e.bounds = new BoundingCircle(e.pos, 10);

  // If our target has died, get a new one
  e.on('killed', function(data) {
    if (data === e.seektarget.target) {
      // potentially can return null
      e.seektarget.target = scene.getClosestBaddie(e.pos);
    }
  }, e);

  // COMPONENTS
  let spriteSz = 32;
  let spriteRender = new SpriteRender(e, { width: spriteSz, height: spriteSz, layer: 20 });
  spriteRender.draw = function() {
    let sz = e.bounds.radius;

    this.p3.clearAll();
    this.p3.save();
    // this.p3.clear();
    this.p3.stroke(0);
    this.p3.strokeWeight(2);
    this.p3.fill('rgb(245, 10, 255)');
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.rotate(Math.atan2(e.vel.y, e.vel.x));
    this.p3.rect(-sz, -sz / 2, sz * 2, sz);
    this.p3.restore();

    p3.drawImage(this.sprite, 0, 0);
    // p3.drawImage(this.sprite, e.pos.x, e.pos.y);
  }
  e.addComponent(spriteRender);
  e.addComponent(new NearDeathIndicator(e));
  e.addComponent(new Payload(e, { dmg: 15 }));
  e.addComponent(new LifetimeLimit(e, { limit: 2 }));

  e.addComponent(new SeekTarget(e, { maxVel: 100 }));
  e.addComponent(new Collidable(e, { type: CType.PLAYER_BULLET, mask: CType.ENEMY }));

  // TODO: is this the best place for this?
  e.postLaunch = function() {
    this.seektarget.target = scene.getClosestBaddie(this.pos);
  }

  let emitter = EntityFactory.create('emitter');
  emitter.setup({
    ageRange: [.1, .1]
  })
  e.add(emitter);

  // // let smoke = EntityFactory.create('smoke');
  // emitter.setup({
  //   // count: 10
  //   rate: .1,
  //   particle: 'smoke'
  // });
  // e.add(emitter);

  // When does the emitter need the root?
  // - particle creation
  // - death

  // Entity.addChild(e, emitter);

  return e;
}
'use strict';

import Entity from '../Entity.js';

import Payload from '../components/Payload.js';
import Collidable from '../components/Collidable.js';
import SeekTarget from '../components/SeekTarget.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';
import NearDeathIndicator from '../components/NearDeathIndicator.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import Vec2 from '../../math/Vec2.js';

export default function createUserRocketBullet() {
  let e = new Entity({ name: 'homingmissle' });
  scene.add(e);

  // TODO: move to component
  e.bounds = new BoundingCircle(e.pos, 10);

  // EVENTS
  e.on('collision', data => {
    data.other.health.hurt(e.payload.dmg);
    scene.remove(e);
  }, e, { onlySelf: true });

  e.on('death', function(data) {
    if (data === e.seektarget.target) {
      debugger;
      e.seektarget.target = scene.getRandomBaddie();
      return;
    }
  }, e);


  // COMPONENTS
  let spriteRender = new SpriteRender(e, { width: 32, height: 32, layer: 20 });
  spriteRender.draw = function() {
    let sz = e.bounds.radius;

    this.p3.clearAll();
    this.p3.save();
    this.p3.noStroke();
    this.p3.fill('rgb(245, 10, 255)');
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.rotate(Math.atan2(e.vel.y, e.vel.x));
    this.p3.rect(-sz, -sz / 2, sz * 2, sz);
    this.p3.restore();

    p3.save();
    p3.translate(e.pos.x - (sz / 2), e.pos.y - (sz / 2));
    p3.drawImage(this.sprite, -sz, -sz / 2);
    p3.restore();

    // TODO: 
    // let trans = this.entity.getTransform();
    // p3.applyMatrix(trans);    
  }
  e.addComponent(spriteRender);
  e.addComponent(new NearDeathIndicator(e));
  e.addComponent(new Payload(e, { dmg: 5 }));
  e.addComponent(new LifetimeLimit(e, { limit: 10 }));

  let seek = new SeekTarget(e);
  seek.maxVel = 300;
  seek.target = scene.getRandomBaddie();
  
  e.addComponent(seek);
  e.addComponent(new Collidable(e, { type: CollisionType.PLAYER_BULLET, mask: CollisionType.ENEMY }));

  return e;
}
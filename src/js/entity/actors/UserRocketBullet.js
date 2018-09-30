'use strict';

import Entity from '../Entity.js';
import Collidable from '../components/Collidable.js';
import Payload from '../components/Payload.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import SeekTarget from '../components/SeekTarget.js';
import Vec2 from '../../math/Vec2.js';

export default function createUserRocketBullet() {
  let e = new Entity();
  e.name = 'homingmissle';
  e.size = 10;
  e.bounds = new BoundingCircle(e.pos, e.size);
  e.speed = 1;
  e.homingVel = 520;
  
  scene.add(e);

  e.updateProxy = function(dt) {};

  e.renderProxy = function() {
    p3.save();

    p3.noStroke();
    p3.fill(10, 30, 40);

    p3.translate(this.pos.x, this.pos.y);
    let a = Math.atan2(this.vel.y, this.vel.x);
    p3.rotate(a);

    p3.rect(-this.size, -this.size / 2, this.size * 2, this.size);
    p3.restore();
  };

  e.setDir = function(){};

  e.on('collision', function(data) {
    let e1 = data.e1;
    let e2 = data.e2;

    // Check if one of the entities passed is us
    if (e1 !== e && e2 !== e) {
      return;
    }
    let other = e1 === e ? e2 : e1;

    other.health.hurt(e.payload.payload);
    scene.remove(e);
  }, e);

  e.on('death', function(data) {
    if (data === e.seektarget.target) {
      e.seektarget.target = scene.getRandomBaddie();
    }
  }, e);



  // COMPONENTS
  let payload = new Payload(e, 230);
  e.addComponent(payload);

  let cursor = new Vec2(p3.mouseX, p3.mouseY);
  let center = new Vec2(p3.width / 2, p3.height / 2);
  let vel = Vec2.sub(cursor, center);
  e.vel = vel.normalize().mult(e.homingVel);

  let seek = new SeekTarget(e);
  seek.maxVel = e.homingVel;
  seek.target = scene.getRandomBaddie();
  e.addComponent(seek);

  let coll = new Collidable(e);
  coll.type = CollisionType.PLAYER_BULLET;
  coll.mask = CollisionType.ENEMY;
  e.addComponent(coll);

  return e;
}
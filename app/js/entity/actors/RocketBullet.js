'use strict';

import Entity from '../Entity.js';
import Collidable from '../components/Collidable.js';
import Payload from '../components/Payload.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import SeekTarget from '../components/SeekTarget.js';
import Vec2 from '../../math/Vec2.js';

export default function createRocketBullet() {
  let e = new Entity();
  e.name = 'homingmissle';
  e.size = 10;
  e.bounds = new BoundingCircle(e.pos, e.size);
  e.speed = 1;
  e.homingVel = 300;

  scene.add(e);

  e.updateProxy = function(dt) {};
 
  e.setDir = function(d) {
    e.vel = d.clone().mult(this.homingVel);
  };

  e.renderProxy = function() {
    p3.save();

    p3.noStroke();
    p3.fill('rgb(1, 10, 255)');
    p3.translate(this.pos.x, this.pos.y);
    let a = Math.atan2(this.vel.y, this.vel.x);
    p3.rotate(a);

    p3.rect(-this.size, -this.size / 2, this.size * 2, this.size);
    p3.restore();
  };

  // e.vel = e.homingVel;

  e.on('collision', function(data) {
    let [e1, e2] = [data.e1, data.e2];

    // Check if one of the entities passed is us
    if (e1 !== e && e2 !== e) { return; }
    let other = e1 === e ? e2 : e1;
    other.health.hurt(e.payload.payload);
    scene.remove(e);
  }, e);

  // COMPONENTS
  let payload = new Payload(e, 1);
  e.addComponent(payload);

  let seek = new SeekTarget(e);
  seek.maxVel = e.homingVel;
  seek.target = scene.getUser();
  e.addComponent(seek);
  
  let coll = new Collidable(e);
  coll.type = CollisionType.ENEMY_BULLET;
  coll.mask = CollisionType.PLAYER;
  e.addComponent(coll);

  return e;
}
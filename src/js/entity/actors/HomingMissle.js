'use strict';

import Entity from '../Entity.js';

import Collidable from '../components/Collidable.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';
import SeekTarget from '../components/SeekTarget.js';
import GoToTarget from '../components/GoToTarget.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';

export default function createHomingMissle() {
  let e = new Entity();
  e.name = 'homingmissle';
  e.size = 10;
  e.bounds = new BoundingCircle(e.pos, e.size);
  e.speed = 1;
  e.damage = 1;

  e.updateProxy = function(dt) {};

  e.renderProxy = function() {
    p3.save();

    p3.noStroke();
    p3.fill(10, 30, 40);

    p3.translate(this.pos.x, this.pos.y);
    let a = Math.atan2(this.vel.y, this.vel.x);
    p3.rotate(a);

    p3.rect(0, 0, this.size * 2, this.size);
    p3.restore();
  };

  e.updateProxy = function(dt) {
    // let center = new Vec2(p3.width / 2, p3.height / 2);
    // this.pos.x = center.x + Math.cos(gameTime) * 250
    // this.pos.y = center.y + Math.sin(gameTime) * 250;
  };

  e.on('collision', function(data) {
    let e1 = data.e1;
    let e2 = data.e2;

    // Check if one of the entities passed is us
    if (e1 !== e && e2 !== e) {
      return;
    }
    let other = e1 === e ? e2 : e1;

    other.health.hurt(e.damage);
    scene.remove(e);
  }, e);

  e.on('death', function(data) {
    if (data === e.seektarget.target) {
      e.seektarget.target = scene.getRandomBaddie();
    }
  }, e);

  let seek = new SeekTarget(e);
  e.addComponent(seek);

  let coll = new Collidable(e);
  coll.type = CollisionType.PLAYER_BULLET;
  coll.mask = CollisionType.ENEMY;
  e.addComponent(coll);

  return e;
}
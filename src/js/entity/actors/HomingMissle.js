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

  e.updateProxy = function(dt) {};

  e.renderProxy = function() {
    p3.save();
    p3.noStroke();
    p3.fill(10, 30, 40);
    p3.rect(this.pos.x, this.pos.y, this.size, this.size);
    p3.restore();
  };

  e.updateProxy = function(dt) {
    // let center = new Vec2(p3.width / 2, p3.height / 2);
    // this.pos.x = center.x + Math.cos(gameTime) * 250
    // this.pos.y = center.y + Math.sin(gameTime) * 250;
  } 

  // let gtt = new GoToTarget(e);
  // gtt.target = scene.getUser();
  // gtt.speed = 10;
  // e.addComponent(gtt);

  let seek = new SeekTarget(e);
  // seek.target = scene.getUser();
  e.addComponent(seek);

  let coll = new Collidable(e);
  coll.type = CollisionType.ENEMY;
  coll.mask = CollisionType.PLAYER | CollisionType.PLAYER_BULLET;
  e.addComponent(coll);

  return e;
}
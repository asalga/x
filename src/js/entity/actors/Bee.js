'use strict';

import Entity from '../Entity.js';

import Killable from '../components/Killable.js';
import Health from '../components/Health.js';
import Collidable from '../components/Collidable.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';

export default function createMouse() {
  let e = new Entity();
  e.name = 'bee';
  e.size = 20;
  e.bounds = new BoundingCircle(e.pos, e.size);
  e.speed = 1;

  e.updateProxy = function(dt) {};

  e.renderProxy = function() {
    p3.save();
    p3.noStroke();
    p3.fill(100, 110, 140 * (e.health/1000));
    p3.ellipse(this.pos.x, this.pos.y, this.size, this.size);
    p3.restore();
  };

  e.updateProxy = function(dt) {
    let center = new Vec2(p3.width / 2, p3.height / 2);
    this.pos.x = center.x + Math.cos(gameTime) * 250;
    this.pos.y = center.y + Math.sin(gameTime) * 250;
  };

  e.addComponent(new Killable(e));
  e.addComponent(new Health(e, 1));

  let coll = new Collidable(e);
  coll.type = CollisionType.ENEMY;
  coll.mask = CollisionType.PLAYER | CollisionType.PLAYER_BULLET;
  e.addComponent(coll);

  return e;
}
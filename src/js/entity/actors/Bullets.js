'use strict';

import Entity from '../Entity.js';
import Collidable from '../components/Collidable.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';
import Vec2 from '../../math/Vec2.js';
import Debug from '../../debug/Debug.js';
import Event from '../../event/Event.js';

import Health from '../components/Health.js';

export default function createBullet() {
  let e = new Entity();
  e.name = 'bullet';
  e.pos.set(p3.width / 2, p3.height / 2);
  e.size = 5;
  e.bounds = new BoundingCircle(e.pos, e.size);
  e.damage = 10;

  e.renderProxy = function(p3) {
    // Debug.add(`bullet: [${this.pos.x}, ${this.pos.y}]`);

    p3.save();
    p3.strokeWeight(2);
    // p3.stroke(255, 0, 0);
    // p3.noFill();
    p3.fill(230,150,120);
    p3.ellipse(this.pos.x, this.pos.y, e.size, e.size);
    p3.restore();
  };

  function hit(data) {
    let e1 = data.e1;
    let e2 = data.e2;

    // Check if one of the entities passed is us
    if (e1 !== e && e2 !== e) {
      return;
    }
    let other = e1 === e ? e2 : e1;

    if (other.health) {
      other.health.hurt(e.damage);
    }
    scene.remove(e);
  }

  e.on('collision', hit);

  let coll = new Collidable(e);
  coll.type = CollisionType.PLAYER_BULLET;
  coll.mask = CollisionType.ENEMY;
  e.addComponent(coll);

  return e;
}
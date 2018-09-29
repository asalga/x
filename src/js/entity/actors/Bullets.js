'use strict';

import Entity from '../Entity.js';
import Collidable from '../components/Collidable.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';
import Vec2 from '../../math/Vec2.js';
import Debug from '../../debug/Debug.js';
import Event from '../../event/Event.js';

import Health from '../components/Health.js';
import Payload from '../components/Payload.js';

export default function createBullet() {
  let e = new Entity({name: 'bullet'});
  e.name = 'bullet';
  e.pos.set(p3.width / 2, p3.height / 2);
  e.size = 5;
  
  // e.addComponent(new RoundThing());
  e.renderProxy = function(p3) {
    p3.save();
    p3.strokeWeight(2);
    p3.fill(230,150,120);
    p3.ellipse(this.pos.x, this.pos.y, e.size, e.size);
    p3.restore();
  };

  let payload = new Payload(e, 10);
  e.addComponent(payload);

  // change to component?
  e.bounds = new BoundingCircle(e.pos, e.size);

  // Remove this?
  let coll = new Collidable(e);
  coll.type = CollisionType.PLAYER_BULLET;
  coll.mask = CollisionType.ENEMY;
  e.addComponent(coll);

  return e;
}
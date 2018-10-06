'use strict';

import Entity from '../Entity.js';
import Collidable from '../components/Collidable.js';
import Payload from '../components/Payload.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

export default function createBullet() {
  let e = new Entity({ name: 'enemybullet' });
  // e.pos.set(p3.width / 2, p3.height / 2);
  e.size = 6;
  e.bounds = new BoundingCircle(e.pos, e.size);

  // e.addComponent(new RoundThing());
  e.renderProxy = function(p3) {
    p3.save();
    p3.strokeWeight(1);
    p3.fill(250, 50, 90);
    p3.ellipse(this.pos.x, this.pos.y, e.size, e.size);
    p3.restore();
  };

  let payload = new Payload(e, { dmg: 3 });
  e.addComponent(payload);

  // Remove this?
  let coll = new Collidable(e);
  coll.type = CollisionType.ENEMY_BULLET;
  coll.mask = CollisionType.PLAYER;
  e.addComponent(coll);

  return e;
}
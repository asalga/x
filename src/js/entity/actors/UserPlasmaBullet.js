'use strict';

import Entity from '../Entity.js';
import Collidable from '../components/Collidable.js';
import Payload from '../components/Payload.js';
import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

export default function createPlamaBullet() {
  let e = new Entity({name: 'plasmabullet'});
  e.size = 10;
  e.bounds = new BoundingCircle(e.pos, e.size);

  e.setDir = function(d){
    e.vel = d.clone().mult(900);
  }

  scene.add(e);
  
  // e.addComponent(new RoundThing());
  e.renderProxy = function(p3) {
    p3.save();
    p3.noStroke();
    p3.fill('rgb(55, 210, 55)');
    p3.ellipse(this.pos.x, this.pos.y, e.size, e.size);
    p3.restore();
  };

  let payload = new Payload(e, 30);
  e.addComponent(payload);

  // Remove this?
  let coll = new Collidable(e);
  coll.type = CollisionType.PLAYER_BULLET;
  coll.mask = CollisionType.ENEMY;
  e.addComponent(coll);

  return e;
}
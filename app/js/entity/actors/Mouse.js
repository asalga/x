'use strict';
import Entity from '../Entity.js';

import GoToTarget from '../components/GoToTarget.js';
import Killable from '../components/Killable.js';
import Health from '../components/Health.js';
import Collidable from '../components/Collidable.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

// import EventSystem from '../../event/EventSystem.js';

import Vec2 from '../../math/Vec2.js';

export default function createMouse() {
  let e = new Entity();
  e.name = 'mouse';
  e.size = 8;
  e.damage = 20;
  e.bounds = new BoundingCircle(e.pos, e.size);

  let setRandPosition = function(entity) {
    let r = Vec2.Rand().normalize().mult(500);

    // just so they all don't all arrive at the user at the same time
    let diviate = Vec2.Rand().normalize().mult(200);

    let v = new Vec2(p3.width / 2, p3.height / 2);
    v.add(r).add(diviate);
    entity.pos.set(v.x, v.y);
  };
  setRandPosition(e);

  e.updateProxy = function(dt) {};

  e.renderProxy = function(p3) {
    p3.strokeWeight(3);
    p3.fill(50);
    p3.stroke(200);
    p3.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  };

  let goToTarget = new GoToTarget(e);
  goToTarget.target = scene.getUser();
  goToTarget.speed = 60;
  goToTarget.arrived = function(data) {
    let target = data.e1;
    let mouse = data.e2;

    // Find out which entity is which
    if (data.e2.name === 'user') {
      target = data.e2;
      mouse = data.e1;
    }

    // Find out if |this| is from the event
    // otherwise event is coming from another object, ignore it
    if(mouse.gototarget === this){
      scene.remove(mouse);
      target.health.hurt(e.damage);
    }

    // setRandPosition(e);

    // evt.fire({ evtName: 'hurt_user', data: { damage: e.damage } });
  };
  goToTarget.ready();

  e.addComponent(goToTarget);
  e.addComponent(new Killable(e));
  e.addComponent(new Health(e, 10));

  let coll = new Collidable(e);
  coll.type = CollisionType.ENEMY;
  coll.mask = CollisionType.PLAYER | CollisionType.PLAYER_BULLET;
  e.addComponent(coll);

  return e;
}
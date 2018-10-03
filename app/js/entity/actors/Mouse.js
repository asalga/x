'use strict';

import Entity from '../Entity.js';

import GoToTarget from '../components/GoToTarget.js';
import Killable from '../components/Killable.js';
import Health from '../components/Health.js';
import HealthRender from '../components/HealthRender.js';
import SpriteRender from '../components/SpriteRender.js';
import Collidable from '../components/Collidable.js';
import Stun from '../components/Stun.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

// import EventSystem from '../../event/EventSystem.js';
import Vec2 from '../../math/Vec2.js';

export default function createMouse() {
  let e = new Entity();
  e.name = 'mouse';
  e.size = 10;
  e.damage = 20;
  e.bounds = new BoundingCircle(e.pos, e.size);
  e.speed = 3;

  e.updateProxy = function(dt) {};

  let setRandPosition = function(entity) {
    let r = Vec2.rand().normalize().mult(500);

    // just so they all don't all arrive at the user at the same time
    let deviate = Vec2.rand().normalize().mult(200);

    let v = new Vec2(p3.width / 2, p3.height / 2);
    v.add(r).add(deviate);
    entity.pos.set(v.x, v.y);
  };
  setRandPosition(e);

  let spriteRender = new SpriteRender(e, { layer: 100 });
  spriteRender.draw = function() {
    p3.save();
    p3.translate(e.pos.x, e.pos.y);
    p3.noStroke();
    p3.fill(64, 202, 238);
    p3.ellipse(0, 0, e.bounds.radius, e.bounds.radius);
    p3.restore();
  }
  e.addComponent(spriteRender);

  let goToTarget = new GoToTarget(e);
  goToTarget.target = scene.getUser();
  goToTarget.speed = 10;
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
    if (mouse.gototarget === this) {
      scene.remove(mouse);
      target.health && target.health.hurt(e.damage);
    }

    // setRandPosition(e);
    // evt.fire({ evtName: 'hurt_user', data: { damage: e.damage } });
  };
  goToTarget.ready();

  e.addComponent(goToTarget);
  e.addComponent(new Killable(e));
  e.addComponent(new Stun(e, 3));
  e.addComponent(new Health(e, 20, 20));
  e.addComponent(new HealthRender(e));

  let coll = new Collidable(e);
  coll.type = CollisionType.ENEMY;
  coll.mask = CollisionType.PLAYER | CollisionType.PLAYER_BULLET;
  e.addComponent(coll);

  return e;
}

// let minigun = EntitFactory.create('minigun');
// minigun.bullet
// e.add(minigun);
// minigun.launcher.bulletCreation = function(){
// EntitFactory.create('enemy_bullet');
// minigun.getComponent('launcher')
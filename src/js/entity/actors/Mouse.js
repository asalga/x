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

import Vec2 from '../../math/Vec2.js';

export default function createMouse() {
  let e = new Entity({ name: 'mouse' });
  e.damage = 20;
  e.bounds = new BoundingCircle(e.pos, 10);

  e.updateProxy = function(dt) {};

  let setRandPosition = function(entity) {
    let r = Vec2.rand().normalize().mult(500);

    // just so they all don't all arrive at the user at the same time
    let deviate = Vec2.rand().normalize().mult(1200);

    let v = new Vec2(p3.width / 2, p3.height / 2);
    v.add(r).add(deviate);
    entity.pos.set(v.x, v.y);
  };
  setRandPosition(e);

  let spriteRender = new SpriteRender(e, { width: 32, height: 32, layer: 120 });
  spriteRender.draw = function() {
    let sz = e.bounds.radius;
    this.p3.save();
    this.p3.clearAll();
    this.p3.noStroke();
    this.p3.fill(14, 202, 238);
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.ellipse(0, 0, sz, sz);
    this.p3.restore();

    p3.save();
    p3.translate(e.pos.x - (sz / 2), e.pos.y - (sz / 2));
    p3.drawImage(this.sprite, -sz, -sz);
    p3.restore();
  }
  e.addComponent(spriteRender);

  let goToTarget = new GoToTarget(e);
  goToTarget.target = scene.getUser();
  goToTarget.speed = 50;
  goToTarget.arrived = function(data) {
    let [target, mouse] = [data.e1, data.e2];
    if (data.e1 === this) {
      [target, mouse] = [mouse, target];
    }
    if (mouse.gototarget !== this) return;

    scene.remove(mouse);
    target.health && target.health.hurt(e.damage);
  };
  goToTarget.ready();

  e.addComponent(goToTarget);
  e.addComponent(new Killable(e));
  e.addComponent(new Stun(e, 3));
  e.addComponent(new Health(e, 20, 20));
  e.addComponent(new HealthRender(e, {layer: 200}));

  let coll = new Collidable(e);
  coll.type = CollisionType.ENEMY;
  coll.mask = CollisionType.PLAYER | CollisionType.PLAYER_BULLET;
  e.addComponent(coll);

  return e;
}
'use strict';

import Entity from '../Entity.js';

import GoToTarget from '../components/GoToTarget.js';
import Killable from '../components/Killable.js';
import Health from '../components/Health.js';
import HealthRender from '../components/HealthRender.js';
import SpriteRender from '../components/SpriteRender.js';
import Collidable from '../components/Collidable.js';
import MeleePayload from '../components/MeleePayload.js';
import Stun from '../components/Stun.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import Vec2 from '../../math/Vec2.js';

export default function createMouse() {
  let e = new Entity({ name: 'mouse' });
  e.bounds = new BoundingCircle(e.pos, 10);

  e.updateProxy = function(dt) {};

  let setRandPosition = function(entity) {
    let r = Vec2.rand().normalize().mult(200);

    // just so they all don't all arrive at the user at the same time
    let deviate = Vec2.rand().normalize().mult(20);

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

  e.addComponent(new GoToTarget(e, {
    target: scene.getUser(),
    speed: 25,
    hasArrived: function(data) {
      if (data.e2 !== this) { return; }
      setRandPosition(data.e2)
    }
  }));
  e.addComponent(new Killable(e));
  e.addComponent(new Stun(e, 3));
  e.addComponent(new Health(e, { amt: 10 }));
  e.addComponent(new HealthRender(e, { layer: 200 }));
  // e.addComponent(new MeleePayload(e, { damage: 20 }));
  e.addComponent(new Collidable(e, {
    type: CollisionType.ENEMY,
    mask: CollisionType.PLAYER | CollisionType.PLAYER_BULLET
  }));

  return e;
}
'use strict';

import Entity from '../Entity.js';

import Stun from '../components/Stun.js';
import Health from '../components/Health.js';
import Killable from '../components/Killable.js';
import GoToTarget from '../components/GoToTarget.js';
import Collidable from '../components/Collidable.js';
import Targetable from '../components/Targetable.js';
import ScorePoints from '../components/ScorePoints.js';
import HealthRender from '../components/HealthRender.js';
import SpriteRender from '../components/SpriteRender.js';
import MeleePayload from '../components/MeleePayload.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CType from '../../collision/CollisionType.js';

import Vec2 from '../../math/Vec2.js';

export default function createMouse() {
  let e = new Entity({ name: 'mouse' });
  e.bounds = new BoundingCircle(e.pos, 10);

  e.updateProxy = function(dt) {};

  let setRandPosition = function(entity) {
    let r = Vec2.rand().mult(400);

    // just so they all don't all arrive at the user at the same time
    let deviate = Vec2.rand().normalize().mult(20);

    let v = new Vec2(p3.width / 2, p3.height / 2);
    v.add(r).add(deviate);
    entity.pos.set(v.x, v.y);
  };
  setRandPosition(e);

  let sz = e.bounds.radius;
  let spriteRender = new SpriteRender(e, { layerName: 'sprite' });

  spriteRender.draw = function(_p3) {
    // if (this.dirty) {
    let sz = e.bounds.radius;
    _p3.save();
    // _p3.clearAll();
    _p3.noStroke();
    _p3.fill(14, 202, 238);
    // _p3.translate(this.p3.width / 2, this.p3.height / 2);
    _p3.ellipse(this.entity.pos.x, this.entity.pos.y, sz, sz);
    _p3.restore();
    // this.dirty = true;
    // }
    // _p3.drawImage(this.sprite, 0, 0);
  }
  e.addComponent(spriteRender);

  e.addComponent(new GoToTarget(e, {
    target: scene.getUser(),
    speed: 80,
    hasArrived: function(data) {
      // if (data.self !== this) { return; }
      // setRandPosition(e);
    }
  }));

  e.addComponent(new Killable(e));
  e.addComponent(new ScorePoints(e, { points: 100 }));
  e.addComponent(new Stun(e, { multiplier: 5 }));
  e.addComponent(new Health(e, { amt: 4 }));
  e.addComponent(new HealthRender(e, { layer: 200 }));
  e.addComponent(new MeleePayload(e, { damage: 20 }));
  e.addComponent(new Collidable(e, { type: CType.ENEMY, mask: CType.PLAYER | CType.PLAYER_BULLET }));
  e.addComponent(new Targetable(e));

  return e;
}
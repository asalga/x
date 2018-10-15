'use strict';

import Entity from '../Entity.js';

import Collidable from '../components/Collidable.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';
import AreaPayload from '../components/AreaPayload.js';

import CType from '../../collision/CollisionType.js';
import BoundingCircle from '../../collision/BoundingCircle.js';

export default function createExplosion() {
  let e = new Entity({ name: 'explosion', layer: 2 });
  scene.add(e);

  let sz = 50;
  e.bounds = new BoundingCircle(e.pos, sz);
  let time = .5;


  let spriteRender = new SpriteRender(e, {
    width: sz * 2 + 5,
    height: sz * 2 + 5,
    layer: 100
  });
  spriteRender.draw = function() {
    let sz = e.bounds.radius;

    let opacity = e.lifetimelimit.timeLeft() / time;
    this.p3.clearAll();
    this.p3.save();
    this.p3.strokeWeight(2);
    this.p3.stroke(`rgb(250, 250, 0, ${opacity})`);
    this.p3.fill(`rgb(120, 0, 0, ${opacity})`);
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.ellipse(0, 0, sz, sz);
    this.p3.restore();

    p3.drawImage(this.sprite, 0, 0); //e.pos.x, e.pos.y);
  };

  e.addComponent(spriteRender);
  e.addComponent(new AreaPayload(e, { dmg: 20, lingerTime: 15 }));
  e.addComponent(new Collidable(e, { type: CType.PLAYER_BULLET, mask: CType.ENEMY }));
  e.addComponent(new LifetimeLimit(e, { limit: time }));

  return e;
}
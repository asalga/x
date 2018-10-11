'use strict';

import createRocketBullet from './RocketBullet.js';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import Killable from '../components/Killable.js';
import Health from '../components/Health.js';
import HealthRender from '../components/HealthRender.js';
import Collidable from '../components/Collidable.js';
import SpriteRender from '../components/SpriteRender.js';
import Launcher from '../components/Launcher.js';
import Teleporter from '../components/Teleporter.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CType from '../../collision/CollisionType.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';


export default function createHummingBird() {
  let e = new Entity({ name: 'hummingbird' });
  e.bounds = new BoundingCircle(e.pos, 30);

  // e.vel.x = 100;
  // e.vel.y = 50;

  // e.pos.x = p3.width / 2;
  // e.pos.y = p3.height / 2 - 150;

  let spriteRender = new SpriteRender(e, { layer: 100 });
  spriteRender.draw = function() {
    p3.save();
    p3.noStroke();
    p3.translate(e.pos.x, e.pos.y);
    p3.fill(224, 112, 38);
    p3.ellipse(0, 0, e.bounds.radius, e.bounds.radius);
    p3.restore();
  }
  e.addComponent(spriteRender);

  // e.updateProxy = function(dt) {
  //   let center = new Vec2(p3.width / 2, p3.height / 2);
  //   this.vel.x = Math.cos(gameTime) * 300;
  //   this.vel.y = Math.sin(gameTime) * 150;
  // };

  e.addComponent(new Teleporter(e,{}));
  e.addComponent(new Killable(e));
  e.addComponent(new Health(e, { amt: 200 }));
  e.addComponent(new HealthRender(e));
  e.addComponent(new Collidable(e, { type: CType.ENEMY, mask: CType.PLAYER | CType.PLAYER_BULLET }));

  return e;
}
'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import Killable from '../components/Killable.js';
import Health from '../components/Health.js';
import HealthRender from '../components/HealthRender.js';
import Collidable from '../components/Collidable.js';
import Launcher from '../components/Launcher.js';
import SpriteRender from '../components/SpriteRender.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import createRocketBullet from './RocketBullet.js';

import Vec2 from '../../math/Vec2.js';

export default function createStarFish() {
  let e = new Entity({ name: 'starfish' });
  e.bounds = new BoundingCircle(e.pos, 40);

  let spriteRender = new SpriteRender(e, { layer: 100 });
  spriteRender.draw = function() {
    p3.save();
    p3.translate(e.pos.x, e.pos.y);
    p3.fill(255, 122, 188);
    p3.noStroke();
    p3.ellipse(0, 0, e.bounds.radius, e.bounds.radius);
    p3.restore();
  }
  e.addComponent(spriteRender);

  let numGuns = 6;

  for (let i = 0; i < numGuns; i++) {
    let rocketGun = EntityFactory.create('rocketgun');
    let rocketLauncher = new Launcher(rocketGun, { shotsPerSecond: 0.25, autoFire: true, ammo: 3 });
    let a = i * ((p3.TAU) / numGuns);

    rocketGun.pos.set(new Vec2(Math.cos(a), Math.sin(a)).mult(0));
    rocketLauncher.createFunc = createRocketBullet;

    rocketGun.addComponent(new Health(rocketGun, 40));
    rocketGun.addComponent(new Killable(rocketGun));
    rocketGun.addComponent(new Collidable(rocketGun, {
      type: CollisionType.ENEMY,
      mask: CollisionType.PLAYER_BULLET
    }));

    rocketLauncher.updateProxy = function() {
      this.direction.x = Math.cos((a));
      this.direction.y = Math.sin((a));
    }
    rocketGun.addComponent(rocketLauncher);
    e.add(rocketGun);
  }

  e.addComponent(new Killable(e));
  e.addComponent(new Health(e, { amt: 500 }));
  e.addComponent(new HealthRender(e, { layer: 100 }));
  e.addComponent(new Collidable(e, {
    type: CollisionType.ENEMY,
    mask: CollisionType.PLAYER_BULLET
  }));

  return e;
}
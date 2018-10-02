'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import Killable from '../components/Killable.js';
import Health from '../components/Health.js';
import HealthRender from '../components/HealthRender.js';
import Collidable from '../components/Collidable.js';
import Launcher from '../components/Launcher.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import createRocketBullet from './RocketBullet.js';

import Vec2 from '../../math/Vec2.js';

export default function createStarFish() {
  let e = new Entity();
  e.name = 'starfish';
  e.size = 60;
  e.bounds = new BoundingCircle(e.pos, e.size);
  e.speed = 3;

  e.updateProxy = function(dt) {};

  e.renderProxy = function(p3) {
    p3.translate(this.pos.x, this.pos.y);

    p3.save();
    p3.fill(200);
    p3.noStroke();
    p3.ellipse(0, 0, this.size, this.size);
    p3.restore();
  };

  // ROCKET
  let rocketGun = EntityFactory.create('rocketgun');
  let rocketLauncher = new Launcher(rocketGun, {
    rate: 1,
    autoFire: true,
    ammo: 450,
    color: 'rgb(2, 10, 255)'
  });
  rocketLauncher.createFunc = createRocketBullet;
  rocketGun.addComponent(rocketLauncher);
  e.add(rocketGun);

  e.addComponent(new Killable(e));
  e.addComponent(new Health(e, 1000));
  e.addComponent(new HealthRender(e));
  e.addComponent(new Collidable(e, {
    type: CollisionType.ENEMY,
    mask: CollisionType.PLAYER_BULLET
  }));

  return e;
}
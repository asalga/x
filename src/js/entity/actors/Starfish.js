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
  e.size = 40;
  e.bounds = new BoundingCircle(e.pos, e.size);
  e.speed = 3;

  e.updateProxy = function(dt) {

  };

  e.renderProxy = function(p3) {
    p3.translate(this.pos.x, this.pos.y);
    // p3.rotate(gameTime / Math.PI);

    p3.save();

    p3.fill(200);
    p3.noStroke();
    p3.ellipse(0, 0, this.size, this.size);
    p3.restore();
  };

  for (let i = 0; i < 10; i++) {
    let rocketGun = EntityFactory.create('rocketgun');
    let rocketLauncher = new Launcher(rocketGun, {
      rate: .125,
      autoFire: true,
      ammo: 0
    });

    let a = i * ((p3.TAU) / 8);

    rocketGun.pos.set(new Vec2(Math.cos(a), Math.sin(a)).mult(40));
    rocketLauncher.createFunc = createRocketBullet;

    rocketGun.addComponent(new Health(rocketGun, 50));
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
  e.addComponent(new Health(e, 1000));
  e.addComponent(new HealthRender(e));
  e.addComponent(new Collidable(e, {
    type: CollisionType.ENEMY,
    mask: CollisionType.PLAYER_BULLET
  }));

  return e;
}
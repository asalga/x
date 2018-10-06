'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import Killable from '../components/Killable.js';
import Health from '../components/Health.js';
import HealthRender from '../components/HealthRender.js';
import Collidable from '../components/Collidable.js';
import SpriteRender from '../components/SpriteRender.js';

import Launcher from '../components/Launcher.js';

import createRocketBullet from './RocketBullet.js';


import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';

export default function createMouse() {
  let e = new Entity({ name: 'bee' });
  e.bounds = new BoundingCircle(e.pos, 30);

  let spriteRender = new SpriteRender(e, { layer: 100 });
  spriteRender.draw = function() {
    p3.save();
    p3.noStroke();
    p3.translate(e.pos.x, e.pos.y);
    p3.fill(64, 202, 238);
    //(100, 111, 140);
    p3.ellipse(0, 0, e.bounds.radius, e.bounds.radius);
    p3.restore();
  }
  e.addComponent(spriteRender);

  e.updateProxy = function(dt) {
    let center = new Vec2(p3.width / 2, p3.height / 2);
    this.pos.x = 200;
    this.pos.y = 100;
    
    // this.pos.x = center.x + Math.cos(gameTime / 2) * 300;
    // this.pos.y = center.y + Math.sin(gameTime / 2) * 200;
  };

  e.addComponent(new Killable(e));
  e.addComponent(new Health(e, 100, 100));
  e.addComponent(new HealthRender(e));

  let coll = new Collidable(e);
  coll.type = CollisionType.ENEMY;
  coll.mask = CollisionType.PLAYER | CollisionType.PLAYER_BULLET;
  e.addComponent(coll);

  for (let i = 0; i < 4; i++) {
    let rocketGun = EntityFactory.create('rocketgun');
    let rocketLauncher = new Launcher(rocketGun, {
      rate: 1,
      autoFire: false,
      ammo: 0
    });

    let a = i * ((p3.TAU) / 4);

    rocketGun.pos.set(new Vec2(Math.cos(a), Math.sin(a)).mult(0));
    rocketLauncher.createFunc = createRocketBullet;

    rocketGun.addComponent(new Health(rocketGun, 40));
    rocketGun.addComponent(new Killable(rocketGun));
    rocketGun.addComponent(new Collidable(rocketGun, {
      type: CollisionType.ENEMY,
      mask: CollisionType.PLAYER_BULLET
    }));
    rocketGun.bounds = new BoundingCircle(rocketGun.pos, 30);
    scene.add(rocketGun);

    rocketGun.on('collision', data => {
      let [e1, e2] = [data.e1, data.e2];

      console.log(e1, e2);
      // Check if one of the entities passed is us
      if (e1 !== rocketGun && e2 !== rocketGun) { return; }
      let other = e1 === e ? e2 : e1;

      // other.health.hurt(e.payload.dmg);
      // scene.remove(rocketGun);
      rocketGun.launcherrenderer.visible = false;
      rocketGun.ammo = 0;
    }, rocketGun);


    rocketLauncher.direction.set = new Vec2(Math.cos(a), Math.sin(a));
    rocketLauncher.updateProxy = function() {
      this.direction.x = Math.cos((a));
      this.direction.y = Math.sin((a));
    }
    rocketGun.addComponent(rocketLauncher);
    e.add(rocketGun);
  }

  return e;
}
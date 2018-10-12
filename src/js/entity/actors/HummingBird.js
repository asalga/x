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
// import Teleporter from '../components/Teleporter.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CType from '../../collision/CollisionType.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';

export default function createHummingBird() {
  let e = new Entity({ name: 'hummingbird' });
  e.bounds = new BoundingCircle(e.pos, 50);

  let sz = e.bounds.radius;
  let spriteRender = new SpriteRender(e, { width: sz * 2, height: sz * 2, layer: 100 });
  spriteRender.drawProxy = function() {
    this.p3.save();
    this.p3.clearAll();
    this.p3.noStroke();
    this.p3.fill(224, 112, 38);
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.ellipse(0, 0, sz, sz);
    this.p3.restore();

    p3.drawImage(this.sprite, 0,0);// e.pos.x, e.pos.y);
  }
  e.addComponent(spriteRender);

  // e.updateProxy = function(dt) {
  //   let center = new Vec2(p3.width / 2, p3.height / 2);
  //   this.vel.x = Math.cos(gameTime) * 300;
  //   this.vel.y = Math.sin(gameTime) * 150;
  // };


  let numGuns = 3;

  for (let i = 0; i < numGuns; i++) {
    let rocketGun = EntityFactory.create('rocketgun');
    let rocketLauncher = new Launcher(rocketGun, { shotsPerSecond: 0.125, autoFire: true, ammo: 20 });
    let a = i * (Math.PI * 2) / numGuns;

    rocketLauncher.entity.launcherrenderer.layer = 100;

    rocketGun.pos.set(new Vec2(Math.cos(a), Math.sin(a)).mult(0));
    rocketLauncher.createFunc = createRocketBullet;

    // rocketGun.addComponent(new Health(rocketGun, 40));
    // rocketGun.addComponent(new Killable(rocketGun));
    // rocketGun.addComponent(new Collidable(rocketGun, { type: CType.ENEMY, mask: CType.PLAYER_BULLET }));

    rocketLauncher.updateProxy = function() {
      this.direction.x = Math.cos((a));
      this.direction.y = Math.sin((a));
    }
    rocketGun.addComponent(rocketLauncher);
    e.add(rocketGun);
  }

  let m = EntityFactory.create('teleporter');
  e.add(m);
  debugger;

  // e.addComponent(new Teleporter(e, {}));
  e.addComponent(new Killable(e));
  e.addComponent(new Health(e, { amt: 100 }));
  e.addComponent(new HealthRender(e));
  e.addComponent(new Collidable(e, { type: CType.ENEMY, mask: CType.PLAYER | CType.PLAYER_BULLET }));

  return e;
}
'use strict';

import Entity from '../Entity.js';

import GoToTarget from '../components/GoToTarget.js';
import Health from '../components/Health.js';
import HealthRender from '../components/HealthRender.js';
import Killable from '../components/Killable.js';
import Collidable from '../components/Collidable.js';
import Launcher from '../components/Launcher.js';
import WeaponSwitcher from '../components/WeaponSwitcher.js';
import MouseLauncherController from '../components/MouseLauncherController.js';
import SpriteRender from '../components/SpriteRender.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import Vec2 from '../../math/Vec2.js';

import EntityFactory from '../EntityFactory.js';
import createUserMiniGunBullet from './UserBullet.js';
import createUserFreezeBullet from './UserFreezeBullet.js';
import createUserPlasmaBullet from './UserPlasmaBullet.js';
import createUserRocketBullet from './UserRocketBullet.js';
import createUserFlakBullet from './UserFlakBullet.js';

export default function createUser() {
  let user = new Entity();
  user.name = 'user';
  user.pos.set(p3.width / 2, p3.height / 2);
  user.size = 40;
  user.bounds = new BoundingCircle(user.pos, user.size);

  let spriteRender = new SpriteRender(user, { layer: 1 });
  spriteRender.draw = function(_p3) {
    _p3.save();

    // body
    _p3.stroke(111, 150, 80);
    _p3.fill(251, 200, 138);

    let [x, y] = user.getWorldCoords().toArray();
    // _p3.translate(x, y);
    _p3.ellipse(x, y, user.size, user.size);

    _p3.restore();
  }
  user.addComponent(spriteRender);


  // MINIGUN
  let miniGun = EntityFactory.create('minigun');
  let miniGunLauncher = new Launcher(miniGun, { shotsPerSecond: 10, ammo: 110 });
  miniGunLauncher.createFunc = createUserMiniGunBullet;
  miniGun.addComponent(miniGunLauncher);
  // miniGun.addComponent(new LauncherRenderer(e, {color:'grey'}));
  miniGun.addComponent(new MouseLauncherController(miniGun));
  user.add(miniGun);

  // FREEZE
  let freezeGun = EntityFactory.create('freezegun');
  let freezeGunLauncher = new Launcher(freezeGun, { shotsPerSecond: 5, ammo: 999, bulletVel: 100 });
  freezeGunLauncher.createFunc = createUserFreezeBullet;
  freezeGun.addComponent(freezeGunLauncher);
  freezeGun.addComponent(new MouseLauncherController(freezeGun));
  user.add(freezeGun);

  // PLASMA
  let plasmaGun = EntityFactory.create('plasmagun');
  let plamaLauncher = new Launcher(plasmaGun, { shotsPerSecond: 5, ammo: 350 });
  plamaLauncher.createFunc = createUserPlasmaBullet;
  plasmaGun.addComponent(plamaLauncher);
  plasmaGun.addComponent(new MouseLauncherController(plasmaGun));
  user.add(plasmaGun);

  // FLAK
  let flakGun = EntityFactory.create('flakgun');
  let flakLauncher = new Launcher(flakGun, { shotsPerSecond: 5, ammo: 100, bulletVel: 300 });
  flakLauncher.createFunc = createUserFlakBullet;
  flakGun.addComponent(flakLauncher);
  flakGun.addComponent(new MouseLauncherController(flakGun));
  user.add(flakGun);

  // ROCKET
  let rocketGun = EntityFactory.create('rocketgun');
  let rocketLauncher = new Launcher(rocketGun, { shotsPerSecond: 1.0, autoFire: true, ammo: 599, bulletVel: 100 });
  rocketLauncher.createFunc = createUserRocketBullet;
  rocketGun.addComponent(rocketLauncher);
  rocketGun.addComponent(new MouseLauncherController(rocketGun));
  user.add(rocketGun);




  // WEAPON SWITCHER
  let weaponSwitcher = new WeaponSwitcher(user);
  weaponSwitcher.addWeapon('1', miniGun);
  weaponSwitcher.addWeapon('2', plasmaGun);
  weaponSwitcher.addWeapon('3', rocketGun);
  weaponSwitcher.addWeapon('4', freezeGun);
  weaponSwitcher.addWeapon('5', flakGun);
  weaponSwitcher.init();
  user.addComponent(weaponSwitcher);


  user.addComponent(new Collidable(user, { type: CollisionType.PLAYER, mask: CollisionType.ENEMY_BULLET | CollisionType.ENEMY }));
  user.addComponent(new Killable(user));
  user.addComponent(new HealthRender(user, { layer: 10 }));
  user.addComponent(new Health(user, { amt: 1000 }));

  return user;
}
// health.updateProxy = function() { Debug.add(`Player Health: ${Math.floor(health.health)}`); };
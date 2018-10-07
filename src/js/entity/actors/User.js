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

export default function createUser() {
  let user = new Entity();
  user.name = 'user';
  user.pos.set(p3.width / 2, p3.height / 2);
  user.size = 55;
  user.bounds = new BoundingCircle(user.pos, user.size);

  let spriteRender = new SpriteRender(user, { layer: 10 });
  spriteRender.draw = function() {
    p3.save();
    p3.translate(user.pos.x, user.pos.y);

    // User body
    p3.stroke(111, 150, 80);
    // let h = (user.health.health) / 100;
    p3.fill(251, 200, 138);
    //(157, 192, 188);
    p3.ellipse(0, 0, user.size, user.size);

    // top
    p3.save();
    p3.noStroke();
    // p3.fill(251,200,138);
    //(48, 60, 93);
    p3.ellipse(0, 0, 20, 20);
    p3.restore();
    p3.restore();
  }
  user.addComponent(spriteRender);

  // MINIGUN
  let miniGun = EntityFactory.create('minigun');
  let miniGunLauncher = new Launcher(miniGun, {
    rate: 10,
    autoFire: false,
    ammo: 999,
    color: 'rgb(120,120, 120)'
  });
  miniGunLauncher.createFunc = createUserMiniGunBullet;
  miniGun.addComponent(miniGunLauncher);
  miniGun.addComponent(new MouseLauncherController(miniGun));
  user.add(miniGun);

  // FREEZE
  let freezeGun = EntityFactory.create('freezegun');
  let freezeGunLauncher = new Launcher(freezeGun, {
    rate: 5,
    autoFire: false,
    ammo: 999,
    color: 'rgb(120,120,120)'
  });
  freezeGunLauncher.createFunc = createUserFreezeBullet;
  freezeGun.addComponent(freezeGunLauncher);
  freezeGun.addComponent(new MouseLauncherController(freezeGun));
  user.add(freezeGun);

  // PLASMA
  let plasmaGun = EntityFactory.create('plasmagun');
  let plamaLauncher = new Launcher(plasmaGun, { rate: 5, ammo: 350, color: 'rgb(55, 210, 55)' });
  plamaLauncher.createFunc = createUserPlasmaBullet;
  plasmaGun.addComponent(plamaLauncher);
  plasmaGun.addComponent(new MouseLauncherController(plasmaGun));
  user.add(plasmaGun);

  // ROCKET
  let rocketGun = EntityFactory.create('rocketgun');
  let rocketLauncher = new Launcher(rocketGun, {
    rate: 1,
    autoFire: true,
    ammo: 450,
    color: 'rgb(245, 10, 255)'
  });
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
  weaponSwitcher.init();
  user.addComponent(weaponSwitcher);

  let health = new Health(user, 200);
  health.regenerationSpeed = .25;
  health.updateProxy = function() { Debug.add(`Player Health: ${Math.floor(health.health)}`); };
  user.addComponent(health);

  let killable = new Killable(user);
  killable.onDeath = function() { /*scene.restartGame();*/ };
  user.addComponent(killable);

  let coll = new Collidable(user);
  coll.type = CollisionType.PLAYER;
  coll.mask = CollisionType.ENEMY_BULLET | CollisionType.ENEMY;
  user.addComponent(coll);

  user.addComponent(new HealthRender(user, { layer: 10 }));

  return user;
}
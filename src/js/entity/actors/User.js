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

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import Vec2 from '../../math/Vec2.js';

import EntityFactory from '../EntityFactory.js';
import createUserMiniGunBullet from './UserBullet.js';
import createUserPlasmaBullet from './UserPlasmaBullet.js';
import createUserRocketBullet from './UserRocketBullet.js';

export default function createUser() {
  let user = new Entity();
  user.name = 'user';
  user.pos.set(p3.width / 2, p3.height / 2);
  user.size = 55;
  user.bounds = new BoundingCircle(user.pos, user.size);

  user.renderProxy = function(p3) {
    p3.translate(this.pos.x, this.pos.y);

    // User body
    p3.stroke(111, 150, 80);
    let h = (this.health.health) / 100;
    p3.fill(157 * h, 192 * h, 188 * h);
    p3.ellipse(0, 0, user.size, user.size);

    // top
    p3.save();
    p3.noStroke();
    p3.fill(48, 60, 93);
    p3.ellipse(0, 0, 20, 20);
    p3.restore();
  };

  // MINIGUN
  let miniGun = EntityFactory.create('minigun');
  let miniGunLauncher = new Launcher(miniGun, { rate: 2.5, ammo: 999, color: 'rgb(120,120, 120)' });
  miniGunLauncher.createFunc = createUserMiniGunBullet;
  miniGun.addComponent(miniGunLauncher);
  miniGun.addComponent(new MouseLauncherController(miniGun));
  user.add(miniGun);

  // PLASMA
  let plasmaGun = EntityFactory.create('plasmagun');
  let plamaLauncher = new Launcher(plasmaGun, { rate: 5, ammo: 50, color: 'rgb(55, 210, 55)' });
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
    color: 'rgb(245, 10, 255)' });
  rocketLauncher.createFunc = createUserRocketBullet;
  rocketGun.addComponent(rocketLauncher);
  rocketGun.addComponent(new MouseLauncherController(rocketGun));
  user.add(rocketGun);

  // WEAPON SWITCHER
  let weaponSwitcher = new WeaponSwitcher(user);
  weaponSwitcher.addWeapon('1', miniGun);
  weaponSwitcher.addWeapon('2', plasmaGun);
  weaponSwitcher.addWeapon('3', rocketGun);
  weaponSwitcher.init();
  user.addComponent(weaponSwitcher);

  let health = new Health(user, 100);
  health.regenerationSpeed = 10;
  health.updateProxy = function() { Debug.add(`Player Health: ${Math.floor(health.health)}`); };
  user.addComponent(health);

  let killable = new Killable(user);
  killable.onDeath = function() { /*scene.restartGame();*/ };
  user.addComponent(killable);

  let coll = new Collidable(user);
  coll.type = CollisionType.PLAYER;
  coll.mask = CollisionType.ENEMY_BULLET | CollisionType.ENEMY;
  user.addComponent(coll);

  user.addComponent(new HealthRender(user));

  return user;
}
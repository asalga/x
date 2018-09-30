'use strict';

import Entity from '../Entity.js';

import GoToTarget from '../components/GoToTarget.js';
import Health from '../components/Health.js';
import Killable from '../components/Killable.js';
import Collidable from '../components/Collidable.js';
import Launcher from '../components/Launcher.js';

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
  user.pos.set(p3.width / 2, p3.height / 2 + 0);
  user.size = 40;
  user.bounds = new BoundingCircle(user.pos, user.size);

  // TODO: FIX
  window.UserPos = user.pos;

  user.renderProxy = function(p3) {
    p3.translate(this.pos.x, this.pos.y);

    p3.stroke(111, 150, 80);
    let h = (this.health.health) / 100;
    p3.fill(157 * h, 192 * h, 188 * h);
    p3.ellipse(0, 0, user.size, user.size);

    p3.save();
    p3.noStroke();
    p3.fill(48, 60, 93);
    p3.ellipse(0, 0, 20, 20);
    p3.restore();
  };


  // MINIGUN
  let miniGun = EntityFactory.create('minigun');
  let miniGunLauncher = new Launcher(miniGun, { rate: 10, ammo: 999, color: 'rgb(145, 119, 130)' });
  miniGunLauncher.createFunc = createUserMiniGunBullet;
  miniGun.addComponent(miniGunLauncher);
  user.add(miniGun);

  // PLASMA
  // let plasmaGun = EntityFactory.create('plasmagun');
  // let plamaLauncher = new Launcher(plasmaGun, { rate: 4, ammo: 50, color: 'rgb(145, 110, 255)' });
  // plamaLauncher.createFunc = createUserPlasmaBullet;
  // plasmaGun.addComponent(plamaLauncher);
  // user.add(plasmaGun);


  // FIX adding to entity
  // MISSILE LAUNCHER / ROCKET
  // let rocketGun = EntityFactory.create('rocketgun');
  // let rocketLauncher = new Launcher(rocketGun, { rate: 4, ammo: 50, color: 'rgb(145, 110, 255)' });
  // rocketLauncher.createFunc = createUserRocketBullet;
  // rocketGun.addComponent(rocketLauncher);
  // user.add(rocketGun);
  
  // let weaponSwitch = new WeaponSwitch();
  // weaponSwitch.addWeapon(minigunEntity);
  // user.add(weaponSwitch);

  // Temporary hack to test missles
  // user.on('GAME_CLICK', function(e) {
  //   if (e.button === 2) {
  //     let h = EntityFactory.create('homingmissle');
  //     h.pos.set(user.pos);
  //     h.seektarget.target = scene.bee;
  //     scene.add(h);
  //   }
  // }, user);


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

  return user;
}
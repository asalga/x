'use strict';

import createBee from './actors/Bee.js';
import createMouse from './actors/Mouse.js';
import createStarfish from './actors/Starfish.js';
import createHummingBird from './actors/HummingBird.js';

import createUser from './actors/User.js';

// What category is this?
import createCrystal from './actors/Crystal.js';
import createExplosion from './actors/Explosion.js';

// import createUserBullet from './actors/UserBullet.js';
// import createEnemyBullet from './actors/EnemyBullet.js';
// import UserRocketBullet from './actors/UserRocketBullet.js';

import {
  createMinigun,
  createPlasmaGun,
  createRocketGun,
  createFreezeGun,
  createFlakGun
} from './actors/guns/guns.js';

let createFuncs = new Map();

// PLAYERS
createFuncs.set('bee', createBee);
createFuncs.set('mouse', createMouse);
createFuncs.set('starfish', createStarfish);
createFuncs.set('hummingbird', createHummingBird);
createFuncs.set('user', createUser);

// GUNS
createFuncs.set('minigun', createMinigun);
createFuncs.set('plasmagun', createPlasmaGun);
createFuncs.set('rocketgun', createRocketGun);
createFuncs.set('freezegun', createFreezeGun);
createFuncs.set('flakgun', createFlakGun);

// DECORATORS?
createFuncs.set('crystal', createCrystal);
createFuncs.set('explosion', createExplosion);

export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}
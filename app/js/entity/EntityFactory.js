'use strict';

import createMouse from './actors/Mouse.js';
import createHummingBird from './actors/HummingBird.js';
import createBee from './actors/Bee.js';

import createUser from './actors/User.js';
import createUserBullet from './actors/UserBullet.js';
import createEnemyBullet from './actors/EnemyBullet.js';
import createHomingMissle from './actors/HomingMissle.js';

import createMinigun from './actors/minigun.js';
import createPlasmaGun from './actors/plasmagun.js';


let createFuncs = new Map();

// PLAYERS
createFuncs.set('bee', createBee);
createFuncs.set('mouse', createMouse);
createFuncs.set('hummingbird', createHummingBird);
createFuncs.set('user', createUser);

// BULLETS
createFuncs.set('bullet', createUserBullet);
// createFuns.set('plasma', createPlasmaBullet);
createFuncs.set('homingmissle', createHomingMissle);


// GUNS
createFuncs.set('minigun', createMinigun);
createFuncs.set('plasmagun', createPlasmaGun);


export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}
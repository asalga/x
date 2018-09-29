'use strict';

import createMouse from './actors/Mouse.js';
import createHummingBird from './actors/HummingBird.js';
import createBee from './actors/Bee.js';

import createUser from './actors/User.js';
import createBullet from './actors/Bullets.js';
import createHomingMissle from './actors/HomingMissle.js';

let createFuncs = new Map();
createFuncs.set('bee', createBee);
createFuncs.set('mouse', createMouse);
createFuncs.set('hummingbird', createHummingBird);

createFuncs.set('user', createUser);

createFuncs.set('bullet', createBullet);
createFuncs.set('homingmissle', createHomingMissle);

/*
	createFuncs.set('minigun', createMinigun);
	createFuncs.set('flamer', createFlamer);
	createFuncs.set('lasercannon', createLaserCanon);
*/

export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}
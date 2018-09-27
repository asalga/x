'use strict';

import createMouse from './actors/Mouse.js';
import createHummingBird from './actors/HummingBird.js';
import createUser from './actors/User.js';
import createBullet from './actors/Bullets.js';

let createFuncs = new Map();
createFuncs.set('user', createUser);
createFuncs.set('mouse', createMouse);
createFuncs.set('hummingbird', createHummingBird);

createFuncs.set('bullet', createBullet);

export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}
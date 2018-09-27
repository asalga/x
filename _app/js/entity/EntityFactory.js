'use strict';

import createMouse from './actors/Mouse.js';
import createHummingBird from './actors/Hummingbird.js';
import createUser from './actors/User.js';

let createFuncs = new Map();
createFuncs.set('user', createUser);
createFuncs.set('mouse', createMouse);
createFuncs.set('hummingbird', createHummingBird);

export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}
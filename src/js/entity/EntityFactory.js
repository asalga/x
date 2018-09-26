'use strict';

import createMouse from './actors/Mouse.js';

export default class EntityFactor {
  static create(scene, str) {
    if (str === 'mouse') return createMouse(scene);
  }
}
'use strict';

import createMouse from './actors/Mouse.js';

export default class EntityFactor {
  static create(str) {
    if (str === 'mouse') return createMouse();
  }
}
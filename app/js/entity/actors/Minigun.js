'use strict';

import Entity from '../Entity.js';

export default function createMinigun() {
  let e = new Entity();
  e.name = 'minigun';
  e.updateProxy = function(dt) {};
  return e;
}
'use strict';

import Entity from '../Entity.js';

export default function createPlasmaGun() {
  let e = new Entity();
  e.name = 'plasmagun';
  e.updateProxy = function(dt) {};
  return e;
}
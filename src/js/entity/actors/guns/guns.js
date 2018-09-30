'use strict';

import Entity from '../../Entity.js';

export function createMinigun() {
  let e = new Entity();
  e.name = 'minigun';
  return e;
}

export function createPlasmaGun() {
  let e = new Entity();
  e.name = 'plasmagun';
  return e;
}

export function createRocketGun() {
  let e = new Entity();
  e.name = 'rocketgun';
  return e;
}
'use strict';

import Entity from '../../Entity.js';

export function createMinigun() {
  return new Entity({ 'name': 'minigun' });
}

export function createPlasmaGun() {
  return new Entity({ 'name': 'plasmagun' });
}

export function createRocketGun() {
  return new Entity({ 'name': 'rocketgun' });
}

export function createLinkGun() {
  return new Entity({ 'name': 'linkgun' });
}
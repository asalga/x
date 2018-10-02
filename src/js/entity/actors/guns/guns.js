'use strict';

import Entity from '../../Entity.js';
import LauncherRenderer from '../../components/LauncherRenderer.js';

export function createMinigun() {
  let e = new Entity({ 'name': 'minigun' });
  e.addComponent(new LauncherRenderer(e, { color: 'grey' }));
  return e;
}

export function createPlasmaGun() {
  let e = new Entity({ 'name': 'plasmagun' });
  e.addComponent(new LauncherRenderer(e, { color: 'green' }));
  return e;
}

export function createRocketGun() {
  let e = new Entity({ 'name': 'rocketgun' });
  e.addComponent(new LauncherRenderer(e, { color: 'purple' }));
  return e;
}

export function createLinkGun() {
  return new Entity({ 'name': 'linkgun' });
}
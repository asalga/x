'use strict';

import Entity from '../../Entity.js';
import LauncherRenderer from '../../components/LauncherRenderer.js';

export function miniGun() {
  let e = new Entity({ 'name': 'minigun' });
  e.addComponent(new LauncherRenderer(e, { color: 'grey' }));
  return e;
}

export function plasmaGun() {
  let e = new Entity({ 'name': 'plasmagun' });
  e.addComponent(new LauncherRenderer(e, { color: 'green' }));
  return e;
}

export function rocketGun() {
  let e = new Entity({ 'name': 'rocketgun' });
  e.addComponent(new LauncherRenderer(e, { color: 'purple' }));
  return e;
}

export function freezeGun() {
  let e = new Entity({ 'name': 'freezegun' });
  e.addComponent(new LauncherRenderer(e, { color: 'blue' }));
  return e;
}

export function flakGun() {
  let e = new Entity({ 'name': 'flakgun' });
  e.addComponent(new LauncherRenderer(e, { color: 'yellow' }));
  return e;
}

// export function linkGun() {
  // return new Entity({ 'name': 'linkgun' });
// }
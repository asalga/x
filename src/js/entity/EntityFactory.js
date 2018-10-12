'use strict';

import bee from './actors/Bee.js';
import mouse from './actors/Mouse.js';
import starfish from './actors/Starfish.js';
import hummingbird from './actors/HummingBird.js';
import teleporter from './actors/Teleporter.js';

import createUser from './actors/User.js';

// What category are these?
import createCrystal from './actors/Crystal.js';
import createExplosion from './actors/Explosion.js';

import createSpawner from './actors/Spawner.js';

import {
  createMinigun,
  createPlasmaGun,
  createRocketGun,
  createFreezeGun,
  createFlakGun
} from './actors/guns/guns.js';



let createFuncs = new Map();

// PLAYERS
createFuncs.set('bee', bee);
createFuncs.set('mouse', mouse);
createFuncs.set('starfish', starfish);
createFuncs.set('hummingbird', hummingbird);
createFuncs.set('user', createUser);

// GUNS
createFuncs.set('minigun', createMinigun);
createFuncs.set('plasmagun', createPlasmaGun);
createFuncs.set('rocketgun', createRocketGun);
createFuncs.set('freezegun', createFreezeGun);
createFuncs.set('flakgun', createFlakGun);

// DECORATORS?
createFuncs.set('crystal', createCrystal);
createFuncs.set('explosion', createExplosion);

createFuncs.set('teleporter', teleporter);


createFuncs.set('spawner', createSpawner);

export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}
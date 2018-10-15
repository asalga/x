'use strict';

import bee from './actors/Bee.js';
import mouse from './actors/Mouse.js';
import starfish from './actors/Starfish.js';
import hummingbird from './actors/HummingBird.js';
import user from './actors/User.js';

import crystal from './actors/Crystal.js';
import explosion from './actors/Explosion.js';
import teleporter from './actors/Teleporter.js';

import createSpawner from './actors/Spawner.js';

import particleSystem from './actors/ParticleSystem.js';

import {
  miniGun,
  plasmaGun,
  rocketGun,
  freezeGun,
  flakGun
} from './actors/guns/guns.js';

let createFuncs = new Map();

// PLAYERS
createFuncs.set('bee', bee);
createFuncs.set('mouse', mouse);
createFuncs.set('starfish', starfish);
createFuncs.set('hummingbird', hummingbird);
createFuncs.set('user', user);

// GUNS
createFuncs.set('minigun', miniGun);
createFuncs.set('plasmagun', plasmaGun);
createFuncs.set('rocketgun', rocketGun);
createFuncs.set('freezegun', freezeGun);
createFuncs.set('flakgun', flakGun);

// DECORATIONS
createFuncs.set('particlesystem', particleSystem);
// createFuncs.set('bonusPoints', bonusPoints);

// CONTROLLERS
// createFuncs.set('spawner', spawner);

// ZONES 
// ?

// PROPS
// createFuncs.set('health', health);
// 

// MISC
createFuncs.set('crystal', crystal);
createFuncs.set('explosion', explosion);
createFuncs.set('teleporter', teleporter);


export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}
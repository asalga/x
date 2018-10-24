'use strict';

// PLAYERS
import bee from './actors/Bee.js';
import mouse from './actors/Mouse.js';
import starfish from './actors/Starfish.js';
import hummingbird from './actors/HummingBird.js';
import user from './actors/User.js';

import crystal from './actors/Crystal.js';
import explosion from './actors/Explosion.js';
import teleporter from './actors/Teleporter.js';

// DECORATIONS
import emitter from './actors/decorations/Emitter.js';
import smoke from './actors/decorations/Smoke.js';
import spark from './actors/decorations/Spark.js';
import background from './actors/decorations/Background.js';

import ui from './actors/Ui.js';

// WAVES
import createSpawner from './actors/Spawner.js';
import circularWave from './waves/circularWave.js';

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
createFuncs.set('emitter', emitter);
createFuncs.set('smoke', smoke);
createFuncs.set('background', background);
// smoke
// spark


createFuncs.set('ui', ui);
// createFuncs.set('bonusPoints', bonusPoints);


// ZONES 
// ?

// PROPS
// createFuncs.set('health', health);
// 

// WAVES
// createFuncs.set('spawner', spawner);
createFuncs.set('circularwave', circularWave);


// MISC
createFuncs.set('crystal', crystal);
createFuncs.set('explosion', explosion);
createFuncs.set('teleporter', teleporter);


export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}
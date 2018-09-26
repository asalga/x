'use strict';

import Timer from './core/Timer.js';
import Utils from './Utils.js';
import Vec2 from './math/Vec2.js';
import P3 from './P3.js';
import { createUser, Entity } from './entity/Entity.js';
import EntityFactory from './entity/EntityFactory.js';

let debug = true;
let paused = false;
let now = 0,
  lastTime = 0,
  gameTime = 0;
let fps = 0;
let timer;
let p3;

let cvs = Utils.getEl('cvs');
let ctx = cvs.getContext('2d');

let user, mouse;
let scene = new Set();

function update(dt) {
  gameTime += dt;
  scene.forEach(e => e.update(dt));
}

function render() {
  p3.clear();
  scene.forEach(e => e.draw(p3));
}

function setup() {
  p3 = new P3(cvs, ctx);
  p3.clearColor('black');

  user = createUser(p3);
  window.user = user;

  mouse = EntityFactory.create(scene, 'mouse');

  scene.add(user);
  scene.add(mouse);

  timer = new Timer();
  timer.update = function(dt) {
    update(dt)
    render();
  };
  timer.start();
}

setup();
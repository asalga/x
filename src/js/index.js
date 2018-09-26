'use strict';

import Timer from './core/Timer.js';
import Utils from './Utils.js';
import Vec2 from './math/Vec2.js';
import P3 from './P3.js';
import { createUser, Entity } from './entity/Entity.js';
import EntityFactory from './entity/EntityFactory.js';
import Scene from './Scene.js';

let timer;
let gameTime = 0;

let p3;
let cvs = Utils.getEl('cvs');
let ctx = cvs.getContext('2d');

let user;
let scene;


function update(dt) {
  scene.update(dt);
  gameTime += dt;
}

function render() {
  p3.clear();
  scene.draw(p3);
}

function setup() {
  p3 = new P3(cvs, ctx);
  p3.clearColor('black');

  scene = new Scene();
  window.p3 = p3;
  window.scene = scene;

  user = createUser(p3);
  scene.addUser(user);

  for(let i = 0; i < 10; ++i){
    let mouse = EntityFactory.create('mouse');
    scene.entities.add(mouse);
  }

  timer = new Timer();
  timer.update = function(dt) {
    update(dt)
    render();
  };
  timer.start();
}

setup();
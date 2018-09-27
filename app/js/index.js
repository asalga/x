'use strict';

// import Vec2 from './math/Vec2.js';
// import Entity from './entity/Entity.js';
// import EntityFactory from './entity/EntityFactory.js';

import Timer from './core/Timer.js';
import Utils from './Utils.js';
import P3 from './P3.js';
import Scene from './Scene.js';
import { CollisionSystem } from './collision/CollisionSystem.js';
import Debug from './debug/Debug.js';
import Event from './event/Event.js';


let timer;
let perfTimer;
window.gameTime = 0;
let scene;
let p3;
let cvs = Utils.getEl('cvs');
let ctx = cvs.getContext('2d');

cvs.onclick = function(e){
  new Event({evtName:'GAME_CLICK', data: e}).fire();
}

function update(dt) {
  scene.update(dt);

  Debug.add(`gameTime: ${Math.floor(window.gameTime)}`);

  CollisionSystem.gatherCollidables();
  CollisionSystem.checkCollisions();

  window.gameTime += dt;
}

function preRender() {
  perfTimer = new Date().getTime();
}

function render() {
  p3.clear();
  scene.draw(p3);
}

function postRender() {
  let tt = new Date().getTime() - perfTimer;
  Debug.add('render ms:' + tt);
  Debug.draw();
  Debug.postRender();
}

function setup() {
  p3 = new P3(cvs, ctx);
  p3.clearColor('black');
  Debug.setOn(false);

  // Make scene and p3 static classes?
  scene = new Scene();
  window.p3 = p3;
  window.scene = scene;

  scene.restartGame();

  timer = new Timer();
  timer.update = function(dt) {
    update(dt);
    preRender();
    render();
    postRender();
  };
  timer.start();
}

setup();
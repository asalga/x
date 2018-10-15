'use strict';

import GameTimer from './core/GameTimer.js';
import Utils from './Utils.js';
import P3 from './P3.js';
import Scene from './Scene.js';

import Debug from './debug/Debug.js';
import Event from './event/Event.js';
import EventSystem from './event/EventSystem.js';

// Systems
import CollisionSystem from './collision/CollisionSystem.js';
import Renderer from './Renderer.js';

window.gameTime = 0;
window.debug = false;
window.Debug = Debug;
window.scene = null;
window.vec2_ctor = 0;
window.Events = new EventSystem();

let p3;
let timer;
let perfTimer;

let cvs = Utils.getEl('cvs');
let ctx = cvs.getContext('2d');

document.addEventListener('mousedown', e => new Event({ evtName: 'GAME_MOUSE_DOWN', data: e }).fire());
document.addEventListener('mouseup', e => new Event({ evtName: 'GAME_MOUSE_UP', data: e }).fire());
document.addEventListener('contextmenu', e => e.preventDefault());

function update(dt) {
  Debug.add(`Game time: ${Math.floor(window.gameTime)}`);
  Debug.add(`Entity count: ${scene.entities.size}`);
  Debug.add(`${window.vec2_ctor}`);

  scene.update(dt);

  (new EventSystem()).printDebug();

  CollisionSystem.gatherCollidables();
  CollisionSystem.checkCollisions();

  window.gameTime += dt;
}

function preRender() {
  perfTimer = new Date().getTime();
  Renderer.preRender();
}

function render() {
  Renderer.render();
}

function postRender() {
  let timeDiff = new Date().getTime() - perfTimer;
  Debug.add('render ms:' + timeDiff);

  Renderer.postRender();

  let bytes = window.performance.memory.totalJSHeapSize.toLocaleString();
  Debug.add(`heap: ${bytes} bytes`);
  Debug.draw();
  Debug.postRender();
}

function setup() {
  p3 = new P3(cvs, ctx);
  p3.clearColor(25, 80, 100);

  // TODO: Make scene and p3 static classes?
  scene = new Scene();
  window.p3 = p3;
  // Debug.setOn(false);

  scene.restartGame();

  timer = new GameTimer();
  timer.update = function(dt) {
    update(dt);
    preRender();
    render();
    postRender();
  };
  timer.start();
}

setup();
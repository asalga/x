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

import cfg from './cfg.js';

import Pool from './core/Pool.js';

window.gameTime = 0;
window.gameFrameCount = 0;
window.Renderer = Renderer;


window.debug = true;
window.Debug = Debug;
window.scene = null;

window.vec2Ctor = 0;
window.clearArrayCalls = 0;

window.Events = new EventSystem();
window.ignoreDirty = false;

let p3;
let timer;
let perfTimer = new Date();

let avgDelta = 0;
let avgFrames = 0;
let avgCalc = 0;

let cvs = Utils.getEl('cvs');
let ctx = cvs.getContext('2d', { alpha: false });

document.addEventListener('mousedown', e => new Event({ evtName: 'GAME_MOUSE_DOWN', data: e }).fire());
document.addEventListener('mouseup', e => new Event({ evtName: 'GAME_MOUSE_UP', data: e }).fire());
document.addEventListener('contextmenu', e => e.preventDefault());

function update(dt) {
  Debug.add(`Game time: ${Math.floor(window.gameTime)}`);
  Debug.add(`Root Entity count: ${scene.entities.size}`);

  let totalVec2Calls = window.vec2Ctor.toLocaleString();
  Debug.add(`Total Vec2 ctor calls: ${totalVec2Calls}`);
  Debug.add('Bullets: ' + window.count);

  scene.update(dt);

  // Events.printDebug();

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
  gameFrameCount++;
}

function postRender() {
  let timeDiff = new Date().getTime() - perfTimer;
  // avgDelta += timeDiff;
  // avgFrames++;
  // if (avgFrames > 100) {
  //   avgCalc = avgDelta / avgFrames;
  //   avgFrames = 0;
  //   avgDelta = 0;
  // }

  Debug.add('render ms: ' + timeDiff);
  // Debug.add('avg render ms: ' + avgCalc);
  // Debug.add('clear array calls: ' + window.clearArrayCalls);
  // Debug.add('pool available: ' + Pool.count());

  Renderer.postRender();

  let bytes = window.performance.memory.totalJSHeapSize.toLocaleString();
  Debug.add(`heap: ${bytes} bytes`);
  Debug.draw();
  Debug.postRender();
}

function setup() {
  p3 = new P3(cvs, ctx);
  Pool.init();

  // TODO: Make scene and p3 static classes?
  scene = new Scene();
  window.p3 = p3;

  Debug.init();
  Debug.setOn(window.debug);
  
  // Debug.setOn(false);  
  // CollisionSystem.setOn(false);

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
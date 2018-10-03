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
import PriorityQueue from './core/PriorityQueue.js';

window.gameTime = 0;
window.debug = false;
window.Debug = Debug;
window.scene = null;

let p3;
let timer;
let perfTimer;
let layers = {
  '0': [],
  '1': [],
  '2': []
};
let cvs = Utils.getEl('cvs');
let ctx = cvs.getContext('2d');

var pq = new PriorityQueue();

document.addEventListener('mousedown', e => new Event({ evtName: 'GAME_MOUSE_DOWN', data: e }).fire());
document.addEventListener('mouseup', e => new Event({ evtName: 'GAME_MOUSE_UP', data: e }).fire());
document.addEventListener('contextmenu', e => e.preventDefault());

function update(dt) {
  scene.update(dt);

  Debug.add(`gameTime: ${Math.floor(window.gameTime)}`);
  Debug.add(`Entities: ${scene.entities.size}`);

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

  // Place entities in their respective layers
  scene.entities.forEach(e => {
    let l = e.layer || 0;
    layers[l].push(e);
  });

  Object.values(layers).forEach((layer) => {

    layer.forEach(e => {
      // SELF
      e.components.forEach(c => {
        if (c.renderable && c.visible) {
          pq.enqueue(c, c.layer);
        }
      });

      // CHILDREN
      e.children.forEach(e => {
        if (e.components) {
          e.components.forEach(c => {
            if (c.renderable && c.visible) {
              pq.enqueue(c, c.layer);
            }
          });
        }
      });

      // Debug.add('-------');
      while (pq.isEmpty() === false) {
        let c = pq.dequeue();
        c.draw();
        Debug.add(`${c.name}, ${c.layer}`);
      }
    });

  });
}

function postRender() {
  let timeDiff = new Date().getTime() - perfTimer;
  Debug.add('render ms:' + timeDiff);
  Debug.draw();
  Debug.postRender();

  Object.keys(layers).forEach(layer => {
    layers[layer].length = 0;
  });

  pq.clear();
}

function setup() {
  p3 = new P3(cvs, ctx);
  p3.clearColor(25,80,100);
  //(234, 231, 175);
  // Make scene and p3 static classes?
  scene = new Scene();
  window.p3 = p3;
  // Debug.setOn(false);

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
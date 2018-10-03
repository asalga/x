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

let timer;
let perfTimer;
window.gameTime = 0;
window.debug = false;
window.Debug = Debug;
window.scene = null;

let p3;
let cvs = Utils.getEl('cvs');
let ctx = cvs.getContext('2d');





// creating object for queue classs 
var pq = new PriorityQueue();

// // testing isEmpty and front on an empty queue 
// // return true 
// console.log(priorityQueue.isEmpty()); 

// // returns "No elements in Queue" 
// // console.log(priorityQueue.front()); 

// // adding elements to the queue 
// priorityQueue.enqueue("health", 3); 
// priorityQueue.enqueue("particle system2", 0); 
// priorityQueue.enqueue("gun1", 1); 
// priorityQueue.enqueue("gun2", 1); 
// priorityQueue.enqueue("particle system1", 0); 
// priorityQueue.enqueue("health", 3);
window.pq = pq;

// prints [Gourav Piyush Sumit Sunny Sheru] 
// console.log(priorityQueue.printPQueue()); 


document.addEventListener('mousedown', e => {
  new Event({ evtName: 'GAME_CLICK', data: e }).fire();
  new Event({ evtName: 'GAME_MOUSE_DOWN', data: e }).fire();
});

document.addEventListener('mouseup', e => {
  new Event({ evtName: 'GAME_MOUSE_UP', data: e }).fire();
});

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

  scene.entities.forEach(e => {

    e.components.forEach(c => {
      if (c.renderable) {
        pq.enqueue(c);
        // console.log('test');
      }
    });

    e.children.forEach(e => {
      if (e.components) {
        e.components.forEach(c => {
          if (c.renderable) {
            pq.enqueue(c);

          }
        });
      }
    });
  });

  Debug.add(`to draw: ${pq.size()}`);



  while(pq.isEmpty() === false){
    let test = pq.dequeue();
    test.draw();  
  }
  
}

function postRender() {
  let timeDiff = new Date().getTime() - perfTimer;
  Debug.add('render ms:' + timeDiff);
  Debug.draw();
  Debug.postRender();

  pq.clear();
}

function setup() {
  p3 = new P3(cvs, ctx);
  p3.clearColor(48, 66, 73);
  // Make scene and p3 static classes?
  scene = new Scene();
  window.p3 = p3;

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
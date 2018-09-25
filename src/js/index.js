'use strict';

// import _p5 from './libs/p5.min.js';

import Timer from './core/Timer.js';
import Utils from './Utils.js';
import Vec2 from './math/Vec2.js';
import P3 from './P3.js';

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

function update(dt) {
  gameTime += dt;
}

function render() {
  p3.clear();
  p3.strokeWeight(5);


  // p3.pushMatrix();
  // p3.popMatrix();



  p3.fill('green');
  p3.stroke('red');

  p3.rect(50, 50, 100, 100);

  p3.stroke('blue');
  p3.line(190, 150, 250, 200);


}

function setup() {
  console.log('setup');

  p3 = new P3(cvs, ctx);
  p3.clearColor('black');

  timer = new Timer();
  timer.update = function(dt) {
    update(dt)
    render();
  };
  timer.start();
}

setup();
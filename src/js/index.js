'use strict';

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
  // p3.strokeWeight(5);

  // p3.fill('green');
  // p3.stroke('red');

  // p3.rect(50, 50, 100, 100);

  // p3.stroke('blue');
  // p3.line(190, 150, 250, 200);

  p3.stroke('purple');
  p3.fill('orange');
  p3.ellipse(p3.width/2, p3.height/2, 40, 40);

  let center = new Vec2(p3.width/2, p3.height/2);
  let cursor = new Vec2(p3.mouseX, p3.mouseY);

  cursor.sub(center);
  cursor.normalize();
  cursor.mult(80);
  cursor.add(center);

  // console.log(cursor);

  // let center = p5.createVector(p5.width / 2, p5.height / 2);
  // let cursor = p5.createVector(p5.mouseX, p5.mouseY);
  // p5.noFill();
  // p5.strokeWeight(3);
  p3.stroke(0, 255, 0);
  // p5.ellipse(center.x, center.y, 50, 50);



  p3.line(center.x, center.y, cursor.x, cursor.y);


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
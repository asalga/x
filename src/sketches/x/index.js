'use strict';

let _p5 = require('p5');

let debug = true;
let paused = false;
let p5;
let now = 0,
  lastTime = 0,
  gameTime = 0;
let fps = 0;
let p;

function update(dt) {
  if (paused) {
    return;
  }

  gameTime += dt;
}



function render() {
  p5.clear();

  let center = p5.createVector(p5.width / 2, p5.height / 2);
  let cursor = p5.createVector(p5.mouseX, p5.mouseY);
  cursor.sub(center);
  cursor.normalize();
  cursor.mult(80);
  cursor.add(center);

  p5.noFill();
  p5.strokeWeight(3);
  p5.stroke(0, 255, 0);
  p5.ellipse(center.x, center.y, 50, 50);

  p5.line(center.x, center.y, cursor.x, cursor.y);

  if (debug) {
    p5.stroke(255, 0, 0);
    p5.strokeWeight(1);
    p5.line(center.x, center.y, p5.mouseX, p5.mouseY);
  }
}

function checkPageFocus() {
  // If user changes tabs, the animation really messed up on return
  // so just pause on tab change.
  if (document.hasFocus() == false) {
    // setPause(true);
  }
}

var newp5 = new _p5(function(p) {
  p5 = p;

  p.setup = function setup() {
    let cvs = p.createCanvas(640, 400);
    cvs.parent('sketch-container');
    setInterval(checkPageFocus, 200);
  };

  p.preload = function() {};
  p.mousePressed = function() {};
  p.keyPressed = function() {};

  p.draw = function() {
    now = p.millis();
    let delta = now - lastTime;

    update(delta);
    render(p);

    // drawDebug();

    if (paused) {
      // renderPauseOverlay();
      // Use noloop here so we get at least 1 frame rendered.
      p.noLoop();
    }

    lastTime = now;
  };
}, "#cvs");
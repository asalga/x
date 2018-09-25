'use strict';

let p5 = require('p5');

let debug = false;
let paused = false;
let _p5;
let now = 0,
  lastTime = 0,
  gameTime = 0;
let fps = 0;


function update(dt) {
  if (paused) {
    return;
  }

  gameTime += dt;
}



function render(p) {
  p.clear();

  let center = {
    x: p.width / 2,
    y: p.height / 2
  };

  p.ellipse(center.x, center.y, 50, 50);
  p.strokeWeight(2);
  p.stroke(255,0,0);
  p.line(center.x, center.y, p.mouseX, p.mouseY);

}

function checkPageFocus() {
  // If user changes tabs, the animation really messed up on return
  // so just pause on tab change.
  if (document.hasFocus() == false) {
    // setPause(true);
  }
}

var newp5 = new p5(function(p) {
  _p5 = p;

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
'use strict';

import Entity from '../../Entity.js';
import EntityFactory from '../../EntityFactory.js';
import Vec2 from '../../../math/Vec2.js';
import cfg from '../../../cfg.js';

import SpriteRender from '../../components/SpriteRender.js';

const COUNT = 50;
let pos = new Array(COUNT);
let vel = new Array(COUNT);
let sz = new Array(COUNT);

export default function createBackground() {

  let e = new Entity({ name: 'background' });

  for (let i = 0; i < COUNT; i++) {
    pos[i] = [p3.random(0, cfg.gameWidth * 2), p3.random(0, cfg.gameHeight * 2)];

    vel[i] = -p3.random(50, 400);

    sz[i] = 2 + (((vel[i] / 400)-0.5)*20.0);
    sz[i] /= 5.0;
  }

  let spriteRender = new SpriteRender(e, { layerName: 'background' });

  spriteRender.update = function(dt) {
    for (let i = 0; i < COUNT; i++) {
      pos[i][0] += vel[i] * dt;
      // pos[i][1] += vel[i][1] * dt;

      if (pos[i][0] < 0) {
        pos[i] = 
        [p3.random(cfg.gameWidth, cfg.gameWidth * 2), p3.random(0, cfg.gameHeight * 2)];
      }
    }
  };

  spriteRender.draw = function(_p3) {
    // _p3.save();

    _p3.noStroke();
    // _p3.clearColor(200);

    // _p3.fill('rgba(33, 66, 99, 0.5)');
    _p3.fill('rgba(40, 40, 40, 0.5)');

    // _p3.stroke('rgba(200, 200, 200, 0.52)');
    _p3.rect(0, 0, cfg.gameWidth, cfg.gameHeight);

    _p3.fill(255);
    for (let i = 0; i < COUNT; i++) {
      _p3.rect(pos[i][0], pos[i][1], sz[i], sz[i]);
    }
    // _p3.restore();
  };

  e.addComponent(spriteRender);

  return e;
}
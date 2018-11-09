'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import SpriteRender from '../components/SpriteRender.js';
import Score from '../components/Score.js';

export default function createUI() {
  let e = new Entity({ name: 'ui' });

  e.pos.x = 540;
  e.pos.y = 20;

  let w = 200;
  let h = 50;

  e.addComponent(new Score(e, { pointsPerSecond: 80 }));

  let spriteRender = new SpriteRender(e, { layerName: 'ui' });
  spriteRender.draw = function(_p3) {
    // _p3.clearAll();
    _p3.save();

    _p3.translate(450, 0);

    // _p3.noFill();
    _p3.fill('rgba(66, 99, 33, 0.2)');
    _p3.strokeWeight(1);
    _p3.stroke(0);
    _p3.rect(0, 0, w, h);

    // _p3.imageMode('center');
    _p3.fill(255);

    _p3.noStroke();
    _p3.translate(0, 20);

    let s = 1;
    _p3.scale(s, s);
    _p3.ctx.font = 'normal 600 20px Courier New';
    _p3.text('score: ' + this.entity.score.points, 0, 0);
    _p3.restore();

    // p3.drawImage(this.sprite, 0, 0);
  };
  e.addComponent(spriteRender);

  return e;
}
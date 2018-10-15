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

  let spriteRender = new SpriteRender(e, { width: w, height: h, layer: 100 });
  spriteRender.draw = function() {
    this.p3.clearAll();
    this.p3.save();

    this.p3.noFill();
    this.p3.strokeWeight(1);
    this.p3.stroke(0);
    this.p3.rect(0, 0, w, h);

    this.p3.imageMode('center');
    this.p3.fill(0);
    this.p3.noStroke();
    this.p3.translate(0, 20);
    let s = 1;
    this.p3.scale(s,s);
    this.p3.ctx.font = 'normal 600 20px Courier New';
    this.p3.text('score: ' + this.entity.score.points, 0, 0);
    this.p3.restore();

    p3.drawImage(this.sprite, 0, 0);
  }
  e.addComponent(spriteRender);


  return e;
}
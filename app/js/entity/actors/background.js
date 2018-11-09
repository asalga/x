'use strict';

import Entity from '../Entity.js';
import SpriteRender from '../components/SpriteRender.js';

export default function createBackground() {

  let e = new Entity({ name: 'background' });
  scene.add(e);

  let spriteRender = new SpriteRender(e, { layerName: 'background' });
  spriteRender.draw = function(_p3) {
    _p3.save();
    _p3.strokeWeight(2);
    _p3.stroke(20);
    _p3.fill(120);
    let sz = e.bounds.radius;
    _p3.ellipse(e.pos.x, e.pos.y, sz, sz);
    _p3.restore();
  }

  e.addComponent(spriteRender);

  return e;
}